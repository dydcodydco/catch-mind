'use client';

import { Session } from 'next-auth';
import { disconnect } from 'process';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = { children: ReactNode, session: Session | null };
interface ISocketProps {
  socket: Socket | null;
  disconnect: Function;
  goDown: boolean;
  setGoDown: Function;
  isModal: boolean;
  setIsModal: Function;
}

export const socketContext = createContext<ISocketProps>({
  socket: null,
  disconnect: () => { },
  goDown: false,
  setGoDown: () => { },
  isModal: true,
  setIsModal: () => {},
});



export default function SocketProvider({ children, session }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [goDown, setGoDown] = useState(false);
  const [isModal, setIsModal] = useState(true);
  const disconnect = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);
  const contextValue = useMemo(() => {
    return { socket, disconnect, goDown, setGoDown, isModal, setIsModal }
  }, [socket, disconnect, goDown, isModal]);

  useEffect(() => {
    console.log(socket, '--------------------------------------------------------socket???');
    if (!socket) {
      const socketInstance = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        withCredentials: true,
      });

      socketInstance.on('connect', async () => {
        console.log('소켓연결 성공!', socketInstance.id);

        if (session?.user?.id) {
          socketInstance.emit('login', { id: session.user.id });
          console.log('-----------------------------------------------------socket emit login on connect')
        }
      })

      setSocket(socketInstance);

      // return () => {
      //   console.log('------------------------------------------- socket.disconnect');
      //   socketInstance?.disconnect();
      // }
    }
  }, [session?.user?.id, socket]);

  useEffect(() => {
    if (socket?.connected && session?.user?.id) {
      socket?.emit('login', { id: session?.user?.id });
      console.log('------------------------------------------------------------socket emit login')
    }

    // return () => {
    //   console.log('----------------------------------------------- socket.disconnect');
    //   socket?.disconnect();
    // }
  }, [session?.user?.id, socket]);

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  )
}