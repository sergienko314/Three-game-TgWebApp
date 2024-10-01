import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Planet = ({ radius, speed, size, color, initialAngle }) => {
    const planetRef = useRef();
    const angleRef = useRef(initialAngle);
    useFrame(() => {
        angleRef.current += speed;

        const x = radius * Math.cos(angleRef.current);
        const z = radius * Math.sin(angleRef.current);

        planetRef.current.position.set(x, 0, z);
    });
    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );

};

export default Planet