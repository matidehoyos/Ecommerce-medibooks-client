'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useProductos } from '@/contexts/productsContexts';
import { useCart } from '@/contexts/CartContexts';
import Loader from '@/components/Loader';
import Head from 'next/head';
import Producto from '@/components/Producto';
import ProductoDetalle from '@/components/ProductoDetalle';
import Relativos from '@/components/Relativos';

const ProductDetailPage = () => {
  const { id } = useParams();
  const productos = useProductos();
  const producto = productos.find((p) => Number(p.id) === Number(id));
  const [cantidad, setCantidad] = useState(1);
  const [terminacion, setTerminacion] = useState('Encuadernado');
  const { addToCart } = useCart();


  const agregarAlCarrito = () => {
    const productoConTerminacion = {
      ...producto,
      terminacion,
    };
    addToCart(productoConTerminacion, cantidad);
  };


  const filtrados = productos.filter(libro => libro.categoria === producto?.categoria);
  const relacionados = filtrados.filter(libro => libro.id !== producto?.id).slice(0,5);
  const contenido = relacionados.length > 0 ? relacionados : productos.slice(0,5);
  
  if (!producto) {
    return (
      <>
        <Head>
          <title>Cargando producto... | Medibooks</title>
        </Head>
        <Loader />
      </>
    );
  }

  return (
    <>
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": producto?.titulo,
            "image": producto?.imagen || '/default.png',
            "description": producto?.detalle,
            "brand": "Medibooks",
            "sku": producto?.id,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "ARS",
              "price": producto?.precio,
              "availability": producto?.stock > 0 ? "InStock" : "OutOfStock",
              "url": `https://medibooks.vercel.app/product/${id}`,
            },
          }),
        }}
      />
    </Head>
    <div className='min-h-screen bg-gray-100'>
      <Loader />
      <Producto producto={producto} setTerminacion={setTerminacion} terminacion={terminacion} cantidad={cantidad} setCantidad={setCantidad} agregarAlCarrito={agregarAlCarrito}/>
      <ProductoDetalle detalle={producto.detalle} />
      <Relativos contenido={contenido} />
    </div>
    </>
  );
};

export default ProductDetailPage;




