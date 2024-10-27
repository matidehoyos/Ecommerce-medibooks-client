import BASE_URL from '../config';


export const getCategorias = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error fetching categories');
    return await res.json();
  } catch (error) {
    console.error('Error in fetchCategorias:', error);
    throw error; 
  }
};

export const crearCategoria = async (nombre) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }), 
    });
    if (!res.ok) throw new Error('Error creating category');
    return await res.json();
  };
  
export const editarCategoria = async (id, nombre) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    if (!res.ok) throw new Error('Error updating category');
    return await res.json();
  } catch (error) {
    console.error('Error in editarCategoria:', error);
    throw error; 
  }
};

export const eliminarCategoria = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting category');
  } catch (error) {
    console.error('Error in eliminarCategoria:', error);
    throw error; 
  }
};
