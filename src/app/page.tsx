import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex h-dvh w-full justify-center items-center flex-col">
      <h1 className='font-extrabold text-4xl md:text-9xl -mt-20'>캐치마인드</h1>
      <div className='flex mt-5 gap-2'>
        <Button className='p-0'><Link href='/login' className='p-3'>로그인</Link></Button>
        <Button className='p-0'><Link href='/login' className='p-3'>회원가입</Link></Button>
      </div>
    </div>
  );
}
