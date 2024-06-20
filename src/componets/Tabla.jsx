import { MdDeleteForever, MdNoteAdd, MdInfo } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mensaje from './Alertas/Mensaje';
import AuthContext from '../context/AuthProvider';

const Tabla = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  const listarPacientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const idSol = await auth._id;
      const URL = `${import.meta.env.VITE_BACKEND_URL}/pacientes/${idSol}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(URL, options);
      setPacientes(respuesta.data, ...pacientes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarPacientes();
  }, []);
  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        'Vas registrar la salida de un paciente, esta accion no se puede revertir. Estas seguro de realizar esta accion?'
      );
      if (confirmar) {
        const token = localStorage.getItem('token');
        const URL = `${
          import.meta.env.VITE_BACKEND_URL
        }/paciente/eliminar/${id}`;

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const data = { salida: new Date().toString() };
        await axios.delete(URL, { headers, data });
        listarPacientes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {pacientes.length === 0 ? (
        <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg  bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Propietario</th>
              <th className="p-2">Email</th>
              <th className="p-2">Celular</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr
                className="border-b hover:bg-gray-300 text-center"
                key={paciente._id}
              >
                <td>{index + 1}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.propietario}</td>
                <td>{paciente.email}</td>
                <td>{paciente.celular}</td>
                <td>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {paciente.estado && 'activo'}
                  </span>
                </td>
                <td className="py-2 text-center">
                  <MdNoteAdd
                    onClick={() => {
                      navigate(`/dashboard/visualizar/${paciente._id}`);
                    }}
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  />
                  {auth.rol === 'veterinario' && (
                    <>
                      <MdInfo
                        onClick={() => {
                          navigate(`/dashboard/actualizar/${paciente._id}`);
                        }}
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      />

                      <MdDeleteForever
                        onClick={() => {
                          handleDelete(paciente._id);
                        }}
                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tabla;
