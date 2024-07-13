import { ReactNode } from 'react';

type Props = {children: ReactNode}

export default function Modal({ children }: Props) {
  return (
    <div className='fixed bg-black top-0 left-0 flex w-dvw h-dvh justify-center items-center bg-opacity-80'>
      <div className='bg-white p-2 md:p-5 flex flex-col min-w w-full h-dvh md:min-w-[600px] md:min-h-[70dvh] md:w-auto md:h-auto'>
        {children}
      </div>
    </div>
  )
}