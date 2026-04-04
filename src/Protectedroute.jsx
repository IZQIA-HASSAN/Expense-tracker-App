import React from 'react'
import {Navigate} from "react-router-dom"

const Protectedroute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("currentuser"))
    if(!user){
        return <Navigate to="/Login" />
    }
    return children
 
}

export default Protectedroute