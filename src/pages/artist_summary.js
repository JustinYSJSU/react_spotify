import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"
import axios from "axios"

export const ArtistSummary = () => {
    const [token, setToken] = useState("")
    const [artistList, setArtistList] = useState([])
    const { displayName } = useParams()
    const { top } = useParams()
    const { past } = useParams()

    const url = window.location.href

    const copyLink = async () => {
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
    console.log(artistList)

    useEffect(() => {
        const hash = window.location.hash //from URL
        console.log(hash)
        let token = window.localStorage.getItem("token")
        console.log(token)

        if (!token && hash) { //no token, but hash. get the token from the hash using .split() and .find() 
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1]
            window.location.hash = ""
            //window.localStorage.setItem("token", token)

        }
        setToken(token)
        console.log(token)
    }, [])

    useEffect(() => {
        token && getArtistSummary()
    }, [token])

    return (
        <div className="table-container">
            <div className="container-summary mt-4">
                <h2> {displayName}, here is your Spotify Summary! </h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artistList.map((artist) => (
                            <tr key={artist.name} className="song-row">
                                <td>{artistList.indexOf(artist) + 1}</td>
                                <td>
                                    <div className="media">
                                        <img src={artist.images[2].url} className="mr-3" alt={artist.name} style={{ maxWidth: 100 }} />
                                        <div className="media-body">
                                            <h5 className="mt-0 song-title">{artist.name}</h5>
                                                <p className="faded-text">{artist.genres[0]}</p>
                                            <div className="listen-now">
                                                <a href={artist.external_urls.spotify}> Listen Now </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={copyLink} className="btn btn-primary"> Copy Link </button>
            </div>
        </div>
    )
}