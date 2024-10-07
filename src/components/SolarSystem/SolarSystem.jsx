import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import Planet from '../Planets/Planet';
import Sun from '../Sun/Sun';
import { TextureLoader } from 'three';

const Satellite = ({ radius, speed, size, color, parentPlanet, initialAngle = 0 }) => {
    const satelliteRef = useRef();

    useFrame(() => {
        if (satelliteRef.current && parentPlanet) {
            const parentPos = parentPlanet.position;

            // Проверяем, что parentPos существует, прежде чем использовать его
            if (parentPos) {
                const time = performance.now() / 1000;
                satelliteRef.current.position.x = parentPos.x + radius * Math.cos(time * speed + initialAngle);
                satelliteRef.current.position.z = parentPos.z + radius * Math.sin(time * speed + initialAngle);
            }
        }
    });

    return (
        <mesh ref={satelliteRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const AsteroidBelt = ({ radius, numAsteroids, beltWidth }) => {

    const diffuseMap = useLoader(TextureLoader, '/textures/venus_diff_4k.jpg');

    const asteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius + Math.random() * beltWidth;
        asteroids.push(
            <mesh key={i} position={[distance * Math.cos(angle), 0, distance * Math.sin(angle)]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    map={diffuseMap} />
            </mesh>
        );
    }

    return <group>{asteroids}</group>;
};

const SolarSystem = () => {
    const earthRef = useRef();
    const jupiterRef = useRef();

    return (
        <>
            <Sun />
            <Planet diffuseMapLink="/textures/earth_diff_4k.jpg" displacementMapLink="/textures/earth_disp_4k.png" radius={5} speed={0.01} size={0.5} color="blue" initialAngle={0} ref={earthRef} />
            <Planet diffuseMapLink="/textures/mars_diff_4k.jpg" displacementMapLink="/textures/mars_disp_4k.png" radius={8} speed={0.008} size={0.6} color="red" initialAngle={Math.PI / 2} />
            <Planet diffuseMapLink="/textures/jupiter_diff_4k.jpg" displacementMapLink="/textures/jupiter_disp_4k.png" radius={11} speed={0.005} size={0.9} color="green" initialAngle={Math.PI} ref={jupiterRef} />
            <Planet diffuseMapLink="/textures/mercury_diff_4k.jpg" displacementMapLink="/textures/mercury_disp_4k.png" radius={4} speed={0.012} size={0.4} color="gray" initialAngle={Math.PI / 3} />
            <Planet diffuseMapLink="/textures/venus_diff_4k.jpg" displacementMapLink="/textures/venus_disp_4k.png" radius={6} speed={0.011} size={0.45} color="lightyellow" initialAngle={Math.PI / 4} />
            <Planet diffuseMapLink="/textures/saturn_diff_4k.jpg" displacementMapLink="/textures/saturn_disp_4k.png" radius={15} speed={0.004} size={1.2} color="orange" initialAngle={Math.PI / 5} />
            <Planet diffuseMapLink="/textures/uranus_diff_4k.jpg" displacementMapLink="/textures/uranus_disp_4k.png" radius={18} speed={0.003} size={1.1} color="lightblue" initialAngle={Math.PI / 6} />
            <Planet diffuseMapLink="/textures/neptune_diff_4k.jpg" displacementMapLink="/textures/neptune_disp_4k.png" radius={21} speed={0.0025} size={1.0} color="darkblue" initialAngle={Math.PI / 7} />
            <Satellite radius={1} speed={0.02} size={0.1} color="gray" parentPlanet={earthRef.current} />
            <Satellite radius={2} speed={0.015} size={0.2} color="gray" parentPlanet={jupiterRef.current} />
            <AsteroidBelt radius={13} numAsteroids={100} beltWidth={1} />
            <AsteroidBelt radius={30} numAsteroids={50} beltWidth={2} />
        </>
    );
};

export default SolarSystem;