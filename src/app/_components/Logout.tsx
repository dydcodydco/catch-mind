'use client';

import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default function Logout() {
  return (
    <Button onClick={() => signOut()} className='p-3'>
      로그아웃
    </Button>
  )
}