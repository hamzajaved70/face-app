import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face-recognition.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner"> <img alt='logo' src={face}></img> </div>
            </Tilt>
        </div>
    )
}

export default Logo