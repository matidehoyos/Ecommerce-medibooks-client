import BASE_URL from '../config';

export const getVentas = async () => {
    const response = await fetch(`${BASE_URL}/ventas`); 
    if (!response.ok) throw new Error('Failed to fetch ventas');
    return await response.json();
  };

  export const eliminarVenta = async (id) => {
    const res = await fetch(`${BASE_URL}/ventas/${id}`,
     { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting user');
  };