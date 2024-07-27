'use client';

import Link from 'next/link';
import Login from './Login';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import Logout from './Logout';
import { Button } from '@/components/ui/button';

type Props = { session: Session | null };

export default function Header({ session }: Props) {
  const path = usePathname();
  if (path === '/' || path === '/login') {
    return null;
  }
  return (
    <div className='flex justify-between p-2 items-stretch relative z-10'>
      <Link href='/' className='flex items-center mr-auto'>
        <h1 className='font-extrabold text-xl'>CATCHMIND</h1>
      </Link>
      {
        !session?.user?.id ? (
          <Link href={'/login'}><Button>로그인</Button></Link>
        ) : (
          <Logout />
        )
      }
    </div>
  )
}