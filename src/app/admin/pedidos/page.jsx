'use client';
import React, { useEffect, useState } from 'react';
import { getPedidos, updatePedidoEstado } from '../../../services/servicePedidos.js';
import { toast } from 'react-toastify';
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
import Image from 'next/image.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterEstado, setFilterEstado] = useState('all');
  const itemsPerPage = 7;

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch {
      toast.error('Error al cargar pedidos');
    }
  };

  const handleViewDetails = (pedido) => {
    if (selectedPedido && selectedPedido.id === pedido.id) {
      setSelectedPedido(null);
    } else {
      setSelectedPedido(pedido);
    }
  };

  const handleUpdateEstado = async (pedidoId, newEstado) => {
    try {
      await updatePedidoEstado(pedidoId, newEstado);
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, estado: newEstado } : pedido
        )
      );
      toast.success('Estado del pedido actualizado');
    } catch {
      toast.error('Error al actualizar el estado');
    }
  };

  const filteredPedidos = pedidos.filter(pedido =>
    filterEstado === 'all' || pedido.estado === filterEstado
  );

  const paginatedPedidos = filteredPedidos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);

  const calculateTotal = () => {
    if (!selectedPedido || !Array.isArray(selectedPedido.DetallePedidos)) return "0.00";
    const total = selectedPedido.DetallePedidos.reduce((sum, detalle) => sum + Number(detalle.subtotal), 0);
    return total;
  };
  
  console.log(selectedPedido)

  return (
    <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
      <div className='w-full h-[60px] sticky top-0 px-[3%] flex items-center justify-start bg-gray-50 border-b border-gray-200'>
        <h2 className='text-gray-500 font-semibold text-2xl font-sans'>Administrador de pedidos</h2>
      </div>
      <div className='w-full px-[3%] py-5 h-[calc(100vh-60px)] flex flex-col gap-4'> 
        <div className='w-full px-6 py-4 flex items-stretch justify-between gap-3 bg-gray-50 rounded-xl'>
          <div className='flex gap-3'>
            <div className='w-auto flex justify-between'>
              <form className="w-auto px-3 py-1 flex rounded-lg bg-gray-200">
                <input
                  type="text"
                  placeholder="Buscar pedido..."
                  className="w-[180px] text-sm text-gray-500 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                </button>
              </form>
            </div>
            <div className="w-auto px-4 flex justify-center items-center rounded-lg bg-gray-200 gap-0">
              <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
              <select 
                value={filterEstado} 
                onChange={(e) => setFilterEstado(e.target.value)} 
                className='bg-transparent text-sm font-bold text-gray-500 focus:outline-none focus:ring-0'>
                <option value="all">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="procesando">Procesando</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
        <div className='w-full h-full pb-4 bg-gray-50 rounded-lg flex flex-col justify-between overflow-hidden'>
          <table className='w-full table-fixed text-center relative'>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-700">
                <th className="w-20 px-4 py-2 text-gray-50">Id</th>
                <th className="px-4 py-2 text-gray-50">Venta Id</th>
                <th className="px-4 py-2 text-gray-50">Fecha</th>
                <th className="w-60 px-4 py-2 text-gray-50">Cliente</th>
                <th className="px-4 py-2 text-gray-50">Cant prod</th>
                <th className="px-4 py-2 text-gray-50">Estado</th>
                <th className="w-28 px-4 py-2 text-gray-50">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPedidos.map((pedido) => (
                <React.Fragment key={`pedido-group-${pedido.id}`}>
                  <tr className="text-center border-b border-t border-gray-300 bg-white">
                    <td className="p-2">{pedido.id}</td>
                    <td className="p-2">{pedido.ventaId}</td>
                    <td className="p-2">{pedido.createdAt.slice(5,10).split('-').reverse().join('/')  + " " + pedido.createdAt.slice(11,16)}</td>
                    <td className="p-2">{pedido.cliente.nombre}</td>
                    <td className="p-2">{pedido.totalItems}</td>
                    <td className="p-2">
                      <select
                        value={pedido.estado}
                        onChange={(e) => handleUpdateEstado(pedido.id, e.target.value)}
                        className={`border border-gray-400 rounded p-1 focus:outline-none focus:ring-0 ${pedido.estado === 'pendiente' ? 'bg-red-200' : pedido.estado === 'procesando' ? 'bg-blue-200' : pedido.estado === 'enviado' ? 'bg-yellow-200' : pedido.estado === 'entregado' ? 'bg-green-200' : 'bg-gray-200'}`}
                      >
                        <option className='bg-gray-50' value="pendiente">Pendiente</option>
                        <option className='bg-gray-50' value="procesando">Procesando</option>
                        <option className='bg-gray-50' value="enviado">Enviado</option>
                        <option className='bg-gray-50' value="entregado">Entregado</option>
                        <option className='bg-gray-50' value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleViewDetails(pedido)}
                        className="text-gray-600 p-1 border border-gray-400 bg-white rounded"
                      >
                        {selectedPedido && selectedPedido.id === pedido.id ? <BiArrowToTop /> : <BiArrowToBottom />}
                      </button>
                    </td>
                  </tr>
                  {selectedPedido && selectedPedido.id === pedido.id ? (
                        <tr>
                          <td colSpan="7" className="p-0">
                            <div
                              className="absolute left-0 w-full z-10 bg-gray-200"
                              style={{ minWidth: '100%' }}
                            >
                              <div className="w-full px-3 py-2 flex flex-row-reverse items-start gap-2">
                                <div className={`w-2/6 flex flex-col`}>
                                        <p className="font-semibold text-sm text-left inline">Nombre: <span className='font-medium'>{pedido.cliente.nombre}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Email: <span className='font-medium'>{pedido.cliente.email}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Tel: <span className='font-medium'>{pedido.cliente.telefono}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Ciudad: <span className='font-medium'>{pedido.direccion.ciudad}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Dir: <span className='font-medium'>{pedido.direccion.direccion}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Piso: <span className='font-medium'>{pedido.direccion.piso}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Dto: <span className='font-medium'>{pedido.direccion.departamento}</span></p>
                                        <p className="font-semibold text-sm text-left inline">C.P: <span className='font-medium'>{pedido.direccion.codigoPostal}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Info: <span className='font-medium'>{pedido.direccion.observacion}</span></p>
                                </div>
                                <div className={`w-full md:w-4/6 mx-auto`}>
                                  <table className="w-full bg-white border border-gray-400">
                                    <thead className=" text-gray-50 text-sm bg-gray-600">
                                      <tr>
                                        <th className="w-8 px-1 py-1">Id</th>
                                        <th className="w-14 py-1">Img</th>
                                        <th className="w-40 text-left py-1 truncate">Producto</th>
                                        <th className="w-32 py-1">Terminación</th>
                                        <th className="w-10 py-1">Cant</th>
                                        <th className="w-20 py-1">Precio</th>
                                        <th className="w-20 py-1">Subtotal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedPedido.DetallePedidos.map((detalle, index) => (
                                        <tr key={index} className="border-b">
                                          <td className="text-center">{detalle.productId}</td>
                                          <td className="py-1">
                                            <Image
                                              src={detalle.Book.imagen}
                                              alt={detalle.title}
                                              width={28}
                                              height={36}
                                              className="object-cover mx-auto rounded"
                                            />
                                          </td>
                                          <td className="text-left text-sm">{detalle.title}</td>
                                          <td className="text-sm">{detalle.terminacion}</td>
                                          <td>{detalle.quantity}</td>
                                          <td>${detalle.unitPrice}</td>
                                          <td>${detalle.subtotal}</td>
                                        </tr>
                                      ))}
                                      <tr>
                                        <td colSpan="6" className="text-right font-semibold py-2 pr-4 text-gray-700">Total:</td>
                                        <td className="text-center font-bold text-gray-700">${calculateTotal().toFixed(2)}</td>
                                      </tr>                                  
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          { totalPages > 1 ? (
                <div className='flex justify-center'>
                        {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'text-gray-600'}`}
                        >
                            {index + 1}
                        </button>
                        ))}
                </div> 
            ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default AdminPedidosPage;




