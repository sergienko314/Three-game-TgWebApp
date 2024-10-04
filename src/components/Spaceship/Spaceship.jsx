// import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


const Spaceship = ({ spaceshipRef }) => {
    const { camera } = useThree();
    const speedIncrement = 0.005;
    const rotationSpeed = 0.020;
    const maxSpeed = 0.5;
    const minSpeed = 0.007;
    const friction = 0.98;

    const [velocity, setVelocity] = useState(0);
    const [keysPressed, setKeysPressed] = useState({
        w: false,
        s: false,
        a: false,
        d: false,
        ArrowDown: false,
        ArrowUp: false,
    });

    const loader = new FBXLoader();



    useEffect(() => {
        loader.load('/Venator.fbx', (object) => {
            object.scale.set(0.03, 0.03, 0.03); // Уменьшаем масштаб модели
            object.position.set(0, 10, -40); // Опускаем корабль вниз экрана
            object.rotation.set(0, Math.PI, 0); // Разворачиваем корабль, чтобы летел вперед

            // Временно заменим материал, чтобы убедиться, что свет работает
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        // color: 0x5555ff,  // Цвет
                        metalness: 0.5,  // Металлический эффект
                        roughness: 0.1,  // Гладкость поверхности
                    });
                }
            });

            spaceshipRef.current.add(object);
        });
        // eslint-disable-next-line
    }, [spaceshipRef])


    const handleKeyDown = (event) => {
        setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
        setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        if (spaceshipRef.current) {
            const position = spaceshipRef.current.position;
            const rotation = spaceshipRef.current.rotation;

            if (keysPressed.ArrowUp) {
                setVelocity((prev) => Math.min(prev + speedIncrement, maxSpeed));
            } else if (keysPressed.ArrowDown) {
                setVelocity((prev) => Math.max(prev - speedIncrement, -maxSpeed));
            } else {
                setVelocity((prev) => Math.max(prev * friction, minSpeed));
            }
            const pitchQuaternion = new THREE.Quaternion();
            if (keysPressed.w || keysPressed.ц) {
                pitchQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotationSpeed / 2);
                spaceshipRef.current.quaternion.multiply(pitchQuaternion);
            }
            if (keysPressed.s || keysPressed.ы) {
                pitchQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -rotationSpeed / 2);
                spaceshipRef.current.quaternion.multiply(pitchQuaternion);
            }


            const yawQuaternion = new THREE.Quaternion();
            if (keysPressed.a || keysPressed.ф) {
                yawQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed);
                spaceshipRef.current.quaternion.multiply(yawQuaternion);
            }
            if (keysPressed.d || keysPressed.в) {
                yawQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -rotationSpeed);
                spaceshipRef.current.quaternion.multiply(yawQuaternion);
            }

            const forwardVector = new THREE.Vector3(0, 0, -1).applyEuler(rotation);
            position.addScaledVector(forwardVector, velocity);
            const cameraOffset = new THREE.Vector3(0, 4, 10).applyEuler(rotation);
            camera.position.copy(position.clone().add(cameraOffset));
            const lookAtPosition = position.clone();
            lookAtPosition.y += 2;
            camera.lookAt(lookAtPosition);
        }
    });

    return (
        <group ref={spaceshipRef} position={[0, -2, -40]} rotation={[0, Math.PI, 0]} scale={[-0.4, -0.4, 0.4]}>
            {/* Отображаем загруженную модель космического корабля */}
        </group>
    );
};

export default Spaceship;