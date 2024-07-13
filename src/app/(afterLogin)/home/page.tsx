import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomPage() {
  return (
    <div className='flex gap-2 p-2'>
      <Button className='p-0'>
        <Link className='p-2 px-5' href='/create-room'>게임 방 만들기</Link>
      </Button>
      <Button className='p-0'>
        <Link className='p-2 px-5' href='/join-room'>게임 방 참여하기</Link>
      </Button>
    </div>
  )
}