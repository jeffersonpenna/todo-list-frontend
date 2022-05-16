import { useContext } from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';

function App() {
  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    auth.logout();
  }

  return (
    <div className="App">
      <header>
        <nav className="menu">
          <ul>
            <li>TODO List</li>
            {auth.user &&
              <li><a href="#">Jefferson Penna</a>
                <ul>
                  <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
                </ul>
              </li>
            }
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
