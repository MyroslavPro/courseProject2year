import axios from "axios";

export const getAllMotions  = async () => {
    let promiseResult = await axios.get('http://127.0.0.1:5000/motion');
    return (promiseResult.data.motions)
}

export const getMotionById  = async (id) => {
    return (await axios.get(`http://127.0.0.1:5000/motion/${id}`)
    .then((response)=>response.data))
}

export const getMotionsByUser  = async (user) => {
    let promiseResult = await axios.get(`http://127.0.0.1:5000/motion/search_by_name/${user}`);
    return (promiseResult.data.motions)
}


// ------------- Power ---------------//
export const getAllPowerStatuses  = async () => {
    let promiseResult = await axios.get('http://127.0.0.1:5000/power_status');
    return (promiseResult.data.power_statuses)
}

export const getPowerStatusById  = async (id) => {
    return (await axios.get(`http://127.0.0.1:5000/power_status/${id}`)
    .then((response)=>response.data))
}

export const getPowerStatusesByUser  = async (user) => {
    let promiseResult = await axios.get(`http://127.0.0.1:5000/power_status/search_by_name/${user}`);
    return (promiseResult.data.power_statuses)
}


// ---------------- Sounds -------------------- //
export const getAllSounds  = async () => {
    let promiseResult = await axios.get('http://127.0.0.1:5000/sound');
    return (promiseResult.data.sounds)
}

export const getSoundById  = async (id) => {
    return (await axios.get(`http://127.0.0.1:5000/sound/${id}`)
    .then((response)=>response.data))
}

export const getSoundsByUser  = async (user) => {
    let promiseResult = await axios.get(`http://127.0.0.1:5000/sound/search_by_name/${user}`);
    return (promiseResult.data.sounds)
}


export const changePower  = async () => await axios.get('http://192.168.45.8/power');
    // let promiseResult = await axios.get('http://192.168.45.8/power');
    // return 

export const playTheTune  = async () => {
    let promiseResult = await axios.get('http://192.168.45.8/buzzer');
    return
}
