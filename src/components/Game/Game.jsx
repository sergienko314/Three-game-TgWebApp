import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Game = () => {
    const threeWrapperRef = useRef(null);

    useEffect(() => {

        const currentDiv = threeWrapperRef.current;

        // Создаем сцену
        const scene = new THREE.Scene();

        // Камера
        const camera = new THREE.PerspectiveCamera(75, currentDiv.clientWidth / currentDiv.clientHeight, 0.1, 1000);
        camera.position.set(0, 10, 40); // Устанавливаем камеру

        // Рендерер
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentDiv.clientWidth, currentDiv.clientHeight);
        currentDiv.appendChild(renderer.domElement);

        // Создаем плоскость
        const planeGeometry = new THREE.PlaneGeometry(50, 50);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x008800, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2; // Поворачиваем плоскость, чтобы она лежала горизонтально
        scene.add(plane);

        // Создаем шар
        const ballGeometry = new THREE.SphereGeometry(1, 32, 32,);
        const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

        const groupeBall = new THREE.Group()



        const ball1 = new THREE.Mesh(ballGeometry, ballMaterial);
        ball1.position.y = 1; // Поднимаем шар над плоскостью


        const ball2 = new THREE.Mesh(ballGeometry, ballMaterial);
        ball2.position.y = 1; // Поднимаем шар над плоскостью
        ball2.position.x = 3; // Поднимаем шар над плоскостью


        const ball3 = new THREE.Mesh(ballGeometry, ballMaterial);
        ball3.position.y = 1; // Поднимаем шар над плоскостью
        ball3.position.x = -3; // Поднимаем шар над плоскостью

        groupeBall.scale.x = 3
        groupeBall.scale.y = 3
        // groupeBall.rotation.x += 0.9

        groupeBall.add(ball1);
        groupeBall.add(ball2);
        groupeBall.add(ball3);

        scene.add(groupeBall)
        // Управление шаром
        let speed = { x: 0, z: 0 };
        const speedStep = 0.1;

        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    speed.z = -speedStep;
                    break;
                case 'ArrowDown':
                    speed.z = speedStep;
                    break;
                case 'ArrowLeft':
                    speed.x = -speedStep;
                    break;
                case 'ArrowRight':
                    speed.x = speedStep;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    speed.z = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    speed.x = 0;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Анимация
        const animate = () => {
            requestAnimationFrame(animate);

            // Обновляем позицию шара
            groupeBall.position.x += speed.x;
            groupeBall.position.z += speed.z;

            renderer.render(scene, camera);
        };

        animate();

        // Очистка ресурсов при размонтировании
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            currentDiv.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div id="ThreeWrapper" ref={threeWrapperRef} style={{ height: '100%' }}></div>
        </div>
    );
};

export default Game;