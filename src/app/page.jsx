'use client'
import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Destacados from "@/components/Destacados";
import Footer from "@/components/Footer";
import Oferts from "@/components/Oferts";
import Ubicacion from "@/components/ubicacion";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
          {loading && <Loader />}
          <Header />
          <Categories />
          <Destacados />
          <Oferts />
          <Ubicacion />
      </main>
      <footer className="">
          <Footer />
      </footer>
    </div>
  );
}
