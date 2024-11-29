'use client'
import ContactData from '@/components/contact/ContactData';
import ContactForm from '@/components/contact/ContactForm';
import Loader from '@/components/Loader';

const Contacto = () => {
  

  return (
    <div className="w-full min-h-screen bg-gray-300">
        <Loader />
        <div className='md:w-[80%] px-[3%] pt-[60px] md:pt-[170px] mx-auto pb-20 flex flex-col lg:flex-row-reverse md:justify-center md:items-stretch gap-8'>
            <ContactData />
            <ContactForm />
        </div>
    </div>
  );
};

export default Contacto;
