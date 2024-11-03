'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

const SuccessContent = ({ cart }) => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [transactionId, setTransactionId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    const statusValue = searchParams.get('status');
    setTransactionId(id);
    setStatus(statusValue);

    const saveTransactionData = async () => {
      if (id && statusValue && user) {
        const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        const items = cart.map(item => ({
          productId: item.id,
          title: item.titulo,
          unitPrice: item.precio,
          quantity: item.quantity,
          subtotal: (item.precio * item.quantity).toFixed(2),
        }));

        try {
          const response = await fetch('https://medibooks-server-production.up.railway.app/api/transaction/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId: id,
              status: statusValue,
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

    if (id) {
      saveTransactionData();
    }
  }, [searchParams, user, cart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className="text-lg">Gracias por tu compra, {user?.name || 'Cliente'}!</p>
      <p className="mt-2">Tu transacción ha sido completada.</p>
      <p className="mt-2">ID de la Transacción: {transactionId}</p>
      <p className="mt-2">Estado: {status}</p>
      <p className="mt-2">Total: ${cart.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2)}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.location.href = '/'}
      >
        Volver a la Tienda
      </button>
    </div>
  );
};

const SuccessPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <SuccessContent cart={cart} />
  );
};

export default SuccessPage;


