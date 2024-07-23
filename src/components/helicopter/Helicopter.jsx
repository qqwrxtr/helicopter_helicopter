import React, { useState, useEffect, useRef } from 'react';
import helicopter_img from './../../assets/img/helicopter.png';
import point_img from './../../assets/img/coin.png';
import Points from './../points/Points.jsx';

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

                if (keys.current['w'] || keys.current['ArrowUp']) newY = Math.max(0, newY - 2);
                if (keys.current['s'] || keys.current['ArrowDown']) newY = Math.min(window.innerHeight - 50, newY + 2); // Adjust for helicopter height
                if (keys.current['a'] || keys.current['ArrowLeft']) {
                    newX = Math.max(0, newX - 2);
                    setTilt(-10);
                    setMirror(true);
                }
                if (keys.current['d'] || keys.current['ArrowRight']) {
                    newX = Math.min(window.innerWidth - 50, newX + 2); // Adjust for helicopter width
                    setTilt(10);
                    setMirror(false);
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

    return (
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
            <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                Score: {score}
            </div>
        </div>
    );
};

export default Helicopter;
