
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { faAt, faEnvelope, faEnvelopeOpen, faEnvelopeOpenText, faMailBulk, faMailForward, faSquareEnvelope, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white flex flex-col">
      <div className="pt-20 pb-12 w-full px-[10%] flex justify-around items-center">
        
        <Link href='/' className="flex flex-col items-center justify-center ">
          <Image 
            src="/logo3.png" 
            alt="Logo del Proyecto" 
            width={200} 
            height={100} 
            className="object-contain"
          />
        </Link>
        
        <div className="flex flex-col items-center">
          <p>Mar Del Plata, Bs As, Argentina</p>
          <p>Calle: Gaboto 5434</p>
        </div>

        <div className="flex justify-center space-x-4">
                <a 
                href="https://www.instagram.com/tuusuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#E1306C] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a 
                href="https://wa.me/tu-numero" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#25D366] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                </a>
                <a 
                href="mailto:somosmedibooks@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#1b7b7e] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>
            </div>
      </div>
      <div className="md:py-8 text-center text-gray-300 font-semibold mt-8 md:mt-12 md:bg-gray-900">
        <p>Copyright Medibooks - 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
