
export const Login = () =>{
    const CLIENT_ID = "bd082bb71cdf43fdbe70dd6eb449d50d"
    const REDIRECT_URI = "https://react-spotify-mocha.vercel.app/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    return(
        <div>
            <h1> Login Page </h1>
            <a href = {`${AUTH_ENDPOINT}?client_id = ${CLIENT_ID}&redirect_url = ${REDIRECT_URI}&response_type = ${RESPONSE_TYPE}`}
            > LOGIN HERE </a>
        </div>
    )
    
}