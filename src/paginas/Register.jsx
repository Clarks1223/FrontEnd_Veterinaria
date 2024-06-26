import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

export const Register = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
  });
  //manejar cambios en el formulario
  const handleChange = (e) => {
    //Spread Syntax ...form - se utiliza para copiar todos los campos del formulario
    //e.target.name selecciona los campos name del formulario
    //e.target.value selecciona los valores actuales de los campos
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //para enviar el formilario
  const handleSumbit = async (e) => {
    //evita que se recarge automaticamente
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const respuesta = await axios.post(URL, form);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      setForm({});
    } catch (error) {
      setMensaje({
        respuesta: error.response.data?.errors[0].msg,
        tipo: false,
      });
    }
  };
  return (
    <>
      <div className="bg-white flex justify-center w-1/2 ">
        <div className="md:w-4/5 sm:w-full">
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
            Welcome
          </h1>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <small className="text-gray-400 block my-4 text-sm">
            Please enter your details
          </small>

          <form onSubmit={handleSumbit}>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Name:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre || ''}
                onChange={handleChange}
                placeholder="Enter you name"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">
                Lastname
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={form.apellido || ''}
                onChange={handleChange}
                placeholder="Enter you lastname"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">
                Address
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={form.direccion || ''}
                onChange={handleChange}
                placeholder="Enter you address"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibild">
                Phone number
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={form.telefono || ''}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                placeholder="Enter you email"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
                placeholder="********************"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                Register
              </button>
            </div>
          </form>

          <div className="mt-3 text-sm flex justify-between items-center">
            <p>You've already an account?</p>
            <Link
              to="/login"
              className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-1/2 h-screen bg-[url('/images/dogregister.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            "
      ></div>
    </>
  );
};
