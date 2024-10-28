
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { faAt, faEnvelope, faEnvelopeOpen, faEnvelopeOpenText, faMailBulk, faMailForward, faSquareEnvelope, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white flex flex-col">
      <div className="pt-12 md:pt-20 pb-12 w-full px-[2%] md:px-[10%] flex flex-col md:flex-row md:justify-around md:items-center">
        
        <Link href='/' className="flex flex-col items-center justify-center">
          <Image 
            src="/logo3.png" 
            alt="Logo del Proyecto" 
            width={200} 
            height={100} 
            className="object-contain"
          />
        </Link>
        
        <div className="flex flex-col items-center mt-6 md:mt-0">
          <p>Mar Del Plata, Bs As, Argentina</p>
          <p>Gaboto 5434</p>
        </div>

        <div className="mt-8 md:mt-0 flex justify-center space-x-6 md:space-x-4">
                <a 
                href="https://www.instagram.com/tuusuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#e1306c] md:text-gray-600 md:hover:text-[#E1306C] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a 
                href="https://wa.me/tu-numero" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#25d366] md:text-gray-600 md:hover:text-[#25D366] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                </a>
                <a 
                href="mailto:somosmedibooks@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1b7b7e] md:text-gray-600 md:hover:text-[#1b7b7e] transition-colors duration-300"
                >
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>
            </div>
      </div>
      <div className="py-3 md:py-8 md:mt-12 text-center text-gray-300 text-xs md:text-lg md:font-semibold bg-gray-900">
        <p>Copyright Medibooks - 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
