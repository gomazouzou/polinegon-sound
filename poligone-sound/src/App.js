import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useSpring, animated } from 'react-spring';
import './App.css';

//nビット目が0か1か判別する関数
function checkBit(num, n) {
  return (num >> n) & 1;
}
//nビット目を反転
function toggleBit(num, n) {
  return num ^ (1 << n);
}
//n秒間待機する非同期関数(これ使うと遅延がエグいので使ってません)
function wait(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

const BeatBox = () => {
  // エンベロープ設定
  const optsMembrane = {
    pitchDecay: 0.01,
    envelope: {
      attack: 0.001,
      decay: 0.3,
      sustain: 0.0,
      release: 0.01
    },
    volume: 10
  };

  const optsNoiseSnare = {
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0
    }
  };

  const optsNoiseHihat = {
    type: "pink",
    envelope: {
      attack: 0.01,
      decay: 0.05,
      sustain: 0.0,
      release: 0.1
    }
  };

  // シンセ生成
  const membrane = useRef(new Tone.MembraneSynth(optsMembrane).toDestination());
  const noiseSnare = useRef(new Tone.NoiseSynth(optsNoiseSnare).toDestination());
  const noiseHihat = useRef(new Tone.NoiseSynth(optsNoiseHihat).toDestination());

  // リズム設定←ここを動的に制御できるようにする予定
  const kickRhythm = [['0:0:0'], ['0:0.75:0'], ['0:2.5:0'], ['0:3.25:0']];
  const snareRhythm = [['0:0:0'], ['0:1:0'], ['0:1.75:0'], ['0:3:0']];
  const hihatRhythm = [['0:0:0'], ['0:0.5:0'], ['0:1:0'], ['0:1.5:0'], ['0:2:0'], ['0:2.5:0'], ['0:3:0'], ['0:3.5:0']];

  // シンセにリズムを設定
  const kickPart = useRef(new Tone.Part((time) => {
    membrane.current.triggerAttackRelease('C2', '8n', time);
  }, kickRhythm));

  const snarePart = useRef(new Tone.Part((time) => {
    noiseSnare.current.triggerAttackRelease('8n', time);
  }, snareRhythm));

  const hihatPart = useRef(new Tone.Part((time) => {
    noiseHihat.current.triggerAttackRelease('16n', time);
  }, hihatRhythm));

  // ループ設定
  useEffect(() => {
    kickPart.current.loop = true;
    snarePart.current.loop = true;
    hihatPart.current.loop = true;
  }, []);

  // BPM設定
  const [bpm, setBpm] = useState(120);
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const [musicState, setMusicState] = useState(0);
  // default:000..., kick:0bit, snare:1bit, hihat:2bit
  const [drawmode, setDrawmode] = useState(0);
  // default:0, kick:1, snare:2, hihat:3

  //musicStateが変化したら音が追加(削除)されるように
  useEffect(() => {
    Tone.Transport.stop();
    if (checkBit(musicState,0)) {
      kickPart.current.start(0);
    } else {
      kickPart.current.stop();
    }
    if (checkBit(musicState,1)) {
      snarePart.current.start(0);
    } else {
      snarePart.current.stop();
    }
    if (checkBit(musicState,2)) {
      hihatPart.current.start(0);
    } else {
      hihatPart.current.stop();
    }
    Tone.Transport.start();
  }, [musicState, drawmode]);

  // bpm制御
  const increaseBpm = () => {
    setBpm(bpm + 10);
  };
  const decreaseBpm = () => {
    setBpm(bpm - 10);
  };

  // 図形の設定
  const [polygons, setPolygons] = useState([]);

  //リズムと対応した頂点の位置(これも動的に制御させる)
  let kickarray = [0,3,10,13];
  let snarearray = [0,4,7,12];
  let hihatarray = [0,2,4,6,8,10,12,14];

  // ドットが辺を移動する時間を計算
  const makedurationarray = (array) => {
    const d = (60 / bpm / 4) *1000;
    const l = array.length;
    const durations = [];
    for (let i = 0; i < l; i++){
      if (i !== l-1){
        durations.push((array[i+1]-array[i])*d);
      } else {
        durations.push((16-array[i]+array[0])*d); //4拍子を16等分
      }
    }
    return durations;
  };
  let durationarray = [[],[],[]];
  durationarray[0] = makedurationarray(kickarray);
  durationarray[1] = makedurationarray(snarearray);
  durationarray[2] = makedurationarray(hihatarray);

  //クリックした位置に図形を表示して、音楽スタート
  const handleSvgClick = async (event) => {
    if (checkBit(musicState, 0) === 0 || checkBit(musicState, 1) === 0 || checkBit(musicState, 2) === 0) {
      const rect = event.target.getBoundingClientRect();
      const cx = event.clientX - rect.left;
      const cy = event.clientY - rect.top;
      const type = drawmode; //type→kick:1, snare:2, hihat:3
      let newPolygon = { cx, cy, points: calculateOctagonPoints(cx, cy, 50) , type};
      if(drawmode === 1 && checkBit(musicState, drawmode-1) === 0){
        newPolygon = { cx, cy, points: calculatePolygonPoints(cx, cy, 50, kickarray), type};
        setMusicState(toggleBit(musicState,0));
      }
      if(drawmode === 2 && checkBit(musicState, drawmode-1) === 0){
        setMusicState(toggleBit(musicState,1));
        newPolygon = { cx, cy, points: calculatePolygonPoints(cx, cy, 50, snarearray), type };
      }
      if(drawmode === 3 && checkBit(musicState, drawmode-1) === 0){
        newPolygon = { cx, cy, points: calculatePolygonPoints(cx, cy, 50, hihatarray), type};
        setMusicState(toggleBit(musicState,2));
      }
      setPolygons([...polygons, newPolygon]);
    }
  };

  //正八角形の頂点の位置を計算(いらない)
  const calculateOctagonPoints = (cx, cy, radius) => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4; // 45度刻み
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push({ x, y });
    }
    return points;
  };

  //正十六角形の頂点の位置を計算(4拍を16等分しているので)
  const calculatePolygonPoints = (cx, cy, radius, pointsarray) => {
    const points = [];
    let pointidx = 0;
    for (let i = 0; i < 16; i++) {
      if (i === pointsarray[pointidx]){
        const angle = ((i-4) * Math.PI) / 8; // 22.5度刻み
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push({ x, y });
        pointidx++;
      }
    }
    return points;
  };

  // 多角形の辺を移動するドットの要素を作成
  const MovingDot = ({ points, bpm, drawmode, musicState, type}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      setCurrentIndex(0);
    }, [musicState]); 
  
    const getSegmentDuration = (index) => {
      switch (type) {
        case 1:
          return durationarray[0][index % durationarray[0].length];
        case 2:
          return durationarray[1][index % durationarray[1].length];
        case 3:
          return durationarray[2][index % durationarray[2].length];
        default:
          return 1000; 
      }
    };
  
    const { x, y } = useSpring({
      from: points[currentIndex],
      to: points[(currentIndex + 1) % points.length],
      config: { duration: getSegmentDuration(currentIndex) },
      reset: true,
      onRest: () => {
        setCurrentIndex((currentIndex + 1) % points.length);
      }
    });
  
    return <animated.circle cx={x} cy={y} r="5" fill="red" />;
  };

  return (
    <div>
     <button
        onClick={() => setDrawmode(1)}
        className={`button ${drawmode === 1 ? 'active' : ''}`}
      >
        Kick
      </button>
      <button
        onClick={() => setDrawmode(2)}
        className={`button ${drawmode === 2 ? 'active' : ''}`}
      >
        Snare
      </button>
      <button
        onClick={() => setDrawmode(3)}
        className={`button ${drawmode === 3 ? 'active' : ''}`}
      >
        Hihat
      </button>
        
      <button onClick={increaseBpm}>Increase BPM</button>
      <button onClick={decreaseBpm}>Decrease BPM</button>

      <p>Current BPM: {bpm}</p>
      <svg width="1000" height="800" onClick={handleSvgClick}>
        {polygons.map((polygon, index) => {
          return (
            <g key={index} className={`group-${drawmode}`}>
              <polygon
                points={polygon.points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="black"
              />
              <MovingDot points={polygon.points} bpm={bpm} drawmode={drawmode} musicState={musicState} type={polygon.type} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BeatBox;
