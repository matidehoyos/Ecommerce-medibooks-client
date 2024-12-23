export default function Ubicacion() {

  return (
    <div className="w-full md:w-auto px-[3%] md:mx-auto md:px-0 py-14 lg:py-32 flex flex-col-reverse lg:flex-row lg:justify-center lg:items-center bg-gray-50 md:gap-4">
            <div className="w-full flex justify-center lg:justify-end">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4541279362948!2d-57.55942868820136!3d-38.036503546684266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de793ab6b611%3A0x9231325eddac25aa!2sMagallanes%204394%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710183187034!5m2!1ses!2sar" width="auto" height="auto" className="w-[98%] h-[200px] md:w-[84%] lg:w-[360px] border border-gray-500"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="w-full">
              <p className="w-full text-[24px] text-center lg:text-left lg:text-3xl text-gray-700 font-bold">Envios a todo el país</p>
              <p className="mt-1 lg:mt-4 text-[28px] text-center lg:text-left lg:text-3xl text-gray-700 font-bold">Punto de retiro en MDP</p>
            </div>
    </div>
  );
}
