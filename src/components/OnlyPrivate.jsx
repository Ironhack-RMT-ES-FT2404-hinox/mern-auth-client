import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyPrivate(props) {
  // ! estos components HOC solo se deben usar sobre paginas completas en App.jsx

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === true) {
    // si el usuario está logeado, renderiza props.children
    return props.children
  } else {
    // si no está logeado, redirecciona
    return <Navigate to="/login"/>
  }


}

export default OnlyPrivate