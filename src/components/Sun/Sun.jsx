import React from 'react';

const Sun = (props) => {
    return (
        <>
            <pointLight intensity={1} distance={100} decay={2} {...props} />

            <mesh {...props}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
        </>
    );
}

export default Sun;
