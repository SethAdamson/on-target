import React, {Component} from 'react';
import './Login.css';

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
                    <h1 className='login-title'>On-Target</h1>
                    <a href={process.env.REACT_APP_LOGIN} >
                        <button className='login-button'>Login</button>
                    </a>
                </div> 
            </div> 
        )
    }
}
