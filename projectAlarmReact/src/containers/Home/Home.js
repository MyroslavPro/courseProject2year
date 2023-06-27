import React, { useState,useEffect} from "react";
import { HomeContainer } from "./Home.styled";
import { NavLink } from "react-router-dom";




export default function Home(){
    return (<>
        <HomeContainer>
            <hero>
                <h1>What is the premisis of my project</h1>
                <p> Whether you are looking for protection,
                    <br/> or you want to monitior your place,
                    <br/>the Alarm and monitoring Service is the place to uncover
                    <br/> top quality protection of your house 
                </p>
            </hero>
            <NavLink className="navLinkStyled" end exact to="/login">Log in</NavLink>
        </HomeContainer>          
    </>
    );
};
        