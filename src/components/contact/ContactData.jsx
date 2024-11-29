
const ContactData = () => {
   
  return (
    <div className="w-full h-full mt-8 md:mt-0 p-4 text-gray-700 space-y-3 md:border md:border-gray-800 md:rounded-lg md:bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Información de Contacto</h2>
        <p>Email: <a href="mailto:somosmedibooks@gmail.com" target="_blank"  className="text-gray-800 font-bold hover:underline">somosmedibooks@gmail.com</a></p>
        <p>WhatsApp: <a href="https://api.whatsapp.com/send?phone=542233414157" target="_blank" className="text-gray-800 font-bold hover:underline">+54 9 223 341-4157</a></p>
        <p>Instagram: <a href="https://www.instagram.com/medibooks.oficial?igsh=MWx4Zzkza3YyZzlwMw==" target="_blank" rel="noopener noreferrer" className="text-gray-800 font-bold hover:underline">@medibooks.oficial</a></p>
        <p>Dirección:  <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-800 font-bold hover:underline">Gaboto 5334</a></p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4541279362948!2d-57.55942868820136!3d-38.036503546684266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de793ab6b611%3A0x9231325eddac25aa!2sMagallanes%204394%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710183187034!5m2!1ses!2sar" width="100%" height="207" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='border-2 border-gray-400 rounded-lg rounded-t-none'></iframe>
    </div>
  );
};

export default ContactData;
