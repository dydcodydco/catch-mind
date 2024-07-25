'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useContext, useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { socketContext } from './SocketProvider';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  roomName: z.string().min(2).max(10, {
    message: '방 이름은 2글자 이상 10글자 이하입니다'
  }),
  password: z.string().optional(),
  type: z.enum(["open", "private"], {
    required_error: "You need to select a notification type.",
  }),
})

type Props = { session: Session | null };

export default function FormJoinRoom({session}: Props) {
  const [isPrivate, setIsPrivate] = useState(false);
  const { socket, setIsModal } = useContext(socketContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      password: '',
      type: 'open',
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log(values);
    const roomData = { ...values, roomName: encodeURIComponent(values.roomName), id: session?.user?.id };
    console.log(socket);
    socket?.emit('join room by name', roomData);
  }, [session?.user?.id, socket]);

  useEffect(() => {
    form.setValue('password', '');
  }, [form, isPrivate]);

  
  useEffect(() => {
    socket?.on('join room result', (data) => {
      console.log(data, '------------------------------------------join room result');
      if (data.result) {
        setIsModal(false);
        router.push(`/room/${data.roomId}`);
      }
    });

    return () => {
      socket?.off('join room result');
    }
  }, [router, setIsModal, socket]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col flex-grow">

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setIsPrivate(value === 'private');
                  }}
                  defaultValue={field.value}
                  className="flex gap-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="open" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      공개방
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      비공개방
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomName"
          render={({ field }) => (
            <FormItem className='flex-grow'>
              <FormLabel>방 이름</FormLabel>
              <FormControl>
                <Input placeholder="방 이름" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isPrivate && <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>방 비밀번호</FormLabel>
              <FormControl>
                <Input placeholder="방 비밀번호" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
        <Button type="submit" className='w-full'>방 참여하기</Button>
      </form>
    </Form>
  )
}