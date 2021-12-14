import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import React from 'react'
import Analysis from './components/Analysis/Analysis'
import Home from './components/Home'
import Add from './components/Add/Add'
import Auth from './components/Auth';


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Auth/>}/>
          <Route path='/home'  element={<Home/>}/>
          <Route path='analysis'  element={<Analysis/>}/>
          <Route path ='add' element={<Add/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
