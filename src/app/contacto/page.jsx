'use client'
import ContactContainer from '@/components/contact/ContactContainer';
import Loader from '@/components/Loader';

const Contacto = () => {
  

  return (
    <div className="w-full min-h-screen bg-gray-300">
        <Loader />
        <ContactContainer />
    </div>
  );
};

export default Contacto;
