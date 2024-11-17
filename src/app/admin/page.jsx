'use client'
import AdminHeader from "@/components/admin/AdminHeader";
import AnalyticsStats from "@/components/admin/AnalyticsStats";
import Loader from "@/components/Loader";
import { getCategorias } from "@/services/serviceCategoria";
import { getLibros } from "@/services/serviceLibros";
import { getPedidos } from "@/services/servicePedidos";
import { getUsuarios } from "@/services/serviceUser";
import { getVentas } from "@/services/serviceVentas";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCategoryAlt, BiPurchaseTagAlt, BiSolidTruck, BiTimeFive, BiTimer, BiUser } from "react-icons/bi";

const AdminPage = () => {
    const [ ventas, setVentas] = useState([]);
    const [ pedidos, setPedidos] = useState([]);
    const [ usuarios, setUsuarios] = useState([]);
    const [ productos, setProductos] = useState([]);
    const [ categorias, setCategorias] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('hoy');

    const fetchData = async () => {
      try {
        const [ventas, pedidos, usuarios, libros, categorias] = await Promise.all([getVentas(), getPedidos(), getUsuarios(), getLibros(), getCategorias()]);
        setVentas(ventas);
        setPedidos(pedidos);
        setProductos(libros);
        setUsuarios(usuarios);
        setCategorias(categorias);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }, []);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
  
    const startOfWeek = new Date(hoy);
    const dayOfWeek = hoy.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(hoy.getDate() - diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
  
    const startOfMonth = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    const filtrarVentas = () => {
      let ventasFiltradas;
      
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
    
      const startOfWeek = new Date(hoy);
      const dayOfWeek = hoy.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(hoy.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
    
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
    
      const startOfMonth = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
    
      switch (filtro) {
        case 'hoy':
          ventasFiltradas = ventas.filter(venta => {
            const fechaVenta = new Date(venta.createdAt);
            fechaVenta.setHours(0, 0, 0, 0); 
            return fechaVenta.getTime() === hoy.getTime();
          });
          break;
        case 'semana':
          ventasFiltradas = ventas.filter(venta => {
            const fechaVenta = new Date(venta.createdAt);
            return fechaVenta >= startOfWeek && fechaVenta <= endOfWeek;
          });
          break;
        case 'mes':
          ventasFiltradas = ventas.filter(venta => {
            const fechaVenta = new Date(venta.createdAt);
            fechaVenta.setHours(0, 0, 0, 0); 
            return fechaVenta >= startOfMonth && fechaVenta <= hoy;
          });
          break;
        default:
          ventasFiltradas = ventas;
          break;
      }
    
      return ventasFiltradas;
    };
    
    

  const ventasFiltradas = filtrarVentas(); 
  const cantidadVentas = ventasFiltradas.length; 
  const totalFacturacion = ventasFiltradas.reduce((acc, venta) => acc + parseFloat(venta.totalAmount), 0).toFixed(2); 
  const ticketPromedio = cantidadVentas > 0 ? (totalFacturacion / cantidadVentas).toFixed(2) : '0.00';

  console.log(ventas)
    
  return (
      <div className='w-full h-[100vh] flex flex-col'>       
        <AdminHeader name=''/>
          {
            loading ? (
              <div className="w-full h-[calc(100vh-60px)]">
                <Loader />
              </div>
            )
            : (
              <div className='w-full px-[2%] pt-5 h-[calc(100vh-60px)] bg-gray-300'>
                <div className="px-3 py-2 inline-flex flex-col gap-1 border border-gray-400 rounded bg-[rgba(256,256,256,.2)]">
                  <h3 className="font-bold text-gray-800 text-lg">Números:</h3>
                  <div className="flex gap-3">
                     <Link href='/admin/usuarios' className="px-4 py-1 flex flex-col items-center justify-center rounded border border-gray-400 md:hover:bg-gray-500 md:hover:border-[#1b7b7e] group transition-all duration-500">
                          <p className="flex items-center gap-1 text-lg font-bold text-gray-700 md:group-hover:text-gray-200"><BiUser size={18}/>Usuarios: <span className="text-lg font-bold text-[#1b7b7e] md:group-hover:text-gray-200">{usuarios.length}</span></p>
                      </Link>
                      <Link href="/admin/libros" className="px-4 py-1 flex flex-col items-center justify-center rounded border border-gray-400 md:hover:bg-gray-500 md:hover:border-[#1b7b7e] group transition-all duration-500">
                          <p className="flex items-center gap-1 text-lg font-bold text-gray-700 md:group-hover:text-gray-200"><BiPurchaseTagAlt size={18}/>Productos: <span className="text-lg font-bold text-[#1b7b7e] md:group-hover:text-gray-200">{productos.length}</span></p>
                      </Link>
                      <Link href="/admin/categorias" className="px-4 py-1 flex flex-col items-center justify-center rounded border border-gray-400 md:hover:bg-gray-500 md:hover:border-[#1b7b7e] group transition-all duration-500">
                          <p className="flex items-center gap-1 text-lg font-bold text-gray-700 md:group-hover:text-gray-200"><BiCategoryAlt size={18}/>Categorias: <span className="text-lg font-bold text-[#1b7b7e] md:group-hover:text-gray-200">{categorias.length}</span></p>
                      </Link>
                  </div>
                </div>
                <div>
                  <div className="px-3 py-2 mt-5 inline-flex flex-col gap-1  border border-gray-400 rounded bg-[rgba(256,256,256,.2)]">
                      <h3 className="font-bold text-gray-800 text-lg">Pedidos:</h3>
                      <div className="h-auto flex gap-3">
                            <p className="font-semibold text-lg text-gray-700 border border-gray-400 px-3 py-1 rounded flex items-center"><BiTimer size={20} className="mr-1 text-gray-500"/>Pendientes: <span className="text-[#1b7b7e] text-xl pl-1">{ pedidos.filter(pedido => pedido.estado === 'pendiente').length}</span></p>
                            <p className="font-semibold text-lg text-gray-700 border border-gray-400 px-3 py-1 rounded flex items-center"><BiTimeFive size={20} className="mr-1 text-gray-500"/>En proceso: <span className="text-[#1b7b7e] text-xl pl-1">{ pedidos.filter(pedido => pedido.estado === 'procesando').length}</span></p>
                            <p className="font-semibold text-lg text-gray-700 border border-gray-400 px-3 py-1 rounded flex items-center"><BiSolidTruck size={20} className="mr-1 text-gray-500"/>En camino: <span className="text-[#1b7b7e] text-xl pl-1">{ pedidos.filter(pedido => pedido.estado === 'enviado').length}</span></p>
                      </div>  
                  </div> 
                </div>
                  <div className="px-3 py-3 mt-5 inline-flex flex-col gap-1  border border-gray-400 rounded bg-[rgba(256,256,256,.2)]">
                      <div className="flex items-center gap-6 py-2"> 
                        <h3 className="font-bold text-gray-800 text-lg leading-[0]">Ventas</h3>
                        <div className="flex gap-3"> 
                          <button className="text-gray-800 underline font-normal text-sm leading-[0]" onClick={() => setFiltro('hoy')}>Hoy</button> 
                          <button className="text-gray-800 underline font-normal text-sm leading-[0]" onClick={() => setFiltro('semana')}>Esta semana</button> 
                          <button className="text-gray-800 underline font-normal text-sm leading-[0]" onClick={() => setFiltro('mes')}>Último mes</button> 
                        </div>
                      </div>
                      <div className="flex gap-3 mt-2"> 
                          <p className="pl-2 pr-4 py-1 font-bold text-gray-700 border border-gray-400 rounded">Ventas: <span className="text-[#1b7b7e] font-bold text-xl">{cantidadVentas}</span></p> 
                          <p className="pl-2 pr-4 py-1 font-bold text-gray-700 border border-gray-400 rounded">Facturación: <span className="text-[#1b7b7e] font-bold text-xl">${totalFacturacion}</span></p> 
                          <p className="pl-2 pr-4 py-1 font-bold text-gray-700 border border-gray-400 rounded">Ticket promedio: <span className="text-[#1b7b7e] font-bold text-xl">${ticketPromedio}</span></p> 
                      </div> 
                  </div> 
                <div className="mt-5">
                    <AnalyticsStats />
                </div>
             </div>
            )
          }
      </div>
    );
  };
  
  export default AdminPage;
  