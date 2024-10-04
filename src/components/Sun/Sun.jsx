import { useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';


const Sun = (props) => {
    const diffuseMap = useLoader(TextureLoader, "/textures/sun_diff_4k.jpg");
    const displacementMap = useLoader(TextureLoader, "/textures/sun_disp_4k.png");

    return (
        <>
            {/* <pointLight intensity={1} distance={100} decay={2} {...props} /> */}

            <mesh >
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial
                    map={diffuseMap}  // Текстура для основного цвета
                    displacementMap={displacementMap}  // Карта смещения
                    displacementScale={0.05}  // Масштаб смещения для рельефа
                    roughness={0.4}
                    // emissive={new THREE.Color(0xffff33)} // Желтый цвет
                    color={new THREE.Color(0xffff33)} // Желтый оттенок на текстуре

                />
            </mesh>
        </>
    );
}

export default Sun;
