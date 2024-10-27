'use client';
import { useEffect, useState } from 'react';
import { crearLibro, editarLibro, eliminarLibro, getLibros } from '../../../services/serviceLibros';
import { getCategorias } from '@/services/serviceCategoria';
import Image from 'next/image';
import { BiTrash } from 'react-icons/bi';
import SearchBar from '@/components/SeachBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminLibrosPage = () => {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [precioAnterior, setPrecioAnterior] = useState('');
  const [descuento, setDescuento] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const fetchData = async () => {
    try {
      const [libros, categorias] = await Promise.all([getLibros(), getCategorias()]);
      setLibros(libros);
      setCategorias(categorias);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('https://api.imgbb.com/1/upload?key=39742373eb01b1f677990f9eaf224ee2', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.data.url;
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  };

  const handleCrearLibro = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (imagen) {
        imageUrl = await handleImageUpload(imagen);
      }
      await crearLibro({ titulo, autor, categoria, precio, stock, precioAnterior: precioAnterior, descuento, detalle, imagen: imageUrl });
      const data = await getLibros();
      setLibros(data);
      resetForm();
      setError(null);
    } catch (error) {
      setError('Error creating book: ' + error.message);
    }
  };

  const handleEditarLibro = async (e) => {
    e.preventDefault();  
    try {
      let imageUrl = null;
      if (imagen) {
        imageUrl = await handleImageUpload(imagen);
      }
      const libroData = { 
        titulo, 
        autor, 
        categoria, 
        precio, 
        stock, 
        precioAnterior: precioAnterior, 
        descuento, 
        detalle, 
        imagen: imageUrl 
      };
      await editarLibro(editandoId, libroData);
      const data = await getLibros();
      setLibros(data);
      resetForm();
      setEditandoId(null);
      setError(null);
    } catch (error) {
      setError('Error updating book: ' + error.message);
    }
  };
  

  const handleEliminarLibro = async (id) => {
    try {
      await eliminarLibro(id);
      const data = await getLibros();
      setLibros(data);
      setError(null);
    } catch (error) {
      setError('Error deleting book: ' + error.message);
    }
  };

  const resetForm = () => {
    setTitulo('');
    setAutor('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setPrecioAnterior('');
    setDescuento('');
    setDetalle('');
    setImagen(null);
  };

  const handleSelectCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleEditClick = (libro) => {
    setEditandoId(libro.id);
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setCategoria(libro.categoria);  
    setPrecio(libro.precio);
    setStock(libro.stock);
    setPrecioAnterior(libro.precioAnterior);
    setDescuento(libro.descuento);
    setDetalle(libro.detalle);
    setImagen(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredProducts = libros.filter((product) =>
        product.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedProducts(filteredProducts);
    } else {
      setSuggestedProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery('');
  };

  return (
    <div className='w-full h-[100vh] flex flex-col'>
      <div className='w-full sticky top-0 py-2 px-6 bg-gray-900'><h2 className='text-2xl'>Administrador de libros</h2></div>
      <div className="w-full h-[100vh] pt-[40px] px-6 flex justify-center items-start gap-4 text-gray-800 font-bold overflow-hidden">
        <form onSubmit={editandoId ? handleEditarLibro : handleCrearLibro} className="w-[74%] p-4 flex flex-wrap gap-1 bg-gray-400 border border-gray-500 rounded-lg">
          <h3 className="w-full mb-3 text-2xl font-bold">
            {editandoId ? 
              "Editar libro" 
              : "Crear nuevo libro"
             }
          </h3>
          <select
            value={categoria}
            onChange={handleSelectCategoria}
            className="w-full border px-1 py-3 rounded text-gray-800"
            required
          >
            <option value="">Categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del libro"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio"
            className="w-[32%] border p-2 rounded"
            required
          />
          <input
            type="number"
            value={precioAnterior}
            onChange={(e) => setPrecioAnterior(e.target.value)}
            placeholder="Precio Anterior"
            className="w-[33%] border p-2 rounded"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            className="w-[33%] border p-2 rounded"
            required
          />
          <input
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            placeholder="Descuento (%)"
            className="w-full border p-2 rounded"
          />
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Detalles del libro"
            className="w-full h-[150px] border p-2 rounded"
          />
          <div className='w-full p-2 flex items-center rounded bg-white'>
            <label className='text-gray-500'>Imagen:</label>
            <input
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
              className="w-full pl-2 rounded"
            />
          </div>
          <button type="submit" className="mt-3 px-5 py-2 bg-[#1b7b7e] hover:bg-[#145052] text-white text-center rounded">
            {editandoId ? 'Editar Libro' : 'Crear Libro'}
          </button>
        </form>
          <ul className="w-full h-[calc(100vh-130px)] bg-gray-400 rounded-lg border border-gray-500">
              <div className='w-full px-3 py-4 flex justify-start items-center sticky top-0 z-10 rounded-t-lg bg-gray-400 gap-x-6'>
                <h3 className="text-2xl font-bold">Todos los libros:</h3>  
                <form onSubmit={handleSearchSubmit} className="w-[300px] flex border border-gray-500 rounded-md overflow-hidden bg-gray-50">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar libro..."
                    className="w-full py-1 px-2 text-sm md:text-base text-gray-600 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-700"
                    style={{ touchAction: 'manipulation', fontSize: '16px' }} 
                    autoComplete="off"
                  />
                  <button type="submit" className="h-full py-1 px-2 bg-[#115e61] hover:bg-[#0f3a3c]">
                    <FontAwesomeIcon icon={faSearch} className='text-gray-50' />
                  </button>
                 </form>
              </div>
              <div className='w-[98%] h-[85%] py-[20px] mx-auto px-6 overflow-y-scroll rounded-lg bg-gray-00' style={{scrollbarWidth: 'thin'}}>
                  {
                  suggestedProducts.length ? 
                      suggestedProducts.map(libro => (
                          <li key={libro.id} className="flex justify-between items-center bg-gray-100 rounded-lg my-1 p-1 px-3">
                            <Image src={libro.imagen} width={80} height={100} alt='Imagen libro.' className='w-[40px] h-auto object-contain rounded-md' />
                            <span>{libro.titulo}</span>
                            <div className='flex items-center'>
                              <button
                                onClick={() => handleEditClick(libro)}
                                className="mr-2 bg-blue-400 hover:bg-blue-500 text-white p-1 rounded"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleEliminarLibro(libro.id)}
                                className="bg-red-500  hover:bg-red-600 text-2xl text-white p-1 rounded"
                              >
                                <BiTrash />
                              </button>
                            </div>
                          </li>
                        )) : (
                        libros.map((libro) => (
                          <li key={libro.id} className="flex justify-between items-center bg-gray-100 rounded-lg my-1 p-1 px-3">
                            <Image src={libro.imagen} width={80} height={100} alt='Imagen libro.' className='w-[40px] h-auto object-contain rounded-md' />
                            <span>{libro.titulo}</span>
                            <div className='flex items-center'>
                              <button
                                onClick={() => handleEditClick(libro)}
                                className="mr-2 bg-blue-400 hover:bg-blue-500 text-white p-1 rounded"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleEliminarLibro(libro.id)}
                                className="bg-red-500  hover:bg-red-600 text-2xl text-white p-1 rounded"
                              >
                                <BiTrash />
                              </button>
                            </div>
                          </li>
                        )))
                    }
              </div>       
          </ul>
      </div>
    </div>
  );
};

export default AdminLibrosPage;



