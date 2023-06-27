import styled from "styled-components";

export const ContainerFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid black;
    padding: 0.5em 2em;
    background-color: rgb(7,7,7);
    color: white;

    hr {
        width: 100%;
    }
    
    .container-footer-inner{
        display: flex;
        flex-direction: row;    
        justify-content:space-between;
        align-items: center;
    }

    .container-footer-inner > img {
        padding-right:5em;
        width: 8%;
        height: 8%;
    }
`
export const FooterSocailMedia = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
        margin: 0.25em;
        width: 2em;
    }
`

export const FooterText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 20em;
    font-size: small;

    p {
        text-align: left;
    }
`