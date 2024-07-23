import React, { useState, useEffect, useRef } from 'react';
import helicopter_img from './../../assets/img/Helicopter_white.gif';
import point_img from './../../assets/img/coin.png';
import Points from './../points/Points.jsx';
import Popup from './../PopUp/Popup.jsx';

const Helicopter = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [tilt, setTilt] = useState(0);
    const [mirror, setMirror] = useState(false);
    const [score, setScore] = useState(0);
    const [points, setPoints] = useState(Array.from({ length: 20 }, (_, id) => ({ id, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight })));
    const keys = useRef({});

    const handleKeyDown = (event) => {
        keys.current[event.key] = true;
    };

    const handleKeyUp = (event) => {
        keys.current[event.key] = false;
        if (event.key === 'a' || event.key === 'ArrowLeft' || event.key === 'd' || event.key === 'ArrowRight') {
            setTilt(0);
        }
    };

    useEffect(() => {
        const moveHelicopter = () => {
            setPosition((prev) => {
                let newX = prev.x;
                let newY = prev.y;

                const speed = 3; // 1.5x faster than the original speed of 2

                if (keys.current['w'] || keys.current['ArrowUp']) newY -= speed;
                if (keys.current['s'] || keys.current['ArrowDown']) newY += speed;
                if (keys.current['a'] || keys.current['ArrowLeft']) {
                    newX -= speed;
                    setTilt(-10);
                    setMirror(true);
                }
                if (keys.current['d'] || keys.current['ArrowRight']) {
                    newX += speed;
                    setTilt(10);
                    setMirror(false);
                }

                if (newX < -195) {
                    newX = window.innerWidth - 50; 
                } else if (newX > window.innerWidth - 5) {
                    newX = -50; 
                } else if (newY < -195) {
                    newY = window.innerHeight - 50; 
                } else if (newY > window.innerHeight - 5) {
                    newY = -50; 
                }

                return { x: newX, y: newY };
            });

            requestAnimationFrame(moveHelicopter);
        };

        requestAnimationFrame(moveHelicopter);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        points.forEach((point) => {
            if (
                position.x < point.x + 2 &&
                position.x + 100 > point.x && 
                position.y < point.y + 2 &&
                position.y + 100 > point.y 
            ) {
                setPoints(points.map(p => p.id === point.id ? { ...p, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight } : p));
                setScore(prevScore => prevScore + 10);
            }
        });
    }, [position, points]);

    useEffect(() => {
        if (score >= 200) {
            window.alert('You win!');
            setScore(0);
            setPosition({ x: 0, y: 0 });
            setPoints(Array.from({ length: 20 }, (_, id) => ({ id, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight })));
        }
    }, [score]);

    return (
        <>
            <Popup/>
            <div className="col jopic" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
                <div 
                    style={{
                        position: 'absolute', 
                        left: `${position.x}px`, 
                        top: `${position.y}px`, 
                        transform: `rotate(${tilt}deg) scaleX(${mirror ? -1 : 1})`,
                        transition: 'transform 0.1s'
                    }}
                >
                    <img src={helicopter_img} alt="helicopter" width="100" height="100" />
                </div>
                {points.map(point => (
                    <Points key={point.id} x={point.x} y={point.y} img={point_img} />
                ))}
                <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', fontSize:"26px",color:"white" }}>
                    Score: {score}
                </div>
            </div>
        </>
    );
};

export default Helicopter;
