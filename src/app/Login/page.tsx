"use client";

import { Inter } from "next/font/google";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import axiosInstance from "@/config/axiosConfig";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Endereço de e-mail inválido").required("Obrigatório"),
    password: Yup.string().required("Obrigatório"),
  });

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values: any) => {
    try {
      const response = await axiosInstance.post("/login", values);
      console.log("Response:", response.data);

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        router.push("/FeedLogado");
      } else {
        setError(response.data.message || 'Erro ao fazer login');
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        setError("Email ou senha inválidos. Tente novamente.");
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-gray-200">
            <img className="w-full h-full object-cover" src="/imagens/login.png" alt="Login" />
          </div>
          <div className="w-1/2 flex">
            <div className="m-auto p-6">
              <h2 className="text-center text-black text-2xl font-semibold mb-6">Avaliação de Professores</h2>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col">
                  <div className="mb-4">
                    <Field
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      placeholder="Senha"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                  <div className="inline-flex space-x-4">
                    <button
                      type="submit"
                      className="w-full bg-emerald-200 text-blue-950 py-2 px-4 rounded hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      className="w-full bg-emerald-200 text-blue-950 py-2 px-4 rounded hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      Criar Conta
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
