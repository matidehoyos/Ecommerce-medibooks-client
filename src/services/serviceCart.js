import BASE_URL from '../config';

export const createCart = async (data) => {
  const response = await fetch(`${BASE_URL}`, {
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
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return []; 
      }
      throw new Error('Error al obtener el carrito desde el backend');
    }

    const data = await response.json();
    return data.CartItems || [];
  } catch (error) {
    console.error('Error al obtener el carrito desde el backend:', error);
    throw error;
  }
};

export const obtenerCarritoDesdeBackend = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null; 
      }
      throw new Error('Error al obtener el carrito desde el backend');
    }

    const data = await response.json();
    return data || null; 
  } catch (error) {
    console.error('Error al obtener el carrito desde el backend:', error.message);
    throw error;
  }
};

export const addToBackendCart = async (cartId, bookId, quantity, priceAtTime) => {
  try {
    const response = await fetch(`${BASE_URL}/${cartId}/items`, {
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
    const response = await fetch(`${BASE_URL}/${cartId}/items/${bookId}`, {
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
    const response = await fetch(`${BASE_URL}/${cartId}/clear`, {
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
