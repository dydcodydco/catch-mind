'use client';

import { socketContext } from '@/app/(afterLogin)/_components/SocketProvider';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react'

type Props = { children: ReactNode };

export default function RoomWrapper({children}: Props) {
  const { socket } = useContext(socketContext);
  const path = usePathname();
  console.log(path);

  useEffect(() => {
    socket?.emit('join room', 11111111);
  }, [socket]);

  return (
    <>
      {children}
    </>
  )
}