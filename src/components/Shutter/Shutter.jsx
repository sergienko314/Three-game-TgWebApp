import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const Laser = ({ startPosition, direction }) => {
    const laserRef = useRef();

    useFrame((state, delta) => {
        if (laserRef.current) {
            // Двигаем лазер вперед
            laserRef.current.position.add(direction.clone().normalize().multiplyScalar(delta * 300));

            // Вращение лазера вокруг оси X для горизонтального вращения
            laserRef.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), delta * 30);

            // Удаляем лазер, если он выходит за пределы сцены
            if (laserRef.current.position.length() > 1000) {
                laserRef.current.visible = false;
            }
        }
    });

    return (
        <mesh ref={laserRef} position={startPosition} rotation={new THREE.Euler(0, 0, 0)}>
            <cylinderGeometry args={[0.1, 0.1, 1, 6]} />
            <meshStandardMaterial color='red' />
        </mesh>
    );
}





export const Crosshair = () => {

    return (
        <div style={{
            position: 'absolute',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '15px',
            height: '15px',
            border: '4px solid orange',
            borderRadius: '50%'
        }}>
        </div>
    );
};


