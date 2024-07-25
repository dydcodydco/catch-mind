import { ReactNode } from 'react';
import SocketProvider from './_components/SocketProvider';
import { auth } from '@/auth';

type Props = { children: ReactNode, modal: ReactNode };

export default async function Layout({ children, modal }: Props) {
  const session = await auth();
  return (
    <SocketProvider session={session}>
      {children}
      {modal}
    </SocketProvider>
  )
}