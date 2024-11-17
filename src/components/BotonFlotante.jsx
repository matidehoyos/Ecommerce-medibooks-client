'use client'
import { usePathname } from "next/navigation";
import BotonWhatsapp from "./BotonWhatsapp";

const BotonFlotante = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

    return !isAdmin ? <BotonWhatsapp /> : null
  };
  
  export default BotonFlotante;