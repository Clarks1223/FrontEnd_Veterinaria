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
      console.log(`lo que llega como respuesta ${respuesta}`);
      //actualizo el auth
      setAuth(respuesta.data);
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
