import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProject, fetchProjects, fetchTags } from '@/lib/api';

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'ux', label: 'UX/UI' },
  { value: 'design', label: 'Design' },
];

const imageKeyOptions = [
  '',
  'sunbeat',
  'overall',
  'caricoos',
  'ecofit',
  'coletafacil',
  'bffdeli',
];

const initialForm = {
  title: '',
  description: '',
  category: 'frontend',
  live: '',
  github: '',
  imageKey: '',
  imageUrl: '',
  tagIds: [],
};

const AdminPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const selectedTagsText = useMemo(() => {
    const selected = tags.filter((tag) => formData.tagIds.includes(String(tag.id)));
    return selected.map((tag) => tag.name).join(', ');
  }, [formData.tagIds, tags]);

  async function loadData() {
    const [allTags, allProjects] = await Promise.all([fetchTags(), fetchProjects('pt')]);
    setTags(allTags);
    setProjects(allProjects);
  }

  useEffect(() => {
    loadData().catch(() => {
      setFeedback('Nao foi possivel carregar os dados do admin.');
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      await createProject(formData);
      setFeedback('Projeto criado com sucesso. Traducoes serao geradas automaticamente.');
      setFormData(initialForm);
      await loadData();
    } catch (error) {
      setFeedback('Erro ao salvar projeto. Confira se a API e o banco estao ativos.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-yellow-400">Area Administrativa</h1>
          <div className="flex gap-3">
            <Link className="btn btn-outline" to="/curriculo">
              Ver Curriculo
            </Link>
            <Link className="btn btn-outline" to="/">
              Voltar ao site
            </Link>
          </div>
        </div>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4">Novo projeto (cadastro em PT-BR)</h2>
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
            <select className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="imageKey" value={formData.imageKey} onChange={handleChange}>
              {imageKeyOptions.map((key) => (
                <option key={key || 'none'} value={key}>
                  {key || 'Sem imagem local (usar URL)'}
                </option>
              ))}
            </select>
            <input className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL da imagem (opcional)" />

            <div className="md:col-span-2">
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

            <button disabled={isSaving} className="btn md:col-span-2 disabled:opacity-60" type="submit">
              {isSaving ? 'Salvando...' : 'Salvar projeto'}
            </button>
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPage;
