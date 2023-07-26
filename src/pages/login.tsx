//<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
//> <button className="btn btn-success"> Login with Spotify </button> </a>

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/login.css'
export const Login = () => {
    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    return (
        <div>
            <header className="login-header"> Spotify Summary </header>

            <div className="login-card">
                <div className="login-text"> Log in to Spotify </div>

                <div> <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                > <button className="login-button btn btn-success"> Log In  </button> </a>
                </div>
                
            </div>
        </div>


    )

}