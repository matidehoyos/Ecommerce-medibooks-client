'use client';
import { useEffect, useState } from 'react';
import { crearLibro, editarLibro, eliminarLibro, getLibros } from '../../../services/serviceLibros';
import { getCategorias } from '@/services/serviceCategoria';
import Image from 'next/image';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

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
  const [peso, setPeso] = useState('');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [formOpen, setFormOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(''); 
  const [order, setOrder] = useState('asc');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos'); 


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
      await crearLibro({ titulo, autor, categoria, precio, stock, precioAnterior: precioAnterior, descuento, peso, largo, ancho, alto, detalle, imagen: imageUrl });
      toast.success("Libro creado exitosamente!");
      const data = await getLibros();
      setLibros(data);
      resetForm();
      setError(null);
    } catch (error) {
      setError('Error creating book: ' + error.message);
      toast.error("Error al crear el libro."); 
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
        peso,
        largo,
        ancho,
        alto,
        detalle, 
        imagen: imageUrl 
      };
      await editarLibro(editandoId, libroData);
      toast.success("Libro editado exitosamente!");
      const data = await getLibros();
      setLibros(data);
      resetForm();
      setEditandoId(null);
      setError(null);
    } catch (error) {
      setError('Error updating book: ' + error.message);
      toast.error("Error al editar el libro " + error);
    }
  };
  
  const handleEliminarLibro = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este libro?");
    if (confirmDelete) {
    try {
      await eliminarLibro(id);
      toast.success("Libro eliminado exitosamente!"); 
      const data = await getLibros();
      setLibros(data);
      setError(null);
    } catch (error) {
      setError('Error deleting book: ' + error.message);
      toast.error("Error al eliminar el libro." + error); 
    }
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
    setPeso('');
    setLargo('');
    setAncho('');
    setAlto('');
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
    setPeso(libro.peso);
    setLargo(libro.largo);
    setAncho(libro.ancho);
    setAlto(libro.alto);
    setImagen(libro.imagen);
    setFormOpen(!formOpen)
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

  const handleOpenForm = () => {
    setFormOpen(!formOpen)
  }

  const handleActiveChange = async (id, isActive) => {
    try {
      await editarLibro(id, { active: isActive });
      setLibros((prevLibros) =>
        prevLibros.map((libro) =>
          libro.id === id ? { ...libro, active: isActive } : libro
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del libro:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };
  
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };
  
  const filterBooks = () => {
    let filteredBooks = [...libros];
    if (estadoFiltro === 'Activos') {
      filteredBooks = filteredBooks.filter(libro => libro.active === true);
    } else if (estadoFiltro === 'Desactivos') {
      filteredBooks = filteredBooks.filter(libro => libro.active === false);
    }
    if (filterCriteria === 'stock') {
      filteredBooks = filteredBooks.sort((a, b) => order === 'asc' ? a.stock - b.stock : b.stock - a.stock); 
    }
    if (filterCriteria === 'precio') {
      filteredBooks.sort((a, b) => order === 'asc' ? a.precio - b.precio : b.precio - a.precio);
    }
    if (filterCriteria === 'fecha') {
      filteredBooks.sort((a, b) => order === 'asc' 
        ? new Date(a.createdAt) - new Date(b.createdAt) 
        : new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return filteredBooks;
  };
  
  
  
  
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = suggestedProducts.length ? suggestedProducts.slice(indexOfFirstBook, indexOfLastBook) : filterBooks().slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil((suggestedProducts.length ? suggestedProducts.length : libros.length) / booksPerPage);


  return (
    <div className='w-full h-[100vh] flex flex-col'>
        <div className='w-full h-[60px] sticky top-0 px-[3%] flex items-center justify-start bg-gray-50 border-b border-gray-200'>
          <h2 className='text-gray-500 font-semibold text-2xl font-sans'>Administrador de libros</h2>
        </div>

        <div className='w-full px-[3%] py-5 h-[calc(100vh-60px)]  flex flex-col gap-4'>   
          <div className='w-full px-6 py-4 flex items-strech justify-between bg-gray-50 rounded-xl'>
            <div className='flex gap-3'>
              <form onSubmit={handleSearchSubmit} className="w-[180px] py-1 flex rounded-lg bg-gray-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar libro..."
                  className="w-full px-4 text-sm md:text-sm text-gray-500 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                  style={{ touchAction: 'manipulation', fontSize: '16px' }} 
                  autoComplete="off"
                />
                <button type="submit" className="h-full px-2">
                  <FontAwesomeIcon icon={faSearch} className='text-gray-500 text-sm' />
                </button>
              </form>
              <div className="w-auto px-4 flex justify-center items-center rounded-lg bg-gray-200 gap-0">
                <label htmlFor="" className='text-gray-500 text-sm'>Estado:</label>
                <select 
                  onChange={(e) => setEstadoFiltro(e.target.value)} 
                  className='bg-transparent text-sm font-bold text-gray-500 focus:outline-none focus:ring-0'
                >
                  <option value="Todos">Todos</option>
                  <option value="Activos">Activos</option>
                  <option value="Desactivos">Desactivos</option>
                </select>
              </div>
              <div className="w-auto px-4 flex justify-center items-center rounded-lg bg-gray-200 gap-0">
                <label htmlFor="" className='text-gray-500 text-sm'>Filtrar por:</label>
                <select 
                    onChange={handleFilterChange} 
                    className='bg-transparent text-sm font-bold text-gray-500 focus:outline-none focus:ring-0'
                  >
                    <option value="stock">Stock</option>
                    <option value="fecha">Fecha</option>
                    <option value="precio">Precio</option>
                  </select>
              </div>
              <div className="w-auto px-4 flex justify-center items-center rounded-lg bg-gray-200 gap-0">
                <label htmlFor="" className='text-gray-500 text-sm'>Orden:</label>
                <select 
                    onChange={handleOrderChange} 
                    className='bg-transparent text-sm font-bold text-gray-500 focus:outline-none focus:ring-0'
                  >
                    <option value="asc">Menor a mayor</option>
                    <option value="desc">Mayor a menor</option>
                  </select>
              </div>
            </div>
            <div>
              <button onClick={() => handleOpenForm()} className='py-1 px-4 text-white rounded-lg bg-[#1b7b7e] hover:bg-[#175254]'>+ Agregar Libro</button>
            </div>
          </div>

        <div className="w-full h-[calc(100vh-120px)] flex flex-col justify-center items-start gap-4 text-gray-800 font-bold overflow-hidden">
         
          <div className={`w-auto h-full p-4 rounded-lg bg-gray-50 ${formOpen ? 'block' : 'hidden'} `}>
            <div className='flex pb-6 items-center justify-between'>
              <h3 className="w-full text-lg font-bold font-sans text-gray-800">{editandoId ? "Editar libro" : "Crear nuevo libro"}</h3>
              <button onClick={() => { handleOpenForm() }} className='px-2 text-md text-gray-700 rounded-full border border-gray-700 md:hover:bg-gray-600 md:hover:text-white'>X</button>
            </div>
            <form onSubmit={editandoId ? handleEditarLibro : handleCrearLibro} className={`w-full flex flex-wrap justify-between items-stretch gap-y-2`}>
              <select
                value={categoria}
                onChange={handleSelectCategoria}
                className="w-[49.6%] border border-gray-500 px-3 py-3 rounded text-gray-700"
                required
              >
                <option value="" disabled className='text-gray-700'>Categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                ))}
              </select>
              <input 
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
                className="w-[49.6%] pl-3 py-2 rounded text-gray-700 border border-gray-500"
              />
              <input 
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                required
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Autor"
                required
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                required
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio"
                required
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={precioAnterior}
                onChange={(e) => setPrecioAnterior(e.target.value)}
                placeholder="Precio anterior"
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                placeholder="Descuento"
                className="w-[33%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso"
                className="w-[24%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
                placeholder="Largo"
                className="w-[24%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={ancho}
                onChange={(e) => setAncho(e.target.value)}
                placeholder="Ancho"
                className="w-[24%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <input 
                type="number"
                value={alto}
                onChange={(e) => setAlto(e.target.value)}
                placeholder="Alto"
                className="w-[24%] border border-gray-500 pl-3 py-3 rounded text-gray-800 placeholder:text-gray-700"
              />
              <textarea 
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Detalles del libro"
                required
                className="w-full h-[150px] border border-gray-500 px-3 py-2 rounded text-gray-800 placeholder:text-gray-700"
              />
              
              <button 
                type="submit" 
                className="mt-2 py-2 px-4 rounded-lg bg-[#1b7b7e] hover:bg-[#175254] text-white"
              >
                {editandoId ? "Actualizar Libro" : "Crear Libro"}
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>

          <div className={`w-full pb-4 h-full ${formOpen ? 'hidden' : 'block'} bg-gray-50 rounded-lg flex flex-col justify-between`}>
              <table className='w-full table-fixed'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='px-4 py-2 text-gray-900 text-left w-20'>Imagen</th>
                    <th className='px-4 py-2 text-gray-900 text-left w-[300px] truncate'>Título</th>
                    <th className='px-4 py-2 text-gray-900 text-center'>Precio</th>
                    <th className='px-4 py-2 text-gray-900 text-center'>Descuento</th>
                    <th className='px-4 py-2 text-gray-900 text-center'>Stock</th>
                    <th className='px-4 py-2 text-gray-900 text-center w-[160px]'>Estado</th>
                    <th className='px-4 py-2 text-gray-900 text-center w-[160px]'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBooks.map((libro) => (
                    <tr key={libro.id} className='border-b'>
                      <td className='px-4 py-2 flex justify-center'>
                        <Image src={`${libro.imagen ? libro.imagen : '/default.jpeg'}`} alt={libro.titulo} width={60} height={60} className='p-2 w-[52px] h-auto border border-gray-400 rounded-lg' />
                      </td>
                      <td className='px-4 py-2 text-gray-700'>{libro.titulo}</td>
                      <td className='px-4 py-2 text-gray-700 text-center'>${libro.precio}</td>
                      <td className='px-4 py-2 text-gray-700 text-center'>{libro.descuento}</td>
                      <td className='px-4 py-2 text-gray-700 text-center'>{libro.stock}</td>
                      <td className='px-4 py-2 text-gray-600 text-center'>
                        <div className='flex justify-center items-center'>
                          <span className={`inline h-2 w-2 rounded-full ${libro.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <select
                            value={libro.active ? 'activo' : 'desactivo'}
                            onChange={(e) => handleActiveChange(libro.id, e.target.value === 'activo')}
                            className='text-gray-600 border-none outline-none focus:ring-0 text-center'
                          >
                            <option value="activo">Activo</option>
                            <option value="desactivo">Desactivo</option>
                          </select>
                        </div>
                      </td>
                      <td className='px-2 py-2'>
                       <div className='h-full flex items-center justify-center space-x-2'>
                          <button onClick={() => handleEditClick(libro)} 
                          className="bg-gray-200 hover:bg-[#1b7b7e] text-gray-600 hover:text-white border border-gray-300 py-1 px-2 rounded text-sm"
                          >
                            <BiPencil className='text-base inline' /><span>Editar</span>
                          </button>
                          <button onClick={() => handleEliminarLibro(libro.id)} className='text-gray-700 hover:text-red-600 text-xl flex items-center'>
                            <BiTrash />
                          </button>
                         </div>
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
    </div>
  );
};

export default AdminLibrosPage;





