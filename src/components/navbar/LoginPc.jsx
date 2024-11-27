import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';
import Profile from './Profile';
import LoginPcButtons from './LoginPcButtons';

const LoginPc = ({visible, setVisible}) => {
    const {user} = useUser();

    return (
        <div className='hidden lg:flex'>
            <button onClick={() => {setVisible(!visible)}} className='rounded-full overflow-hidden' aria-label='Abrir y cerrar menú de autenticación.'>
            { !user ? (
                <Image src='/user.png' width={90} height={90} alt='Imagen user icon.' className='w-[26px] h-auto object-contain'/>
            ) : (
                <Image src={user.picture} width={90} height={90} alt='Imagen user.' className='w-[26px] h-auto object-contain'/>
            )}
            </button>
            <LoginPcButtons visible={visible}/>
    </div>
    )
};

export default LoginPc;