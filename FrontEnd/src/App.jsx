import { useEffect, useRef, useState } from 'react';
import api from '../src/services/api';

export function App() {
  const [data, setData] = useState([]);

  const inputName = useRef();
  const inputEmail = useRef();
  const inputAge = useRef();

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  async function createUsers(e) {
    e.preventDefault();

    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value,
    });

    getUsers();
    inputName.current.value = '';
    inputEmail.current.value = '';
    inputAge.current.value = '';
  }

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      setData(usersFromApi.data);
    } catch (err) {
      console.log('ocorreu um erro', err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-cyan-300 via-cyan-500 to-sky-700 flex flex-col items-center gap-10">
      <div className="mt-28 text-5xl text-bold text-white">Usuários</div>

      <div className="w-96 h-72 mt-6 bg-sky-600 rounded-lg">
        <form
          onSubmit={createUsers}
          className="w-full h-full p-3 flex flex-col items-center justify-center gap-2"
        >
          <div className="w-full h-full flex flex-col gap-2 justify-center border-red-600">
            <div className="flex flex-col gap-1">
              <label htmlFor="Nome">Nome</label>
              <input
                type="text"
                name="Nome"
                id="Nome"
                ref={inputName}
                className="outline-none pl-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                name="Email"
                id="Email"
                ref={inputEmail}
                className="outline-none pl-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Idade">Idade</label>
              <input
                type="text"
                name="Idade"
                id="Idade"
                ref={inputAge}
                className="outline-none pl-2"
              />
            </div>
          </div>
          <button className="w-full h-12 bg-sky-300 rounded-md cursor-pointer">
            Criar
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((usuario) => (
          <div
            key={usuario.id}
            className="w-96 h-28 bg-white rounded-xl flex items-center justify-around"
          >
            <div>
              <div>Nome: {usuario.name}</div>
              <div>Email: {usuario.email}</div>
              <div>Idade: {usuario.age}</div>
            </div>
            <button
              onClick={() => deleteUsers(usuario.id)}
              className="w-16 h-8 bg-red-600 text-white text-bold rounded-md"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
