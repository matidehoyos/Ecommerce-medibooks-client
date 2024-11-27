'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { saveUserToDatabase } from '../../services/serviceUser';
import Link from 'next/link';

export default function Profile() {
    const { user } = useUser();
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
    <ul>
      {user &&  (
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-5'>
          {  userDB && userDB.role === 'admin' ? (
            <Link href="/admin" className="font-[500] text-[#20989c] lg:text-gray-50 text-xl lg:text-lg lg:hover:text-[#26a5aa]" aria-label="Ir al panel administrativo" >Administrador</Link>
          ) : null}

           <Link href="/api/auth/logout" className="font-[500] text-[#20989c] lg:text-gray-50 text-xl lg:text-lg lg:hover:text-[#26a5aa]" aria-label="Cerrar sesion">Cerrar sesión</Link>
        </div>
      )}
    </ul>
  );
}
