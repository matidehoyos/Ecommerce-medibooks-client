import BASE_URL from '../config';

export const updateClienteData = async (clienteData) => {
  try {
    const response = await fetch(`${BASE_URL}/direccion`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error al actualizar el cliente');
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
  }
};



