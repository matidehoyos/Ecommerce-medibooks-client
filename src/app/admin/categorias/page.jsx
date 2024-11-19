'use client'
import { useEffect, useState } from 'react';
import { getCategorias, crearCategoria, editarCategoria, eliminarCategoria } from '../../../services/serviceCategoria';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PaginateAdmin from '@/components/admin/PaginateAdmin';
import AdminHeader from '@/components/admin/AdminHeader';
import Loader from '@/components/Loader';

const AdminCategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 27;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      } catch (error) {
        setError('Error loading categories: ' + error.message);
      }
    };
    loadCategorias();
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  },[]);

  const handleOpenForm = () => setOpenForm(!openForm);

  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    try {
      await crearCategoria(nombre);
      const data = await getCategorias();
      setCategorias(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setNombre('');
      setOpenForm(false);
      toast.success('Categoría creada exitosamente');
    } catch (error) {
      setError('Error creating category: ' + error.message);
      toast.error('Error creando categoría');
    }
  };

  const handleEditarCategoria = async (e) => {
    e.preventDefault();
    try {
      await editarCategoria(editandoId, nombre);
      const data = await getCategorias();
      setCategorias(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setNombre('');
      setEditandoId(null);
      setOpenForm(false);
      toast.success('Categoría editada exitosamente');
    } catch (error) {
      setError('Error updating category: ' + error.message);
      toast.error('Error editando categoría');
    }
  };

  const handleEliminarCategoria = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirm) return;
    try {
      await eliminarCategoria(id);
      const data = await getCategorias();
      setCategorias(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      toast.success('Categoría eliminada exitosamente');
    } catch (error) {
      setError('Error deleting category: ' + error.message);
      toast.error('Error eliminando categoría');
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredCategories = categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedCategories(filteredCategories);
    } else {
      setSuggestedCategories([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery('');
  };

  const paginatedCategories = suggestedCategories.length > 0 ? suggestedCategories : categorias;
  const totalPages = Math.ceil(paginatedCategories.length / itemsPerPage);
  const currentItems = paginatedCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
      <AdminHeader name='de categorías'/>
      { loading ? (
          <div className="w-full h-[calc(100vh-60px)]">
            <Loader />
          </div>
        ) : (
        <div className='w-full px-[2%] py-3 h-[calc(100vh-60px)] flex flex-col gap-3'>   
        <div className='w-full px-6 py-3 flex items-strech justify-between bg-white rounded-lg border border-gray-400'>
        <div className='w-full flex justify-between'>
              <form onSubmit={handleSearchSubmit} className="w-[180px] py-1 flex rounded-md bg-gray-200 border border-gray-400">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar categoria..."
                  className="w-full px-4 text-sm md:text-sm text-gray-700 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-700 placeholder:text-sm"
                  autoComplete="off"
                />
                <button type="submit" className="h-full px-2">
                  <FontAwesomeIcon icon={faSearch} className='text-gray-700' />
                </button>
              </form>
              <div className='flex gap-4'>
                <form onSubmit={editandoId ? handleEditarCategoria : handleCrearCategoria} className={`w-auto ${!openForm ? 'hidden' : 'block'} px-3 py-1 flex rounded-lg bg-gray-200`}>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre de la categoría"
                    className="w-[220px] text-sm md:text-sm text-gray-500 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-600 placeholder:text-sm"
                    autoComplete="off"
                    required
                  />
                  <button type="submit" className="bg-[#1b7b7e] hover:bg-[#124749] text-white px-4 rounded">
                    {editandoId ? 'Editar' : 'Crear'}
                  </button>
                  <button onClick={() => handleOpenForm()} className='px-2 text-sm ml-3 bg-gray-300 text-gray-400 rounded-full'>X</button>
                </form>
                <button onClick={() => handleOpenForm()} className='py-1 px-4 text-white rounded-lg bg-[#1b7b7e] hover:bg-[#175254]'>+ Agregar categoría</button>
              </div>
          </div>
        </div>

        <div className="h-full py-2 bg-white rounded-lg border border-gray-400 overflow-y-auto flex flex-col justify-between">
          <div className=" px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {currentItems.map((categoria) => (
              <div 
                key={categoria.id} 
                className="bg-gray-100 border border-gray-400 rounded-md p-2 flex justify-between items-center"
              >
                <span className="font-semibold text-lg text-gray-700">{categoria.nombre}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNombre(categoria.nombre);
                      setEditandoId(categoria.id);
                      setOpenForm(true);
                    }}
                    className="hover:bg-gray-700 text-gray-600 hover:text-white border border-gray-400 py-1 px-2 rounded"
                  >
                    <BiPencil size={18} />
                  </button>
                  <button
                    onClick={() => handleEliminarCategoria(categoria.id)}
                    className="hover:text-white text-lg text-gray-700 hover:bg-red-500 border border-gray-400 py-1 px-2 rounded"
                  >
                    <BiTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <PaginateAdmin currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminCategoriasPage;





