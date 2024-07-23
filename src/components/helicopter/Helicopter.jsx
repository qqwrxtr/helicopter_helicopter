import React, { useState, useEffect, useRef } from "react";
import hell from "./../../assets/img/helicopter.png";
import "./helicopter.css"

const Helicopter = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [direction, setDirection] = useState('right');
  const keysPressed = useRef({});
  const requestRef = useRef();

  const handleKeyDown = (event) => {
    keysPressed.current[event.key] = true;
  };

  const handleKeyUp = (event) => {
    keysPressed.current[event.key] = false;
  };

  const move = () => {
    setPosition((prevPosition) => {
      const newPosition = { ...prevPosition };
      const step = 4; 

      if (keysPressed.current['w'] || keysPressed.current['W']) {
        newPosition.top = Math.max(prevPosition.top - step, 0);
      }
      if (keysPressed.current['s'] || keysPressed.current['S']) {
        newPosition.top = Math.min(prevPosition.top + step, window.innerHeight - 100);
      }
      if (keysPressed.current['a'] || keysPressed.current['A']) {
        newPosition.left = Math.max(prevPosition.left - step, 0);
        setDirection('left');
      }
      if (keysPressed.current['d'] || keysPressed.current['D']) {
        newPosition.left = Math.min(prevPosition.left + step, window.innerWidth - 100);
        setDirection('right');
      }
      
      if (!(keysPressed.current['a'] || keysPressed.current['A'] || keysPressed.current['d'] || keysPressed.current['D'])) {
        setTilt(0);
      } else if (keysPressed.current['a'] || keysPressed.current['A']) {
        setTilt(15);
      } else if (keysPressed.current['d'] || keysPressed.current['D']) {
        setTilt(-15);
      }

      return newPosition;
    });

    requestRef.current = requestAnimationFrame(move);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    requestRef.current = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="col jopic" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <img
        src={hell}
        alt="helicopter"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: `
            rotate(${-tilt}deg) 
            ${direction === 'left' ? 'scaleX(-1)' : ''}
          `
        }}
      />
    </div>
  );
};

export default Helicopter;
