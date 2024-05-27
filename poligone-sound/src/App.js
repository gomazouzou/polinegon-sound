import React, { useRef, useEffect, useState } from 'react';
import { Stack, Typography} from '@mui/material';
import { BpmChanger } from './modules/BpmChanger/index.tsx';
import {EraserButton} from './components/buttons/EraserButton.tsx'
import { DrawButton } from './components/buttons/drawButton.tsx';
import { AddButton } from './components/buttons/addButton.tsx';
import { DeleteButton } from './components/buttons/deleteButton.tsx';
import { Spacer } from './components/spacers/spacer.tsx';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [linewidth, setLinewidth] = useState(1);
  const [penColor, setPenColor] = useState('black');
  const [canvasColor, setCanvasColor] = useState('white');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function draw(event) {
      if (!isDrawing) return;

      // ペンのスタイルを設定
      context.lineWidth = linewidth;
      context.lineCap = 'round';

      if (isErasing) {
        context.strokeStyle = canvasColor; // キャンバスの背景色で消しゴム
      } else {
        context.strokeStyle = penColor; // ペンの色
      }

      // マウスの位置に線を描画
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    }

    function startDrawing(event) {
      setIsDrawing(true);
      draw(event);
    }

    function stopDrawing() {
      setIsDrawing(false);
      context.beginPath();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, isErasing, linewidth, penColor, canvasColor]);

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }} align="center">
        <BpmChanger/>
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '30px' }}>
        <canvas
          ref={canvasRef}
          width={960}
          height={480}
          style={{ border: '1px solid black', backgroundColor: canvasColor, position: 'absolute', top: 0, left: 0 }}
        />
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '1020px' }}>
        <div
          style={{
            width: '400px',
            height: '480px',
            border: '1px solid black',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <div
          style={{
            width: '400px',
            height: '40px',
            border: '1px solid black',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          >
            <AddButton/>
            <DeleteButton/>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '615px', left: '30px'}}>
        <div
          style={{
            width: '1390px',
            height: '120px',
            border: '1px solid black',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <div
          style={{
            width: '90px',
            height: '120px',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          >
            <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
              <DrawButton onClick={() => setIsErasing(false)} />
              <EraserButton onClick={() => setIsErasing(true)} />
            </Stack>
          </div>

          <div
          style={{
            width: '360px',
            height: '120px',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 90
          }}
          >
            <Stack alignItems="center"  justifyContent="center" style={{ height: '100%' }}>
              <Typography>線の太さ</Typography>
              <input
                type="range"
                min="1"
                max="20"
                value={linewidth}
                onChange={(e) => setLinewidth(parseInt(e.target.value))}
              />
            </Stack>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '650px', left: '810px' }}>
      <button
          style={{ backgroundColor: 'black', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('black')}
        ></button>
        <button
          style={{ backgroundColor: 'red', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('red')}
        ></button>
        <button
          style={{ backgroundColor: 'blue', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('blue')}
        ></button>
        <button
          style={{ backgroundColor: 'yellow', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('yellow')}
        ></button>
        <button
          style={{ backgroundColor: 'green', width: '20px', height: '20px' }}
          onClick={() => setPenColor('green')}
        ></button>
      </div>
    </>
  );
}

export default App;
