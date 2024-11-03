import BASE_URL from '../config';

export const createClientData = async (clienteData) => {
  try {
    const response = await fetch(`${BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos del cliente');
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error en el servicio de cliente:', error);
    throw error;
  }
};

