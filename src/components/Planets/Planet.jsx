
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, forwardRef, useState, useEffect } from "react";
import { TextureLoader } from "three";

const Planet = forwardRef(({ radius, speed, size, initialAngle, diffuseMapLink, displacementMapLink }, forwardedRef) => {
    const localRef = useRef();
    const planetRef = forwardedRef || localRef;
    const angleRef = useRef(initialAngle);

    const [texturesLoaded, setTexturesLoaded] = useState(false);  // Флаг для проверки загрузки текстур

    // Загрузка текстур
    const diffuseMap = useLoader(TextureLoader, String(diffuseMapLink));
    const displacementMap = useLoader(TextureLoader, String(displacementMapLink));

    // Как только текстуры загрузились, меняем состояние
    useEffect(() => {
        if (diffuseMap && displacementMap) {
            setTexturesLoaded(true);
        }
    }, [diffuseMap, displacementMap]);

    useFrame(() => {
        angleRef.current += speed;

        const x = radius * Math.cos(angleRef.current);
        const z = radius * Math.sin(angleRef.current);

        if (planetRef.current) {
            planetRef.current.position.set(x, 0, z);
        }
    });



    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            {texturesLoaded && ( // Рендерим только если текстуры загружены
                <meshStandardMaterial
                    map={diffuseMap}  // Текстура для основного цвета
                    // displacementMap={displacementMap}  // Карта смещения
                    displacementScale={0.05}  // Масштаб смещения для рельефа
                    roughness={0.8}  // Значение шероховатости
                />
            )}
        </mesh>
    );
});

export default Planet;