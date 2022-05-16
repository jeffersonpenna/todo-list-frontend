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
        <h1>TODO List</h1>
        <nav>
          {!auth.user && <Link to="/">Login</Link>}
          {auth.user && <Link to="/home">Home</Link>}
          
          {auth.user && <a href="#logout" onClick={handleLogout}>Logout</a>}
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
