import BASE_URL from '../config';


export const obtenerCotizacionEnvio = async (provincia,destino, pesoTotal) => {
    try {
      const response = await fetch(`${BASE_URL}/correo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provincia,
          destino,
          pesoTotal
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener la cotización');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.log('Error al obtener la cotización:', error);
      throw error;
    }
  };
  