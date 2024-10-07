import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import FlyControls from '../FlyControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Asteroid from '../Asteroid';
import { Laser } from '../Shutter/Shutter';

const Spaceship = ({ onRestartGame, asteroids, setAsteroids, spawnInterval, setSpawnInterval, setScore }) => {
    const spaceshipRef = useRef();
    const [lasers, setLasers] = useState([]);


    const handleLaserHit = useCallback((asteroidId) => {
        setAsteroids((prevAsteroids) =>
            prevAsteroids
                .map((asteroid) => {
                    if (asteroid.id === asteroidId) {
                        asteroid.health -= 1;
                        if (asteroid.health <= 0) {
                            console.log(`Asteroid ${asteroidId} destroyed.`);
                            return null; // Удаляем астероид
                        }
                    }
                    return asteroid;
                })
                .filter(Boolean) // Убираем null значения
        );
        setScore((prevScore) => prevScore + 1);
    }, [setAsteroids, setScore]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            const newAsteroid = {
                id: Math.random(),
                position: new THREE.Vector3(
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100
                ),
                health: 3,
                ref: React.createRef() // Создаём ref для астероида
            };

            setAsteroids(prevAsteroids => [...prevAsteroids, newAsteroid]);

            setSpawnInterval(prevInterval => Math.max(prevInterval * 0.98, 3000));
        }, spawnInterval);

        return () => clearInterval(intervalId);

    }, [spawnInterval, setSpawnInterval, setAsteroids]); // Обновляем эффект, когда изменяется spawnInterval

    // eslint-disable-next-line  
    const handleShoot = () => {
        const laserDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(spaceshipRef.current.quaternion);
        const laserPosition = spaceshipRef.current.localToWorld(new THREE.Vector3(0, 7, -50));

        setLasers((prevLasers) => [
            ...prevLasers,
            { id: Math.random(), position: laserPosition, direction: laserDirection }
        ]);
    };

    // Обработчик нажатия клавиши для стрельбы
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                handleShoot();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleShoot]);

    // Загрузка и настройка модели корабля
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
    }, []);

    return (
        <>
            <group ref={spaceshipRef} position={[0, 2, -50]} rotation={[0, Math.PI, 0]} scale={[-0.4, -0.4, 0.4]}>
                <FlyControls spaceshipRef={spaceshipRef} />
            </group>


            {lasers.map((laser) => (
                <Laser
                    key={laser.id}
                    id={laser.id}
                    startPosition={laser.position}
                    direction={laser.direction}
                    asteroids={asteroids}
                    onHitAsteroid={handleLaserHit}
                />
            ))}

            {asteroids.map((asteroid) => (
                <Asteroid
                    asteroidRef={asteroid.ref}
                    key={asteroid.id}
                    id={asteroid.id}
                    position={asteroid.position}
                    health={asteroid.health}
                    onDestroyed={() => handleLaserHit(asteroid.id)}
                    onRestartGame={onRestartGame}

                />
            ))}
        </>
    );
};

export default Spaceship;