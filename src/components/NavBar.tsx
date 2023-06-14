import "./styles.css"
import { Link } from 'react-router-dom';
import { useGlobalContext } from './Context';

const NavBar = () => {
    const { loggedIn, setLoggedIn } = useGlobalContext();

    const handleLogging = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <div className='navbar flex'>
            <Link to="/" className='disable-anchor-css'>
                <h4>To Do World</h4>
            </Link>
            <div className='flex'>
                {loggedIn ? (
                    <>
                        <Link to="/home">
                            <button className='btn'>Todos</button>
                        </Link>
                        <Link to="/">
                            <button className='btn' onClick={handleLogging}>Sign Out</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signIn">
                            <button className='btn' onClick={() => { }}>Log In</button>
                        </Link>
                        <Link to="/register">
                            <button className='btn' onClick={() => { }}>Sign Up</button>
                        </Link>
                    </>
                )}

            </div>

        </div>
    )
}

export default NavBar;
