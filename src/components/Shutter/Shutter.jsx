import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Laser = ({ id, startPosition, direction, asteroids, onHitAsteroid }) => {
    const laserRef = useRef();

    useFrame((count, delta) => {
        if (!laserRef.current) return;
        laserRef.current.position.add(direction.clone().normalize().multiplyScalar(delta * 300));

        // Вращение лазера вокруг оси X для горизонтального вращения
        laserRef.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), delta * 30);
        asteroids.some((asteroid) => {
            const laserSphere = new THREE.Sphere(laserRef.current.position, 1); // Радиус 1 для расширенной зоны
            const asteroidBox = new THREE.Box3().setFromObject(asteroid.ref.current);

            if (laserSphere.intersectsBox(asteroidBox)) {
                console.log(`Laser hit asteroid with ID: ${asteroid.id}`);
                onHitAsteroid(asteroid.id);
                return true; // Прерываем дальнейшие пересечения
            }
            return false;
        });
    });

    return (
        <mesh ref={laserRef} position={startPosition}>
            <cylinderGeometry args={[0.1, 0.1, 1, 6]} />
            <meshStandardMaterial color='red' />
        </mesh>
    );
};


export const Crosshair = () => {

    return (
        <div style={{
            position: 'absolute',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '15px',
            height: '15px',
            border: '4px solid orange',
            borderRadius: '50%'
        }}>
        </div>
    );
};


export const ScoreCompotent = ({ score }) => {

    return (
        <div style={{
            position: 'absolute',
            top: '5%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            width: '15px',
            height: '15px',
            fontSize: '24px',

            color: "white"

        }}>
            resalt:{score}
        </div>
    );
};



export const BestScore = ({ score }) => {
    const [bestScore, setBestScore] = useState(0);
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
        }
    }, [score, bestScore, setBestScore]);

    return (

        <div style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            color: 'white',
            fontSize: '24px',
        }}>
            best resalt:{bestScore}
        </div>

    );
};


export const Timer = ({ isGameActive, spawnInterval, setSpawnInterval }) => {
    const [countdown, setCountdown] = useState(spawnInterval / 1000); // Отсчет времени в секундах
    // Уменьшаем отсчет каждую секунду и сбрасываем его при появлении астероида
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    setSpawnInterval(prevInterval => prevInterval * 0.92); // Уменьшаем интервал появления
                    return spawnInterval / 1000;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [spawnInterval, setSpawnInterval]);

    const textTime = isGameActive ? `${countdown.toFixed(1)}s next asteroid ` : null

    return (
        <div style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
        }}>
            {textTime}
        </div>
    );
};



export const ButtonRestartGame = ({ onRestartGame }) => {


    return (
        <div
            onClick={() => onRestartGame()}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'none',
                position: 'absolute',
                bottom: '5%',

                right: '5%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: '2px solid white',
                height: '30px',
                width: '30px',

            }}>
            🔃        </div>
    );
};


