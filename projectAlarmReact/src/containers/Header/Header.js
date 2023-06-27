import React from "react";
// import {HomeContainer,Authorization, Button} from "./Header.styled";
import {HeaderContainer} from "./Header.styled";
import logo from "../../images/itemsLogo.png";
import Home from "../Home/Home";
import {
    Routes,
    Route,
    NavLink
  } from "react-router-dom";
import SignIn from "../login/SignIn/SignIn";
import UserPage from "../User/User";


export default function Header(){
    return (
        <>
            <HeaderContainer>
                <img src={logo} alt="Logo Items"/>
                <ul>
                    <li>
                        <NavLink end exact to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink end exact to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Log in</NavLink>
                    </li>
                </ul>
            </HeaderContainer> 
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<SignIn />} /> 
                <Route path= "/user/:user" element ={<UserPage/>} />
            </Routes>
        </>
    );
};