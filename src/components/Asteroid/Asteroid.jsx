import React, { useEffect, useState } from 'react';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';

const Asteroid = ({ asteroidRef, position, health, onRestartGame }) => {
    const { scene, camera } = useThree();
    const diffuseMap = useLoader(THREE.TextureLoader, "/textures/lava.jpg");
    const [isDestroyed, setIsDestroyed] = useState(false);

    // Добавляем 2D текстовую метку здоровья
    useEffect(() => {
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
            requestAnimationFrame(animate);
            css2dRenderer.render(scene, camera);
        };
        animate();

        return () => {
            css2dRenderer.domElement.remove();
        };
    }, [scene, camera, health, asteroidRef]);

    useEffect(() => {
        const healthLabel = asteroidRef.current?.children.find((child) => child instanceof CSS2DObject)?.element;
        if (healthLabel) {
            healthLabel.innerText = `HP: ${health}`;
        }

        // Запускаем эффект разрушения, если здоровье астероида опускается до нуля
        if (health <= 0 && asteroidRef.current) {
            setIsDestroyed(true);
            console.log(`Asteroid at position ${asteroidRef.current.position.toArray()} is destroyed.`);
        }
    }, [health, asteroidRef]);

    useEffect(() => {
        if (isDestroyed) {
            const fragments = [];
            for (let i = 0; i < 5; i++) {
                const fragment = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 16, 16),
                    new THREE.MeshStandardMaterial({ color: 'gray', map: diffuseMap })
                );
                fragment.position.copy(asteroidRef.current.position);
                fragment.position.x += Math.random() * 2 - 1;
                fragment.position.y += Math.random() * 2 - 1;
                fragment.position.z += Math.random() * 2 - 1;
                fragment.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                );
                scene.add(fragment);
                fragments.push(fragment);

                console.log(`Fragment ${i} created at position: ${fragment.position.toArray()}`);
            }

            // Анимация фрагментов
            const animateFragments = () => {
                fragments.forEach((fragment, index) => {
                    fragment.position.add(fragment.velocity);
                    fragment.scale.multiplyScalar(0.98);

                    console.log(`Fragment ${index} position: ${fragment.position.toArray()}, scale: ${fragment.scale.toArray()}`);

                    if (fragment.scale.x < 0.1) {
                        scene.remove(fragment);
                        fragments.splice(index, 1);
                        console.log(`Fragment ${index} removed`);
                    }
                });

                if (fragments.length > 0) {
                    requestAnimationFrame(animateFragments);
                } else {
                    console.log('All fragments removed.');
                }
            };
            animateFragments();
        }
    }, [isDestroyed, scene, diffuseMap, asteroidRef]);

    useFrame(() => {
        if (asteroidRef.current && !isDestroyed) {
            const direction = new THREE.Vector3(0, 0, 0).sub(asteroidRef.current.position).normalize();
            asteroidRef.current.position.add(direction.multiplyScalar(0.05));

            if (asteroidRef.current.position.length() < 5) {
                onRestartGame();
            }
        }

    });

    return (
        <mesh ref={asteroidRef} position={position}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color='gray' map={diffuseMap} />
        </mesh>
    );
};

export default Asteroid;