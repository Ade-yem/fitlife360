"use server";

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, signupUser, registerUser, selectRole, authStatus } from "../api/auth";
import PropTypes from 'prop-types';


const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({name: '', role: ''});
  const [isTrainer, setIsTrainer] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const login = async (data) => {
    const res = await loginUser(data);
    if (res) {
      setIsLoggedIn(true);
      setUser({name: res.name, role: res.role});
      res.role === "trainer" ? setIsTrainer(true) : setIsTrainer(false);
    }
  };
  const signup = async (data) => {
    try {
      const res = await signupUser(data);
      setAuthToken(res.token);
      setUser({name: res.name, role: ''})
      return res.message;
    } catch (error) {
      throw new Error(error); 
    }
  };
  const logout = async () => logoutUser();
  const registerTrainer = async (data) => {
    try {
      const res = await registerUser("/api/trainer/create_profile", data);
      setUser({name: res.name, role: 'trainer'})
      return res.message;
    } catch (error) {
      throw new Error(error); 
    }

  };
  const registerMember = async (data) => {
    try {
      const res = await registerUser("/api/member/create_profile", data);
      setUser({name: res.name, role: "member"})
      return res.message;
    } catch (error) {
      throw new Error(error); 
    }
  };

  const select = async (role) => {
    try {
      const res = selectRole(role, authToken);
      setUser({name: res.name, role: res.role})
      return res.message
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  useEffect(() => {
    // check user authentication
    // async function checkStatus() {
    //   try {
    //     const data = await authStatus();
    //     if (data) {
    //     setUser({name: data.name, role: data.role})
    //     setIsLoggedIn(true)
    //     data.role === "trainer" ? setIsTrainer(true) : setIsTrainer(false);
    //    }
    //   } catch (error) {
    //     console.error(error)
    //     window.location.href = "/login"
    //   } 
    // }
    // checkStatus()
  }, [])
  const value = { isLoggedIn, isTrainer, user, authToken, registerMember, registerTrainer, login, signup, logout, select };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node
}

export const useGlobalContext = () => useContext(Context);