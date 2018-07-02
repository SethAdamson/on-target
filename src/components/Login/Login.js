import React, {Component} from 'react';
import './Login.css';
import loginVideo from '../../media/loginVideo.mp4';
import woodBG1 from '../../media/woodBG-1.jpg';

export default class Login extends Component {
    constructor(){
        super();

        this.state = {
            loginDisplay: false,
        }

        this.showLogin = this.showLogin.bind(this);
        this.loginInterval = this.loginInterval.bind(this);

    }

    showLogin(){
        this.setState({loginDisplay: true});
    }

    loginInterval(){
        setTimeout(this.showLogin, 3000);
    }

    render(){
        let {loginDisplay} = this.state;
        this.loginInterval();
        return(
            <div className='login-parent' style={{backgroundImage: `url(${woodBG1})`}} onClick={this.showLogin}>
                <video className='login-video-player' autoPlay='true' loop muted>
                    <source src={loginVideo} type='video/mp4'/>
                </video>
                        <div className={loginDisplay ? 'login-menu-shown' : 'login-menu-hidden'}>
                            <a href={process.env.REACT_APP_LOGIN} className={loginDisplay ? 'login-button' : 'login-button-hidden'}>
                                Login
                            </a>

                </div> 
            </div> 
        )
    }
}

