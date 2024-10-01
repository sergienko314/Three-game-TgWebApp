import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Planet = ({ radius, speed, size, color, initialAngle = 0 }) => {
    const planetRef = useRef();
    useFrame(() => {
        planetRef.current.rotation.y += 0.01;
        const time = performance.now() / 1000;
        planetRef.current.position.x = radius * Math.cos(time * speed + initialAngle);
        planetRef.current.position.z = radius * Math.sin(time * speed + initialAngle);
    });

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const Satellite = ({ radius, speed, size, color, parentPlanet, initialAngle = 0 }) => {
    const satelliteRef = useRef();

    useFrame(() => {
        if (satelliteRef.current && parentPlanet && parentPlanet.position) {
            const time = performance.now() / 1000;

            satelliteRef.current.position.x = parentPlanet.position.x + radius * Math.cos(time * speed + initialAngle);
            satelliteRef.current.position.z = parentPlanet.position.z + radius * Math.sin(time * speed + initialAngle);
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
    const asteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius + Math.random() * beltWidth;
        asteroids.push(
            <mesh key={i} position={[distance * Math.cos(angle), 0, distance * Math.sin(angle)]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="gray" />
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
            {/* Солнце */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={1} />
            </mesh>

            {/* Планеты */}
            <Planet radius={5} speed={0.01} size={0.5} color="blue" initialAngle={0} ref={earthRef} /> {/* Земля */}
            <Planet radius={8} speed={0.008} size={0.6} color="red" initialAngle={Math.PI / 2} /> {/* Марс */}
            <Planet radius={11} speed={0.005} size={0.9} color="green" initialAngle={Math.PI} ref={jupiterRef} /> {/* Юпитер */}
            <Planet radius={4} speed={0.012} size={0.4} color="gray" initialAngle={Math.PI / 3} /> {/* Меркурий */}
            <Planet radius={6} speed={0.011} size={0.45} color="lightyellow" initialAngle={Math.PI / 4} /> {/* Венера */}
            <Planet radius={15} speed={0.004} size={1.2} color="orange" initialAngle={Math.PI / 5} /> {/* Сатурн */}
            <Planet radius={18} speed={0.003} size={1.1} color="lightblue" initialAngle={Math.PI / 6} /> {/* Уран */}
            <Planet radius={21} speed={0.0025} size={1.0} color="darkblue" initialAngle={Math.PI / 7} /> {/* Нептун */}

            <Satellite radius={1} speed={0.02} size={0.1} color="gray" parentPlanet={earthRef.current} />
            <Satellite radius={2} speed={0.015} size={0.2} color="gray" parentPlanet={jupiterRef.current} />

            <AsteroidBelt radius={13} numAsteroids={100} beltWidth={1} />
            <AsteroidBelt radius={30} numAsteroids={50} beltWidth={2} />
        </>
    );
};

export default SolarSystem;