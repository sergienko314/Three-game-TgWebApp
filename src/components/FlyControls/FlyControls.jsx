import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FlyControls = ({ spaceshipRef }) => {
    const { camera } = useThree();
    const maxSpeed = 20; // Максимальная скорость
    const acceleration = 0.11; // Ускорение
    const friction = 0.98; // Плавное торможение (инерция)

    const velocity = useRef(new THREE.Vector3(0, 0, 0)); // Вектор скорости для камеры и корабля
    const moveVector = useRef(new THREE.Vector3(0, 0, 0)); // Вектор движения камеры и корабля
    const rotationVector = useRef(new THREE.Vector3(0, 0, 0)); // Вектор вращения корабля
    const tmpQuaternion = useRef(new THREE.Quaternion()); // Кватернион для поворотов корабля
    const upVector = new THREE.Vector3(0, 1, 0); // Вектор "вверх" для камеры

    // Состояние для управления кораблем
    const moveState = useRef({
        forward: 0, back: 0,
        left: 0, right: 0,
        pitchUp: 0, pitchDown: 0,
        yawLeft: 0, yawRight: 0,
        rollLeft: 0, rollRight: 0
    });

    const handleKeyDown = (event) => {
        switch (event.code) {
            case 'KeyW': moveState.current.pitchUp = 1; break;
            case 'KeyS': moveState.current.pitchDown = 1; break;
            case 'KeyA': moveState.current.yawLeft = 1; break; // Поворот влево
            case 'KeyD': moveState.current.yawRight = 1; break;// Поворот вправо
            case 'ArrowUp': moveState.current.back = 1; break;  // Движение вперед
            case 'ArrowDown': moveState.current.forward = 1; break; // Движение назад
            case 'ArrowLeft': moveState.current.rollLeft = 1; break;  // Крен влево
            case 'ArrowRight': moveState.current.rollRight = 1; break; // Крен вправо
            default: // По умолчанию ничего
        }
    };

    const handleKeyUp = (event) => {
        switch (event.code) {
            case 'KeyW': moveState.current.pitchUp = 0; break;
            case 'KeyS': moveState.current.pitchDown = 0; break;
            case 'KeyA': moveState.current.yawLeft = 0; break;
            case 'KeyD': moveState.current.yawRight = 0; break;
            case 'ArrowUp': moveState.current.back = 0; break;
            case 'ArrowDown': moveState.current.forward = 0; break;
            case 'ArrowLeft': moveState.current.rollLeft = 0; break;
            case 'ArrowRight': moveState.current.rollRight = 0; break;
            default: // По умолчанию ничего
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Обновление векторов движения и вращения
    const updateMovementVector = () => {
        const forward = moveState.current.forward ? 1 : (moveState.current.back ? -1 : 0);
        moveVector.current.set(0, 0, forward); // Вперед/назад для движения корабля и камеры
    };

    const updateRotationVector = () => {
        rotationVector.current.set(
            -moveState.current.pitchDown + moveState.current.pitchUp,
            -moveState.current.yawRight + moveState.current.yawLeft,
            -moveState.current.rollRight + moveState.current.rollLeft
        );
    };

    // Главный цикл рендеринга (управление движением и вращением)
    useFrame((state, delta) => {
        if (!spaceshipRef.current) return;

        // Обновление векторов
        updateMovementVector();
        updateRotationVector();

        // Применение ускорения к движению вперёд/назад
        const deltaVelocity = moveVector.current.clone().multiplyScalar(delta * acceleration);
        velocity.current.add(deltaVelocity);

        // Ограничение максимальной скорости
        if (velocity.current.length() > maxSpeed) {
            velocity.current.normalize().multiplyScalar(maxSpeed);
        }

        // Плавное замедление (инерция)
        velocity.current.multiplyScalar(friction);

        // Применяем вращение к кораблю
        tmpQuaternion.current.set(
            rotationVector.current.x * delta * 0.3, // pitch
            rotationVector.current.y * delta * 0.3, // yaw
            rotationVector.current.z * delta * 0.3, // roll
            1
        ).normalize();
        spaceshipRef.current.quaternion.multiply(tmpQuaternion.current);

        // Двигаем корабль и камеру вперёд по направлению носа корабля
        const forwardVector = new THREE.Vector3(0, 0, 2).applyQuaternion(spaceshipRef.current.quaternion);
        spaceshipRef.current.position.addScaledVector(forwardVector, velocity.current.z);

        // Камера следует за вращениями и движением корабля
        camera.position.copy(spaceshipRef.current.position.clone().add(forwardVector.clone().multiplyScalar(5)));
        camera.quaternion.copy(spaceshipRef.current.quaternion); // Камера копирует вращение корабля

        // Фиксируем "вверх" камеры для предотвращения переворотов
        camera.up.copy(upVector);
    });

    return null;
};

export default FlyControls;