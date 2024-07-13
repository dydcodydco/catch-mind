'use client';

import Link from 'next/link';
import Login from './Login';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';

type Props = { session: Session | null };

export default function Header({ session }: Props) {
  const path = usePathname();
  console.log(path, '------pathname');
  if (path === '/') {
    return null;
  }
  return (
    <div className='flex justify-between p-2 items-stretch'>
      <Link href='/' className='flex items-center'>
        <h1 className='font-extrabold text-xl'>CATCHMIND</h1>
      </Link>
      <Login session={session} />
    </div>
  )
}