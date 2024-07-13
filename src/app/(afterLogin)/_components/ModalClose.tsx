'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function ModalClose() {
  const router = useRouter();

  const onClickClose = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <Button variant="ghost" size="icon" onClick={onClickClose}>
      <X />
    </Button>
  )
}