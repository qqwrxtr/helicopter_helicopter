import React, { useState, useRef, useEffect } from 'react';
import './popup.css';
import sound from "./../../assets/sound/bell206-53009.mp3";
import wasd from "./../../assets/img/wasd2-removebg-preview.png";

const Popup = ({ onPlay }) => {
  const [isVisible, setIsVisible] = useState(true);
  const audio = useRef(new Audio(sound));

  const handlePlay = () => {
    setTimeout(() => {
      const currentAudio = audio.current;
      currentAudio.volume = 0.1;
      currentAudio.loop = true;
      currentAudio.play().catch(error => console.error('Audio playback failed:', error));
    }, 100);

    setIsVisible(false);
  };

  useEffect(() => {
    const currentAudio = audio.current;
    currentAudio.preload = 'auto';
    currentAudio.addEventListener('canplaythrough', () => {
      currentAudio.loop = true;
    });

    return () => {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.removeEventListener('canplaythrough', () => {});
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content d-flex flex-column align-items-center justify-content-around">
        <div>
          <h2 className='popup-title'>QQ , pentru a juca foloseste :</h2>
        </div>
        <div>
          <p className='popup-wasd'><img src={wasd} alt="WASD Controls" /></p>
        </div>
        <div>
          <button onClick={handlePlay} className='popup-start'>Play</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
