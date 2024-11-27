'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const AdminHeader = ({name}) => {
    const { user } = useUser();

    return (
        <div className='w-full h-[60px] sticky top-0 px-[3%] flex items-center justify-between bg-gray-700 border-b border-white'>
          <h2 className='text-gray-50 font-semibold text-xl font-sans'>Administrador {name}</h2>
          <div className='flex items-center'>
            <span className='text-gray-400 font-semibold text-sm mr-1'>Admin:</span>
            <Image width={24} height={24} src={user.picture} loading="lazy" className='rounded-full mr-1' alt="Imagen usuario." />
            <span className='text-gray-300 font-semibold text-sm'> {user.name}</span>
          </div>
        </div>
    )
};
  
  export default AdminHeader;