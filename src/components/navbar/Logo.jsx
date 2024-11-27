import Link from 'next/link';
import Image from 'next/image';

const Logo = () => (
   <div className="h-[40px] md:h-[60px] xl:h-[80px] flex items-center overflow-hidden">
        <Link href="/" aria-label="Go to homepage">
                <Image
                    src="/navLog.png"
                    alt="Logo Medibooks"
                    priority
                    width={200}
                    height={90}
                    className="xs:w-[175px] sm:w-[190px] md:w-[220px] xl:w-[230px]  h-auto max-w-full object-contain object-center"
                />
            </Link>
    </div>
);

export default Logo;
