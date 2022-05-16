import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.login(email, password);
            if (isLogged) {
                navigate('/home');
            } else {
                alert("Error on login.");
            }
        }
    }

    return (
        <div>
            <h2>Login - TODO List</h2>

            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@domain.com"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="your-password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}