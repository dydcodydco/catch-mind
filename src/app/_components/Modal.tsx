'use client';
import { ReactNode, useContext, useEffect } from 'react';
import { socketContext } from '../(afterLogin)/_components/SocketProvider';
import { usePathname } from 'next/navigation';

type Props = {children: ReactNode}

export default function Modal({ children }: Props) {
  const { isModal, setIsModal } = useContext(socketContext);
  const path = usePathname();

  useEffect(() => {
    if (path === 'create-room') {
      setIsModal(true);
    }

    () => {
      setIsModal(true);
    }
  }, [path, setIsModal])
  return (
    <>
      {isModal && <div className='fixed bg-black top-0 left-0 flex w-dvw h-dvh justify-center items-center bg-opacity-80'>
        <div className='bg-white p-2 md:p-5 flex flex-col min-w w-full h-dvh md:min-w-[600px] md:min-h-[70dvh] md:w-auto md:h-auto'>
          {children}
        </div>
      </div>}
    </>
  )
}