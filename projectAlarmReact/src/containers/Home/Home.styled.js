import styled from "styled-components";

export const HomeContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: auto;
    margin-bottom: 2em;

    hero
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90vh;
        // margin-bottom: 5em;
        
        background-image: linear-gradient(to bottom right,#4682B4B5,#4C516DB5);
        text-shadow: 2px 2px black;
        color: whitesmoke;

        p {
            line-height: 1.5em;
        }
    }

    ul {
        display: flex;
        flex-direction: row;
    }

    .home-cards{
        display: flex;
        flex-direction: row;
    }
    a {
        text-decoration: none;
    }
      
    .navLinkStyled{
        border-radius: 0.5em;
        padding: 0.5em 1.5em;
        color: white;
        margin-top: 1em;
        background-color: black; 
        text-decoration: none;
    }
`;




export const CardItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;   
    width: 250px;
    height: 360px;
    padding: 0.5em;
    margin: 2em;
    font-size: small;
    
    background: url("https://image.freepik.com/free-photo/summer-holiday-background-beach-accessories-white-wood-copy-space-vacation-travel-items-concept_1205-1427.jpg") 
    no-repeat top,#fffffff9;
    background-size: contain;
    border:2px solid rgb(192, 192, 192);
    border-radius: 15px;
    box-shadow: 0 30px 34px  rgba(178, 176, 176, 0.25);  
    h2{
        line-height: 0.85em;
    }
`;