'use client'
import React from 'react';
import {  BiSolidRightArrow, BiTrash } from 'react-icons/bi';
import { useCart } from '@/contexts/CartContexts';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';


const CartDrawer = () => {
  const { user } = useUser();
  const { cart, isCartOpen, toggleCart, removeFromCart, addToCart } = useCart();
  
  const handleIncrement = (item) => {
    addToCart(item, 1); 
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1); 
    }
  };
  

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
  };
  

  return (
    <>
    {isCartOpen && <div className="bg-black opacity-40 fixed inset-0 z-[2000]" onClick={toggleCart}></div>}
    <div className={`fixed w-full md:w-[800px] h-[calc(100vh-60px)] md:h-[100vh] pb-20 md:pb-60 top-[60px] md:top-[0px] right-0 bg-gray-200 md:bg-gray-50 shadow-lg z-[2000] transition-transform duration-1000 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll`}>
      <div className='w-full p-4 mb-4 md:mb-0 flex justify-between items-center bg-gray-800'>
        <h2 className="text-[20px] font-medium text-gray-100">Tus productos seleccionados</h2>
        <button onClick={toggleCart} className="font-bold text-xl text-gray-50 hover:text-[#1b7b7e]"><BiSolidRightArrow /></button>
      </div>
      <div className='w-full md:mt-6 px-[2%] md:px-4 flex flex-col gap-2'>
        {cart.length === 0 ? (
          <p className="mt-20 md:mt-40 text-xl text-center text-gray-700">No tienes productos en tu carrito...</p>
        ) : (
          cart.map((item,i) => (
            <div key={i} className="w-full flex p-1 md:p-2 justify-between items-center rounded-sm bg-gray-100 border border-gray-200">
              <div className='w-[50px] md:w-[70px] h-auto overflow-hidden'>
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  width={70}
                  height={70}
                  className="w-[50px] md:w-[70px] h-auto object-contain"
                />
              </div>
              <div className='flex flex-col md:flex-row w-40 md:w-[60%] md:justify-between pr-2 md:pr-4 gap-2'>
                <div className='flex flex-col text-gray-800'>
                  <span className='pl-1 md:pl-2 text-left font-semibold text-md text-gray-800 truncate'>{item.titulo}</span>
                  <span className='pl-1 md:pl-2 text-left font-light text-sm text-gray-800 truncate'>{item.terminacion}</span>
                </div>
                <div className='flex items-center'>
                  <button 
                    onClick={() => handleDecrement(item)} 
                    disabled={item.quantity === 1} 
                    className={`text-md ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110`}>
                    &ndash;
                  </button> 
                  <span className='mx-2 text-md text-gray-800'>{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrement(item)} 
                    className='text-md text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110'>
                    +
                  </button> 
                </div> 
              </div>
              <span className='md:text-md font-bold text-gray-800 mr-2 md:mr-0'>${(item.precio * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} className='text-red-500 text-2xl md:text-3xl md:mr-4 md:hover:scale-110'><BiTrash /></button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
         <>
         <div className='px-4 mt-6 flex justify-end'>
           <p className='font-bold text-xl text-gray-900'>Total: ${calculateTotal()}</p>
         </div>
       </>
      )}
      {cart.length ? 
       !user ? (
          <div className='mt-10 flex flex-col items-end px-[2%] md:px-4'>
            <p className='text-md md:text-lg text-red-500'>Debes iniciar sesion para procesar la compra.</p>
            <ul className='mt-6 flex gap-2'>
              <li>
                <Link href="/api/auth/login" className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">
                  Iniciar sesion
                </Link>
              </li>
              <li>
                <Link href="/api/auth/login" className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">
                  Registrarte
                </Link>
              </li>
            </ul>
          </div>
        ) : ( 
          <div className='mt-6 flex justify-end px-4'>
            <button className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">Procesar compra</button>
          </div>
        ) 
        : null }
    </div>
  </>
);
};

export default CartDrawer;


