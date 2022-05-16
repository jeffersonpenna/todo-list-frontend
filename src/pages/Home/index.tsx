
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div>Hello {auth.user?.firstName} {auth.user?.lastName}</div>
  )
}