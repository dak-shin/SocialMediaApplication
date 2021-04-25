import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

//Components
import Navbar from './components/navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Register from "./pages/register";


function App() {
  return (
    <Router>
      <Container>
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Register" component={Register}/>
      </Container>
    </Router>
  );
}

export default App;
