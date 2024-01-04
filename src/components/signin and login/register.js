import React from 'react';
import { Tilt } from 'react-tilt';

const Register = ({onRouteChange}) => {
    return (
        <div className='ma4 nt0'>
            <Tilt className='Tilt br2 shadow-2 center' options={{ max: 25}} style={{ height: 460, width: 450 }}>
                <div className='Tilt-inner'>                  
                    <main class="center pa4 black-80">
                        <form class="measure">
                            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                                <legend class="f4 fw6 ph0 mh0">Sign Up</legend>
                                <div class="mt3">
                                    <label class="db fw6 lh-copy f6" for="name">Name</label>
                                    <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name"/>
                                </div>
                                <div class="mt3">
                                    <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                                    <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                                </div>
                                <div class="mv3">
                                    <label class="db fw6 lh-copy f6" for="password">Password</label>
                                    <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                </div>
                                <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                            </fieldset>
                            <div class="">
                                <input onClick={() => {onRouteChange('Home')}} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="register"/>
                            </div>
                            <div class="lh-copy mt3">
                                <p onClick={() => {onRouteChange('login')}} href="#0" class="f6 link dim black db pointer" >Sign In</p>
                            </div>
                        </form>
                    </main>                    
                </div>
            </Tilt>
        </div>
    )
}

export default Register