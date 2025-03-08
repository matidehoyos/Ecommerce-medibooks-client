'use client';
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContexts';
import { useUser } from '@auth0/nextjs-auth0/client';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPaymentPreference } from '@/services/servicePay';
import CartHead from './CartHead';
import CartItemsContainer from './CartItemsContainer';
import BotonProcesar from './BotonProcesar';
import FormDataEnvio from './FormDataEnvio';
import EnvioTotalFinal from './EnvioTotalFinal';
import CartAuthentication from './CartAuthentication';

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
        <div className={`fixed w-full md:w-[600px] h-[100vh] pb-20 top-0 right-0 bg-gray-300 shadow-lg z-[2000] transition-transform duration-1000 ${isCartOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll`}>
            <CartHead />
            <CartItemsContainer envio={envio} />
            { user ? 
              !isFormVisible ? <BotonProcesar envio={envio} setIsFormVisible={setIsFormVisible} /> : null 
              : (
                <CartAuthentication />
              )}
              {/*isFormVisible && <FormDataEnvio setIsFormVisible={setIsFormVisible} setEnvio={setEnvio} />}
              {envio && !preferenceId && <EnvioTotalFinal handlePayment={handlePayment} envio={envio} opcionEnvio={opcionEnvio} setOpcionEnvio={setOpcionEnvio} />}
              {preferenceId && (
                <div className='w-full px-[4%] mt-3 flex justify-end'>
                  <Wallet
                    initialization={{ preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' },  locale: 'es_AR',}}
                  />
                </div>
              )*/}
        </div>
    </>
  );
};

export default CartDrawer;









