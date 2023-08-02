import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../css/summary.css"
import axios from "axios"

export const TrackSummary = () => {
    const [trackList, setTrackList] = useState([])
    const { displayName } = useParams()
    const { top } = useParams()
    const { past } = useParams()
    const {accessToken} = useParams()

    const url = window.location.href

    const copyLink = async () => {
        await navigator.clipboard.writeText(url)
        alert("Link copied and ready to share!")
    }

    const getTrackSummary = async () => {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${past}&limit=${top}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        setTrackList(data.items)
    }
    
    getTrackSummary()

    return (
        <div className="table-container">
            <div className="container-summary mt-4">
                <h2> {displayName}, here is your Spotify Summary! </h2>
                <div className="table-responsive">
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
                                            <img src={track.album.images[2].url} className="img-mr-3" alt={track.title} style={{ maxWidth: 100 }} />
                                            <div className="media-body">
                                                <h5 className="mt-0 song-title">{track.name}</h5>
                                                <div className="artist-details">
                                                    {track.album.artists.map((artist) => (
                                                        <p className="faded-text">{artist.name}</p>
                                                    ))}
                                                    <div className="listen-now">
                                                        <a href={track.external_urls.spotify}>Listen Now</a>
                                                    </div>
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
        </div>

    )

}