'use client';

import { BiPin, BiSolidTruck } from "react-icons/bi";

export default function Ubicacion() {


  return (
    <div className="w-full py-32 flex justify-center items-center bg-gray-50 gap-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4541279362948!2d-57.55942868820136!3d-38.036503546684266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de793ab6b611%3A0x9231325eddac25aa!2sMagallanes%204394%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710183187034!5m2!1ses!2sar" width="500" height="200" className="border border-gray-500"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="">
              <p className="flex items-center text-3xl text-gray-600 font-bold"><BiSolidTruck className="text-[60px] mr-3 relative -top-[5px]"/>Envios a todo el país</p>
              <p className="mt-4 flex items-center text-3xl text-gray-600 font-bold"><BiPin className="text-[60px] mr-3 relative -top-[5px]"/>Punto de retiro en Mar del Plata</p>
            </div>
    </div>
  );
}
