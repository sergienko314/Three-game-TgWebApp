import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const Asteroid = ({ position, onGameOver, onDestroyed }) => {
    const asteroidRef = useRef();
    const [health, setHealth] = useState(3);
    console.log("setHealth", setHealth);
    const { scene, camera } = useThree();

    useEffect(() => {
        let isMounted = true;
        const css2dRenderer = new CSS2DRenderer();
        css2dRenderer.setSize(window.innerWidth, window.innerHeight);
        css2dRenderer.domElement.style.position = 'absolute';
        css2dRenderer.domElement.style.top = '0';
        css2dRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(css2dRenderer.domElement);

        const healthLabel = document.createElement('div');
        healthLabel.className = 'healthLabel';
        healthLabel.style.color = 'red';
        healthLabel.style.fontSize = '12px';
        healthLabel.innerText = `HP: ${health}`;
        const healthObject = new CSS2DObject(healthLabel);
        healthObject.position.set(0, 2.5, 0);
        asteroidRef.current.add(healthObject);

        const animate = () => {
            if (isMounted) {
                requestAnimationFrame(animate);
                css2dRenderer.render(scene, camera);
            }
        };
        animate();

        return () => {
            isMounted = false;
            document.body.removeChild(css2dRenderer.domElement);
        };
        // eslint-disable-next-line
    }, [scene, camera]);

    // Обновляем метку здоровья при каждом изменении `health`
    useEffect(() => {
        if (asteroidRef.current) {
            asteroidRef.current.children.forEach((child) => {
                if (child instanceof CSS2DObject) {
                    child.element.innerText = `HP: ${health}`;
                }
            });
        }

        if (health <= 0) {
            onDestroyed();
        }
    }, [health, onDestroyed]);

    useFrame(() => {
        if (asteroidRef.current) {
            const direction = new THREE.Vector3(0, 0, 0).sub(asteroidRef.current.position).normalize();
            asteroidRef.current.position.add(direction.multiplyScalar(0.1));

            if (asteroidRef.current.position.length() < 5) {
                onGameOver();
            }
        }
    });


    return (
        <mesh ref={asteroidRef} position={position}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color='gray' />
        </mesh>
    );
};

export default Asteroid;