'use client';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { eliminarUser, getUsuarios, updateEstado, updateUserRole } from '../../../services/serviceUser.js';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PaginateAdmin from '@/components/admin/PaginateAdmin.jsx';
import AdminHeader from '@/components/admin/AdminHeader.jsx';
import Loader from '@/components/Loader.jsx';

const AdminUserPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedUsuarios, setSuggestedUsuarios] = useState([]);
    const [filterRole, setFilterRole] = useState('all');
    const [filterEstado, setFilterEstado] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const data = await getUsuarios();
                const filteredByRole = filterRole === 'all' ? data : data.filter(user => user.role === filterRole);
                const filteredByEstado = filterEstado === 'all' ? filteredByRole : filteredByRole.filter(user => (filterEstado === 'activo' ? !user.suspendido : user.suspendido));
                const sortedUsuarios = filteredByEstado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUsuarios(sortedUsuarios);
            } catch (error) {
                toast.error('Error al cargar los usuarios: ' + error.message);
            }
        };
        loadUsuarios();
    }, [filterRole, filterEstado]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsuarios(prevUsuarios =>
                prevUsuarios.map(user => (user.id === userId ? { ...user, role: newRole } : user))
            );
            toast.success('Rol actualizado con éxito');
        } catch (error) {
            toast.error('Error al cambiar el rol: ' + error.message);
        }
    };

    const handleEstadoChange = async (userId, isActive) => {
        const newEstado = isActive === 'activo' ? false : true;
        try {
            await updateEstado(userId, newEstado);
            setUsuarios(prevUsuarios =>
                prevUsuarios.map(user => (user.id === userId ? { ...user, suspendido: newEstado } : user))
            );
            toast.success('Estado de suspensión actualizado');
        } catch (error) {
            toast.error('Error al cambiar el estado: ' + error.message);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if(query) {
            const filteredUsuarios = usuarios.filter((user) =>
                user.username.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestedUsuarios(filteredUsuarios);
        } else {
            setSuggestedUsuarios([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery('');
    };

    const handleEliminarUser = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
        if (confirmDelete) {
            try {
                await eliminarUser(id);
                toast.success("Usuario eliminado exitosamente!"); 
                const data = await getUsuarios();
                const sortedUsuarios = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUsuarios(sortedUsuarios);
            } catch (error) {
                toast.error("Error al eliminar el usuario: " + error.message);
            }
        }
    };

    const paginatedUsuarios = suggestedUsuarios.length > 0 ? suggestedUsuarios : usuarios;
    const totalPages = Math.ceil(paginatedUsuarios.length / itemsPerPage);
    const currentItems = paginatedUsuarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader name='de usuarios'/>
            <div className='w-full h-[calc(100vh-60px)]'>   
                <div className='absolute h-[calc(100vh-60px)] z-20 overflow-hidden'>
                    <Loader />
                </div>
                <div className='w-full h-full px-[2%] py-3 flex flex-col gap-3'>
                    <div className='w-full px-6 py-3 flex items-strech justify-between bg-white rounded-lg border border-gray-400'>
                        <div className='flex gap-3'>
                            <div className='w-auto flex justify-between'>
                            <form onSubmit={handleSearchSubmit} className="w-[160px] pr-2 py-1 flex rounded-md bg-gray-200 border border-gray-400">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Buscar usuario..."
                                    className="w-full px-4 text-sm md:text-sm text-gray-700 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-700 placeholder:text-sm"
                                    autoComplete="off"
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} className='text-gray-700 text-sm' />
                                </button>
                            </form>
                            </div>
                            <div className="w-auto px-4 flex justify-center items-center rounded-md bg-gray-200 border border-gray-400 gap-0">
                                <label htmlFor="" className='text-gray-500 text-sm'>Rol:</label>
                                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className='bg-transparent text-sm font-bold text-gray-600 focus:outline-none focus:ring-0'>
                                    <option value="user">Usuarios</option>
                                    <option value="admin">Admin</option>
                                    <option value="all">Todos</option>
                                </select>
                            </div>
                            <div className="w-auto px-4 flex justify-center items-center rounded-md bg-gray-200 border border-gray-400 gap-0">
                                <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
                                <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)} className='bg-transparent text-sm font-bold text-gray-600 focus:outline-none focus:ring-0'>
                                    <option value="all">Todos</option>
                                    <option value="activo">Activos</option>
                                    <option value="desactivo">Desactivados</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className='py-1 px-4 text-white rounded-lg bg-[#1b7b7e] hover:bg-[#175254]'>+ Agregar usuario</button>
                        </div>
                    </div>
                
                    <div className={`w-full pb-2 h-full bg-white rounded-lg flex flex-col justify-between border border-gray-400`}>
                    <table className='w-full table-fixed text-center'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='px-4 py-2 text-gray-900 w-10'>Id</th>
                                    <th className='px-4 py-2 text-gray-900 w-24'>Imagen</th>
                                    <th className='px-4 py-2 text-gray-900 w-[200px]'>Email</th>
                                    <th className='px-4 py-2 text-gray-900 w-[200px]'>Nombre</th>
                                    <th className='px-4 py-2 text-gray-900 w-24'>Creado</th>
                                    <th className='px-4 py-2 text-gray-900 w-20'>Rol</th>
                                    <th className='px-4 py-2 text-gray-900 w-28'>Estado</th>
                                    <th className='px-4 py-2 text-gray-900 w-20'>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((user) => (
                                    <tr key={user.id} className='border-b'>
                                        <td className='px-4 py-2 text-gray-900'>{user.id}</td>
                                        <td className='px-4 py-2 flex justify-center'>
                                            <Image src={`${user.profilePicture ? user.profilePicture : '/user.png'}`} alt={'Imagen de ' + user.username} width={40} height={40} className="object-cover rounded-full" />
                                        </td>
                                        <td className='px-4 py-2 text-gray-900'>{user.email}</td>
                                        <td className='px-4 py-2 text-gray-900'>{user.username}</td>
                                        <td className='px-4 py-2 text-gray-900'>{user.createdAt.slice(0,10).split('-').reverse().join('/')}</td>
                                        <td className='px-4 py-2 text-gray-900'>
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className='px-2 py-2 text-gray-900 text-center'>
                                            <div className='border border-gray-300 rounded px-2 py-1 flex items-center justify-center'>
                                                <span className={`relative inline h-2 w-2 rounded-full ${!user.suspendido ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                <select
                                                    value={!user.suspendido ? 'activo' : 'desactivo'}
                                                    onChange={(e) => handleEstadoChange(user.id, e.target.value)}
                                                    className=''
                                                >
                                                    <option value="activo">Activo</option>
                                                    <option value="desactivo">Desactivo</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className='h-full px-4'>
                                            <button onClick={() => handleEliminarUser(user.id)} className="p-1 text-center text-xl text-gray-900 border border-gray-400 rounded md:hover:text-white md:hover:bg-red-500">
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
            </div>
        </div>
    );
};

export default AdminUserPage;
