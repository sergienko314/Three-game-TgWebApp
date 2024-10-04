export function Stars() {
  const stars = [];
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 1000;
    const y = (Math.random() - 0.5) * 1000;
    const z = (Math.random() - 0.5) * 1000;
    stars.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    );
  }
  return <>{stars}</>;
}
