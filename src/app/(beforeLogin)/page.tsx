import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth(); 
  console.log(session, '--------------------------session');
  return (
    <div className="flex w-full justify-center items-center flex-col">
      <h1 className='font-extrabold text-4xl md:text-9xl md:leading-none -mt-20'>캐치마인드</h1>
      <div className='flex mt-8 gap-2 items-center'>
        {session?.user?.name ? (
          <>
            {session?.user?.name}님 환영합니다.
            <Button className='p-0 ml3'><Link href='/home' className='p-3'>고고</Link></Button>
          </>
        ) : (
          <Link href={'/login'}>
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
