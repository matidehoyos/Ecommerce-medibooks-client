import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Profile from './Profile';
import LoginAuthButtons from './LoginAuthButtons';

const LoginPcButtons = ({visible}) => {
    const {user} = useUser();

    return (
            <ul className={`w-[auto] p-4 absolute top-[75px] flex gap-5 ${visible ? 'right-0' : '-right-[200%]'} border-t border-gray-700 bg-gray-800 transition-all duration-500`}>
                { !user ? <LoginAuthButtons /> : <Profile user={user}/> }
            </ul>
    )
};

export default LoginPcButtons;