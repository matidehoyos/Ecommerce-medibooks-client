'use client';
import { useEffect, useState } from 'react';
import { saveUserToDatabase } from '../services/serviceUser';
import Link from 'next/link';

export default function Profile({ user }) {
    const [userDB , setUserDB] = useState(null)

  useEffect(() => {
    const saveUser = async () => {
      try {
        const userData = {
          auth0Id: user.sub,
          username: user.name,
          email: user.email,
          profilePicture: user.picture,
        };
        const usuario = await saveUserToDatabase(userData);
        setUserDB(usuario.user);
      } catch (err) {
        console.error('Error al guardar el usuario:', err.message);
      }
    };

    saveUser();
  }, [user]);


  return (
    <div>
      {user &&  (
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-5'>
          {  userDB && userDB.role === 'admin' ? (
            <Link href="/admin" className="font-[600] text-[#20989c] lg:text-gray-100 text-xl lg:text-lg lg:hover:text-white">Administrador</Link>
          ) : null}

           <Link href="/api/auth/logout" className="font-[600] text-[#20989c] lg:text-gray-100 text-xl lg:text-lg lg:hover:text-white">Cerrar sesión</Link>
        </div>
      )}
    </div>
  );
}
