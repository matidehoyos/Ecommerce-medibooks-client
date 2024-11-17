'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContexts';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { createPaymentPreference } from '@/services/servicePay';
import CartHead from './CartHead';
import CartItems from './CartItems';
import BotonProcesar from './BotonProcesar';
import FormDataEnvio from './FormDataEnvio';
import EnvioTotalFinal from './EnvioTotalFinal';

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, { locale: 'es-AR' });

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [envio, setEnvio] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [opcionEnvio, setOpcionEnvio] = useState("");

  useEffect(() => {
    if (opcionEnvio) {
      localStorage.setItem('correo', opcionEnvio);
    }
  }, [opcionEnvio]);


  const handlePayment = async () => {
        try {
            const envioCost = opcionEnvio || 0; 
            const { id } = await createPaymentPreference(cart, envioCost);
            setPreferenceId(id);
            const mp = new MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, {
                locale: 'es-AR',
            });
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
      };  

  useEffect(() => {
    if (preferenceId) {
      const mp = new MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, {
        locale: 'es-AR',
      });
      mp.bricks().create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
        customization: {
          texts: {
            valueProp: 'smart_option',
          },
        },
      });
    }
  }, [preferenceId]);

  return (
    <>
    {isCartOpen && <div className="bg-black opacity-40 fixed inset-0 z-[2000]" onClick={toggleCart}></div>}
      <div className={`fixed w-full md:w-[800px] h-[100vh] pb-20 top-0 right-0 bg-gray-300 shadow-lg z-[2000] transition-transform duration-1000 ${isCartOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll`}>
            <CartHead />
            <CartItems envio={envio} />
            {!isFormVisible && <BotonProcesar envio={envio} setIsFormVisible={setIsFormVisible}/>}
            {isFormVisible && <FormDataEnvio setIsFormVisible={setIsFormVisible} setEnvio={setEnvio} /> }
            { envio && !preferenceId && <EnvioTotalFinal handlePayment={handlePayment} envio={envio} opcionEnvio={opcionEnvio} setOpcionEnvio={setOpcionEnvio} />}
            {preferenceId &&  
              <div className='w-full px-[4%] mt-3 flex justify-end'>
                  <div id="wallet_container" className="w-auto"></div>
            </div>}
       </div>
    </>
  );
};

export default CartDrawer;








