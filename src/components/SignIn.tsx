import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useGlobalContext } from "./Context";

const BACK_END_URL = "https://nested-todo-backend-nikbk.vercel.app";
// const BACK_END_URL = "http://localhost:3333";

export const SignIn = () => {
    const { loggedIn, setLoggedIn } = useGlobalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = () => {
        if (username && password) {
            Axios.post(`${BACK_END_URL}/login`, {
                username: username,
                password: password,
            }).then((response) => {
                if (response.data.auth) {
                    localStorage.setItem("token", response.data.token);
                    setLoggedIn(true);
                    setMessage("");
                } else {
                    setLoggedIn(false);
                    setMessage(response.data.message);
                }
            });
            setUsername("");
            setPassword("");
        }
        else {
            setMessage("Please enter username & password");
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
        // Axios.get(`${BACK_END_URL}/login`).then((response) => {
        //     console.log("checking loading of useEffect")
        //     if (response.data.loggedIn === true) {
        //         setLoggedIn(true);
        //         // setLoginStatus(response.data.user.username);
        //     }
        // });
    }, []);

    return (
        <>
            {!loggedIn ? (
                <>
                    <div className="login">
                        <h1>Login</h1>
                        <div className="input-holder">
                            <span>Name</span>
                            <input
                                type="text"
                                placeholder="Username..."
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                        <div className="input-holder">
                            <span>Password</span>
                            <input
                                type="password"
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <a>
                            <button onClick={login} className="btn login-btn">Login</button>
                        </a>
                        <div className="wrong-user-message">{message}</div>
                    </div>
                </>) : (
                <Navigate to="/home" />
            )}

        </>
    );
};