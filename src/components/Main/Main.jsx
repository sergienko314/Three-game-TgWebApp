// import Three from "../Three/Three";

import Game from "../Game/Game";

const Main = () => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
                <div style={{ height: '70px' }}>Header:</div>
                <Game />
            </div>
        </>
    );
};

export default Main
