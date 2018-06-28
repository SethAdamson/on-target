import React, { Component } from 'react';
import routes from './routes.js';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './components/Board/List/Card/CardDND/CustomDragLayer';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          {routes}
          {/* <CustomDragLayer />  */}
        </div>
      </HashRouter>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
