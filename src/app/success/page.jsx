'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client'; 

const SuccessPage = () => {
  const router = useRouter();
  const { user } = useUser(); 
  const cart = JSON.parse(localStorage.getItem('cart')) || []; 

  useEffect(() => {
    const saveTransactionData = async () => {
      const { id: transactionId, status } = router.query; 

      if (transactionId && status && user) {
        const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Total de items

        const items = cart.map(item => ({
          productId: item.id, 
          title: item.titulo,
          unitPrice: item.precio,
          quantity: item.quantity,
          subtotal: (item.precio * item.quantity).toFixed(2),
        }));

        try {
          const response = await fetch('http://localhost:5000/api/save-transaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId,
              status,
              totalAmount: totalAmount.toFixed(2),
              userId: user.sub, 
              totalItems, 
              items,
            }),
          });

          if (!response.ok) {
            throw new Error('Error al guardar la transacción');
          }

          const data = await response.json();
          console.log('Transacción guardada:', data);
        } catch (error) {
          console.error('Error al guardar la transacción:', error);
        }
      }
    };

    if (router.query.id) {
      saveTransactionData();
    }
  }, [router.query, user, cart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className="text-lg">Gracias por tu compra, {user?.name || 'Cliente'}!</p>
      <p className="mt-2">Tu transacción ha sido completada.</p>
      <p className="mt-2">ID de la Transacción: {router.query.id}</p>
      <p className="mt-2">Estado: {router.query.status}</p>
      <p className="mt-2">Total: ${totalAmount.toFixed(2)}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push('/')}
      >
        Volver a la Tienda
      </button>
    </div>
  );
};

export default SuccessPage;
