import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import ModalTratamiento from '../componets/Modals/ModalTratamiento';
//para el context
import TratamientosContext from '../context/TratamientosProvider';
import TablaTratamientos from '../componets/TablaTratamientos';
const Visualizar = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({});
  const [mensaje, setMensaje] = useState({});
  //estado para Modal
  const { modal, mensajeElimn, handleModal, tratamientos, setTratamientos } =
    useContext(TratamientosContext);

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(
      nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
    );
    return new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(
      nuevaFecha
    );
  };
  const consultarTratamientos = async () => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta1 = await axios.get(URL, options);
      setTratamientos(respuesta1.data.tratamientos);
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };
  const consultarPaciente = async () => {
    try {
      const token = localStorage.getItem('token');
      const URL = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(URL, options);
      setPaciente(respuesta.data);
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };
  useEffect(() => {
    consultarPaciente();
    consultarTratamientos();
  }, []);
  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Detalles del Paciente
        </h1>
        <hr className="my-4" />
        <p className="mb-8">
          Este submodulo permite visualizar los datos de un paciente
        </p>
      </div>
      {Object.keys(paciente).length != 0 ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del paciente:{' '}
                </span>
                {paciente.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del propietario:{' '}
                </span>
                {paciente.propietario}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Email:{' '}
                </span>
                {paciente.email}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de atención:{' '}
                </span>
                {formatearFecha(paciente.ingreso)}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de salida:{' '}
                </span>
                {formatearFecha(paciente.salida)}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{' '}
                </span>
                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {paciente.estado && 'activo'}
                </span>
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Síntomas:{' '}
                </span>
                {paciente.sintomas}
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png"
                alt="dogandcat"
                className="h-80 w-80"
              />
            </div>
          </div>
          <hr className="my-4" />
          {Object.keys(mensajeElimn).length > 0 && (
            <Mensaje tipo={mensajeElimn.tipo}>{mensajeElimn.respuesta}</Mensaje>
          )}
          <div className="flex justify-between items-center">
            <p>
              Este submódulo te permite visualizar los tratamientos del paciente
            </p>
            <button
              className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
              onClick={handleModal}
            >
              Registrar
            </button>
          </div>
          {modal && <ModalTratamiento idPaciente={paciente._id} />}
          {tratamientos.length == 0 ? (
            <Mensaje tipo={'active'}>
              No hay tratamientos registrados para este paciente
            </Mensaje>
          ) : (
            <TablaTratamientos tratamientos={tratamientos} />
          )}
        </>
      ) : (
        Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )
      )}
    </>
  );
};

export default Visualizar;
