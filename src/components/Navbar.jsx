import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { authenticateUser, isLoggedIn, isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {

    // 1. debemos remover el token de localstorage
    localStorage.removeItem("authToken")

    // 2. cambiar los estados del contexto
    await authenticateUser() // esto va a forzar que el el token sea valido y cambiar los estados

    // 3. redireccionar al usuario a algun lugar publico
    navigate("/login")

  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn === false && <>
        <Link to="/signup">Registro</Link>
        <Link to="/login">Acceso</Link>
      </>}

      {isLoggedIn === true && <>
        <Link to="/private-page-example">Ejemplo Privado</Link>
        <Link onClick={handleLogout}>Cerrar sesión</Link>
      </>}

      {isAdmin && <p>eres un admin</p>}

    </nav>
  );
}

export default Navbar;
