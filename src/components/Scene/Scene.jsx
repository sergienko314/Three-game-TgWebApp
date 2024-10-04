import React, { useEffect, useRef } from 'react';
import Spaceship from '../Spaceship/Spaceship';
import SolarSystem from '../SolarSystem';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';


export const Scene = () => {

    const spaceshipRef = useRef();
    const { scene } = useThree();


    useEffect(() => {
        // Направленный свет
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 10, 20); // Перемещаем источник света дальше и выше
        scene.add(directionalLight);

        // Глобальное освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Добавляем мягкое окружающее освещение
        scene.add(ambientLight);

        return () => {
            scene.remove(directionalLight);
            scene.remove(ambientLight); // Убираем свет при размонтировании
        };
    }, [scene]);

    return (
        <>
            <SolarSystem />
            <Spaceship spaceshipRef={spaceshipRef} />
        </>
    );
};