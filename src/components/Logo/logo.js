import React from 'react';
import { Tilt } from 'react-tilt';
// import Login from './login';

import './logo.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div className='ma4 nt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max: 25}} style={{ height: 60, width: 100 }}>
                <div className='Tilt-inner'>
                    {/* 👽 */}
                    <img src={brain} style={{paddingTop: '5px'}} alt="logo" />
                    {/* <Login />  */}
                </div>
            </Tilt>
        </div>
    )
}

export default Logo