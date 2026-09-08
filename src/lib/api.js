async function parseError(response, fallback) {
  let message = fallback;
  try {
    const payload = await response.json();
    if (payload?.error) {
      message = payload.error;
    }
  } catch (error) {
    // Keep default message when parsing fails
  }
  return message;
}

export async function fetchProjects(language = 'pt', options = {}) {
  const params = new URLSearchParams({ lang: language });
  if (options.type) {
    params.set('type', options.type);
  }
  if (options.featured) {
    params.set('featured', '1');
  }
  if (options.admin) {
    params.set('admin', '1');
  }

  const response = await fetch(`/api/projects?${params.toString()}`, {
    headers: options.token
      ? { Authorization: `Bearer ${options.token}` }
      : {},
  });
  if (!response.ok) {
    throw new Error(await parseError(response, 'Could not load projects'));
  }
  return response.json();
}

export async function fetchProjectBySlug(slug, language = 'pt') {
  const params = new URLSearchParams({ lang: language, slug });
  const response = await fetch(`/api/projects?${params.toString()}`);
  if (!response.ok) {
    throw new Error(await parseError(response, 'Could not load project'));
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
    throw new Error(await parseError(response, 'Could not load tags'));
  }
  return response.json();
}

export async function createTag(name, token) {
  const response = await fetch('/api/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Could not create tag'));
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
    throw new Error(await parseError(response, 'Could not create project'));
  }

  return response.json();
}

export async function updateProject(payload, token) {
  const response = await fetch('/api/projects', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Could not update project'));
  }

  return response.json();
}

export async function deleteProject(projectId, token) {
  const response = await fetch(`/api/projects?id=${projectId}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Could not delete project'));
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
