import { useState } from 'react';
import Mensaje from '../Alertas/Mensaje';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
const Password = () => {
  const { actualizarPassword } = useContext(AuthContext);
  const [form, setForm] = useState({
    passwordactual: '',
    passwordnuevo: '',
  });
  const [mensaje, setMensaje] = useState({});
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes('')) {
      setMensaje({
        respuesta: 'Todos los campos deben ser ingresados',
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    if (form.passwordnuevo.length < 6) {
      setMensaje({
        respuesta: 'El password debe tener mínimo 6 carácteres',
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    const resultado = await actualizarPassword(form);
    setMensaje(resultado);
    setTimeout(() => {
      setMensaje({});
    }, 3000);
  };
  return (
    <>
      <div className="mt-5">
        <h1 className="font-black text-4xl text-gray-500">Password</h1>
        <hr className="my-4" />
        <p className="mb-2">
          Este módulo te permite actualizar el password del usuario
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div>
          <label
            htmlFor="passwordactual"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Password actual:
          </label>
          <input
            id="passwordactual"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
            placeholder="**************"
            name="passwordactual"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="passwordnuevo"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Nuevo password:
          </label>
          <input
            id="passwordnuevo"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
            placeholder="**************"
            name="passwordnuevo"
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
          value="Actualizar"
        />
      </form>
    </>
  );
};
export default Password;
