import { useUser } from '@auth0/nextjs-auth0/client';
import LoginAuthButtons from './LoginAuthButtons';
import Profile from './Profile';

const LoginMov = () => {
    const {user} = useUser();

    return (
        <div className={`mt-6 flex flex-col gap-y-3`}>
            { !user ? <LoginAuthButtons /> : <Profile user={user}/> }
        </div>
    )
};

export default LoginMov;