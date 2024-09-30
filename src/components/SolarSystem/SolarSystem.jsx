import Planet from "../Planets/Planet";

const SolarSystem = () => {
    return (
        <>
            {/* Солнце как центральный объект */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="yellow" />
            </mesh>

            {/* Планеты, каждая вращается на своем расстоянии от Солнца */}
            <Planet radius={5} speed={0.01} size={0.5} color="blue" initialAngle={0} /> {/* Земля */}
            <Planet radius={8} speed={0.008} size={0.6} color="red" initialAngle={Math.PI / 2} /> {/* Марс */}
            <Planet radius={11} speed={0.005} size={0.9} color="green" initialAngle={Math.PI} /> {/* Юпитер */}
        </>
    );
};

export default SolarSystem;