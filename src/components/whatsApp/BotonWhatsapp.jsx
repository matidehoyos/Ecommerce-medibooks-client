'use client'
import Image from "next/image";

const BotonWhatsapp = () => {

    return (
          <div className="w-auto h-auto p-1 fixed right-[20px] bottom-[20px] rounded-full border border-white bg-white hover:scale-125 transition-all duration-300">
            <a href="https://api.whatsapp.com/send?phone=542233414157" target="_blank" aria-label="Ir a la aplicación de WhatsApp">
                <Image 
                src="/whats.png" 
                alt="Logo Whatsapp" 
                width={90} 
                height={90} 
                className="w-[50px] h-auto object-cover"
                />
            </a>
        </div>
    );
  };
  
  export default BotonWhatsapp;