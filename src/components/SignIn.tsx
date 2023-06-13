import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useGlobalContext } from "./Context";

export const SignIn = () => {
    const { setLoggedIn } = useGlobalContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const [loginStatus, setLoginStatus] = useState("");

    const login = () => {
        Axios.post("https://nested-todo-backend-nikbk.vercel.app/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                // setLoginStatus(response.data.message);
            } else {
                // setLoginStatus(response.data.username);
            }
        });
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
            <div className="login">
                <h1>Login</h1>
                <div className="input-holder">
                    <span>Name</span>
                    <input
                        type="text"
                        placeholder="Username..."
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <Link to="/home">
                    <button onClick={login} className="btn login-btn">Login</button>
                </Link>
            </div>

        </>
    );
};