import '../../globals.css';
import localFont from 'next/font/local';
import { CartProvider } from '../contexts/CartContexts';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ProductosProvider } from '@/contexts/productsContexts';
import { CategoryProvider } from '@/contexts/categoryContexts';
import NavBarClient from '@/components/navbar/NavBarClient';
import CartDrawer from '@/components/cart/CartDrawer';
import BotonFlotante from '@/components/whatsApp/BotonFlotante';
import FooterClient from '@/components/FooterClient';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Medibooks',
  description: 'Tienda online de libros de medicina.',
  icons: {
    icon: '/icono.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <ProductosProvider>
            <CategoryProvider>
              <CartProvider>
                  <header>
                    <NavBarClient />
                  </header>
                  <main className='min-h-screen'>
                    {children}
                    <CartDrawer />
                    <BotonFlotante />
                  </main>
                  <footer>
                    <FooterClient />
                  </footer>
              </CartProvider>
            </CategoryProvider>
          </ProductosProvider>
        </UserProvider>
      </body>
    </html>
  );
}

