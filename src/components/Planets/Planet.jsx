import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Planet = ({ radius, speed, size, color, initialAngle }) => {
    const planetRef = useRef();
    const angleRef = useRef(initialAngle);

    // Анимация движения планеты по кругу
    useFrame(() => {
        // Угол движения планеты, который изменяется в зависимости от времени
        angleRef.current += speed;

        // Расчет координат по окружности
        const x = radius * Math.cos(angleRef.current);
        const z = radius * Math.sin(angleRef.current);

        planetRef.current.position.set(x, 0, z); // Устанавливаем позицию планеты
    });
    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} /> {/* Геометрия планеты */}
            <meshStandardMaterial color={color} /> {/* Цвет планеты */}
        </mesh>
    );

};

export default Planet