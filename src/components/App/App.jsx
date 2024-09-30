
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Preloader from '../Preloader/Preloader.jsx';
import { Scene } from '../Scene/Scene';





const App = () => {
    const [loading, setLoading] = useState(true);
    const [fov, setFov] = useState(45); // Исходный FOV

    // Функция для динамической настройки FOV в зависимости от размера окна
    const updateFov = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const calculatedFov = Math.atan(Math.tan((45 * Math.PI) / 360) / aspectRatio) * 360 / Math.PI;
        setFov(calculatedFov);
    };

    useEffect(() => {
        // Имитируем загрузку ресурсов, это можно заменить на реальную проверку загрузки моделей
        setTimeout(() => setLoading(false), 400);

        // При изменении размера окна обновляем FOV
        window.addEventListener('resize', updateFov);

        // Вызываем функцию при загрузке страницы, чтобы сразу установить правильный FOV
        updateFov();

        return () => {
            window.removeEventListener('resize', updateFov);
        };
    }, []);
    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <Canvas
                    camera={{ fov: fov, position: [0, 0, 20] }} // FOV настроен для лучшего восприятия
                    style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
                >
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Preloader />}>
                        <Scene />
                    </Suspense>
                </Canvas>
            )}
        </>
    );
}

export default App;
