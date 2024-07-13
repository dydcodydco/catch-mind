import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';
import Login from './_components/Login';

export default async function HomePage() {
  const session = await auth(); 
  console.log(session, '--------------------------session');
  return (
    <div className="flex h-dvh w-full justify-center items-center flex-col">
      <h1 className='font-extrabold text-4xl md:text-9xl -mt-20'>캐치마인드</h1>
      <div className='flex mt-5 gap-2'>
        {session?.user?.name && <Button className='p-0'><Link href='/home' className='p-3'>게임하러</Link></Button>}
        <Login session={session} />
      </div>
    </div>
  );
}
