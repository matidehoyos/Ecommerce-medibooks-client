import BASE_URL from '../config';

export const createPaymentPreference = async (cartItems) => {
    try {
      const response = await fetch(`${BASE_URL}/pay/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
              title: item.titulo,
              unit_price: item.precio,
              quantity: item.quantity,
          })),
        }),
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la preferencia de pago');
      }
      
      return data; 
    } catch (error) {
      console.log(error.message)
      console.error('Error al comunicarse con la API de pago:', error);
      throw error; 
    }
  };
  