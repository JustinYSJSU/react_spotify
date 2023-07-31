import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"

export const TrackSummary = () =>{
    const {displayName} = useParams()
    const {top} = useParams()
    const {type} = useParams()
    const {past} = useParams()

    const getTrackData = async () => {
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
    
    return(
        <h1 className="initial">
            {displayName} {top} {type} {past}
         </h1>
    )
}