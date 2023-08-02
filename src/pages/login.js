import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/login.css'

export const Login = () => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generateRandomString = (length) => {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = "hi"
    var state = generateRandomString(16)

    const requestAuthorization = () => {
        let url = "https://accounts.spotify.com/authorize"
        url += "?response_type=token"
        url += "&client_id=" + encodeURIComponent(CLIENT_ID)
        url += "&scope=" + encodeURIComponent(SCOPES)
        url += "&redirect_uri=" + encodeURIComponent(REDIRECT_URI)
        url += "&state=" + encodeURIComponent(state)
        window.location.href = url
    }

    return(
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