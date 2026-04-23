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

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'ux', label: 'UX/UI' },
  { value: 'design', label: 'Design' },
];

const initialForm = {
  title: '',
  description: '',
  category: 'frontend',
  live: '',
  github: '',
  imageUrl: '',
  tagIds: [],
};

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

  const selectedTagsText = useMemo(() => {
    const selected = tags.filter((tag) => formData.tagIds.includes(String(tag.id)));
    return selected.map((tag) => tag.name).join(', ');
  }, [formData.tagIds, tags]);

  async function loadData() {
    const [allTags, allProjects] = await Promise.all([fetchTags(token), fetchProjects('pt')]);
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
    loadData().catch(() => {
      setFeedback('Nao foi possivel carregar os dados do admin.');
    });
  }, [token]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Falha ao ler arquivo de imagem'));
      reader.readAsDataURL(file);
    });
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback('A imagem deve ter no maximo 2MB.');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      setFeedback('Imagem carregada com sucesso.');
    } catch (error) {
      setFeedback(error.message);
    }
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
    setFeedback('');

    try {
      if (editingProjectId) {
        await updateProject({ id: editingProjectId, ...formData, imageKey: null }, token);
        setFeedback('Projeto atualizado com sucesso.');
      } else {
        await createProject({ ...formData, imageKey: null }, token);
        setFeedback('Projeto criado com sucesso. Traducoes serao geradas automaticamente.');
      }
      setFormData(initialForm);
      setEditingProjectId(null);
      await loadData();
    } catch (error) {
      setFeedback(`Erro ao salvar projeto: ${error.message}`);
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
      category: project.category || 'frontend',
      live: project.live || '',
      github: project.github || '',
      imageUrl: project.imageUrl || '',
      tagIds: [...new Set(selectedTagIds)],
    });
    setFeedback('Modo edicao ativo.');
  }

  async function handleDeleteProject(projectId) {
    const confirmed = window.confirm('Tem certeza que deseja excluir este projeto?');
    if (!confirmed) {
      return;
    }

    setFeedback('');
    try {
      await deleteProject(projectId, token);
      if (editingProjectId === projectId) {
        setEditingProjectId(null);
        setFormData(initialForm);
      }
      setFeedback('Projeto excluido com sucesso.');
      await loadData();
    } catch (error) {
      setFeedback(`Erro ao excluir projeto: ${error.message}`);
    }
  }

  function cancelEdit() {
    setEditingProjectId(null);
    setFormData(initialForm);
    setFeedback('Edicao cancelada.');
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
      setAuthError('Login invalido. Verifique usuario e senha.');
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

  if (!token) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-16">
        <Helmet>
          <title>Area administrativa</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>
        <div className="container max-w-md mx-auto">
          <section className="card">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Login Admin</h1>
            <p className="text-gray-300 mb-6">Acesso restrito. Informe usuario e senha.</p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg"
                placeholder="Usuario"
                value={credentials.username}
                onChange={(event) =>
                  setCredentials((prev) => ({ ...prev, username: event.target.value }))
                }
                required
              />
              <input
                type="password"
                className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg"
                placeholder="Senha"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((prev) => ({ ...prev, password: event.target.value }))
                }
                required
              />
              <button type="submit" className="btn w-full" disabled={isAuthenticating}>
                {isAuthenticating ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            {authError && <p className="text-red-300 text-sm mt-4">{authError}</p>}
            <div className="mt-6">
              <Link className="text-yellow-400 hover:text-yellow-300 text-sm" to="/">
                Voltar ao site
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <Helmet>
        <title>Area administrativa</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-yellow-400">Area Administrativa</h1>
          <div className="flex gap-3">
            <button className="btn btn-outline" onClick={handleLogout}>
              Sair
            </button>
            <Link className="btn btn-outline" to="/curriculo">
              Ver Curriculo
            </Link>
            <Link className="btn btn-outline" to="/">
              Voltar ao site
            </Link>
          </div>
        </div>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProjectId ? 'Editar projeto (PT-BR)' : 'Novo projeto (cadastro em PT-BR)'}
          </h2>
          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="title" value={formData.title} onChange={handleChange} placeholder="Titulo do projeto" required />
            <select className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="category" value={formData.category} onChange={handleChange}>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea className="md:col-span-2 px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg min-h-28" name="description" value={formData.description} onChange={handleChange} placeholder="Descricao completa" required />
            <input className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="live" value={formData.live} onChange={handleChange} placeholder="URL de demonstracao" />
            <input className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="github" value={formData.github} onChange={handleChange} placeholder="URL do GitHub (opcional)" />
            <label className="md:col-span-2 px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-gray-300 cursor-pointer">
              <span className="block text-sm mb-2">Upload da imagem do projeto</span>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-200 file:mr-4 file:rounded-full file:border-0 file:bg-yellow-400 file:px-4 file:py-2 file:text-black"
                onChange={handleImageUpload}
              />
              {formData.imageUrl && (
                <span className="block mt-2 text-xs text-green-300">Imagem pronta para envio.</span>
              )}
            </label>

            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-3">
                <input
                  className="flex-1 min-w-52 px-4 py-2 bg-black/50 border border-yellow-400/30 rounded-lg"
                  placeholder="Nova tag (ex: NextJS)"
                  value={newTagName}
                  onChange={(event) => setNewTagName(event.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCreateTag}
                  disabled={isCreatingTag}
                >
                  {isCreatingTag ? 'Adicionando...' : 'Adicionar tag'}
                </button>
              </div>
              <p className="mb-2 text-sm text-gray-300">Tags existentes (clique para adicionar):</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = formData.tagIds.includes(String(tag.id));
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(String(tag.id))}
                      className={`px-3 py-1 rounded-full border transition ${
                        active
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-transparent text-yellow-400 border-yellow-400/50'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Selecionadas: {selectedTagsText || 'nenhuma'}
              </p>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button disabled={isSaving} className="btn flex-1 disabled:opacity-60" type="submit">
                {isSaving ? 'Salvando...' : editingProjectId ? 'Atualizar projeto' : 'Salvar projeto'}
              </button>
              {editingProjectId && (
                <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
          {feedback && <p className="mt-3 text-sm text-gray-300">{feedback}</p>}
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4">Projetos ja cadastrados</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-yellow-400/20 rounded-lg p-4">
                <p className="font-semibold text-yellow-400">{project.title}</p>
                <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                <p className="text-xs text-gray-400 mt-2">Categoria: {project.category}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline !py-2 !px-4 !text-sm"
                    onClick={() => startEditProject(project)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline !py-2 !px-4 !text-sm border-red-400 text-red-300 hover:bg-red-500 hover:text-white"
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
