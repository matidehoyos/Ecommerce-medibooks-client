import { useCart } from "@/contexts/CartContexts";

const EnvioTotalFinal = ({ envio, opcionEnvio, setOpcionEnvio, handlePayment }) => {
  const { cart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
  };

  return (
    <div className='w-full pr-8 pt-6 flex flex-col items-end'>
      <p className='font-normal text-[24px] text-gray-700'>Subtotal: ${calculateTotal()}</p>
      
      <div className="my-2 space-y-2">
      <label className="flex items-center">
        <input
          type="radio"
          name="envio"
          value={String(envio.aSucursal)}
          checked={opcionEnvio === String(envio.aSucursal)}
          onChange={(e) => setOpcionEnvio(e.target.value)}
          className="mr-2"
        />
        Envío a Sucursal - ${envio.aSucursal}
      </label>
      
      <label className="flex items-center">
        <input
          type="radio"
          name="envio"
          value={String(envio.aDomicilio)}
          checked={opcionEnvio === String(envio.aDomicilio)}
          onChange={(e) => setOpcionEnvio(e.target.value)}
          className="mr-2"
        />
        Envío a Domicilio - ${envio.aDomicilio}
      </label>
      
      <label className="flex items-center">
        <input
          type="radio"
          name="envio"
          value="0"
          checked={opcionEnvio === "0"}
          onChange={(e) => setOpcionEnvio(e.target.value)}
          className="mr-2"
        />
        Retiro por local (MDP)
      </label>
    </div>


      {opcionEnvio && (
        <p className='pl-20 pt-2 font-normal text-gray-600 text-xl border-t border-gray-500'>
          Total: <span className='font-bold text-gray-800'>${(Number(calculateTotal()) + Number(opcionEnvio)).toFixed(2)}</span>
        </p>
      )}
      
      <button onClick={handlePayment} className='mt-3 px-6 py-1 text-gray-50 rounded bg-[#1b7b7e] -tracking-tight hover:bg-[#0a3738]'>
        Confirmar
      </button>
    </div>
  );
};

export default EnvioTotalFinal;
