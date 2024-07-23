import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF , Stage ,PresentationControls, Shadow } from '@react-three/drei';
import Helicopter from './components/helicopter/Helicopter';


function App() {
  return (
    <div className="App text-center">
      <Helicopter/>
    </div>
  );
}

export default App;
