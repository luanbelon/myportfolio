export async function fetchProjects(language = 'pt') {
  const response = await fetch(`/api/projects?lang=${language}`);
  if (!response.ok) {
    throw new Error('Could not load projects');
  }
  return response.json();
}

export async function fetchTags(token) {
  const response = await fetch('/api/tags', {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
  if (!response.ok) {
    throw new Error('Could not load tags');
  }
  return response.json();
}

export async function createProject(payload, token) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not create project');
  }

  return response.json();
}

export async function adminLogin(credentials) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Invalid admin credentials');
  }

  return response.json();
}

export async function verifyAdminToken(token) {
  const response = await fetch('/api/admin/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Invalid admin session');
  }

  return response.json();
}
