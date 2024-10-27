'use client'
import { useEffect, useState } from 'react';
import { getCategorias, crearCategoria, editarCategoria, eliminarCategoria } from '../../../services/serviceCategoria';
import { BiTrash } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminCategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState([]);


  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        setError('Error loading categories: ' + error.message);
      }
    };
    loadCategorias();
  },[]);  


  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    try {
      await crearCategoria(nombre);
      const data = await getCategorias();
      setCategorias(data);
      setNombre('');
      setError(null);
    } catch (error) {
      setError('Error creating category: ' + error.message);
    }
  };

  const handleEditarCategoria = async () => {
    try {
      await editarCategoria(editandoId, nombre);
      const data = await getCategorias();
      setCategorias(data);
      setNombre('');
      setEditandoId(null);
      setError(null); 
    } catch (error) {
      setError('Error updating category: ' + error.message);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await eliminarCategoria(id);
      const data = await getCategorias();
      setCategorias(data);
      setError(null); 
    } catch (error) {
      setError('Error deleting category: ' + error.message);
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


  return (
    <div className='w-full h-auto flex flex-col pb-10'>
      <div className='w-full sticky top-0 py-2 px-6 bg-gray-900'><h2 className='text-2xl'>Administrador de categorías</h2></div>
      <div className="w-full h-auto pt-[40px] px-6 flex flex-col justify-start items-start text-gray-800 font-bold">
        <div className='flex gap-8'>
          <form onSubmit={editandoId ? handleEditarCategoria : handleCrearCategoria} className="p-4 bg-gray-400 rounded-lg border border-gray-500">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            className="w-[280px] border p-2 rounded focus:outline-none focus:ring-0"
            required
          />
          <button type="submit" className="ml-2 bg-[#1b7b7e] hover:bg-[#124749] text-white p-2 rounded">
            {editandoId ? 'Editar Categoría' : 'Crear Categoría'}
          </button>
          </form>
          <form onSubmit={handleSearchSubmit} className="w-auto p-4 bg-gray-400 rounded-lg border border-gray-500">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar categoria..."
                    className="w-[300px] p-2 rounded-l focus:outline-none focus:ring-0"
                    style={{ touchAction: 'manipulation', fontSize: '16px' }} 
                    autoComplete="off"
                  />
                  <button type="submit" className="bg-[#1b7b7e] hover:bg-[#124749] text-white p-2 rounded-r">
                    <FontAwesomeIcon icon={faSearch} className='text-gray-50' />
                  </button>
          </form>
        </div>
        <ul className="w-full mt-4 p-4 flex flex-wrap justify-between bg-gray-400 rounded-lg border border-gray-500">
          {
            suggestedCategories.length ? 
            suggestedCategories.map(categoria => (
              <li key={categoria.id} className="w-[49.5%] my-1 py-1 px-2 flex justify-between items-center bg-gray-50 rounded-md border border-gray-400">
                <span>{categoria.nombre}</span>
                <div className='flex'>
                  <button
                    onClick={() => {
                      setNombre(categoria.nombre);
                      setEditandoId(categoria.id);
                    }}
                    className="mr-2 bg-blue-400 hover:bg-blue-600 text-white p-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarCategoria(categoria.id)}
                    className="bg-red-400 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    <BiTrash />
                  </button>
                </div>
              </li>            
            )) :
           categorias.map((categoria) => (
              <li key={categoria.id} className="w-[49.5%] my-1 py-1 px-2 flex justify-between items-center bg-gray-50 rounded-md border border-gray-400">
                <span>{categoria.nombre}</span>
                <div className='flex'>
                  <button
                    onClick={() => {
                      setNombre(categoria.nombre);
                      setEditandoId(categoria.id);
                    }}
                    className="mr-2 bg-blue-400 hover:bg-blue-600 text-white p-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarCategoria(categoria.id)}
                    className="bg-red-400 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    <BiTrash />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCategoriasPage;

