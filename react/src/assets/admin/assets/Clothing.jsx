import React from 'react'
import Lottie from "lottie-react";
import   clothing from './clothicon.json';

const Clothing = () =>{
    return (<Lottie animationData={clothing} />
    );
}

export default Clothing;