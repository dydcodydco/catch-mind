'use client';

import { socketContext } from '@/app/(afterLogin)/_components/SocketProvider';
import { fabric } from 'fabric';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react'

export default function Canvas() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const { socket } = useContext(socketContext);
  const pathName = usePathname();
  const roomId = pathName.split('/').pop();

  // 컨버스 초기화 하고 그림 그리기 / 서버에 그린 정보 보내기
  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: window.outerWidth,
      height: window.outerHeight,
      // width: 500,
      // height: 500,
      isDrawingMode: true,
    });
    newCanvas.renderAll();
    newCanvas.freeDrawingBrush.width = 5;
    newCanvas.freeDrawingBrush.color = '#000000';

    newCanvas.on('path:created', function(e: any) {
      const pathData = e.path.toJSON();
      socket?.emit('draw', { roomId, pathData });
    });

    setCanvas(newCanvas);

    return () => {
      newCanvas?.dispose();
      socket?.disconnect();
      // const canvasElement = document.getElementById('canvas');
      // canvasElement?.parentNode?.removeChild(canvasElement);
    };
  }, [roomId, socket]);


  // 그림 데이터 받은걸로 컨버스에 그림 그리기
  useEffect(() => {
    if (!socket || !canvas) return;

    socket.on('drawPath', (data: any) => {
      fabric.util.enlivenObjects([data.pathData], function(objects: any) {
        objects.forEach(function(o: any) {
          canvas.add(o);
        });
        canvas.renderAll();
      }, 'fabric'); // 'fabric' 네임스페이스 추가
    });

    socket.on('initializeCanvas', (roomData: any[]) => {
      if (!canvas.getContext()) {
        console.error('Canvas context is not available');
        return;
      }
  
      const addObjects = async () => {
        try {
          for (const data of roomData) {
            await new Promise<void>((resolve) => {
              fabric.util.enlivenObjects([data], function(objects: any) {
                objects.forEach(function(o: any) {
                  canvas.add(o);
                });
                resolve();
              }, 'fabric');
            });
          }
          canvas.renderAll();
        } catch (error) {
          console.error('Error initializing canvas:', error);
        }
      };
  
      addObjects();
    });
  
    return () => {
      socket.off('drawPath');
      socket.off('initializeCanvas');
    };
  }, [socket, canvas, roomId]);

  return (
    <canvas id='canvas' ref={canvasRef} />
  )
}