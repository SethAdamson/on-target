import React, {Component} from 'react';
import './Login.css';
import targetWhite from '../../media/targetWhite.png'
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
        setTimeout(this.showLogin, 4000);
    }

    render(){
        let {loginDisplay} = this.state;
        this.loginInterval();
        return(
            <div className='login-parent' style={{backgroundImage: `url(${woodBG1})`}} onClick={this.showLogin}>
                <div className='login-content'>
                    <div className='login-video'>
                        <video className='login-video-player' autoplay='true' loop muted>
                            <source src={loginVideo} type='video/mp4'/>
                        </video>
                    </div>
                    <div className={loginDisplay ? 'login-menu-shown' : 'login-menu-hidden'}>
                        <h2 className='login-logo'>
                            <img className='login-img' src={targetWhite} alt='logo' />
                            <h1 className='login-title'>n-Target</h1>
                        </h2>
                        <a href={process.env.REACT_APP_LOGIN} className='login-button'>
                            Login
                        </a>
                    </div>  
                </div> 
            </div> 
        )
    }
}

{/* <h2 className='login-logo'>
    <img className='login-img' src={targetWhite} alt='logo' />
    <h1 className='login-title'>n-Target</h1>
</h2> */}
