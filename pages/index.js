
import React, { useEffect } from 'react'
import cookies from 'js-cookie'

const Index = () => {

    // useEffect(() => {
    //     Cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU0OTAxNzcyLCJleHAiOjE2NTQ5MDE4OTJ9.qazI-goMqh-z10MSrz0u6Z6vZ4OaJZoSGKkRH2Is0D4')
    // }, [])
    return (
        <>
            <button onClick={() => {
                cookies.set(
                    "token",
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU0OTYyMjA1LCJleHAiOjE2NTQ5NjIzMjV9.pHb0vTCfbwVIMNzzLDi0k5M_4fe0QgpBJcNqSTaUlLY"
                )
            }}>login</button>
            <button onClick={()=>{
                cookies.remove('token')
            }}>logout</button>
        </>
    )
}
export default Index