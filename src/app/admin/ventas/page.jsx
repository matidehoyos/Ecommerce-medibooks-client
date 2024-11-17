'use client';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { eliminarVenta, getVentas } from '../../../services/serviceVentas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PaginateAdmin from '@/components/admin/PaginateAdmin.jsx';
import AdminHeader from '@/components/admin/AdminHeader.jsx';
import Loader from '@/components/Loader.jsx';

const AdminVentasPage = () => {
    const [ventas, setVentas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedVentas, setSuggestedVentas] = useState([]);
    const [filterEstado, setFilterEstado] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVentas = async () => {
            try {
                const data = await getVentas();
                const filteredByEstado = filterEstado === 'all' ? data : data.filter(venta => venta.status === filterEstado);
                setVentas(filteredByEstado);
            } catch (error) {
                toast.error('Error al cargar las ventas: ' + error.message);
            }
        };
        loadVentas();
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, [filterEstado]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filteredVentas = ventas.filter(venta =>
                venta.User.username.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestedVentas(filteredVentas);
        } else {
            setSuggestedVentas([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery('');
    };

    const handleEliminarVenta = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta venta?");
        if (confirmDelete) {
            try {
                await eliminarVenta(id);
                toast.success("Venta eliminada exitosamente!");
                const data = await getVentas();
                setVentas(data);
            } catch (error) {
                toast.error("Error al eliminar la venta: " + error.message);
            }
        }
    };

    const paginatedVentas = suggestedVentas.length > 0 ? suggestedVentas : ventas;
    const totalPages = Math.ceil(paginatedVentas.length / itemsPerPage);
    const currentItems = paginatedVentas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader name='de ventas'/>
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
                                    placeholder="Buscar venta..."
                                    className="w-full text-sm text-gray-700 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-700 placeholder:text-sm"
                                    autoComplete="off"
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} className='text-gray-700 text-sm' />
                                </button>
                            </form>
                        </div>
                        <div className="w-auto px-4 flex justify-center items-center rounded-md bg-gray-200 border border-gray-400 gap-0">
                            <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
                            <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className='bg-transparent text-sm font-bold text-gray-600 focus:outline-none focus:ring-0'>
                                <option value="all">Todos</option>
                                <option value="completed">Completadas</option>
                                <option value="pending">Pendientes</option>
                                <option value="cancelled">Canceladas</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className='w-full h-full pb-2 bg-white rounded-md flex flex-col justify-between border border-gray-400'>
                    <table className='w-full table-fixed text-center'>
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='w-10 px-4 py-2 text-gray-900'>ID</th>
                                <th className='px-4 py-2 text-gray-900'>Transacción</th>
                                <th className='px-4 py-2 text-gray-900 w-40'>Fecha</th>
                                <th className='px-4 py-2 text-gray-900'>Cliente</th>
                                <th className='px-4 py-2 text-gray-900'>Método de Pago</th>
                                <th className='px-4 py-2 text-gray-900 w-32'>Monto</th>
                                <th className='px-4 py-2 text-gray-900 w-32'>Estado</th>
                                <th className='px-4 py-2 text-gray-900 w-32'>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((venta) => (
                                <tr key={venta.id} className='border-b'>
                                    <td className='px-4 py-2 text-gray-900'>{venta.id}</td>
                                    <td className='px-4 py-2 text-gray-900'>{venta.transactionId}</td>
                                    <td className='px-4 py-2 text-gray-900'>{venta.createdAt.slice(5,10).split('-').reverse().join('/')  + " " + venta.createdAt.slice(11,16)}</td>
                                    <td className='px-4 py-2 text-gray-900 truncate'>{venta.User.username}</td>
                                    <td className='px-4 py-2 text-gray-900'>{venta.paymentMethod}</td>
                                    <td className='px-4 py-2 text-gray-900'>${venta.totalAmount}</td>
                                    <td className='px-4 py-2 text-gray-900'>{venta.status}</td>
                                    <td className='h-full px-4'>
                                        <button onClick={() => handleEliminarVenta(venta.id)} className="text-center text-xl text-gray-700 hover:text-red-500">
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
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

export default AdminVentasPage;
