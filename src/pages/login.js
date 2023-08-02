import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/login.css'
import React from 'react';
import Cookies from 'js-cookie'
import {SpotifyAuth, Scopes} from 'react-spotify-auth'
import SpotifyApiContext from 'react-spotify-api'
import 'react-spotify-auth/dist/index.css'

export const Login = () => {
    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = "user-top-read"
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))


    return (
        <div className="container">
            <div className="body d-md-flex align-items-center justify-content-between">
                <div className="box-1 mt-md-0 mt-5">
                    <img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                </div>
                <div className=" box-2 d-flex flex-column h-100">
                    <div className="mt-5">
                        <p className="mb-1 h-1"> Spotify Summary</p>
                        <div className="d-flex flex-column ">
                            <div className="align-items-center">
                                <SpotifyAuth
                                  redirectUri="https://react-spotify-mocha.vercel.app/"
                                  clientID="bd082bb71cdf43fdbe70dd6eb449d50d"
                                  scopes={[Scopes.userReadTop]}
                                  onAccessToken={(token) => setToken(token)}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="after-text"> See and share your top songs and artists </p>
                </div>
                <span className="fas fa-times" />
            </div>
        </div>
    )

}