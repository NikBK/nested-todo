import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useGlobalContext } from "./Context";

export const SignIn = () => {
    const { loggedIn, setLoggedIn } = useGlobalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const [loginStatus, setLoginStatus] = useState("");

    const login = () => {
        Axios.post("https://nested-todo-backend-nikbk.vercel.app/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response.data);
            if (response.data.username) {
                setLoggedIn(true);
                // setLoginStatus(response.data.message);
            } else {
                setLoggedIn(false);
                // setLoginStatus(response.data.username);
            }
        });
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        Axios.get("https://nested-todo-backend-nikbk.vercel.app/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoggedIn(true);
                // setLoginStatus(response.data.user.username);
            }
        });
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
                    </div>
                </>) : (
                <Navigate to="/home" />
            )}


        </>
    );
};