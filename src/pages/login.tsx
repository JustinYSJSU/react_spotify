import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/login.css'
export const Login = () => {
    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    return (
        <div id="login-con">
            <div className="d-flex justify-content-center h-100">
                <div className="card" id="login-card">
                    <div className="card-header">
                        <h3> Welcome to Spotify Summary </h3>
                    </div>

                    <div className="card-body">
                        <h3> To get started, sign in with your Spotify account</h3>
                    </div>

                    <div className="card-footer">
                        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                        > <button className="btn btn-success"> Login with Spotify </button> </a>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2> How to use Spotify Summary</h2>
                <ul className="myUL">
                    
                    <li> <h3> 1. Choose from 3 different timespans</h3> </li>
                    <li> <h3> 2. See your top artists and songs</h3> </li>
                    <li> <h3> 3. Share with friends and family!</h3> </li>
                </ul>
            </div>

        </div>
    )

}