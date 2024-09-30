// import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const Spaceship = ({ spaceshipRef }) => {
    const { camera } = useThree(); // Доступ к камере
    const speedIncrement = 0.005; // Увеличение скорости при удерживании клавиши
    const rotationSpeed = 0.020; // Скорость поворота
    const maxSpeed = 0.5; // Максимальная скорость
    const minSpeed = 0.002; // Минимальная скорость инерции
    const friction = 0.098; // Снижение скорости из-за трения

    const [velocity, setVelocity] = useState(0); // Текущая скорость
    const [keysPressed, setKeysPressed] = useState({
        w: false,
        s: false,
        a: false,
        d: false,
        ArrowDown: false,
        ArrowUp: false,
    });
    console.log(keysPressed);


    const handleKeyDown = (event) => {
        setKeysPressed((prev) => ({ ...prev, [event.key]: true })); // Изменено на event.key
    };

    const handleKeyUp = (event) => {
        setKeysPressed((prev) => ({ ...prev, [event.key]: false })); // Изменено на event.key
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Управление кораблем на каждом кадре
    useFrame(() => {
        if (spaceshipRef.current) {
            const position = spaceshipRef.current.position;
            const rotation = spaceshipRef.current.rotation;
            // Движение вперед/назад
            if (keysPressed.ArrowUp) {
                setVelocity((prev) => Math.min(prev + speedIncrement, maxSpeed));
            } else if (keysPressed.ArrowDown) {
                setVelocity((prev) => Math.max(prev - speedIncrement, -maxSpeed));
            } else {
                // Если клавиши не нажаты, скорость уменьшается до минимальной за счёт трения
                setVelocity((prev) => Math.max(prev * friction, minSpeed));
            }

            // Повороты
            if (keysPressed.a || keysPressed.ф) {
                rotation.y += rotationSpeed; // Поворот влево
            }
            if (keysPressed.d || keysPressed.в) {
                rotation.y -= rotationSpeed; // Поворот вправо
            }

            // Изменение высоты
            if (keysPressed.w || keysPressed.ц) {
                position.y += rotationSpeed * 4; // Подъем
            }
            if (keysPressed.s || keysPressed.ы) {
                position.y -= rotationSpeed * 4; // Спуск
            }

            const forwardVector = new THREE.Vector3(0, 0, -1).applyEuler(rotation);
            position.addScaledVector(forwardVector, velocity);
            // // // Камера следует за кораблем и поворачивается вместе с ним
            const cameraOffset = new THREE.Vector3(0, 4, 10).applyEuler(rotation); // Смещение камеры
            camera.position.copy(position.clone().add(cameraOffset));
            const lookAtPosition = position.clone();
            lookAtPosition.y += 2;  // Камера будет смотреть на 5 единиц выше корабля
            camera.lookAt(lookAtPosition);

        }
    });

    return (
        // Размещаем корабль (куб) ниже центра
        <mesh ref={spaceshipRef} position={[0, -2, 10]} rotation={[0, Math.PI, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

export default Spaceship;