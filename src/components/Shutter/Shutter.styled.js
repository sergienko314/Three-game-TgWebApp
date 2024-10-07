import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Laser = ({ position, direction }) => {
  const laserRef = useRef();

  useFrame(() => {
    if (laserRef.current) {
      laserRef.current.position.add(direction.clone().multiplyScalar(0.5));
    }
  });

  return (
    <mesh ref={laserRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default Laser;
