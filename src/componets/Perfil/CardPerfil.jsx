import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
export const CardPerfil = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-between shadow-xl rounded-lg">
      <div className="mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
          alt="img-client"
          className="m-auto"
          width={120}
          height={120}
        />
      </div>
      <div className="w-full">
        <div className="flex items-center mb-4">
          <b className="mr-2 text-gray-700">Nombre:</b>
          <p className="text-gray-900">{auth.nombre}</p>
        </div>
        <div className="flex items-center mb-4">
          <b className="mr-2 text-gray-700">Apellido:</b>
          <p className="text-gray-900">{auth.apellido}</p>
        </div>
        <div className="flex items-center mb-4">
          <b className="mr-2 text-gray-700">Email:</b>
          <p className="text-gray-900">{auth.email}</p>
        </div>
        <div className="flex items-center mb-4">
          <b className="mr-2 text-gray-700">Telefono:</b>
          <p className="text-gray-900">{auth.telefono}</p>
        </div>
        <div className="flex items-center">
          <b className="mr-2 text-gray-700">Direccion:</b>
          <p className="text-gray-900">{auth.direccion}</p>
        </div>
      </div>
    </div>
  );
};
