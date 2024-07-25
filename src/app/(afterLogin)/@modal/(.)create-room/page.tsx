import Modal from '@/app/_components/Modal';
import ModalClose from '@/app/(afterLogin)/_components/ModalClose';
import FormMakeRoom from '../../_components/FormMakeRoom';
import { auth } from '@/auth';

export default async function ModalCreateRoomPage() {
  const session = await auth();
return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>

      <div className='flex flex-grow'>
        <FormMakeRoom session={session} />
      </div>
    </Modal>
  )
}