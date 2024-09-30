import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Controls = ({ spaceshipRef }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (spaceshipRef.current) {
      // Камера следует за кораблем, но учитывает его положение и повороты
      const spaceshipPosition = spaceshipRef.current.position;
      const offset = new THREE.Vector3(0, 2, 5).applyEuler(spaceshipRef.current.rotation); // Смещение камеры
      camera.position.copy(spaceshipPosition.clone().add(offset));
      camera.lookAt(spaceshipPosition);
    }
  });

  return null;
};