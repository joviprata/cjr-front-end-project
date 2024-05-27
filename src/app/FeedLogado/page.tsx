"use client";
import React, { useState } from 'react';
import { FaSearch, FaBell, FaSignOutAlt } from 'react-icons/fa';

const professoresNovos = [
  { nome: "Guilherme Ramos", disciplina: "APC", img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg" },
  { nome: "Vidal", disciplina: "OAC", img: "https://rickandmortyapi.com/api/character/avatar/2.jpeg" },
  { nome: "Edna", disciplina: "Banco de dados", img: "https://rickandmortyapi.com/api/character/avatar/3.jpeg" },
  { nome: "Roberta", disciplina: "Técnicas de Programação", img: "https://rickandmortyapi.com/api/character/avatar/4.jpeg" },
];

const professoresTodos = [
  { nome: "aefr", disciplina: "Tropa do Lamar", img: "https://rickandmortyapi.com/api/character/avatar/5.jpeg" },
  { nome: "afggg", disciplina: "lamarzete", img: "https://rickandmortyapi.com/api/character/avatar/6.jpeg" },
  { nome: "asdaa", disciplina: "LP", img: "https://rickandmortyapi.com/api/character/avatar/7.jpeg" },
  { nome: "dfnggfn", disciplina: "dgtt", img: "https://rickandmortyapi.com/api/character/avatar/8.jpeg" },
  { nome: "gsdf", disciplina: "dger", img: "https://rickandmortyapi.com/api/character/avatar/9.jpeg" },
  { nome: "uiot", disciplina: "Inteco", img: "https://rickandmortyapi.com/api/character/avatar/12.jpeg" },
  { nome: "yuke", disciplina: "fewt", img: "https://rickandmortyapi.com/api/character/avatar/33.jpeg" },
  { nome: "Ndty", disciplina: "sr", img: "https://rickandmortyapi.com/api/character/avatar/21.jpeg" },
];

const CardProfessor = ({ nome, disciplina, img }) => (
  <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
    <div className="bg-slate-50 rounded-lg shadow w-80 p-4 text-center transform transition-transform hover:scale-105 cursor-pointer">
      <img src={img || "/default-avatar.png"} alt={nome} className="w-32 h-32 rounded-lg mx-auto mb-2" />
      <h3 className="font-bold">{nome}</h3>
      <p>{disciplina}</p>
    </div>
  </div>
);

const FeedLogado: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfessoresNovos = professoresNovos.filter((professor) =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProfessoresTodos = professoresTodos.filter((professor) =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r to-teal-500 from-cyan-500">
        <div className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Webysther_20160322_-_Logo_UnB_%28sem_texto%29.svg" alt="Logo" className="w-16 h-16 mr-4" />
        </div>
        <div className="flex items-center">
          <FaBell className="text-white w-6 h-6 mr-4 cursor-pointer" />
          <img src="https://rickandmortyapi.com/api/character/avatar/26.jpeg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4 cursor-pointer" />
          <FaSignOutAlt className="text-white w-6 h-6 cursor-pointer" />
        </div>
      </header>

      <main className="container mx-auto mt-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-500">Novos Professores</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar Professor(a)"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-full px-4 py-2 pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap -m-2">
          {filteredProfessoresNovos.map((professor, index) => (
            <CardProfessor key={index} {...professor} />
          ))}
        </div>

        <div className="my-8 border-t border-gray-300"></div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-500">Todos os Professores</h2>
          <div className="relative">
            <button onClick={toggleDropdown} className="bg-cyan-500 text-white w-28 px-4 py-2 rounded-full hover:bg-sky-400">Ordenar</button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Ordenar por Nome</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Ordenar por Disciplina</li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -m-2">
          {filteredProfessoresTodos.map((professor, index) => (
            <CardProfessor key={index} {...professor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeedLogado;
