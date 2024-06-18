import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const perfil = async (token) => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
      //configuracion de las opciones de solicitud
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      //solicitud get, se almacena en la constante respuesta
      const respuesta = await axios.get(URL, options);
      //actualizo el auth
      setAuth(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };
  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem('token');
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(URL, datos, options);
      perfil(token);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };
  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem('token');
    try {
      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/veterinario/actualizarpassword`;
      const options = {
        headers: {
          method: 'PUT',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(URL, datos, options);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };
  
  useEffect(() => {
    //obtiene el token almacenado en el localStorage del navegador
    const token = localStorage.getItem('token');
    // si existe el token se ejecuta la funcion perfil
    if (token) {
      perfil(token);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        actualizarPerfil,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
