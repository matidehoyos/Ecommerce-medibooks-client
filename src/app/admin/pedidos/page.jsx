'use client';
import React, { useEffect, useState } from 'react';
import { getPedidos, updatePedidoEstado } from '../../../services/servicePedidos.js';
import { toast } from 'react-toastify';
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
import Image from 'next/image.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PaginateAdmin from '@/components/admin/PaginateAdmin.jsx';
import AdminHeader from '@/components/admin/AdminHeader.jsx';
import Loader from '@/components/Loader.jsx';

const AdminPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedPedido, setSuggestedPedido] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterEstado, setFilterEstado] = useState('all');
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 7;

  useEffect(() => {
    fetchPedidos();
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
        const filteredPedido = pedidos.filter(pedido =>
            pedido.cliente.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestedPedido(filteredPedido);
    } else {
        setSuggestedPedido([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery('');
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
  

  return (
    <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
        <AdminHeader name='de pedidos'/>
        { loading ? (
          <div className="w-full h-[calc(100vh-60px)]">
            <Loader />
          </div>
        ) : (
        <div className='w-full px-[2%] py-3 h-[calc(100vh-60px)] flex flex-col gap-3'>   
          <div className='w-full px-6 py-3 flex items-strech justify-between bg-white rounded-lg border border-gray-400'>
            <div className='flex gap-3'>
            <div className='w-auto flex justify-between'>
              <form onSubmit={handleSearchSubmit} className="w-[160px] px-3 py-1 flex rounded-md bg-gray-200 border border-gray-400">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar pedido..."
                  className="w-full text-sm text-gray-700 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-700 placeholder:text-sm"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} className='text-gray-700 text-sm' />
                </button>
              </form>
            </div>
            <div className="w-auto px-4 flex justify-center items-center rounded-md bg-gray-200 border border-gray-400 gap-0">
              <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
              <select 
                value={filterEstado} 
                onChange={(e) => setFilterEstado(e.target.value)} 
                className='bg-transparent text-sm font-bold text-gray-600 focus:outline-none focus:ring-0'>
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

        <div className='w-full h-full pb-4 bg-white rounded-md flex flex-col justify-between border border-gray-400'>
          <table className='w-full table-fixed text-center relative'>
            <thead className='text-gray-950'>
              <tr className="border-b border-gray-200">
                <th className="w-20 px-4 py-2">Id</th>
                <th className="px-4 py-2">Venta Id</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="w-60 px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Cant prod</th>
                <th className="px-4 py-2">Estado</th>
                <th className="w-28 px-4 py-2">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPedidos.map((pedido) => (
                <React.Fragment key={`pedido-group-${pedido.id}`}>
                  <tr className="text-center text-gray-900 border-b border-t border-gray-300 bg-white">
                    <td className="p-2">{pedido.id}</td>
                    <td className="p-2">{pedido.ventaId}</td>
                    <td className="p-2">{pedido.createdAt.slice(5,10).split('-').reverse().join('/')  + " " + pedido.createdAt.slice(11,16)}hs</td>
                    <td className="p-2">{pedido.cliente.nombre}</td>
                    <td className="p-2">{pedido.totalItems}</td>
                    <td className="p-2">
                      <select
                        value={pedido.estado}
                        onChange={(e) => handleUpdateEstado(pedido.id, e.target.value)}
                        className={`border border-gray-400 rounded p-1 focus:outline-none focus:ring-0 ${pedido.estado === 'pendiente' ? 'bg-red-200' : pedido.estado === 'procesando' ? 'bg-blue-200' : pedido.estado === 'enviado' ? 'bg-yellow-200' : pedido.estado === 'entregado' ? 'bg-green-200' : 'bg-gray-200'}`}
                      >
                        <option className='bg-white' value="pendiente">Pendiente</option>
                        <option className='bg-white' value="procesando">Procesando</option>
                        <option className='bg-white' value="enviado">Enviado</option>
                        <option className='bg-white' value="entregado">Entregado</option>
                        <option className='bg-white' value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleViewDetails(pedido)}
                        className="text-white p-1 bg-gray-600 rounded"
                      >
                        {selectedPedido && selectedPedido.id === pedido.id ? <BiArrowToTop /> : <BiArrowToBottom />}
                      </button>
                    </td>
                  </tr>
                  {selectedPedido && selectedPedido.id === pedido.id ? (
                        <tr>
                          <td colSpan="7" className="p-0">
                            <div
                              className="absolute left-0 w-full z-10 bg-gray-200 border border-gray-400"
                              style={{ minWidth: '100%' }}
                            >
                              <div className="w-full px-3 py-3 flex flex-row-reverse items-center gap-2">
                                <div className={`w-2/6 h-full flex flex-col`}>
                                        <p className="font-semibold text-sm text-left inline">Nombre: <span className='font-medium'>{pedido.cliente.nombre}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Email: <span className='font-medium'>{pedido.cliente.email}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Tel: <span className='font-medium'>{pedido.cliente.telefono}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Ciudad: <span className='font-medium'>{pedido.direccion.ciudad}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Dir: <span className='font-medium'>{pedido.direccion.direccion}</span></p>
                                        <div className='flex gap-4'>
                                          <p className="font-semibold text-sm text-left inline">Piso: <span className='font-medium'>{pedido.direccion.piso}</span></p>
                                          <p className="font-semibold text-sm text-left inline">Dto: <span className='font-medium'>{pedido.direccion.departamento}</span></p>
                                        </div>
                                        <p className="font-semibold text-sm text-left inline">C.P: <span className='font-medium'>{pedido.direccion.codigoPostal}</span></p>
                                        <p className="font-semibold text-sm text-left inline">Info: <span className='font-medium'>{pedido.direccion.observacion}</span></p>
                                </div>
                                <div className={`w-full md:w-4/6 h-full mx-auto`}>
                                  <table className="w-full bg-white h-full border border-gray-400">
                                    <thead className="text-gray-900 text-sm border-b border-gray-200">
                                      <tr>
                                        <th className="w-8 px-1 py-2">Id</th>
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
          <PaginateAdmin currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
        )}
    </div>
  );
};

export default AdminPedidosPage;




