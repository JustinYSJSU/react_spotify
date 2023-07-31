import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"

export const TrackSummary = () =>{
    const [token, setToken] = useState("")
    const [uri, setUri] = useState("")

    const {displayName} = useParams()
    const {top} = useParams()
    const {type} = useParams()
    const {past} = useParams()

    const getTrackSummary = () =>{

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
    }, [])

    useEffect(() => {
        token && getTrackSummary()
    }, [token])



    return(
        <h1 className="initial">
            {displayName} {top} {type} {past}
         </h1>
    )
}