import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { changePower, getMotionsByUser, getPowerStatusesByUser, playTheTune } from '../../api/api';
// import { ItemsContext } from '../ItemsContext/ItemContext';
// import ItemPageStyled, { ContainerCharacteristicsStyled, FooterItem } from './ItemPage.styled';
// import '../../components/ViewButton/View.css'
import Loader  from '../Loader/Loader.styled';
import { ButtonsSpace, StatsInfo, StatsWrapper, UserInfo, UserWrapper } from './User.styled';
import { Button } from '../buttonClassic/button.styled';
import { getSoundsByUser } from '../api/api';


export default function UserPage(){
    let {user} = useParams();
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    const [stats, setStats] = useState([]);
    const [sound, setSound] = useState(false);
    const [power, setPower] = useState(false);
    const [motion, setMotion] = useState(false);



    useEffect(()=> {
        setLoader(true);
        getPowerStatusesByUser(user)
            .then((res)=>{
              return (Object.values(res));
            })
            .then((res)=>setStats([...res]));
        setTimeout(() => setLoader(false), 3200);
      },[]);

    return(<UserWrapper>
        {loader ?  <div className="LoaderWrapper">
            <Loader/>
            <h2>Loading. Please, wait...</h2>
          </div> :
        <>
        <UserInfo>  
          <h1>Welcome, {user}</h1>

          <p>At the user page of this project, you can conveniently access and review the statistics of your system, including sound, motion, and working status.</p>
          <Button onClick={()=>navigate("/")} >Log out</Button>
        </UserInfo>      
        <StatsInfo>
            <ButtonsSpace>
                <button onClick={()=> {getMotionsByUser(user).then((res)=>setStats(Object.values(res)));setSound(false);setMotion(true);setPower(false);}} >Motion detection </button>
                <button onClick={()=> {getSoundsByUser(user).then((res)=>setStats(Object.values(res)));setSound(true);setMotion(false);setPower(false);}} >Sound statistics </button>
                <button onClick={()=> {getPowerStatusesByUser(user).then((res)=>setStats(Object.values(res)));setSound(false);setMotion(false);setPower(true);}} >Power status </button>
                
                <button style={{color:"cyan"}} onClick={()=>changePower()}>Power</button>
                <button style={{color:"red"}} onClick={()=>playTheTune()}>PlayTheMelody</button>
            </ButtonsSpace>            
           {
                motion ?
                <>
                    <h2>Motion statistics </h2>
                    <StatsWrapper>
                    {
                        stats.map((element) => {
                        return <p style={{"margin":"0"}}>Motion ~ Status: {element.status}, Recorded at: {element.created_at}  </p>;})
                    }
                    </StatsWrapper>
                </>
                
                : power ? 
                <>
                    <h2>Power On/Off</h2>
                    <h3>If 1 - working, 0 - on hold </h3>
                    <StatsWrapper>
                    {
                        stats.map((element) => {
                        return <p style={{"margin":"0"}}>Power ~ Mode : {element.power_status ?  1: 0}, Recorded at: {element.created_at}  </p>;})
                    }
                    </StatsWrapper>
                </>
                : sound ? 
                <>
                    <StatsWrapper>
                    <h2>Sound records </h2>
                        {
                            stats.map((element) => {   
                            return <p style={{"margin":"0"}}>Sound ~ Status: {element.value}, Recorded at: {element.created_at}  </p>;})
                        }
                    </StatsWrapper>
                </>
                : console.log("Nothing to see")
                
            }
        </StatsInfo>
        </>}
      </UserWrapper>)
  };
