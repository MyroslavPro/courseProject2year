import styled from "styled-components";

export const HeaderContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: rgb(0,0,0,0.8);
    color: white;
    font-size: large;
    border: 1px solid black;
    padding: 0.5em 2em;

    .active{
        background-color: darkgray;
    }

    img {
        width: 8%;
        height: 8%;
    }

    ul{
        display: flex;
        flex-direction: row;
        list-style-type: none;
        
        align-self: center;
        align-items: center;
        
        li{
            margin: 0 0.5em;
        }
    }
     
    a {
        padding: 0.5em;
        background-color: gray;
        border-radius: 5px;
        text-decoration: none;
        color: white;
    }

    h1{
        font-size: larger;
        color : black
    }
`

