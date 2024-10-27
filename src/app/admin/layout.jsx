
import NavBarAdmin from '@/components/NavBarAdmin';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <NavBarAdmin />
      <main className="pl-[18%] flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

