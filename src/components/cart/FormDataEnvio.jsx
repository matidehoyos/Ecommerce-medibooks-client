'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { provincias } from '@/utils/provincias';
import { obtenerCotizacionEnvio } from "@/services/serviceCotiza";
import { updateClienteData } from "@/services/serviceCliente";
import { useCart } from "@/contexts/CartContexts";
import { BiSolidTruck } from "react-icons/bi";


const FormDataEnvio = ({setIsFormVisible, setEnvio}) => {
    const { user } = useUser();
    const { cart } = useCart();
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
      const [errors, setErrors] = useState({});
      const [loader, setLoader] = useState(false);
      const pesoTotal = cart.reduce((sum, item) => sum + item.peso, 0);

      useEffect(() => {
        if (user) {
          setClienteData(prevData => ({ ...prevData, userId: user.sub,  nombre: user.name, }));
        }
      }, [user]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setClienteData({ ...clienteData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          try {
            setLoader(true);
            const cotizacion = await obtenerCotizacionEnvio(
              clienteData.provincia,
              clienteData.codigoPostal,
              pesoTotal
            );
            const response = await updateClienteData(clienteData);
            if (response && response.clienteId && response.direccionId) {
              localStorage.setItem('clienteId', response.clienteId);
              localStorage.setItem('direccionId', response.direccionId);
            }
            setIsFormVisible(false);
            const timeout = setTimeout(() => setLoader(false), 4000);
            setEnvio({
                aSucursal: cotizacion.paqarClasico.aSucursal,
                aDomicilio: cotizacion.paqarClasico.aDomicilio
            });
            return () => clearTimeout(timeout);
          } catch (error) {
            console.error('Error al enviar los datos del cliente:', error);
          }
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!clienteData.direccion) newErrors.direccion = 'Dirección es obligatoria';
        if (!clienteData.provincia) newErrors.provincia = 'Provincia es obligatoria';
        if (!clienteData.ciudad) newErrors.ciudad = 'Ciudad es obligatoria';
        if (!clienteData.codigoPostal) newErrors.codigoPostal = 'Código postal es obligatorio';
        if (!clienteData.telefono) newErrors.telefono = 'Teléfono es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


    return (
      <>
        { loader ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-2xl text-gray-600 font-semibold">Cotizando envío</p>
            <p><BiSolidTruck size={46} className="mt-4 text-gray-600 animate-bounce" /></p>
          </div>
        ) : (
          <div className="w-[96%] mx-auto mt-6 p-4 bg-white bg-opacity-25 border border-gray-400 rounded-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">Datos de envio:</h3>
              <form onSubmit={handleSubmit} className='flex flex-wrap justify-between'>
                  <div className="w-[49.8%]">
                  <select
                      id="provincia"
                      name="provincia"
                      placeholder="Provincia"
                      value={clienteData.provincia}
                      onChange={handleChange}
                      className={`w-full mt-1 py-[6px] px-1 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 text-gray-600 font-semibold`}
                      required
                  >
                      <option value="">Provincia:</option>
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
                      id="direccion"
                      name="direccion"
                      placeholder='Dirección:'
                      value={clienteData.direccion}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold ${errors.direccion ? 'border-red-500' : ''}`}
                      required
                  />
                  </div>
                  <div className="w-[24.8%]">
                  <input
                      type="text"
                      id="piso"
                      name="piso"
                      placeholder='Piso:'
                      value={clienteData.piso}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold`}
                  />
                  </div>
                  <div className="w-[24.8%]">
                  <input
                      type="text"
                      id="departamento"
                      name="departamento"
                      placeholder="Departamento:"
                      value={clienteData.departamento}
                      onChange={handleChange}
                      className={`w-full mt-1 py-1 px-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-semibold`}
                      />
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
                      rows="1"
                  ></textarea>
                  </div>
                  <button type="submit" className="mt-0 px-4 py-1 bg-[#1b7b7e] text-white rounded-md md:hover:bg-[#084244]">Enviar datos</button>
              </form>
          </div>
        )}
      </>
    );
  };
  
  export default FormDataEnvio;