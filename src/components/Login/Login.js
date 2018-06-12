import React, {Component} from 'react';
import './Login.css';
import targetWhite from '../../images/targetWhite.png'

export default class Login extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className='login-parent'>
                <div className='login-content'>
                    <a className='login-logo'>
                        <img className='login-img' src={targetWhite} alt='logo' />
                        <h1 className='login-title'>n-Target</h1>
                    </a>
                    <a href={process.env.REACT_APP_LOGIN} >
                        <button className='login-button'>Login</button>
                    </a>
                </div> 
            </div> 
        )
    }
}
