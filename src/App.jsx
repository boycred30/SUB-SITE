import { useState } from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import Create from './Pages/Create';
import Login from './Pages/Login';
import Pricing from './Pages/Pricing'
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"




const App = () => {

  
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));


  //signOut functionality...
  const GoogleSignOut =()=>{
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  };

  return (
    <>
       <ToastContainer position="top-right" theme="colored"/>
      <Navbar GoogleSignOut={GoogleSignOut} isAuth={isAuth}/>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/create" element={<Create isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login isAuth={isAuth}/>}/>
        <Route path="/pricing" element={<Pricing isAuth={isAuth}/>}/>
      </Routes>
    </>
  )
}

export default App
