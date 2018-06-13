import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Board from './components/Board/Board';
import Profile from './components/Profile/Profile';
import UserBoards from './components/UserBoards/UserBoards';

export default (
    <Switch>    
        <Route component={Login} path='/' exact/>
        <Route component={Home} path='/home' />
        <Route component={Board} path='/boards/:user/:board' />
        <Route component={Profile} path='/profile/:user' />
        <Route component={UserBoards} path='/myboards' />
    </Switch>
)