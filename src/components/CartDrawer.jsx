'use client';
import React, { useState, useEffect } from 'react';
import { BiSolidRightArrow, BiTrash } from 'react-icons/bi';
import { useCart } from '@/contexts/CartContexts';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { createPaymentPreference } from '@/services/servicePay';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { updateClienteData } from '@/services/serviceCliente';
import Link from 'next/link';
import { obtenerCotizacionEnvio } from '@/services/serviceCotiza';

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, { locale: 'es-AR' });

const CartDrawer = () => {
  const { user } = useUser();
  const { cart, isCartOpen, toggleCart, removeFromCart, addToCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [clienteData, setClienteData] = useState({
    userId: '',
    nombre: '',
    direccion: '',
    piso: '',
    departamento: '',
    provincia: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
    observaciones: '',
  });
  const [envio, setEnvio] = useState('')
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [opcionEnvio, setOpcionEnvio] = useState(null);
  const provincias = [
    { nombre: 'Buenos Aires', codigo: 'AR-B' },
    { nombre: 'Ciudad Autónoma de Buenos Aires', codigo: 'AR-C' },
    { nombre: 'Catamarca', codigo: 'AR-K' },
    { nombre: 'Chaco', codigo: 'AR-H' },
    { nombre: 'Chubut', codigo: 'AR-U' },
    { nombre: 'Córdoba', codigo: 'AR-X' },
    { nombre: 'Corrientes', codigo: 'AR-W' },
    { nombre: 'Entre Ríos', codigo: 'AR-E' },
    { nombre: 'Formosa', codigo: 'AR-P' },
    { nombre: 'Jujuy', codigo: 'AR-Y' },
    { nombre: 'La Pampa', codigo: 'AR-L' },
    { nombre: 'La Rioja', codigo: 'AR-F' },
    { nombre: 'Mendoza', codigo: 'AR-M' },
    { nombre: 'Misiones', codigo: 'AR-N' },
    { nombre: 'Neuquén', codigo: 'AR-Q' },
    { nombre: 'Río Negro', codigo: 'AR-R' },
    { nombre: 'Salta', codigo: 'AR-A' },
    { nombre: 'San Juan', codigo: 'AR-J' },
    { nombre: 'San Luis', codigo: 'AR-D' },
    { nombre: 'Santa Cruz', codigo: 'AR-Z' },
    { nombre: 'Santa Fe', codigo: 'AR-S' },
    { nombre: 'Santiago del Estero', codigo: 'AR-G' },
    { nombre: 'Tierra del Fuego', codigo: 'AR-V' },
    { nombre: 'Tucumán', codigo: 'AR-T' }
  ];
  const pesoTotal = cart.reduce((sum, item) => sum + item.peso, 0);
  const largoTotal = Math.max(...cart.map(item => item.largo));
  const anchoTotal = Math.max(...cart.map(item => item.ancho));
  const altoTotal = cart.reduce((sum, item) => sum + item.alto, 0);
  const tipoEnvio = 'normal';
  
  useEffect(() => {
    if (user) {
      setClienteData(prevData => ({ ...prevData, userId: user.sub,  nombre: user.name, }));
    }
  }, [user]);

  useEffect(() => {
    if (opcionEnvio) {
      localStorage.setItem('correo', opcionEnvio);
    }
  }, [opcionEnvio]);
  

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

  const handlePayment = async () => {
    if (validateForm()) {
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
    }
};

  const handleProcessPurchase = () => {
    setIsFormVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!clienteData.direccion) newErrors.direccion = 'Dirección es obligatoria';
    if (!clienteData.ciudad) newErrors.ciudad = 'Ciudad es obligatoria';
    if (!clienteData.codigoPostal) newErrors.codigoPostal = 'Código postal es obligatorio';
    if (!clienteData.telefono) newErrors.telefono = 'Teléfono es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const cotizacion = await obtenerCotizacionEnvio(
          clienteData.provincia,
          clienteData.codigoPostal,
          pesoTotal,
          largoTotal,
          anchoTotal,
          altoTotal,
          tipoEnvio
        );
          setEnvio({
              aSucursal: cotizacion.paqarClasico.aSucursal,
              aDomicilio: cotizacion.paqarClasico.aDomicilio
          });
        const response = await updateClienteData(clienteData);
        if (response && response.clienteId && response.direccionId) {
          localStorage.setItem('clienteId', response.clienteId);
          localStorage.setItem('direccionId', response.direccionId);
        }
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error al enviar los datos del cliente:', error);
      }
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
        <div className='w-full sticky top-0 p-4 mb-4 flex justify-between items-center bg-gray-800'>
          <h2 className="text-[20px] font-medium text-gray-100">Tus productos seleccionados</h2>
          <button onClick={toggleCart} className="font-bold text-xl text-gray-50 hover:text-[#1b7b7e]">
            <BiSolidRightArrow />
          </button>
        </div>
        <div className='w-full px-[2%] flex flex-col gap-2'>
          {cart.length === 0 ? (
            <p className="mt-20 text-xl text-center text-gray-700">No tienes productos en tu carrito...</p>
          ) : (
            cart.map((item,i) => (
              <div key={i} className="w-full flex p-1 md:p-2 justify-between items-center rounded-md bg-gray-50 border border-gray-200">
                <div className='w-[50px] md:w-[70px] h-auto overflow-hidden'>
                 { item.imagen ?
                  <Image
                    src={item.imagen}
                    alt={item.titulo}
                    width={70}
                    height={70}
                    className="w-[50px] md:w-[70px] h-auto object-contain"
                  /> 
                  : null }
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
        {cart.length > 0 && !envio && (
         <>
         <div className='px-4 mt-6 flex justify-end'>
           <p className='font-bold text-xl text-gray-900'>Subtotal: ${calculateTotal()}</p>
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
             !envio && <div className='mt-6 flex justify-end px-4'>
                  <button onClick={handleProcessPurchase} className="px-3 py-2 text-md font-medium text-gray-50 bg-[#1b7b7e] rounded-md">Procesar compra</button>
                </div>
            ) 
            : null }
            {isFormVisible && (
              <div className="w-[96%] mx-auto mt-6 p-4 bg-white bg-opacity-25 border border-gray-400 rounded-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-700">Datos de envio:</h3>
                <form onSubmit={handleSubmit} className='flex flex-wrap justify-between'>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder='Dirección:'
                      value={clienteData.direccion}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      required
                    />
                  </div>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="piso"
                      name="piso"
                      placeholder='Piso:'
                      value={clienteData.piso}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold`}
                      required
                    />
                  </div>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="departamento"
                      name="departamento"
                      placeholder="Departamento"
                      value={clienteData.departamento}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold`}
                      required
                      />
                  </div>
                  <div className="w-[49.8%]">
                    <select
                      id="provincia"
                      name="provincia"
                      placeholder="Provincia"
                      value={clienteData.provincia}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold`}
                      required
                    >
                      <option value="">-- Selecciona una provincia --</option>
                      {provincias.map((prov, index) => (
                        <option key={index} value={prov.codigo}>
                          {prov.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      placeholder='Ciudad:'
                      value={clienteData.ciudad}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad}</p>}
                  </div>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      placeholder='Código postal:'
                      value={clienteData.codigoPostal}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.codigoPostal && <p className="text-red-500 text-sm">{errors.codigoPostal}</p>}
                  </div>
                  <div className="w-[49.8%]">
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      placeholder='Telefono:'
                      value={clienteData.telefono}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
                  </div>
                  <div className="w-full">
                    <textarea
                      id="observaciones"
                      name="observaciones"
                      placeholder='Observaciones:'
                      value={clienteData.observaciones}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="mt-0 px-4 py-1 bg-[#1b7b7e] text-white rounded-md md:hover:bg-[#084244]">Enviar datos</button>
                </form>
              </div>
            )}
            { envio && (
              <div className='w-full pr-5 pt-6 flex flex-col items-end'>
                <p className='font-bold text-gray-800 text-lg'>Subtotal: <span className='font-medium'>${calculateTotal()}</span></p>
                { !opcionEnvio && <div>
                  <label htmlFor="envio">Selecciona el tipo de envío:</label>
                  <select
                    id="envio"
                    value={opcionEnvio}
                    onChange={(e) => setOpcionEnvio(e.target.value)}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value={envio.aSucursal}>Envío a Sucursal - ${envio.aSucursal}</option>
                    <option value={envio.aDomicilio}>Envío a Domicilio - ${envio.aDomicilio}</option>
                    <option value='0'>Retiro en punto de entrega</option>
                  </select>
                </div> }
                { opcionEnvio && 
                <p className='font-bold text-gray-800 text-lg'>Envio: <span className='font-medium'>${Number(opcionEnvio).toFixed(2)}</span></p> }
                <p className='font-bold text-gray-800 text-lg'>Total: <span className='font-medium'>${Number(calculateTotal()) + Number(opcionEnvio)}</span></p>
                <button onClick={handlePayment}>Generar pago</button>
              </div>
            )}
            <div className='w-full px-[4%] mt-3 flex justify-end'>
                {preferenceId && <div id="wallet_container" className="w-auto"></div>}
            </div>
       </div>
    </>
  );
};

export default CartDrawer;








