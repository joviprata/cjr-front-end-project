"use client";

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBook, FaBuilding } from 'react-icons/fa';  // Importando os ícones
import { useRouter } from 'next/navigation';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, email, senha, curso, departamento });
    setSuccess(true);
  };

  const handleLoginClick = () => {
    router.push('/login'); // Altere para a rota de login adequada
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-teal-500 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl mb-4 font-bold">Olá, seja bem vindo!</h2>
          <p className="mb-8 px-20 text-center">É um prazer ter você conosco. Se já faz parte da nossa comunidade, faça o login abaixo para continuar sua jornada. Caso contrário, estamos animados para ter você a bordo. Vamos começar essa jornada juntos!</p>
          <button
            onClick={handleLoginClick}
            className="px-8 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-teal-500 transition duration-300"
          >
            SIGN IN
          </button>
        </div>
        <div className="w-1/2 p-16 bg-cover bg-center" style={{ backgroundImage: 'url("/Cadastro-Usuário.png")' }}>
          <div className="bg-white bg-opacity-90 p-16 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h1 className="text-3xl font-bold mb-6 text-center text-teal-500">Cadastro Usuário</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 justify-center items-center">
              <div className="relative w-full flex items-center">
                <FaUser className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <div className="relative w-full flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <div className="relative w-full flex items-center">
                <FaLock className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <div className="relative w-full flex items-center">
                <FaBook className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Curso"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <div className="relative w-full flex items-center">
                <FaBuilding className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <button type="submit" className="p-3 w-40 bg-teal-500 text-white rounded-md hover:bg-cyan-500 transition duration-300 transform hover:scale-105">
                Criar Conta
              </button>
              {success && <p className="text-green-500 mt-4 text-lg">Cadastro realizado com sucesso!</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
