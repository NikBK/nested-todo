import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from './components/NotFoundPage';
import { LandingPage } from './components/LandingPage';
import { SignIn } from './components/SignIn';
import { Home } from './components/Home';
import GlobalContext from './components/Context';
import NavBar from './components/NavBar';
import Register from './components/Register';

function App() {

  return (
    <GlobalContext>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/signIn"
              element={<SignIn />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </GlobalContext>
  );
}

export default App;
