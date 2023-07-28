import { useState, useEffect } from "react"

export const TopArtistsSongs = () =>{
    const[token, setToken] = useState("")

    useEffect( () => {
        const hash = window.location.hash //from URL
        let token = window.localStorage.getItem("token")

        if(!token && hash){ //no token, but hash. get the token from the hash using .split() and .find() 
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
            setToken(token)
        }

    })
}