import Modal from '@/app/_components/Modal';
import ModalClose from '@/app/(afterLogin)/_components/ModalClose';
import { auth } from '@/auth';
import FormJoinRoom from '../../_components/FormJoinRoom';

export default async function JoinRoomPage() {
  const session = await auth();
  return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>

      <div className='flex flex-grow'>
        <FormJoinRoom session={session} />
      </div>
    </Modal>
  )
}