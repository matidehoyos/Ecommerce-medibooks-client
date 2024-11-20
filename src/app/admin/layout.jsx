'use client';
import AdminHeader from '@/components/admin/AdminHeader';
import Loader from '@/components/Loader';
import NavBarAdmin from '@/components/admin/NavBarAdmin';
import { getUserByEmail } from '@/services/serviceUser';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AdminLayout = ({ children }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const checkAdminAccess = async () => {
      if (isLoading) return; 
      if (!user) {
        router.push('/');
        return;
      }
      try {
        const dbUser = await getUserByEmail(user.email);
        if (dbUser && dbUser.role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error al verificar el rol:', error);
        router.push('/');
      } 
    };
    checkAdminAccess();
  }, [user]);

 if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex">
      <NavBarAdmin />
      <main className="ml-[15%] flex-1 bg-gray-300">
        {children}
      </main>

      <ToastContainer 
        position="top-center" 
        autoClose={600}
        hideProgressBar={false} 
        closeOnClick 
        draggable 
        pauseOnHover 
        style={{ 
          top: '50%',  
          transform: 'translateY(-50%)', 
          zIndex: 9999,
          maxWidth: '600px', 
          backgroundColor: '#1b7b7e', 
          color: 'white',
          borderRadius: '15px', 
          padding: '20px',
          fontSize: '22px',
        }}
      />
    </div>
  );
};

export default AdminLayout;

