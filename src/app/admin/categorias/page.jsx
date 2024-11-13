'use client'
import { useEffect, useState } from 'react';
import { getCategorias, crearCategoria, editarCategoria, eliminarCategoria } from '../../../services/serviceCategoria';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AdminCategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

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

  const handleEditarCategoria = async () => {
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
      <div className='w-full h-[60px] sticky top-0 px-[3%] flex items-center justify-start bg-gray-50 border-b border-gray-200'>
        <h2 className='text-gray-500 font-semibold text-2xl font-sans'>Administrador de categorías</h2>
      </div>

      <div className='w-full px-[3%] py-5 h-[calc(100vh-60px)] flex flex-col gap-4'> 
        <div className='w-full px-6 py-4 flex items-stretch justify-between bg-gray-50 rounded-xl'>
          <div className='w-full flex justify-between'>
            <form onSubmit={handleSearchSubmit} className="w-auto px-3 py-1 flex rounded-lg bg-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar categoria..."
                className="w-[180px] text-sm md:text-sm text-gray-500 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                autoComplete="off"
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
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
                <button onClick={() =>{setOpenForm(false)}} className='px-2 text-sm ml-3 bg-gray-300 text-gray-400 rounded-full'>X</button>
              </form>
              <button onClick={() => handleOpenForm()} className='py-1 px-4 text-white rounded-lg bg-[#1b7b7e] hover:bg-[#175254]'>+ Agregar categoría</button>
            </div>
          </div>
        </div>

        <div className="h-full p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-50 rounded-lg">
          {currentItems.map((categoria) => (
            <div key={categoria.id} className="h-[48px] bg-white border border-gray-300 rounded-lg p-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-700">{categoria.nombre}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNombre(categoria.nombre);
                      setEditandoId(categoria.id);
                      setOpenForm(true);
                    }}
                    className="bg-gray-200 hover:bg-[#1b7b7e] text-gray-600 hover:text-white border border-gray-300 py-1 px-2 rounded text-sm"
                  >
                    <BiPencil className='inline' />Editar
                  </button>
                  <button
                    onClick={() => handleEliminarCategoria(categoria.id)}
                    className="hover:text-red-500 text-lg text-gray-700"
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
  );
};

export default AdminCategoriasPage;





