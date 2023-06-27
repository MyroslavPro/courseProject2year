import styled from "styled-components";

    // #B82601 - red
    // #813722 - (фіолетовий)
    //  2e0a9f - норм фіолетовий
    // #062F4F - Blue

export const GetInStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 0;
    width: 100%;
    min-height: 80vh;
    background-image: radial-gradient(#062F4F 30%, #813722 40%, #062F4F);
    background-image: radial-gradient(circle farthest-corner at 85% 40%, #2e0a9f, #813722);
    align-items: center;
    justify-content: center;

    h1 {
        color: white;
        text-shadow: 1px 1px black;
    }
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    border: 1px solid ;
    // min-height: 30em;
    background-color: white;
    padding: 1em;
    box-shadow: 0 5px 24px rgba(178, 176, 176, 0.25);  

    ul {
        display: flex;
        align-self: center;
        flex-direction: column;
        padding: 0;
        
    }
    li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0.5em 0em;
    }

    
`