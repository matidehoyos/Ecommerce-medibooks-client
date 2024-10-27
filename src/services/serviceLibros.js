import BASE_URL from '../config';

export const getLibros = async () => {
  try {
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) throw new Error('Error fetching books');
    return await res.json();
  } catch (error) {
    console.error('Error in fetchLibros:', error);
    throw error;
  }
};

export const getLibro = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`);
    if (!res.ok) throw new Error('Error fetching book');
    return await res.json();
  } catch (error) {
    console.error('Error in fetchLibro:', error);
    throw error;
  }
};


export const crearLibro = async (data) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating book');
  return await res.json();
};

export const editarLibro = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorMessage = await res.text(); 
      console.error('Error response:', errorMessage);
      throw new Error('Error updating book: ' + errorMessage);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in editarLibro:', error); 
    throw error; 
  }
};


export const eliminarLibro = async (id) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting book');
};

