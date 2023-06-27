import React, { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { Form , GetInStyled} from "../GetIn/GetIn.styled";
import { Button } from "../../buttonClassic/button.styled";
import { verifyUser } from "../../../api/api";

export default function SignIn() {
    const navigate = useNavigate();
    const [findUser,setFindUser] = useState("");
    const [verify,setVerify] = useState("");

    function loginVerification(e){
        e.preventDefault();
        verifyUser(findUser).then(res=>{setVerify(res)});
        if (verify == "true") {
            navigate(`/user/${findUser}`);
        }
        else if (verify == "false"){
            window.alert("No user with this name!");
        }
    }

    return (
    <GetInStyled>
      <h1>Log In</h1>
      <Form>
        <ul>
          <li>
            <label for="name">User</label>
            <input className="search_by_name" placeholder="Enter your username" value={findUser} type="text" onChange={(e)=>{setFindUser(e.target.value);}} />
          </li>
          <li>
            <label for="password">Password</label>
            <input type="password" placeholder="Enter password" name="user_password"/>
          </li>
        </ul>
        <NavLink end exact to="/">New here? Read more here.. </NavLink>
        <Button color="#FF8C00" onClick={(e)=>loginVerification(e)}>Log In</Button>
      </Form>
    </GetInStyled>)
};
