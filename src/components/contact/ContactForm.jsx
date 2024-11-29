import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
      };


  return (
    <div className="w-full h-full px-[3%] md:px-0">
                <form onSubmit={handleSubmit} className="w-full h-full p-4 space-y-2 bg-gray-100 md:bg-white md:border border-gray-800 md:rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Envianos un mensaje</h2>
                <div>
                    <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-1">
                    Nombre
                    </label>
                    <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-[#1b7b7e] bg-gray-50"
                    />
                </div>
                <div className='w-full flex flex-col lg:flex-row gap-2'>
                    <div className='w-full'>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-[#1b7b7e] bg-gray-50"
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="telefono" className="block text-gray-700 font-semibold mb-1">
                        Teléfono (opcional)
                        </label>
                        <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-[#1b7b7e] bg-gray-50"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="mensaje" className="block text-gray-700 font-semibold mb-1">
                    Mensaje
                    </label>
                    <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-[#1b7b7e] bg-gray-50"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1b7b7e] md:bg-gray-800 text-white py-2 rounded-md md:hover:bg-gray-950 transition duration-300 font-semibold"
                >
                    Enviar mensaje
                </button>
                </form>
            </div>
  );
};

export default ContactForm;
