import NavBarAdmin from '@/components/NavBarAdmin';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <NavBarAdmin />
      <main className="ml-[15%] flex-1 bg-gray-300">
        {children}
      </main>
      
      <ToastContainer 
        position="top-center" 
        autoClose={2300}
        hideProgressBar={false} 
        closeOnClick 
        draggable 
        pauseOnHover 
        style={{ 
          top: '50%',  
          transform: 'translateY(-50%)', 
          zIndex: 9999,
          maxWidth: '400px', 
          backgroundColor: '#1b7b7e', 
          color: 'white',
          borderRadius: '8px', 
          padding: '20px',
          fontSize: '20px', 
        }}
      />
    </div>
  );
};

export default AdminLayout;


