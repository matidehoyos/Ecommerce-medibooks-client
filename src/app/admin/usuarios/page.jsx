'use client'
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { getUsuarios } from '@/services/serviceUser';
import Image from 'next/image';

const AdminUserPage = () => {
    const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        setError('Error loading usuarios: ' + error.message);
      }
    };
    loadUsuarios();
  },[]);  

  return (
    <div className='w-full h-auto flex flex-col'>
      <div className='w-full sticky top-0 py-2 px-6 bg-gray-900'><h2 className='text-2xl'>Administrador de usuarios</h2></div>
      <div className="w-full h-auto pt-[40px] px-6 flex flex-col justify-start items-start text-gray-800 font-bold">
        <h3 className='text-xl'>Todos los usuarios:</h3>
        <ul className="w-full mt-4 p-4 flex flex-wrap justify-between bg-gray-300 rounded-lg">
          { usuarios.map((user) => (
            <li key={user.id} className="w-full my-1 py-1 px-2 flex justify-between items-center bg-gray-100 rounded-md">
              <Image src={user.profilePicture} alt={user.username} width={40} height={40} className='w-[40px] h-auto object-contain rounded-full' />
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{user.createdAt.slice(0,10)}</span>
              <div className='flex'>
                <button
                  className="mr-2 bg-blue-400 hover:bg-blue-600 text-white p-1 rounded"
                >
                  Editar
                </button>
                <button
                  className="bg-red-400 hover:bg-red-600 text-white py-1 px-2 rounded"
                >
                  <BiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUserPage;