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
            <Button onClick={() => signIn("kakao")} className='p-3'>
              카카오 로그인
            </Button>
            <Button onClick={() => signIn("google")} className='p-3'>
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