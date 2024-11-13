// SuccessPage.jsx
'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const saveTransactionData = async ({ transactionId, statusValue, paymentType, cart, user, costoEnvio }) => {
  const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const items = cart.map(item => ({
    productId: item.id,
    title: item.titulo,
    terminacion: item.terminacion,
    unitPrice: item.precio,
    quantity: item.quantity,
    subtotal: (item.precio * item.quantity).toFixed(2),
  }));

  
  const clienteId = localStorage.getItem('clienteId');
  const direccionId = localStorage.getItem('direccionId');


  const response = await fetch('http://localhost:5000/api/transaction/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transactionId,
      status: statusValue,
      paymentMethod: paymentType,
      totalAmount: totalAmount.toFixed(2),
      userId: user.sub,
      totalItems,
      items,
      clienteId,
      direccionId,
      costoEnvio
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error al guardar la transacción: ${errorData}`);
  }
    localStorage.removeItem('correo');
    localStorage.removeItem('clienteId');
    localStorage.removeItem('direccionId');
    localStorage.removeItem('cart');
    const data = await response.json();
    return data;
};

const SuccessContent = ({ cart }) => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [transactionId, setTransactionId] = useState(null);
  const [status, setStatus] = useState(null);
  const [costoEnvio, setCostoEnvio] = useState(0);


  const mutation = useMutation(saveTransactionData, {
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    const envio = localStorage.getItem('correo');
    if (envio) {
      setCostoEnvio(Number(envio)); 
    }
  }, []);

  useEffect(() => {
    const transactionId = searchParams.get('collection_id');
    const statusValue = searchParams.get('collection_status');
    const paymentType = searchParams.get('payment_type');

    if (transactionId && statusValue && user && !mutation.isLoading && !mutation.isSuccess) {
      setTransactionId(transactionId);
      setStatus(statusValue);
      mutation.mutate({ transactionId, statusValue, paymentType, cart, user, costoEnvio });
    }
  }, [searchParams, user]);

  const totalConEnvio = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0) + costoEnvio;


  return (
    <div className="flex flex-col items-center justify-center text-white h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className="text-lg">Gracias por tu compra, {user?.name || 'Cliente'}!</p>
      <p className="mt-2">Tu transacción ha sido completada.</p>
      <p className="mt-2">ID de la Transacción: {transactionId}</p>
      <p className="mt-2">Estado: {status}</p>
      <p className="mt-2">Total: ${totalConEnvio.toFixed(2)}</p>
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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent cart={cart} />
      </Suspense>
    </QueryClientProvider>
  );
};

export default SuccessPage;




