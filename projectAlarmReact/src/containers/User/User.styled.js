import styled from "styled-components";
/*  #B82601 - red
    #813722 - (фіолетовий)
    #062F4F - Blue
    black*/
import UserMenu from '../../images/user_menu.jpg';

export const UserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: max-content;
    justify-content:space-around;
    // background: linear-gradient(to right, #3e0000 20%, #062F4F);
    background-color: #062F44;
    h1 {
        color: white;
        text-shadow: 1px 1px black;
    }

    .LoaderWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
        background: linear-gradient(to right, #3e0000 20%, #062F4F);
        min-height: 80vh;
        width: 100vw;
        > * {
            margin: 1em 0;
        }
        h2 {
            color: white;
        }
    }
`
export const UserInfo = styled.div`
    display: flex;
    flex-direction: column ;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: #8BC6EC; */
    /* background-image: linear-gradient(135deg, #062F4F 0%, #02051E 100%); */
    background-color: #062F44;
    background: center top no-repeat url(${UserMenu}) ;
    background-size: cover;

    color: white;

    z-index: 2;
    box-shadow: 0.25em 0 0.4em black;
    padding: 2em;

    width: 20%;
`
export const StatsInfo = styled.section`
    display: flex;
    flex-direction: column ;
    justify-content: center;
    align-items: center;
    background-color: #062F4F;
    padding: 1em;
    width: 80%;
    color: white;
`
export const StatsWrapper = styled.section`
    display: flex;
    flex-direction: column ;
    justify-content: center;
    // align-items: center;
    // z-index
    // padding-top: 20em;
    width: 40vw;
    height: 50vh;
    background-color:white;
    border-radius:0.5em;
    border: 2px solid gray;
    overflow-y: scroll;
    color: black;
`



export const ButtonsSpace = styled.div`
display: flex;
flex-direction: row ;
justify-content: center;
align-items: center;
padding: 1em;
width: 80%;
> *{
    padding: 1em;
    margin: 0.5em;
}
button{
    background-color: darkslategray;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    border: 0;
    padding: 0.5em 1em;
    cursor: pointer;
    justify-content: center;   
    align-self: center;
}

`