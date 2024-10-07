
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Preloader from '../Preloader/Preloader.jsx';
import { Scene } from '../Scene/Scene';
import { loadTextures } from './loadTextures.js';
import { BestScore, ButtonRestartGame, Crosshair, ScoreCompotent, Timer } from '../Shutter/Shutter.jsx';

const App = () => {
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [textures, setTextures] = useState(null);
    const [fov, setFov] = useState(45);
    const [spawnInterval, setSpawnInterval] = useState(10000); // Интервал появления в миллисекундах
    const [asteroids, setAsteroids] = useState([]);

    const [isGameActive, setIsGameActive] = useState(true);

    console.log("loading", loading);

    const onRestartGame = () => {
        if (window.confirm("Restart the game?")) {
            setIsGameActive(true);
            setScore(0);
            setSpawnInterval(10000); // Сбрасываем интервал спавна
            setAsteroids([])
        } else {
            setIsGameActive(false); // Останавливаем игру
        }
    };


    console.log("loading", loading);


    const updateFov = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const calculatedFov = Math.atan(Math.tan((45 * Math.PI) / 360) / aspectRatio) * 360 / Math.PI;
        setFov(calculatedFov);
    };



    useEffect(() => {
        // Список текстур для загрузки
        const textureUrls = [
            '/textures/mars_diff_4k.jpg',
            '/textures/mars_disp_4k.png',
            // Добавь другие текстуры по необходимости
        ];

        // Загружаем все текстуры
        loadTextures(textureUrls)
            .then((loadedTextures) => {
                setTextures(loadedTextures);  // Сохраняем загруженные текстуры
                setLoading(false);  // Убираем лоадер после загрузки
            })
            .catch((error) => {
                console.error('Error loading textures:', error);
            });

        window.addEventListener('resize', updateFov);
        updateFov();

        return () => {
            window.removeEventListener('resize', updateFov);
        };
    }, []);



    return (
        <>
            <Suspense fallback={<Preloader />}>

                <Canvas
                    camera={{ fov: fov, position: [0, 0, 20] }}
                    style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'radial-gradient(circle at 50% 50%, #070737, #191c1d)',  // Градиент для фона
                    }}
                >

                    <ambientLight intensity={0.5} />

                    <Scene onRestartGame={onRestartGame} asteroids={asteroids} setAsteroids={setAsteroids} spawnInterval={spawnInterval} setSpawnInterval={setSpawnInterval} setScore={setScore} textures={textures} />

                </Canvas>
                <ScoreCompotent score={score} />
                <Crosshair />
                <Timer isGameActive={isGameActive} spawnInterval={spawnInterval} setSpawnInterval={setSpawnInterval} />
                <BestScore score={score} />
                <ButtonRestartGame onRestartGame={onRestartGame} />
            </Suspense >

        </>
    );
};

export default App;