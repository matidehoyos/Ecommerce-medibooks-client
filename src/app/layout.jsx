import '../../globals.css';
import localFont from 'next/font/local';
import { CartProvider } from '../contexts/CartContexts';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ProductosProvider } from '@/contexts/productsContexts';
import { CategoryProvider } from '@/contexts/categoryContexts';
import NavBarClient from '@/components/NavBarClient';
import CartDrawer from '@/components/cart/CartDrawer';
import BotonFlotante from '@/components/BotonFlotante';
import PreNav from '@/components/PreNav';

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
    <html lang="en">
      <head>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <ProductosProvider>
            <CategoryProvider>
              <CartProvider>
                <header>
                  <NavBarClient />
                </header>
                <main>
                  {children}
                  <CartDrawer />
                  <BotonFlotante />
                </main>
              </CartProvider>
            </CategoryProvider>
          </ProductosProvider>
        </UserProvider>
      </body>
    </html>
  );
}

