
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ExtraInfo from './components/ExtraInfo/ExtraInfo';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/extrainfo/:id' element={<ExtraInfo />} />
          <Route path='*' element={<ErrorPage />} /> 
        </Routes>
    </>
  );
}

export default App;
