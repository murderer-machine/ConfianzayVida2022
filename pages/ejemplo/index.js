import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
const socket =  io("http://localhost:3001")

const Ejemplo = () => {
    

    useEffect(() => {
        socket.on("mensaje", (data) => {
          alert(data);
        })
      },[])
    return (
        <>
            <h1>Ejemplo</h1>
           
        </>
    )
}

export default Ejemplo
