'use client';

import { socketContext } from '@/app/(afterLogin)/_components/SocketProvider';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { KeyboardEventHandler, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

interface IForm {
  content: string;
}

type Props = {session: Session | null}

export default function MessageForm({session}: Props) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<IForm>();
  const { socket } = useContext(socketContext);
  const path = usePathname();
  
  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
    socket?.emit('send message', {...data, userId: session?.user?.id, roomId: path.split('/').pop()});
    reset();
  }, [path, reset, session?.user?.id, socket]);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      onSubmit({ content: e.currentTarget.value as any });
    }
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex items-stretch border-black border-2 border-solid'>
      <TextareaAutosize className='flex-grow outline-none' {...register('content', { required: '내용을 입력해주세요.' })} onKeyDown={onKeyDown} />
      <Button className='rounded-none h-auto' disabled={!isValid || !socket || !session?.user?.id}>입력</Button>
    </form>
  )
}