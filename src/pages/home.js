import "../css/home.css"
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const TOKEN = "https://accounts.spotify.com/api/token"
    var access_token = null
    var refresh_token = null
    const [displayName, setDisplayName] = useState("")
    const [uri, setUri] = useState("")
    const [topValue, setTopValue] = useState("")
    const [typeValue, setTypeValue] = useState("")
    const [pastValue, setPastValue] = useState("")

    const navigate = useNavigate()

    const onPageLoad = () =>{
        if(window.location.search.length > 0){
            handleRedirect()
        }
    }

    const handleRedirect = () =>{
        let code = getCode()
        fetchAccessToken(code)

    }

    const getCode = () =>{
        let code = null
        const queryString = window.location.search
        if(queryString.length > 0){
            const urlParams = new URLSearchParams(queryString)
            code = urlParams.get('code')
        }
        return code
    }

    const fetchAccessToken = () =>{
        let body = "grant_type=authorization_code"
        body += "&code=" + code
        body += "&redirect_uri" + encodeURI("https://react-spotify-mocha.vercel.app/home")
        body += "&client_id=" + "bd082bb71cdf43fdbe70dd6eb449d50d"
        body += "&client_secret=" + "87e68dbedbab4d3cadb4142af2e91c06"
        callAuthorizationApi(body)
    }

    const callAuthorizationApi = (body) =>{
        let xhr = new XMLHttpRequest()
        xhr.open("POST", TOKEN, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret))
        xhr.send(body)
        xhr.onload = handleAuthorizationResponse()
    }

    const handleAuthorizationResponse = () =>{
       if(this.status == 200){
        var data = JSON.parse(this.responseText)
        console.log(data)
        var data = JSON.parse(this.responseText)
        if(data.access_token != undefined){
            access_token = data.access_token
            localStorage.setItem("access_token", access_token)
        }
        if(data.refresh_token != undefined){
            refresh_token = data.refresh_token
            localStorage.setItem("refresh_token", refresh_token)
        }
       }
       else{
        console.log(this.responseText)
       }
    }
    
    const getDisplayName = async () => {
        console.log("Token: ", token)
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
        setDisplayName(data.display_name)
        setUri(data.uri)
        console.log(data)
        console.log(data.display_name)
        console.log(data.uri)
    }

    


    const linkToSummary = () => {
        const date = new Date()
        parseInt(topValue, 10)
        
        typeValue === 'tracks' &&  navigate(`/viewSummary/${uri}/${displayName}/${topValue}/tracks/${pastValue}/${date}`)
        typeValue === 'artists' && navigate(`/viewSummary/${uri}/${displayName}/${topValue}/artists/${pastValue}/${date}`)
    }

    return (
        <div className="container" onLoad={onPageLoad}>
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