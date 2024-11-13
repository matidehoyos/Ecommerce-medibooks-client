import BASE_URL from '../config';

export const createPaymentPreference = async (cartItems, costoEnvio) => {
    try {
        const items = cartItems.map(item => ({
            title: item.titulo,
            unit_price: item.precio,
            quantity: item.quantity,
        }));

            items.push({
                title: 'Costo de envío',
                unit_price: Number(costoEnvio),
                quantity: 1,
            });

        const response = await fetch(`${BASE_URL}/pay/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items, 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear la preferencia de pago');
        }

        return data;
    } catch (error) {
        console.error('Error al comunicarse con la API de pago:', error);
        throw error;
    }
};
