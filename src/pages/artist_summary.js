import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"

export const ArtistSummary = () =>{
    const [token, setToken] = useState("")
    const [artistList, setArtistList] = useState([])
    const {displayName} = useParams()
    const {top} = useParams()
    const {past} = useParams()

    const url = window.location.href 

    const copyLink = async () =>{
        await navigator.clipboard.writeText(url)
        alert("Link copied and ready to share!")
    }

    const getArtistSummary = async () => {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${past}&limit=${top}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setArtistList(data.items)
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
        token && getArtistSummary()
    }, [token])

    return(
        <h1> hi </h1>
    )
}