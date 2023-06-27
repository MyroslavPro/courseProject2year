import styled from "styled-components";

export const Button = styled.button`
    margin: 0.5em;
    padding:  0.25em 0.5em;
    font-size: larger;
    color: ${(props) => props.color};
    background: transparent;
    border-radius: 0.5em;
    border: 2px solid ${(props) => props.color};
    cursor: pointer;
    padding: 0.5em 2em;

    :hover{
        transition: 0.3s;
        background-color:${(props) => props.color} ;
        color: #fff;
    }
`