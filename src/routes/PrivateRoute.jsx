import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  // comprueba la autenticacion
  const autenticado = localStorage.getItem('token');
  // si el usuario esta auteticado el programa devuelve los children - lo que este dentro de privateRoute
  return autenticado ? children : <Navigate to="/login" />;
};
