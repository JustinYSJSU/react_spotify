import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"
import axios from "axios"

export const TrackSummary = () => {
    const [token, setToken] = useState("")
    const [trackList, setTrackList] = useState([])
    const { displayName } = useParams()
    const { top } = useParams()
    const { type } = useParams()
    const { past } = useParams()

    const getTrackSummary = async () => {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${past}&limit=${top}`, {
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



    return (
        <div className="container mt-4">
            <h2> Song List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Song</th>
                    </tr>
                </thead>
                <tbody>
                    {trackList.map((track) => (
                        <tr key={track.name} className="song-row">
                            <td>{trackList.indexOf(track) + 1}</td>
                            <td>
                                <div className="media">
                                    <img src={track.album.images[2].url} className="mr-3" alt={track.title} style={{ maxWidth: 100 }} />
                                    <div className="media-body">
                                        <h5 className="mt-0">{track.name}</h5>
                                        {track.album.artists.map((artist) => (
                                            <p className="faded-text">{artist.name}</p>
                                        ))}

                                        <div className="listen-now">
                                            <a href={track.external_urls.spotify}>Listen Now</a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )

}