import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import axios from "axios";
import './signup.css'
import 'react-toastify/dist/ReactToastify.css';
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebaseConfig/config.js"
import { signupFailed, signupPending, signupSuccess } from '../../Redux/Slices/authSlice.js';

const Signup = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState({});
    const { user, isLoading, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //---------------------USER DATA IN FIRESTORE------------------//
    async function addDataToFirestore(userId) {
        try {
            const userData = await setDoc(doc(db, "Users", userId), {
                username: username,
                email: email,
            });
        } catch (error) {
            console.log(error)
        }
    }

    //=================SIGN UP USEING FIREBASE===========================//
    function signupHandlerWithFirebase(e) {
        e.preventDefault();
        // console.log(email, "=====>>>>> email");
        // console.log(username, "=====>>>>> username");
        // console.log(password, "=====>>>>> password");
        // console.log(confirmPassword, "=====>>>>> confirmPassword");

        if (email === "" || username === "" || password === "" || confirmPassword === "") {
            // console.log("Missing fields")
            toast.error('Missing fields', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });
        } else if (password.length < 8) {

            toast.warning('Password must be atleast 8 characters long', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });

        } else if (password !== confirmPassword) {

            toast.warning('Password does not match', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });

        } else {
            //============CREATING NEW USER==========================//
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    addDataToFirestore(user?.uid)
                    if (user) {
                        navigate('/login')
                    }
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        }
    }

    //========================SIGNUP WITH MONGODB==============================//
    async function signupWithMongo(e) {
        e.preventDefault();
        console.log(email, "=====>>>>> email");
        console.log(username, "=====>>>>> username");
        console.log(password, "=====>>>>> password");
        console.log(confirmPassword, "=====>>>>> confirmPassword");
        if (email === "" && username === "" && password === "" && confirmPassword === "") {
            // console.log("Missing fields")
            toast.error('Missing fields', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });

        } else if (password.length < 8) {

            toast.warning('Password must be atleast 8 characters long', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });

        } else if (password !== confirmPassword) {

            toast.warning('Password does not match', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, theme: "colored", });

        } else {
            dispatch(signupPending());
            try {
                const res = await axios.post('/auth/register', { username, email, password });
                console.log(res?.data?.data)
                dispatch(signupSuccess())
                navigate('/login')
            } catch (error) {
                console.log(error.response.data);
                setIsError(error.response)
                dispatch(signupFailed(error.response))
            }
        }
    }

    return (
        <>

            <div className="login">
                <form className="lContainer" onSubmit={signupWithMongo}>
                    <div className="l-input-group">
                        <input type="text" required name="username" className="l-input" id="username" onChange={(e) => setUsername(e.target.value)} />
                        <label className="l-user-label">Username</label>
                    </div>
                    <div className="l-input-group">
                        <input type="email" required name="Email" className="l-input" id="Email" onChange={(e) => setEmail(e.target.value)} />
                        <label className="l-user-label">Email</label>
                    </div>
                    <div className="l-input-group">
                        <input type="password" required name="password" className="l-input" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <label className="l-user-label">Password</label>
                    </div>
                    <div className="l-input-group">
                        <input type="password" required name="cPassword" className="l-input" id="cPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label className="l-user-label">Confirm Password</label>
                    </div>
                    <button className="l-button searchBtn" type="submit">{isLoading ? (<TailSpin
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />) : 'Signup'}</button>
                    {/* {isError && <span className="err">{isError.message}</span>} */}
                </form>
                <ToastContainer position="bottom-left" autoClose={5000} newestOnTop={false} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            </div>
        </>
    )
}

export default Signup