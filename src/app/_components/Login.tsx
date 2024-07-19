'use client';

import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { signIn, signOut } from "next-auth/react";
import Logout from './Logout';

type Props = {session?: Session | null}

export default function Login({session}: Props) {
  return (
    <>
      {!session?.user?.name
        ? (
          <>
            <Button variant="outline" onClick={() => signIn("kakao")} className='p-3 bg-[#FEE500] hover:bg-[#e8db5f]'>
              카카오 로그인
            </Button>
            <Button variant="outline" onClick={() => signIn("google")} className='p-3'>
              구글 로그인
            </Button>
          </>
        )
        : (
          <Logout />
        )
      }
    </>
  );
}