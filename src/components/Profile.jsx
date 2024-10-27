'use client';
import { useEffect } from 'react';
import { saveUserToDatabase } from '../services/serviceUser';
import Link from 'next/link';
import Image from 'next/image';

export default function Profile({ user }) {

  useEffect(() => {
    const saveUser = async () => {
      try {
        const userData = {
          auth0Id: user.sub,
          username: user.name || user.nickname,
          email: user.email,
          profilePicture: user.picture,
        };
        await saveUserToDatabase(userData);
      } catch (err) {
        console.error('Error al guardar el usuario:', err.message);
      }
    };

    saveUser();
  }, [user]);


  return (
    <div>
      {user && (
        <div className=''>
          <Link href="/api/auth/logout" className="font-medium text-gray-200 hover:text-white">Cerrar sesión</Link>
        </div>
      )}
    </div>
  );
}
