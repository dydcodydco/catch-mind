import Modal from '@/app/_components/Modal';
import ModalClose from '@/app/(afterLogin)/_components/ModalClose';
import FormMakeRoom from '../../_components/FormMakeRoom';

export default function ModalCreateRoomPage() {

return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>

      <div>
        <FormMakeRoom />
      </div>
    </Modal>
  )
}