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
        /*
        <div className="track-container">
            <div className="body-track">
            {trackList.map( (track) => {
                return(
                    <div className="summary-entry"> 
                      <p className="name">
                        {track.name}
                      </p>

                      <img src={track.album.images[2].url}/>

                      {track.artists.map( (artist) => {
                        return(<p className="text-muted artist">
                            {artist.name}
                        </p>
                        )
                      })}
                      <a href={track.external_urls.spotify}> <button className="btn btn-success track"> Listen on Spotify </button></a>                  
                    </div>
                )
            })}
            </div>
        </div>
        */
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt style={{ width: 45, height: 45 }} className="rounded-circle" />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">John Doe</p>
                                <p className="text-muted mb-0">john.doe@gmail.com</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Software engineer</p>
                        <p className="text-muted mb-0">IT department</p>
                    </td>
                    <td>
                        <span className="badge badge-success rounded-pill d-inline">Active</span>
                    </td>
                    <td>Senior</td>
                    <td>
                        <button type="button" className="btn btn-link btn-sm btn-rounded">
                            Edit
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" className="rounded-circle" alt style={{ width: 45, height: 45 }} />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">Alex Ray</p>
                                <p className="text-muted mb-0">alex.ray@gmail.com</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Consultant</p>
                        <p className="text-muted mb-0">Finance</p>
                    </td>
                    <td>
                        <span className="badge badge-primary rounded-pill d-inline">Onboarding</span>
                    </td>
                    <td>Junior</td>
                    <td>
                        <button type="button" className="btn btn-link btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                            Edit
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" className="rounded-circle" alt style={{ width: 45, height: 45 }} />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">Kate Hunington</p>
                                <p className="text-muted mb-0">kate.hunington@gmail.com</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Designer</p>
                        <p className="text-muted mb-0">UI/UX</p>
                    </td>
                    <td>
                        <span className="badge badge-warning rounded-pill d-inline">Awaiting</span>
                    </td>
                    <td>Senior</td>
                    <td>
                        <button type="button" className="btn btn-link btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                            Edit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}