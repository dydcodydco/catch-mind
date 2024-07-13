import Modal from '@/app/_components/Modal';
import ModalClose from '@/app/(afterLogin)/_components/ModalClose';

export default function ModalJoinRoomPage() {
  return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>
      탈취당한 방 참여입니다.
    </Modal>
  )
}