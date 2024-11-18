'use client';
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContexts';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPaymentPreference } from '@/services/servicePay';
import CartHead from './CartHead';
import CartItems from './CartItems';
import BotonProcesar from './BotonProcesar';
import FormDataEnvio from './FormDataEnvio';
import EnvioTotalFinal from './EnvioTotalFinal';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY);

const CartDrawer = () => {
  const { user } = useUser();
  const { cart, isCartOpen, toggleCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [envio, setEnvio] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [opcionEnvio, setOpcionEnvio] = useState('');

  const handlePayment = async () => {
    try {
      const envioCost = opcionEnvio || 0;
      const { id } = await createPaymentPreference(cart, envioCost);
      setPreferenceId(id);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <>
      {isCartOpen && <div className="bg-black opacity-40 fixed inset-0 z-[2000]" onClick={toggleCart}></div>}
      <div className={`fixed w-full md:w-[800px] h-[100vh] pb-20 top-0 right-0 bg-gray-300 shadow-lg z-[2000] transition-transform duration-1000 ${isCartOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll`}>
        <CartHead />
        <CartItems envio={envio} />
        { user ? 
          !isFormVisible ? <BotonProcesar envio={envio} setIsFormVisible={setIsFormVisible} /> : null 
          : (
            <div className='w-full pr-4 mt-4 flex flex-col items-end'>
                <p className='text-sm font-semibold text-gray-600 text-right'>Debes iniciar session para procesar la compra</p>
                <div className='mt-2 flex gap-3'>
                  <Link href="/api/auth/login" className="text-lg font-semibold underline text-[#0f4c4e]" onClick={() => setAbierto(false)}>Iniciar sesión</Link>
                  <Link href="/api/auth/login" className="text-lg font-semibold underline text-[#0f4c4e]" onClick={() => setAbierto(false)}>Registrarte</Link>
                </div>
            </div>
          )}
        {isFormVisible && <FormDataEnvio setIsFormVisible={setIsFormVisible} setEnvio={setEnvio} />}
        {envio && !preferenceId && <EnvioTotalFinal handlePayment={handlePayment} envio={envio} opcionEnvio={opcionEnvio} setOpcionEnvio={setOpcionEnvio} />}
        {preferenceId && (
          <div className='w-full px-[4%] mt-3 flex justify-end'>
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: 'smart_option' } }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;









