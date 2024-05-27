import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import service from "../services/config.services"

function PrivateExample() {

  const [ data, setData ] = useState(null)

  useEffect(() => {

    // const authToken = localStorage.getItem("authToken")

    // axios.get("http://localhost:5005/api/auth/private-route-example", {
    //   headers: { authorization: `Bearer ${authToken}` }
    // })

    service.get("/auth/private-route-example")

    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder</p>

    </div>
  )
}

export default PrivateExample