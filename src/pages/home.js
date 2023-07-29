import "../css/home.css"
import axios from "axios"
import { useState, useEffect } from "react"

export const Home = () => {

    const [token, setToken] = useState("")
    const [displayName, setDisplayName] = useState("")

    const getDisplayName = async () => {
        console.log("Token: ", token)
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                 Authorization: `Bearer ${token}`,

            }
        })
        setDisplayName(data.display_name)
        console.log(data)
    }

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
        getDisplayName()
    }, [])

    useEffect( () => {
        token && getDisplayName()
    },[token])

    
    return (
        <div className="container">
            <div className="body-1 d-md-flex align-items-center justify-content-between">
                <div className="card-header">
                    Welcome to Spotify Summary, {displayName}!
                </div>

                <div className="card-body">
                    Use the menu below to choose your category, number of items, and time range
                </div>

                <div className="card-select">
                    <div className="select-wrapper">
                     <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                        <option selected> Category... </option>
                        <option value="songs"> Songs </option>
                        <option value="artists"> Artists </option>
                     </select>
                    </div>

                   <div className="select-wrapper">
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                        <option selected> Return Number... </option>
                        <option value="10"> 10 </option>
                        <option value="15"> 15 </option>
                        <option value="20"> 20 </option>
                    </select>
                   </div>

                   <div className="select-wrapper">
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                        <option selected> Time Period... </option>
                        <option value="short_term"> Past Month </option>
                        <option value="medium_term"> Past 6 Months  </option>
                        <option value="long_term" > All Time </option>
                    </select>
                   </div>
                   
                </div>
            </div>
        </div>
    )
}