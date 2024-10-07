import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import FlyControls from '../FlyControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Asteroid from '../Asteroid';
import { Laser } from '../Shutter/Shutter';

const Spaceship = () => {
    const spaceshipRef = useRef();
    const [lasers, setLasers] = useState([]);
    const [asteroids, setAsteroids] = useState([]);
    const [score, setScore] = useState(0);

    const handleGameOver = () => {
        alert('Game Over');
        setAsteroids([]); // Сброс астероидов
        setScore(0); // Сброс очков
    };


    const handleLaserHit = (asteroid) => {
        setAsteroids(asteroids.filter(a => a !== asteroid)); // Удаляем астероид
        setScore(score + 1); // Начисляем очки
    };

    useEffect(() => {
        const initialAsteroids = Array.from({ length: 5 }).map(() => (
            <Asteroid key={Math.random()}
                position={new THREE.Vector3(
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100
                )}
                onGameOver={handleGameOver}
                onDestroyed={() => handleLaserHit(this)} />
        ));
        setAsteroids(initialAsteroids);
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        const loader = new FBXLoader();
        loader.load('/Venator.fbx', (object) => {
            object.scale.set(0.02, 0.02, 0.02);
            object.position.set(0, 4.5, -30);
            object.rotation.set(0, Math.PI, 0);

            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        metalness: 0.5,
                        roughness: 0.1,
                    });
                }
            });

            spaceshipRef.current.add(object);
        });
    }, [spaceshipRef]);


    const handleShoot = useCallback(() => {
        const laserDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(spaceshipRef.current.quaternion);
        const laserPosition = spaceshipRef.current.localToWorld(new THREE.Vector3(0, 7, -50));

        setLasers((prevLasers) => [
            ...prevLasers,
            <Laser key={Math.random()} startPosition={laserPosition} direction={laserDirection} />
        ]);
    }, []);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                handleShoot();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [handleShoot]);


    return (
        <>
            <group ref={spaceshipRef} position={[0, 2, -50]} rotation={[0, Math.PI, 0]} scale={[-0.4, -0.4, 0.4]}>
                <FlyControls spaceshipRef={spaceshipRef} />
            </group>

            {lasers}
            {asteroids}
        </>
    );
};

export default Spaceship;