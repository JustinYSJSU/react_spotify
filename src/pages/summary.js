import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const TopArtistsSongs = () =>{
    const {displayName} = useParams()
    const {top} = useParams()
    const {type} = useParams()
    const {past} = useParams()

    return(
        <p>
            {displayName} {top} {type} {past}
        </p>
    )
}