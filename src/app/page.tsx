"use client";
import React from 'react';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
 
      <header className="w-full bg-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Avaliação de Professores</h1>
          <div className="flex space-x-4">
            <Link href="/Login" legacyBehavior>
              <a className="px-4 py-2 bg-green-600 rounded-md">Login</a>
            </Link>
            <Link href="/Cadastro" legacyBehavior>
              <a className="px-4 py-2 bg-green-600 rounded-md">Cadastrar</a>
            </Link>
          </div>
        </div>
      </header>




      <div className="w-full mt-8 px-4">
        <div className="container mx-auto flex justify-center">
          <input
            type="text"
            placeholder="Buscar perfil..."
            className="w-full max-w-2xl px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-700"
          />
        </div>
      </div>


      <footer className="w-full bg-blue-700 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()}.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
