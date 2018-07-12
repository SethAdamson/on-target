import React, { Component } from 'react';
import routes from './routes.js';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LogoTarget from './media/LogoTarget.png';
import woodBG1 from './media/woodBG-1.jpg';
import CustomDragLayer from './components/Board/List/Card/CardDND/CustomDragLayer';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
        <div className='nonresponsive' style={{backgroundImage: `url(${woodBG1})`}}>
          <img className='app-target' src={LogoTarget} alt='logo' />
          <p className='mobile-title'>is best viewed on larger screens</p>
        </div> 
        <div className='routes'>
          {routes}
        </div> 
          {/* <CustomDragLayer />  */}
        </div>
      </HashRouter>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
