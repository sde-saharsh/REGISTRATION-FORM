import React, { createContext, useEffect, useState } from 'react';
// import { backendUrl } from "../config/config.js";
export const FormContext = createContext();

const FormContextProvider = ({ children }) => {




  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
    localStorage.setItem('token', token); 
  }, [token]);
  const value = { token, setToken };


  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
