import React from 'react';
import './App.css';
import Chat from './Chat/Chat';
import {Route, Switch} from "react-router-dom";
import Edit from "./Components/Edit/Edit";

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/" exact component={Chat}/>
      <Route path="/edit/:id" component={Edit}/>
    </Switch>
    </div>
  );
}

export default App;
