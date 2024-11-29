'use client';
import { useState, useEffect } from "react";

const Loader = ({ duration = 1000 }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFading(true), duration - 500); 
    const hideTimeout = setTimeout(() => setVisible(false), duration);
    
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`absolute w-full h-screen flex justify-center items-center bg-gray-300 transition-opacity duration-1000 z-50`}
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="w-[120px] h-[120px] bg-transparent animate-pulse"></div>
    </div>
  );
};

export default Loader;

