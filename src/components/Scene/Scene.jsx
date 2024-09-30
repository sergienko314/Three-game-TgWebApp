import React, { useRef } from 'react';
import Spaceship from '../Spaceship/Spaceship';
import SolarSystem from '../SolarSystem';

export const Scene = () => {
    const spaceshipRef = useRef();

    return (
        <>
            <SolarSystem />
            <Spaceship spaceshipRef={spaceshipRef} />
        </>
    );
};