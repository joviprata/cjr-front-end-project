"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '../../../config/axiosConfig';
import Image from 'next/image';
import { Buffer } from 'buffer';
import { FaBell, FaSignOutAlt, FaArrowLeft, FaBuilding, FaEnvelope } from 'react-icons/fa';

const DetalhesProfessor = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchTeacherDetails = async () => {
        try {
          const teacherResponse = await axios.get(`/teachers/${id}`);
          const teacherData = teacherResponse.data;

          let photoBase64 = '';
          if (teacherData.photo && teacherData.photo.data) {
            photoBase64 = Buffer.from(teacherData.photo.data).toString('base64');
          }

          setTeacher({
            ...teacherData,
            photo: `data:image/jpeg;base64,${photoBase64}`
          });

          setDiscipline(teacherData.Discipline);
          setReviews(Array.isArray(teacherData.reviews) ? teacherData.reviews : [teacherData.reviews]);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTeacherDetails();
    }
  }, [id]);

  const handleLogout = () => {
    router.push('/perfilDeslogado');
  };

  const toggleNotificacoes = () => {
    setMostrarNotificacoes((prev) => !prev);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Erro: {error.message}</div>;
  }

  if (!teacher || !discipline) {
    return <div className="flex justify-center items-center h-screen">Nenhuma informação encontrada</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500 to-teal-500">
        <div className="flex items-center">
          <FaArrowLeft className="text-white w-6 h-6 mr-4 cursor-pointer" onClick={() => router.back()} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Webysther_20160322_-_Logo_UnB_%28sem_texto%29.svg" alt="Logo" className="w-16 h-16 mr-4" />
        </div>
        <div className="flex items-center">
          <FaBell className="text-white w-6 h-6 mr-4 cursor-pointer" onClick={toggleNotificacoes} />
          <img src="https://rickandmortyapi.com/api/character/avatar/26.jpeg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4 cursor-pointer" />
          <FaSignOutAlt className="text-white w-6 h-6 cursor-pointer" onClick={handleLogout} />
        </div>
      </header>

      <main className="container mx-auto mt-4 px-4 lg:px-0">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 max-w-2xl mx-auto">
          <div className="flex items-center space-x-4">
            {teacher.photo && (
              <Image
                src={teacher.photo}
                alt={`${teacher.name}'s profile picture`}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
              <p className="text-lg flex items-center"><FaBuilding className="mr-2" /> {teacher.departament}</p>
              <p className="text-lg flex items-center"><FaEnvelope className="mr-2" /> {discipline.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
          {reviews.length === 0 ? (
            <p>Não há avaliações para este professor.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 border-b border-gray-200">
                <p className="text-lg mb-2"><strong>Conteúdo:</strong> {review.content}</p>
                <div className="flex items-center space-x-2">
                  {review.Usuer && review.Usuer.photoProfile && (
                    <Image
                      src={`data:image/jpeg;base64,${Buffer.from(review.Usuer.photoProfile).toString('base64')}`}
                      alt={`${review.Usuer.name}'s profile picture`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-600"><strong>Usuário:</strong> {review.Usuer?.name || 'Anônimo'}</p>
                    <p className="text-sm text-gray-600"><strong>Data:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

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

export default DetalhesProfessor;
