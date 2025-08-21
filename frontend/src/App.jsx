import React, { useContext } from 'react';
import Form from './pages/From';
import { Routes, Route } from "react-router-dom";
import { FormContext } from './context/FormContext';
import Home from './pages/Home'

const App = () => {
  const { token } = useContext(FormContext);

  // App routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<Form/>} />
    </Routes>
  );
};

export default App;
