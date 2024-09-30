import React from 'react';

function Preloader() {
    return (
        <div style={styles.container}>
            <div style={styles.loader}>Loading...</div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
    },
    loader: {
        color: '#fff',
        fontSize: '24px',
        fontFamily: 'Arial',
    },
};

export default Preloader;