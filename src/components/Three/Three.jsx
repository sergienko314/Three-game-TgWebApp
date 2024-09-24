import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Three = () => {
    const threeWrapperRef = useRef(null); // Создаем реф для div

    useEffect(() => {
        // Получаем элемент div через реф
        const currentDiv = threeWrapperRef.current;

        // Создаем сцену
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentDiv.clientWidth / currentDiv.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(currentDiv.clientWidth, currentDiv.clientHeight);

        // Вставляем canvas в div
        currentDiv.appendChild(renderer.domElement);

        // Создаем простой куб
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Позиционируем камеру
        camera.position.z = 5;

        // Анимационная функция
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Очистка при размонтировании компонента
        return () => {
            currentDiv.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []); // Пустой массив зависимостей, чтобы useEffect сработал только один раз при монтировании

    return (
        <>

            <div id="ThreeWrapper" ref={threeWrapperRef} style={{ height: '100%' }}></div>
        </>
    );
};

export default Three;