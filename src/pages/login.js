import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/login.css'

export const Login = () => {
    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = "&scope=user-top-read"
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
  

    const requestAuthorization = () =>{
        let url = AUTHORIZE
        url += "?client_id=" + CLIENT_ID
        url += "&response_type=code"
        url += "&redirect_uri=" + encodeURI(REDIRECT_URI)
        url += "&show_dialog=true"
        url += SCOPES
        window.location.href = url
    }

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
                              <button className="btn btn-success" onClick={requestAuthorization}> Login with Spotify </button> 
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