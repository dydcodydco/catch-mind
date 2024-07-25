'use client';

import { socketContext } from '@/app/(afterLogin)/_components/SocketProvider';
import { Session } from 'next-auth';
import { useContext, useEffect, useRef, useState } from 'react';
import style from './messages.module.css';

type Props = {session: Session | null}
interface IMessage {
  userId: string;
  content: string;
  roomId: string;
  date: number;
}

export default function MessageList({session}: Props) {
  const listRef = useRef(null);
  const { socket } = useContext(socketContext);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket?.on('receive message', (data) => {
      setMessages(prev => [...prev, data]);
      console.log(data);
    });

    () => {
      socket?.off('receive message');
    }
  }, [socket]);
  return (
    <div className={style.messageList} ref={listRef}>
      {messages?.length > 0 && messages.map(d => (
        session?.user?.id === d.userId ? (
          <div key={d.date} className='flex justify-center items-end flex-col'>
            <span className='inline-flex justify-center items-center p-3 py-2 sm:py-3 rounded-lg bg-slate-500 rounded-br-none text-white text-xs sm:text-base mb-1'>{d.content}</span>
            {/* <span className='text-xs sm:text-sm'>{dayjs(d.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</span> */}
          </div>
        ) : (
          <div key={d.date} className='flex justify-center items-start flex-col'>
            <span className='inline-flex justify-center items-center p-3 py-2 sm:py-3 rounded-lg bg-slate-800 rounded-bl-none text-white text-xs sm:text-base mb-1'>{d.content}</span>
            {/* <span className='text-xs sm:text-sm'>{dayjs(d.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</span> */}
          </div>
        )
      ))}
    </div>
  );
}