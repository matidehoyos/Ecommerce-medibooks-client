'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

const Loader = ({ duration = 1000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="w-full h-screen pt-[220px] mx-auto flex justify-center items-start bg-gray-800">
      <div className="w-[62%] md:w-[40%]">
        <Image 
          src="/marca.png" 
          alt="Logo de Medibooks" 
          priority={true}
          width={2400} 
          height={600} 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Loader;
