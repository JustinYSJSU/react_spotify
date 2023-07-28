import "../css/home.css"
import axios from "axios"
import { useState, useEffect } from "react"

export const Home = () => {

    const [token, setToken] = useState("")
    const [displayName, setDisplayName] = useState("")
    useEffect(() => {
        const hash = window.location.hash //from URL
        console.log(hash)
        let token = window.localStorage.getItem("token")
        console.log(token)

        if (!token && hash) { //no token, but hash. get the token from the hash using .split() and .find() 
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)

        }

        setToken(token)
        console.log(token)
    }, [])

    const getDisplayName = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDisplayName(data.display_name)
    }
    getDisplayName()


    return (
        <div className="container">
            <div className="body d-md-flex align-items-center justify-content-between">
                <div className="card-body">
                   Welcome to Spotify Summary, {displayName}!
                   Use the menu below to choose your category, number of items, and time range. 
                </div>
            </div>
        </div>
    )
}