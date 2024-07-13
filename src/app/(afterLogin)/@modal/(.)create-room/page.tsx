import Modal from '@/app/_components/Modal';
import ModalClose from '@/app/(afterLogin)/_components/ModalClose';

export default function ModalCreateRoomPage() {
return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>

      방 생성 입니다.
    </Modal>
  )
}