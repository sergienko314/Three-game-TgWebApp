import React from 'react';

const Sun = (props) => {
    return (
        <>
            {/* Можем добавить точечный свет для создания эффекта, что Солнце освещает планеты */}
            <pointLight intensity={1} distance={100} decay={2} {...props} />

            {/* Визуально можно создать сферу, которая будет выглядеть как солнце */}
            <mesh {...props}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
        </>
    );
}

export default Sun;
