import Link from 'next/link';

const LoginAuthButtons = () => {

    return (
        <ul className='mt-2 lg:mt-0 flex flex-col lg:flex-row gap-2 lg:gap-4'>
            <Link href="/api/auth/login" className="text-2xl lg:text-xl font-semibold lg:font-medium text-[#26a5aa] lg:text-gray-50 lg:hover:text-[#26a5aa]">
                Iniciar sesion
            </Link>
            <Link href="/api/auth/login" className="text-2xl lg:text-xl font-semibold lg:font-medium text-[#26a5aa] lg:text-gray-50 lg:hover:text-[#26a5aa]">
                Registrarte
            </Link>
        </ul>
    )
};

export default LoginAuthButtons;