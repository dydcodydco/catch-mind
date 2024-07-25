'use client';

import { socketContext } from '@/app/(afterLogin)/_components/SocketProvider';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react'

type Props = { children: ReactNode, session: Session | null};

export default function RoomWrapper({children, session}: Props) {
  const { socket, setIsModal } = useContext(socketContext);
  const path = usePathname();

  useEffect(() => {
    socket?.emit('join room', { roomId: path.split('/').pop(), userId: session?.user?.id });
    
    return () => {
      console.log('-------------------------------프론트에서 방나갑니다');
      socket?.emit('leave room', { roomId: path.split('/').pop(), userId: session?.user?.id });
      setIsModal(true);
    }
  }, [path, session?.user?.id, setIsModal, socket]);

  return (
    <>
      {children}
    </>
  )
}