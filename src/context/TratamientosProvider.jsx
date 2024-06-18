import { createContext, useState } from 'react';
import axios from 'axios';
const TratamientosContext = createContext();

const TratamientosProvider = ({ children }) => {
  const [tratamientos, setTratamientos] = useState([]);
  const [modal, setModal] = useState(false);
  const [mensajeElimn, setMensaje] = useState({});
  const handleModal = () => {
    setModal(!modal);
  };
  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        'Vas a eliminar el tratamiento de un paciente, ¿Estás seguro de realizar esta acción?'
      );
      if (confirmar) {
        const token = localStorage.getItem('token');
        const URL = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(URL, options);
        const tratamientosActualizados = tratamientos.filter(
          (tratamiento) => tratamiento._id !== id
        );
        setTratamientos(tratamientosActualizados);
        setMensaje({ respuesta: response.data?.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
        });
      }
    } catch (error) {
      setMensaje({ respuesta: response.data?.msg, tipo: true });
    }
  };
  const registrarTratamientos = async (datos) => {
    const token = localStorage.getItem('token');
    console.log(`el id: ${datos.id}`);
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.post(URL, datos, options);
      setTratamientos([respuesta.data.tratamiento, ...tratamientos]);
    } catch (error) {
      //TODO: probar que el mensaje aparezca
      setMensaje({ respuesta: response.data?.msg, tipo: true });
      console.log('existe un mensaje de error')
    }
  };
  const handleStatus = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const confirmar = confirm(
        'Vas a finalizar el tratamiento de un paciente, ¿Estás seguro de realizar esta acción?'
      );
      if (confirmar) {
        const URL = `${
          import.meta.env.VITE_BACKEND_URL
        }/tratamiento/estado/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(URL, {}, options);
        const tratamientosActualizados = tratamientos.filter(
          (tratamiento) => tratamiento.i_id !== id
        );
        setTratamientos(tratamientosActualizados);
        setMensaje({ respuesta: response.data?.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 2000);
      }
    } catch (error) {
      setMensaje({ respuesta: response.data?.msg, tipo: false });
    }
  };

  return (
    <TratamientosContext.Provider
      value={{
        modal,
        setModal,
        handleModal,
        tratamientos,
        setTratamientos,
        registrarTratamientos,
        handleDelete,
        mensajeElimn,
        handleStatus,
      }}
    >
      {children}
    </TratamientosContext.Provider>
  );
};
export { TratamientosProvider };
export default TratamientosContext;
