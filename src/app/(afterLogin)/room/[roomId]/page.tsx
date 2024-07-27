import { auth } from '@/auth';
import RoomWrapper from './_components/RoomWrapper';
import MessageForm from './_components/MessageForm';
import MessageList from './_components/MessageList';
import Canvas from './_components/Canvas';

export default async function RoomPage() {
  const session = await auth();
  return (
    <RoomWrapper session={session}>
        캐치마인드 게임 페이지 입니다.
      <div className='fixed top-0 left-0 w-dvw h-dvh'>
        <Canvas />
      </div>
      <div className='fixed bottom-0 left-0 w-full z-10'>
        <MessageList session={session} />
        <MessageForm session={session} />
      </div>
    </RoomWrapper>
  )
}