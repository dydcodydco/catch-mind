import Modal from '@/app/_components/Modal';
import ModalClose from '../_components/ModalClose';

export default function CreateRoomPage() {
  
  return (
    <Modal>
      <div className='flex justify-end'>
        <ModalClose />
      </div>
      <div>탈취당한 방 만들기입니다.</div>
    </Modal>
  )
}