import ModalClose from '@/app/(afterLogin)/_components/ModalClose';
import Login from '@/app/_components/Login';
import Modal from '@/app/_components/Modal';
import { auth } from '@/auth';

export default async function ModalLoginPage() {
  const session = await auth();
  return (
    <Modal>
      <h1 className='flex items-center justify-between'>로그인 모달 <ModalClose /></h1>
      <Login session={session} />
    </Modal>
  )
}