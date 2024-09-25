import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Three = () => {
    const threeWrapperRef = useRef(null); // Создаем реф для div

    useEffect(() => {
        // Получаем элемент div через реф
        const currentDiv = threeWrapperRef.current;

        // Создаем сцену
        const scene = new THREE.Scene();
        // const axesHalper = new THREE.AxesHelper(2)
        // scene.add(axesHalper)
        const camera = new THREE.PerspectiveCamera(75, currentDiv.clientWidth / currentDiv.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentDiv.clientWidth, currentDiv.clientHeight);

        // Вставляем canvas в div
        currentDiv.appendChild(renderer.domElement);

        // Создаем простой куб
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);


        // Позиционируем камеру
        camera.position.z = 5;


        // Анимационная функция
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.03;
            renderer.render(scene, camera);
        };

        animate();

        // Очистка при размонтировании компонента
        return () => {
            currentDiv.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div id="ThreeWrapper" ref={threeWrapperRef} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
        </>
    );
};

export default Three;