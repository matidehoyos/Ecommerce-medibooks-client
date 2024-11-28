import BASE_URL from '../config';

const fetchAPI = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return options.method === 'DELETE' ? null : await res.json();
  } catch (error) {
    console.error(`Error in fetchAPI with URL: ${url}`, error);
    throw error;
  }
};

export const getCategorias = async () => {
  return fetchAPI(`${BASE_URL}/categories`);
};

export const crearCategoria = async (nombre) => {
  if (!nombre) throw new Error('El nombre de la categoría es obligatorio.');
  
  return fetchAPI(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });
};

export const editarCategoria = async (id, nombre) => {
  if (!id || !nombre) throw new Error('ID y nombre de categoría son obligatorios.');
  
  return fetchAPI(`${BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });
};

export const eliminarCategoria = async (id) => {
  if (!id) throw new Error('ID de categoría es obligatorio.');
  
  return fetchAPI(`${BASE_URL}/categories/${id}`, { method: 'DELETE' });
};
