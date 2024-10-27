import localFont from "next/font/local";
import "../../globals.css";
import NavBarClient from "@/components/NavBarClient";
import { CartProvider } from "../contexts/CartContexts";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import CartDrawer from "@/components/CartDrawer";
import BotonFlotante from "@/components/BotonFlotante";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Medibooks",
  description: "Tienda online de libros de medicina.",
  icons: {
    icon: '/icono.png',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <UserProvider>
              <CartProvider>
                    <header>
                      <NavBarClient/>
                    </header>
                    <main>
                      {children}
                      <CartDrawer />
                      <BotonFlotante />
                    </main>
              </CartProvider>
          </UserProvider>
      </body>
    </html>
  );
}

