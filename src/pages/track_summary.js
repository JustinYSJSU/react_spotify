import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"
import axios from "axios"

export const TrackSummary = () =>{
    const [token, setToken] = useState("")
    const [trackList, setTrackList] = useState([])
    const {displayName} = useParams()
    const {top} = useParams()
    const {type} = useParams()
    const {past} = useParams()

    const getTrackSummary = async () =>{
      const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${past}&limit=${top}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setTrackList(data.items)
    }
    console.log(trackList)
    
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
        <div className="summary-container">
            {trackList.map( (track) => {
                return(
                    <div className="summary-entry"> 
                      <p className="name">
                        {track.name}
                      </p>

                      <p className="text-muted">
                        {track}
                      </p>
                       

                    </div>
                )
            })}
        </div>
    )
}