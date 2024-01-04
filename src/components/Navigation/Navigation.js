import React from 'react';
// import { Link } from 'react-router-dom';


// import { useNavigate } from 'react-router-dom';

// const Navigation = () => {
//     const navigate = useNavigate();

//     const handleLoginClick = () => {
//         // Assuming a successful login, navigate to the home route
//         navigate('/Login');
//     };

//     return (
//         <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <h3 onClick={handleLoginClick} className='f3 link din black underline pa3 pointer'> Login</h3>
//             <h3 className='f3 link din black underline pa3 pointer'> Signout</h3>
//         </nav>
//     );
// };
const Navigation = ({onRouteChange, isLogin}) => {
    if (isLogin){
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link din black underline pa3 pointer' > Signout</p>
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('login')} className='f3 link din black underline pa3 pointer' > Signin</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link din black underline pa3 pointer' > Register</p>
                </nav>
            </div>
        );
    }    
};

export default Navigation;
