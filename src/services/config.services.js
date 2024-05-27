import axios from "axios";

const service = axios.create({
  baseURL: `http://localhost:5005/api` // la base de todas las llamadas al backend
})

// nos permite interceptar la llamada justa antes de salir (de client a servder) para añadirle el token
service.interceptors.request.use((config) => {

  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }

  return config

})

export default service
// !de ahora en adelante, todas la llamadas que hagamos al server serán con este objeto de service