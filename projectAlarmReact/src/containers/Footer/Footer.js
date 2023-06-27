import React from "react";
import {ContainerFooter,FooterSocailMedia,FooterText} from "./Footer.styled";
import logo from "../../images/itemsLogo.png";
import facebook from "../../images/facebook.svg"
import twitter from "../../images/twitter.svg"
import linkedIn from "../../images/linkedIn.svg"
import instagram from "../../images/instagram.svg"


export default function Footer (){
    return (
        <ContainerFooter>
            <div className="container-footer-inner">
            <FooterText>
                <h2>A community doing good</h2>
                <p>Here lies a page for my project of monitoring the environment and detecting changes</p>
            </FooterText>
            <img src={logo} alt="logo"/>
            <FooterSocailMedia>
                <a href="https://www.facebook.com/">
                    <img src={facebook} alt="Facebook"/>
                </a>
                <a href="https://twitter.com/">
                    <img src={twitter} alt="Twitter"/>
                </a>
                <a href="https://www.linkedin.com/">
                    <img src={linkedIn} alt="LinkedIn"/>
                </a>
                <a href="https://www.instagram.com/">
                    <img src={instagram} alt="Instagram"/>
                </a>
            </FooterSocailMedia>
            </div>
            <hr/>
            <p>2023 IoT © Copyright all rights reserved, Myroslav Pro</p>
        </ContainerFooter>  
    );
};