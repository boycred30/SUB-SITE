import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";


const GoogleBtn = ({ setIsAuth }) => {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true)
            navigate('/')
        })
    }

    return (
        <>
            <div className="text-center pb-10">
                <button className="login-with-google-btn mt-5" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </>
    )
}
export default GoogleBtn;