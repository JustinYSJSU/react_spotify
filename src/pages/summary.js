import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const Summary = () =>{
    const {displayName} = useParams()
    const {top} = useParams()
    const {type} = useParams()
    const {past} = useParams()

    return(
        <h1 className="initial">
            {displayName} {top} {type} {past}
         </h1>
    )
}