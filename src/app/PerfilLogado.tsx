"use client";

import React, { useState } from 'react';
import { FaBell, FaSignOutAlt, FaArrowLeft, FaEdit, FaTrash, FaComment, FaEnvelope, FaBuilding } from 'react-icons/fa';
import { useRouter } from 'next/router';

const publicacoes = [
  {
    id: 1,
    autor: "Morty Gamer",
    data: "17/04/2024, às 21:42",
    titulo: "Brasilia · Feliz",
    conteudo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    comentarios: [
      { id: 1, autor: "Test", conteudo: "É a tropa do Lamar" },
      { id: 2, autor: "test2", conteudo: "I love focatia" },
    ],
  },
  {
    id: 2,
    autor: "Morty Gamer",
    data: "15/04/2024, às 21:42",
    titulo: "São paulo · teste",
    conteudo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    comentarios: [
      { id: 1, autor: "Test", conteudo: "Ok" },
    ],
  },
];

const PerfilLogado = () => {
  const [comentariosAbertos, setComentariosAbertos] = useState([]);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [excluirPerfil, setExcluirPerfil] = useState(false);
  const [perfil, setPerfil] = useState({
    nome: "Morty Gamer",
    departamento: "Ciência da Computação / Dept. Ciência da Computação",
    email: "Morty.gamer.23@cjr.org.br",
  });

  const [perfilEditado, setPerfilEditado] = useState(perfil);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
  //const router = useRouter();

  const toggleComentarios = (id) => {
    setComentariosAbertos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setPerfilEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePerfil = () => {
    setPerfil(perfilEditado);
    setEditandoPerfil(false);
  };

  const handleExcluirPerfil = () => {
    console.log("Perfil excluído");
    setExcluirPerfil(false);
  };

  const handleLogout = () => {
    //router.push('/perfilDeslogado');
  };

  const toggleNotificacoes = () => {
    setMostrarNotificacoes((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500 to-teal-500">
        <div className="flex items-center">
          <FaArrowLeft className="text-white w-6 h-6 mr-4 cursor-pointer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Webysther_20160322_-_Logo_UnB_%28sem_texto%29.svg" alt="Logo" className="w-16 h-16 mr-4" />
        </div>
        <div className="flex items-center">
          <FaBell className="text-white w-6 h-6 mr-4 cursor-pointer" onClick={toggleNotificacoes} />
          <img src="https://rickandmortyapi.com/api/character/avatar/26.jpeg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4 cursor-pointer" />
          <FaSignOutAlt className="text-white w-6 h-6 cursor-pointer" onClick={handleLogout} />
        </div>
      </header>

      <main className="container mx-auto mt-4 px-4 lg:px-0">
        <div className="bg-white rounded-lg shadow p-4 text-center max-w-xl mx-auto">
          <img src="https://rickandmortyapi.com/api/character/avatar/26.jpeg" alt="Foto do Perfil" className="w-32 h-32 rounded-full mx-auto mb-2" />
          {editandoPerfil ? (
            <>
              <input
                type="text"
                name="nome"
                value={perfilEditado.nome}
                onChange={handleEditChange}
                className="border rounded p-2 w-full mb-2"
              />
              <div className="flex items-center justify-center mb-2">
                <FaBuilding className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="departamento"
                  value={perfilEditado.departamento}
                  onChange={handleEditChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={perfilEditado.email}
                  onChange={handleEditChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-full mr-2"
                onClick={handleSavePerfil}
              >
                Salvar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={() => setEditandoPerfil(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{perfil.nome}</h2>
              <p className="text-gray-500 flex items-center justify-center">
                <FaBuilding className="mr-2" /> {perfil.departamento}
              </p>
              <p className="text-gray-500 flex items-center justify-center">
                <FaEnvelope className="mr-2" /> {perfil.email}
              </p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded-full"
                  onClick={() => setEditandoPerfil(true)}
                >
                  Editar Perfil
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                  onClick={() => setExcluirPerfil(true)}
                >
                  Excluir Perfil
                </button>
              </div>
            </>
          )}
        </div>

        <section className="mt-8">
          <h3 className="text-xl font-bold text-center">Publicações</h3>
          <div className="mt-4 space-y-4 max-w-xl mx-auto">
            {publicacoes.map((publicacao) => (
              <div key={publicacao.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src="https://rickandmortyapi.com/api/character/avatar/26.jpeg" alt="Avatar da Publicação" className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <h4 className="font-bold">{publicacao.autor}</h4>
                    <p className="text-gray-500 text-sm">{publicacao.data} · {publicacao.titulo}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{publicacao.conteudo}</p>
                <div className="flex justify-between items-center mt-2 text-gray-500">
                  <button onClick={() => toggleComentarios(publicacao.id)} className="flex items-center">
                    <FaComment className="mr-1" /> {publicacao.comentarios.length} comentários
                  </button>
                  <div className="flex space-x-2">
                    <FaEdit className="cursor-pointer" />
                    <FaTrash className="cursor-pointer" />
                  </div>
                </div>
                {comentariosAbertos.includes(publicacao.id) && (
                  <div className="mt-2 bg-gray-100 p-2 rounded-lg">
                    {publicacao.comentarios.map((comentario) => (
                      <p key={comentario.id} className="text-gray-600">
                        <strong>{comentario.autor}:</strong> {comentario.conteudo}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {excluirPerfil && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Tem certeza que deseja excluir o perfil?</h2>
            <div className="flex items-center justify-center mb-4">
              <input type="checkbox" id="confirmExclusao" className="mr-2" />
              <label htmlFor="confirmExclusao" className="text-gray-700">Confirmo a exclusão do perfil</label>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={handleExcluirPerfil}
              >
                Excluir
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-full"
                onClick={() => setExcluirPerfil(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarNotificacoes && (
        <div className="fixed top-20 right-6 mt-4 mr-4 w-60">
          <div className="flex justify-center bg-white py-4 rounded-lg shadow-lg max-w-sm w-full">
            <ul className="list-disc pl-5">
              <div className="mb-2 bg-slate-300 h-16 w-44 rounded-md text-center pt-5">Notificação 1</div>
              <div className="mb-2 bg-slate-300 h-16 w-44 rounded-md text-center pt-5">Notificação 2</div>
              <div className="mb-2 bg-slate-300 h-16 w-44 rounded-md text-center pt-5">Notificação 3</div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilLogado;
