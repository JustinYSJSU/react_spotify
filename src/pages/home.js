import "../css/home.css"
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const TOKEN = "https://accounts.spotify.com/api/token"
    const client_id = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const client_secret = "87e68dbedbab4d3cadb4142af2e91c06"
    const [displayName, setDisplayName] = useState("")
    const [uri, setUri] = useState("")
    const [topValue, setTopValue] = useState("")
    const [typeValue, setTypeValue] = useState("")
    const [pastValue, setPastValue] = useState("")

    const navigate = useNavigate()

    useEffect( () =>{
        var authParameters = {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => console.log(data)) 
    }, [])

    /*
    const getDisplayName = async () => {
        console.log("Token: ", access_token)
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,

            }
        })
        setDisplayName(data.display_name)
        setUri(data.uri)
        console.log(data)
        console.log(data.display_name)
        console.log(data.uri)
    }
    */

    


    const linkToSummary = () => {
        const date = new Date()
        parseInt(topValue, 10)
        
        typeValue === 'tracks' &&  navigate(`/viewSummary/${uri}/${displayName}/${topValue}/tracks/${pastValue}/${date}`)
        typeValue === 'artists' && navigate(`/viewSummary/${uri}/${displayName}/${topValue}/artists/${pastValue}/${date}`)
    }

    return (
        <div className="container">
            <div className="body-1 d-md-flex align-items-center justify-content-between">
                <div className="card-header">
                    Welcome to Spotify Summary, {displayName}!
                </div>

                <div className="card-body">
                    Use the menu below to choose your number of items, type, and time period
                </div>

                <form id="submitForm" onSubmit={linkToSummary}>
                    <div className="card-select">
                        <div className="select-wrapper">
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                onChange={(e) => setTopValue(e.target.value)} required>
                                <option value=""> --Top-- </option>
                                <option value="10"> 10 </option>
                                <option value="15"> 15 </option>
                                <option value="20"> 20 </option>
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                onChange={(e) => setTypeValue(e.target.value)} required>

                                <option value=""> --Type-- </option>
                                <option value="tracks"> Songs </option>
                                <option value="artists"> Artists </option>
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                onChange={(e) => setPastValue(e.target.value)} required>
                                <option value=""> --Past-- </option>
                                <option value="short_term"> Month </option>
                                <option value="medium_term"> 6 Months </option>
                                <option value="long_term" > All Time </option>
                            </select>
                        </div>

                    </div>
                    <button className="btn btn-success"> Generate Summary </button>
                </form>
            </div>
        </div>
    )
}