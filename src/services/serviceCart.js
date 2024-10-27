const API_URL = 'http://localhost:5000/api/cart';

export const createCart = async (data) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al crear el carrito');
  }

  const result = await response.json();
  return result;
};

export const obtenerCartItemsDesdeBackend = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return []; // Si no se encuentra el carrito, devolvemos un array vacío
      }
      throw new Error('Error al obtener el carrito desde el backend');
    }

    const data = await response.json();
    return data.CartItems || []; // Asegúrate de devolver siempre un array
  } catch (error) {
    console.error('Error al obtener el carrito desde el backend:', error);
    throw error;
  }
};

export const obtenerCarritoDesdeBackend = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Cambiado a null para indicar que no hay carrito
      }
      throw new Error('Error al obtener el carrito desde el backend');
    }

    const data = await response.json();
    return data || null; // Asegúrate de devolver null si no hay datos
  } catch (error) {
    console.error('Error al obtener el carrito desde el backend:', error.message);
    throw error;
  }
};

export const addToBackendCart = async (cartId, bookId, quantity, priceAtTime) => {
  try {
    const response = await fetch(`${API_URL}/${cartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId, quantity, priceAtTime }),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el producto al carrito en el backend');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al agregar el producto al carrito en el backend:', error);
    throw error;
  }
};

export const removeFromBackendCart = async (cartId, bookId) => {
  try {
    const response = await fetch(`${API_URL}/${cartId}/items/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto del carrito en el backend');
    }

    return;
  } catch (error) {
    console.error('Error al eliminar el producto del carrito en el backend:', error.message);
    throw error;
  }
};

export const clearBackendCart = async (cartId) => {
  try {
    const response = await fetch(`${API_URL}/${cartId}/clear`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al limpiar el carrito en el backend');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al limpiar el carrito en el backend:', error);
    throw error;
  }
};
