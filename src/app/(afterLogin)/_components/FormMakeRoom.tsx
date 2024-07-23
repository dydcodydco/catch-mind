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

const formSchema = z.object({
  roomname: z.string().min(2).max(10, {
    message: '방 이름은 2글자 이상 10글자 이하입니다'
  }),
  password: z.string().optional(),
  type: z.enum(["open", "private"], {
    required_error: "You need to select a notification type.",
  }),
})

export default function FormMakeRoom() {
  const [isPrivate, setIsPrivate] = useState(false);
  const { socket } = useContext(socketContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomname: "",
      password: '',
      type: 'open',
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log(values);
    socket?.emit('room-make', values);
  }, [socket]);

  useEffect(() => {
    form.setValue('password', '');
  }, [form, isPrivate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
          name="roomname"
          render={({ field }) => (
            <FormItem>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}