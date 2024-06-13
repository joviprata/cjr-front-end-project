// src/app/DetalhesProfessor/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Usando useParams em vez de useRouter
import axios from '../../config/axiosConfig';
import Image from 'next/image';

const DetalhesProfessor = () => {
  const { id } = useParams(); // Obtendo o id dos parâmetros da rota
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [discipline, setDiscipline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTeacherDetails = async () => {
        try {
          const teacherResponse = await axios.get(`/teachers/${id}`);
          const teacherData = teacherResponse.data;

          const photoBase64 = Buffer.from(teacherData.photo.data).toString('base64');

          setTeacher({
            ...teacherData,
            photo: `data:image/jpeg;base64,${photoBase64}`
          });

          setDiscipline(teacherData.Discipline);
          setReviews(Array.isArray(teacherData.reviews) ? teacherData.reviews : [teacherData.reviews]); // Ajuste conforme a estrutura do backend
        } catch (err) {
          console.error('Error fetching teacher details:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTeacherDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!teacher || !discipline) {
    return <div>No data found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={teacher.photo}
            alt={`${teacher.name}'s profile picture`}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
            <p className="text-lg"><strong>Departamento:</strong> {teacher.departament}</p>
            <p className="text-lg"><strong>Disciplina:</strong> {discipline.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
        {reviews.length === 0 ? (
          <p>Não há avaliações para este professor.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="mb-4 p-4 border-b border-gray-200">
              <p className="text-lg"><strong>Conteúdo:</strong> {review.content}</p>
              <p className="text-sm text-gray-600"><strong>Usuário:</strong> {review.userID}</p>
              <p className="text-sm text-gray-600"><strong>Data:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetalhesProfessor;
