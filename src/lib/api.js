export async function fetchProjects(language = 'pt') {
  const response = await fetch(`/api/projects?lang=${language}`);
  if (!response.ok) {
    throw new Error('Could not load projects');
  }
  return response.json();
}

export async function fetchTags() {
  const response = await fetch('/api/tags');
  if (!response.ok) {
    throw new Error('Could not load tags');
  }
  return response.json();
}

export async function createProject(payload) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not create project');
  }

  return response.json();
}
