import { Link } from "react-router-dom";

export const LandingPage = () => {
    return (
        <div className="landing-page">
            <h3>Welcome to the world of creating <br />TODOS</h3>
            <article>This is the right place to create your own todos and add subtask to it</article>
            <br />
            <Link to="/home">
                <button className="btn bg-lightGreen">Start creating</button>
            </Link>
        </div>
    );
};