import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  adminLogin,
  createProject,
  createTag,
  deleteProject,
  fetchProjects,
  fetchTags,
  updateProject,
  verifyAdminToken,
} from '@/lib/api';
import { WORK_TYPES } from '@/lib/workTypes';
import {
  compressImageFile,
  estimatePayloadKb,
  prepareProjectImages,
} from '@/lib/imageCompress';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const initialForm = {
  title: '',
  description: '',
  excerpt: '',
  body: '',
  type: 'website',
  live: '',
  github: '',
  figmaUrl: '',
  mediumUrl: '',
  imageUrl: '',
  beforeImageUrl: '',
  afterImageUrl: '',
  fullPageImageUrl: '',
  gallery: [],
  featured: false,
  published: true,
  year: '',
  client: '',
  role: '',
  sortOrder: 0,
  tagIds: [],
};

function fileToDataUrl(file) {
  return compressImageFile(file);
}

const AdminPage = () => {
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const selectedTagsText = useMemo(() => {
    const selected = tags.filter((tag) => formData.tagIds.includes(String(tag.id)));
    return selected.map((tag) => tag.name).join(', ');
  }, [formData.tagIds, tags]);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      const haystack = `${project.title} ${project.excerpt || ''}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [projects, query, typeFilter]);

  async function loadData(currentToken = token) {
    const [allTags, allProjects] = await Promise.all([
      fetchTags(currentToken),
      fetchProjects('pt', { admin: true, token: currentToken }),
    ]);
    setTags(allTags);
    setProjects(allProjects);
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('admin-token');
    if (!savedToken) {
      return;
    }

    verifyAdminToken(savedToken)
      .then(() => {
        setToken(savedToken);
      })
      .catch(() => {
        localStorage.removeItem('admin-token');
      });
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    loadData(token).catch(() => {
      setFeedback('Não foi possível carregar os dados do admin.');
    });
  }, [token]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleImageUpload(event, field) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setFeedback('A imagem deve ter no máximo 8MB (será comprimida automaticamente).');
      input.value = '';
      return;
    }
    try {
      setFeedback('Otimizando imagem…');
      const options = field === 'fullPageImageUrl'
        ? { maxWidth: 1200, maxChars: 1_100_000 }
        : undefined;
      const dataUrl = await compressImageFile(file, options);
      setFormData((prev) => ({ ...prev, [field]: dataUrl }));
      setFeedback('Imagem carregada e otimizada.');
    } catch (error) {
      setFeedback(error.message);
    } finally {
      input.value = '';
    }
  }

  async function handleGalleryUpload(event) {
    const input = event.target;
    const files = Array.from(input.files || []);
    if (!files.length) {
      return;
    }
    try {
      setFeedback('Otimizando galeria…');
      const urls = [];
      for (const file of files) {
        if (file.size > MAX_IMAGE_BYTES) {
          setFeedback('Cada imagem da galeria deve ter no máximo 8MB.');
          return;
        }
        urls.push(await fileToDataUrl(file));
      }
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
      setFeedback('Galeria atualizada.');
    } catch (error) {
      setFeedback(error.message);
    } finally {
      input.value = '';
    }
  }

  function removeGalleryItem(index) {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleCreateTag() {
    const trimmed = newTagName.trim();
    if (!trimmed) {
      return;
    }
    setIsCreatingTag(true);
    setFeedback('');
    try {
      const created = await createTag(trimmed, token);
      setTags((prev) => [...prev.filter((tag) => tag.id !== created.id), created].sort((a, b) => a.name.localeCompare(b.name)));
      setFormData((prev) => ({ ...prev, tagIds: [...new Set([...prev.tagIds, String(created.id)])] }));
      setNewTagName('');
    } catch (error) {
      setFeedback(`Erro ao criar tag: ${error.message}`);
    } finally {
      setIsCreatingTag(false);
    }
  }

  function toggleTag(tagId) {
    setFormData((prev) => {
      const exists = prev.tagIds.includes(tagId);
      return {
        ...prev,
        tagIds: exists ? prev.tagIds.filter((id) => id !== tagId) : [...prev.tagIds, tagId],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback('Preparando imagens e salvando…');

    try {
      const payload = await prepareProjectImages(formData);
      const sizeKb = estimatePayloadKb({ id: editingProjectId, ...payload });
      if (sizeKb > 4200) {
        throw new Error(
          `Payload muito grande (${sizeKb} KB). Reduza as imagens ou remova itens da galeria e tente de novo.`
        );
      }

      if (editingProjectId) {
        await updateProject({ id: editingProjectId, ...payload }, token);
        const allProjects = await fetchProjects('pt', { admin: true, token });
        setProjects(allProjects);
        const updated = allProjects.find((project) => project.id === editingProjectId);
        if (updated) {
          startEditProject(updated);
        } else {
          setFormData({
            ...payload,
            year: payload.year || '',
            client: payload.client || '',
            role: payload.role || '',
          });
        }
        setFeedback('Trabalho atualizado. Imagens antes/depois preservadas.');
      } else {
        await createProject(payload, token);
        setFormData(initialForm);
        setEditingProjectId(null);
        await loadData();
        setFeedback('Trabalho criado. Traduções serão geradas automaticamente.');
      }
    } catch (error) {
      const message = String(error.message || '');
      if (/413|Payload Too Large|entity too large|body/i.test(message)) {
        setFeedback('Erro ao salvar: imagens grandes demais para o servidor. Tente de novo — elas serão comprimidas automaticamente.');
      } else {
        setFeedback(`Erro ao salvar: ${message}`);
      }
    } finally {
      setIsSaving(false);
    }
  }

  function startEditProject(project) {
    const nameToTagId = new Map(tags.map((tag) => [tag.name.toLowerCase(), String(tag.id)]));
    const selectedTagIds = (project.technologies || [])
      .map((name) => nameToTagId.get(String(name).toLowerCase()))
      .filter(Boolean);

    setEditingProjectId(project.id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      excerpt: project.excerpt || '',
      body: project.body || '',
      type: project.type || 'website',
      live: project.live || '',
      github: project.github || '',
      figmaUrl: project.figmaUrl || '',
      mediumUrl: project.mediumUrl || '',
      imageUrl: project.imageUrl || '',
      beforeImageUrl: project.beforeImageUrl || '',
      afterImageUrl: project.afterImageUrl || '',
      fullPageImageUrl: project.fullPageImageUrl || '',
      gallery: project.gallery || [],
      featured: Boolean(project.featured),
      published: project.published !== false,
      year: project.year || '',
      client: project.client || '',
      role: project.role || '',
      sortOrder: project.sortOrder || 0,
      tagIds: [...new Set(selectedTagIds)],
    });
    setFeedback('Edição ativa.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeleteProject(projectId) {
    const confirmed = window.confirm('Excluir este trabalho?');
    if (!confirmed) {
      return;
    }
    try {
      await deleteProject(projectId, token);
      if (editingProjectId === projectId) {
        setEditingProjectId(null);
        setFormData(initialForm);
      }
      setFeedback('Trabalho excluído.');
      await loadData();
    } catch (error) {
      setFeedback(`Erro ao excluir: ${error.message}`);
    }
  }

  function cancelEdit() {
    setEditingProjectId(null);
    setFormData(initialForm);
    setFeedback('Edição cancelada.');
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    try {
      const response = await adminLogin(credentials);
      setToken(response.token);
      localStorage.setItem('admin-token', response.token);
      setCredentials({ username: '', password: '' });
    } catch (error) {
      setAuthError('Login inválido.');
    } finally {
      setIsAuthenticating(false);
    }
  }

  function handleLogout() {
    setToken('');
    setTags([]);
    setProjects([]);
    localStorage.removeItem('admin-token');
  }

  const type = formData.type;
  const showLive = ['website', 'layout'].includes(type);
  const showGithub = type === 'website';
  const showFigma = ['prototype', 'case_study'].includes(type);
  const showMedium = type === 'article';
  const showBeforeAfter = type === 'before_after';
  const showFullPage = type === 'website';
  const showGallery = ['website', 'layout', 'case_study'].includes(type);
  const showBody = ['case_study', 'article', 'layout'].includes(type);

  if (!token) {
    return (
      <main className="min-h-screen bg-ink text-paper px-6 py-24">
        <Helmet>
          <title>Área administrativa</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>
        <div className="container max-w-md">
          <p className="text-sm text-muted mb-2">CMS</p>
          <h1 className="font-display text-4xl tracking-tight mb-2">Acesso restrito</h1>
          <p className="text-muted mb-8">Informe usuário e senha para gerenciar o conteúdo.</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              className="field"
              placeholder="Usuário"
              value={credentials.username}
              onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))}
              required
            />
            <input
              type="password"
              className="field"
              placeholder="Senha"
              value={credentials.password}
              onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
            <button type="submit" className="btn w-full" disabled={isAuthenticating}>
              {isAuthenticating ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          {authError && <p className="text-red-300 text-sm mt-4">{authError}</p>}
          <Link className="inline-block mt-6 text-sm text-paper" to="/">
            Voltar ao site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16">
      <Helmet>
        <title>Área administrativa</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>
      <div className="container max-w-6xl space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted mb-2">CMS</p>
            <h1 className="font-display text-4xl tracking-tight">Conteúdo</h1>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline" onClick={handleLogout}>Sair</button>
            <Link className="btn btn-outline" to="/">Ver site</Link>
          </div>
        </div>

        <section className="card">
          <h2 className="font-display text-2xl tracking-tight mb-6">
            {editingProjectId ? 'Editar trabalho' : 'Novo trabalho'}
          </h2>
          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="label">Título</span>
              <input className="field" name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <label className="block">
              <span className="label">Tipo</span>
              <select className="field" name="type" value={formData.type} onChange={handleChange}>
                {WORK_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value === 'website' ? 'Site'
                      : option.value === 'before_after' ? 'Antes e depois'
                      : option.value === 'layout' ? 'Layout'
                      : option.value === 'case_study' ? 'Case UX/UI'
                      : option.value === 'prototype' ? 'Protótipo'
                      : 'Artigo'}
                  </option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2 block">
              <span className="label">Resumo</span>
              <textarea className="field min-h-20" name="excerpt" value={formData.excerpt} onChange={handleChange} />
            </label>
            <label className="md:col-span-2 block">
              <span className="label">Descrição</span>
              <textarea className="field min-h-28" name="description" value={formData.description} onChange={handleChange} required />
            </label>
            {showBody && (
              <label className="md:col-span-2 block">
                <span className="label">Texto longo / case</span>
                <textarea className="field min-h-40" name="body" value={formData.body} onChange={handleChange} />
              </label>
            )}
            {showLive && (
              <label className="block">
                <span className="label">URL do site</span>
                <input className="field" name="live" value={formData.live} onChange={handleChange} />
              </label>
            )}
            {showGithub && (
              <label className="block">
                <span className="label">GitHub</span>
                <input className="field" name="github" value={formData.github} onChange={handleChange} />
              </label>
            )}
            {showFigma && (
              <label className="md:col-span-2 block">
                <span className="label">URL do Figma</span>
                <input className="field" name="figmaUrl" value={formData.figmaUrl} onChange={handleChange} />
              </label>
            )}
            {showMedium && (
              <label className="md:col-span-2 block">
                <span className="label">URL do Medium</span>
                <input className="field" name="mediumUrl" value={formData.mediumUrl} onChange={handleChange} />
              </label>
            )}
            <label className="block">
              <span className="label">Ano</span>
              <input className="field" name="year" value={formData.year} onChange={handleChange} />
            </label>
            <label className="block">
              <span className="label">Cliente</span>
              <input className="field" name="client" value={formData.client} onChange={handleChange} />
            </label>
            <label className="block">
              <span className="label">Papel</span>
              <input className="field" name="role" value={formData.role} onChange={handleChange} />
            </label>
            <label className="block">
              <span className="label">Ordem</span>
              <input className="field" name="sortOrder" value={formData.sortOrder} onChange={handleChange} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
              Destaque na home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
              Publicado
            </label>

            <label className="md:col-span-2 block text-sm text-muted">
              <span className="label">Capa (cards e preview)</span>
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, 'imageUrl')} />
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="" className="mt-3 w-full max-w-xs aspect-video object-cover object-top rounded-lg border border-white/10" />
              ) : (
                <span className="block mt-2 text-xs text-zinc-500">Ainda sem capa.</span>
              )}
            </label>

            {showFullPage && (
              <label className="md:col-span-2 block text-sm text-muted">
                <span className="label">Home completa (scroll no hover da página do projeto)</span>
                <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, 'fullPageImageUrl')} />
                {formData.fullPageImageUrl ? (
                  <div className="mt-3 space-y-2">
                    <img
                      src={formData.fullPageImageUrl}
                      alt=""
                      className="w-full max-w-xs max-h-64 object-cover object-top rounded-lg border border-white/10"
                    />
                    <button
                      type="button"
                      className="text-xs text-muted hover:text-paper"
                      onClick={() => setFormData((prev) => ({ ...prev, fullPageImageUrl: '' }))}
                    >
                      Remover home completa
                    </button>
                  </div>
                ) : (
                  <span className="block mt-2 text-xs text-zinc-500">
                    Envie um print longo da home. No detalhe do projeto, o hover faz o scroll suave.
                  </span>
                )}
              </label>
            )}

            {showBeforeAfter && (
              <>
                <label className="block text-sm text-muted">
                  <span className="label">Imagem antes (obrigatória para o comparador)</span>
                  <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, 'beforeImageUrl')} />
                  {formData.beforeImageUrl ? (
                    <div className="mt-3 space-y-2">
                      <img src={formData.beforeImageUrl} alt="" className="w-full max-w-xs aspect-video object-cover object-top rounded-lg border border-white/10" />
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-paper"
                        onClick={() => setFormData((prev) => ({ ...prev, beforeImageUrl: '' }))}
                      >
                        Remover antes
                      </button>
                    </div>
                  ) : (
                    <span className="block mt-2 text-xs text-zinc-500">Ainda sem imagem do antes.</span>
                  )}
                </label>
                <label className="block text-sm text-muted">
                  <span className="label">Imagem depois (obrigatória para o comparador)</span>
                  <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, 'afterImageUrl')} />
                  {formData.afterImageUrl ? (
                    <div className="mt-3 space-y-2">
                      <img src={formData.afterImageUrl} alt="" className="w-full max-w-xs aspect-video object-cover object-top rounded-lg border border-white/10" />
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-paper"
                        onClick={() => setFormData((prev) => ({ ...prev, afterImageUrl: '' }))}
                      >
                        Remover depois
                      </button>
                    </div>
                  ) : (
                    <span className="block mt-2 text-xs text-zinc-500">Ainda sem imagem do depois.</span>
                  )}
                </label>
              </>
            )}

            {showGallery && (
              <div className="md:col-span-2">
                <span className="label">Galeria</span>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.gallery.map((src, index) => (
                    <button
                      key={`${index}-${src.slice(0, 24)}`}
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="relative"
                      title="Remover"
                    >
                      <img src={src} alt="" className="w-20 h-14 object-cover border border-white/10" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-3">
                <input
                  className="field flex-1 min-w-52"
                  placeholder="Nova tag"
                  value={newTagName}
                  onChange={(event) => setNewTagName(event.target.value)}
                />
                <button type="button" className="btn btn-outline" onClick={handleCreateTag} disabled={isCreatingTag}>
                  {isCreatingTag ? 'Adicionando…' : 'Adicionar tag'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = formData.tagIds.includes(String(tag.id));
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(String(tag.id))}
                      className={`px-3 py-1 text-sm border ${
                        active ? 'border-brass text-brass' : 'border-white/15 text-muted'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted mt-2">Selecionadas: {selectedTagsText || 'nenhuma'}</p>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button disabled={isSaving} className="btn flex-1" type="submit">
                {isSaving ? 'Salvando…' : editingProjectId ? 'Atualizar' : 'Salvar'}
              </button>
              {editingProjectId && (
                <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
          {feedback && <p className="mt-4 text-sm text-muted">{feedback}</p>}
        </section>

        <section>
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              className="field max-w-xs"
              placeholder="Buscar"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select className="field max-w-[180px]" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">Todos os tipos</option>
              {WORK_TYPES.map((option) => (
                <option key={option.value} value={option.value}>{option.value}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            {visibleProjects.map((project) => (
              <div key={project.id} className="border border-white/10 p-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted mb-1">{project.type}</p>
                  <p className="font-display text-xl tracking-tight">{project.title}</p>
                  <p className="text-sm text-muted mt-1 max-w-2xl">{project.excerpt || project.description}</p>
                  <p className="text-xs text-muted mt-2">
                    {project.published ? 'Publicado' : 'Rascunho'}
                    {project.featured ? ' · Destaque' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-outline !py-2 !px-4 !text-sm" onClick={() => startEditProject(project)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline !py-2 !px-4 !text-sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPage;
