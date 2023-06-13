import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("http://localhost:3333/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            // console.log(response);
        });
    };

    return (
        <>
            <div className="registration">
                <h1>Registration</h1>
                <div className="input-holder">
                    <span>Username</span>
                    <input
                        type="text"
                        placeholder="Username..."
                        onChange={(e) => {
                            setUsernameReg(e.target.value);
                        }}
                    />
                </div>
                <div className="input-holder">
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Password..."
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }}
                    />
                </div>
                <Link to="/signIn">
                    <button onClick={register} className="btn register-btn">Register</button>
                </Link>
            </div>
        </>
    );
}