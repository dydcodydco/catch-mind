'use client';

import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { signIn, signOut } from "next-auth/react";

type Props = {session?: Session | null}

export default function Login({session}: Props) {
  return (
    <>
      {!session?.user?.name
        ? (
          <Button onClick={() => signIn("kakao")} className='p-3'>
            로그인
          </Button>
        )
        : (
          <Button onClick={() => signOut()} className='p-3'>
            로그아웃
          </Button>
        )
      }
    </>
  );
}