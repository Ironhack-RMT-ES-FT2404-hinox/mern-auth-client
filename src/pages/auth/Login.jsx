import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    const userCredentials = {
      email: email,
      password: password
    }

    try {
      
      // const response = await axios.post("http://localhost:5005/api/auth/login", userCredentials)
      const response = await service.post("/auth/login", userCredentials)
      console.log(response)

      // almacenamos el token en localstorage
      localStorage.setItem("authToken", response.data.authToken)

      // validamos el token y actualizamos los estados
      authenticateUser()

      // redireccionar a una pagina privada
      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      // aqui deberia ir navegación a una pagina de error
    }

  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Login;
