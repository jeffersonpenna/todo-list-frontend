import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const sessionAuthToken = localStorage.getItem('authToken');
            const sessionUser = localStorage.getItem('userName');
            if (sessionAuthToken && sessionUser) {
                const userFullname = sessionUser.split(" ")
                const firstName = userFullname[0]
                userFullname.shift()
                const lastName = userFullname.join(" ")
                
                const newUser: User = {
                    firstName,
                    lastName
                }

                setUser(newUser);
            }
        }
        validateToken();
    }, [api]);

    const login = async (email: string, password: string) => {
        const data = await api.login(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setUserName(`${data.user.firstName} ${data.user.lastName}`)
            setToken(data.token);
            return true;
        }
        return false;
    }

    const logout = async () => {
        setUser(null);
        setToken('');
        setUserName('')
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const setUserName = (userName: string) => {
        localStorage.setItem('userName', userName);
    }
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}