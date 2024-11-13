'use client';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { eliminarVenta, getVentas } from '../../../services/serviceVentas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AdminVentasPage = () => {
    const [ventas, setVentas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedVentas, setSuggestedVentas] = useState([]);
    const [filterEstado, setFilterEstado] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

console.log(ventas)

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
    }, [filterEstado]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filteredVentas = ventas.filter(venta =>
                venta.transactionId.toLowerCase().includes(query.toLowerCase())
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
            <div className='w-full h-[60px] sticky top-0 px-[3%] flex items-center justify-start bg-gray-50 border-b border-gray-200'>
                <h2 className='text-gray-500 font-semibold text-2xl font-sans'>Administrador de ventas</h2>
            </div>
            <div className='w-full px-[3%] py-5 h-[calc(100vh-60px)] flex flex-col gap-4'> 
                <div className='w-full px-6 py-4 flex items-stretch justify-between gap-3 bg-gray-50 rounded-xl'>
                    <div className='flex gap-3'>
                        <div className='w-auto flex justify-between'>
                            <form onSubmit={handleSearchSubmit} className="w-auto px-3 py-1 flex rounded-lg bg-gray-200">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Buscar venta..."
                                    className="w-[180px] text-sm text-gray-500 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                                    autoComplete="off"
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                                </button>
                            </form>
                        </div>
                        <div className="w-auto px-4 flex justify-center items-center rounded-lg bg-gray-200 gap-0">
                            <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
                            <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className='bg-transparent text-sm font-bold text-gray-500 focus:outline-none focus:ring-0'>
                                <option value="all">Todos</option>
                                <option value="completed">Completadas</option>
                                <option value="pending">Pendientes</option>
                                <option value="cancelled">Canceladas</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full pb-4 bg-gray-50 rounded-lg flex flex-col justify-between'>
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
                                    <td className='px-4 py-2 text-gray-700'>{venta.id}</td>
                                    <td className='px-4 py-2 text-gray-700'>{venta.transactionId}</td>
                                    <td className='px-4 py-2 text-gray-700'>{venta.createdAt.slice(5,10).split('-').reverse().join('/')  + " " + venta.createdAt.slice(11,16)}</td>
                                    <td className='px-4 py-2 text-gray-700 truncate'>{venta.User.username}</td>
                                    <td className='px-4 py-2 text-gray-700'>{venta.paymentMethod}</td>
                                    <td className='px-4 py-2 text-gray-700'>${venta.totalAmount}</td>
                                    <td className='px-4 py-2 text-gray-700'>{venta.status}</td>
                                    <td className='h-full px-4'>
                                        <button onClick={() => handleEliminarVenta(venta.id)} className="text-center text-xl text-gray-700 hover:text-red-500">
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
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

export default AdminVentasPage;
