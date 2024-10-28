import Image from "next/image";

const Loader = () => {
    return (
      <div className="w-full h-screen pt-[220px] mx-auto flex justify-center items-start bg-gray-600">
      <div className="w-[70%] md:w-[40%]">
        <Image 
          src="/marca.png" 
          alt="Logo Medibooks" 
          width={2400} 
          height={600} 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
     
    );
  };
  
  export default Loader;