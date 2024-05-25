import Image from "next/image";
import { Inter } from "next/font/google";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const inter = Inter({ subsets: ["latin"] })

const RegisterPage: React.FC = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    department: Yup.string().required("Required")
  });

  const initialValues = { name: "", email: "", password: "", course: "", department: ""};

  const handleSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 bg-gray-200 relative">
            <Image className="w-full h-full" src="/imagens/minhocao.png" alt="Minhocão" layout="fill" objectFit="cover" />
          </div>
          <div className="w-1/2 flex">
            <div className="m-auto">
              <h2 className="w-96 h-16 text-center text-black text-5x1 font-normal">Avaliação de Professores</h2>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col">
                    <div className="mb-4">
                        <Field
                        name = "name"
                        type = "name"
                        id = "name"
                        placeholder = "Nome"
                        className = "mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo"
                        />
                    </div>
                    <div className="mb-4">
                        <Field
                        name = "email"
                        type = "email"
                        id = "email"
                        placeholder = "E-mail"
                        className = "mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo"
                        />
                    </div>
                    <div className="mb-4">
                        <Field
                        name = "password"
                        type = "password"
                        id = "password"
                        placeholder = "Senha"
                        className = "mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo"
                        />
                    </div>
                    <div className="mb-4">
                        <Field
                        name = "course"
                        type = "course"
                        id = "course"
                        placeholder = "Curso"
                        className = "mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo"
                        />
                    </div>
                    <div className="mb-4">
                        <Field
                        name = "department"
                        type = "department"
                        id = "department"
                        placeholder = "Departamento"
                        className = "mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo"
                        />
                    </div>
                    <div className="inline-flex space-x-4">
                        <button
                        type="submit"
                        className = "w-full bg-emerald-200 text-blue-950 py-2 px-4 rounded md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                        Entrar
                        </button>
                        <button
                        type="button"
                        className = "w-full bg-emerald-200 text-blue-950 py-2 px-4 rounded md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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
}

export default RegisterPage;