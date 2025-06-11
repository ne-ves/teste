import React, { useState } from 'react';
import type { User } from '../App'; 
import { AcademicCapIcon } from './icons/AcademicCapIcon'; // Changed from LockClosedIcon
import { ChevronDownIcon } from './icons/ChevronDownIcon'; // Import the icon

// Define LoggedInUser as User, since User from App.tsx already represents the state without a password.
type LoggedInUser = User;

interface LoginPageProps {
  onLoginSuccess: (user: LoggedInUser) => void;
}

// Local interface for credentials that includes a password field for authentication logic.
interface CredentialsForLogin extends User {
  passwordValue: string;
}

const ADMIN_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'admin',
  username: 'admin',
  name: 'Otávio Barbosa', 
  matricula: '90008724',
  currentTitulationId: 'mestre', // Changed from 'doutor' to 'mestre'
  isAdmin: true,
  currentProfile: 'Administrador',
  passwordValue: '123', 
};

const REGULAR_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'user',
  username: 'user',
  name: 'Pedro Augusto Gomes Achete', // Updated name here
  matricula: '100001',
  currentTitulationId: 'mestre',
  isAdmin: false,
  currentProfile: 'Usuário', // Updated profile name to "Usuário"
  passwordValue: '123',
};

const GPCA_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'gpca',
  username: 'planejamento.academico', 
  name: 'Joao Anilson', 
  matricula: '200001', 
  currentTitulationId: 'doutor', 
  isAdmin: false,
  currentProfile: 'Planejamento Acadêmico', 
  passwordValue: '123', 
};

const CONTROLE_ACADEMICO_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'controle_academico',
  username: 'controle.academico',
  name: 'Mariana Brandl', // Updated name
  matricula: '300001',
  currentTitulationId: 'graduado',
  isAdmin: false,
  currentProfile: 'Controle Acadêmico',
  passwordValue: '123',
};

const GERENTE_ESCOLA_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'gerente_escola',
  username: 'gerente.escola',
  name: 'Thalita Porto Henequim',
  matricula: '400001',
  currentTitulationId: 'doutor',
  isAdmin: false,
  currentProfile: 'Gerente Negócios',
  passwordValue: '123',
};

const DECANO_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'decano',
  username: 'decano',
  name: 'Patricia Piassetta',
  matricula: '500001',
  currentTitulationId: 'doutor',
  isAdmin: false,
  currentProfile: 'Decano',
  passwordValue: '123',
};

const COORDENADOR_CURSO_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'coordenador_curso',
  username: 'coordenador.curso',
  name: 'João Victor',
  matricula: '600001',
  currentTitulationId: 'mestre',
  isAdmin: false,
  currentProfile: 'Coordenador', // Updated profile name
  passwordValue: '123',
};

const ANALISTA_GRADUACAO_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'analista_graduacao',
  username: 'analista.graduacao',
  name: 'Flavia Lima Morares',
  matricula: '700001',
  currentTitulationId: 'especialista',
  isAdmin: false,
  currentProfile: 'Analista Negócio',
  passwordValue: '123',
};

const ANALISTA_LATO_SENSU_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'analista_latosensu',
  username: 'analista.latosensu',
  name: 'Andrea Trovo', // Updated name
  matricula: '800001',
  currentTitulationId: 'especialista',
  isAdmin: false,
  currentProfile: 'Analista Lato Sensu',
  passwordValue: '123',
};

const DOCENTE_USER_CREDENTIALS: CredentialsForLogin = {
  id: 'docente',
  username: 'docente',
  name: 'Bryan Luiz Pontarola', 
  matricula: '900001',
  currentTitulationId: 'mestre',
  isAdmin: false,
  currentProfile: 'Docente',
  passwordValue: '123',
};


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserList, setShowUserList] = useState(false); // State for user list visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    let foundUser: CredentialsForLogin | null = null;

    if (username === ADMIN_USER_CREDENTIALS.username && password === ADMIN_USER_CREDENTIALS.passwordValue) {
      foundUser = ADMIN_USER_CREDENTIALS;
    } else if (username === REGULAR_USER_CREDENTIALS.username && password === REGULAR_USER_CREDENTIALS.passwordValue) {
      foundUser = REGULAR_USER_CREDENTIALS;
    } else if (username === GPCA_USER_CREDENTIALS.username && password === GPCA_USER_CREDENTIALS.passwordValue) {
      foundUser = GPCA_USER_CREDENTIALS;
    } else if (username === CONTROLE_ACADEMICO_USER_CREDENTIALS.username && password === CONTROLE_ACADEMICO_USER_CREDENTIALS.passwordValue) {
      foundUser = CONTROLE_ACADEMICO_USER_CREDENTIALS;
    } else if (username === GERENTE_ESCOLA_USER_CREDENTIALS.username && password === GERENTE_ESCOLA_USER_CREDENTIALS.passwordValue) {
      foundUser = GERENTE_ESCOLA_USER_CREDENTIALS;
    } else if (username === DECANO_USER_CREDENTIALS.username && password === DECANO_USER_CREDENTIALS.passwordValue) {
      foundUser = DECANO_USER_CREDENTIALS;
    } else if (username === COORDENADOR_CURSO_USER_CREDENTIALS.username && password === COORDENADOR_CURSO_USER_CREDENTIALS.passwordValue) {
      foundUser = COORDENADOR_CURSO_USER_CREDENTIALS;
    } else if (username === ANALISTA_GRADUACAO_USER_CREDENTIALS.username && password === ANALISTA_GRADUACAO_USER_CREDENTIALS.passwordValue) {
      foundUser = ANALISTA_GRADUACAO_USER_CREDENTIALS;
    } else if (username === ANALISTA_LATO_SENSU_USER_CREDENTIALS.username && password === ANALISTA_LATO_SENSU_USER_CREDENTIALS.passwordValue) {
      foundUser = ANALISTA_LATO_SENSU_USER_CREDENTIALS;
    } else if (username === DOCENTE_USER_CREDENTIALS.username && password === DOCENTE_USER_CREDENTIALS.passwordValue) {
      foundUser = DOCENTE_USER_CREDENTIALS;
    }

    setIsLoading(false);

    if (foundUser) {
      const { passwordValue, ...userToLogin } = foundUser; // Exclude passwordValue from loggedInUser object
      onLoginSuccess(userToLogin); // userToLogin is now of type User, compatible with LoggedInUser
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  const toggleUserList = () => {
    setShowUserList(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-10">
        {/* You can replace this with an actual logo SVG or image */}
        {/* <img src="/path-to-your-logo.svg" alt="Jornada Logo" className="h-16 w-auto mx-auto mb-4" /> */}
        <h1 className="text-4xl font-bold text-jornada-primary">NOME A DEFINIR</h1>
        <p className="text-gray-600 mt-1">Gestão Acadêmica</p>
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
            <AcademicCapIcon className="h-12 w-12 text-jornada-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Acessar Sistema</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Utilize suas credenciais para entrar.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm"
              placeholder="Ex: admin, user, docente, ..."
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm"
              placeholder="123"
            />
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jornada-primary hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-60 transition-colors"
            >
              {isLoading ? (
                 <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t pt-4">
          <button
            onClick={toggleUserList}
            className="flex items-center justify-center w-full text-sm text-jornada-primary hover:text-jornada-primary-dark focus:outline-none focus:underline py-2 group"
            aria-expanded={showUserList}
            aria-controls="test-user-list"
          >
            {showUserList ? 'Ocultar Usuários de Teste' : 'Mostrar Usuários de Teste'}
            <ChevronDownIcon 
              className={`ml-2 h-5 w-5 text-jornada-primary group-hover:text-jornada-primary-dark transition-transform duration-200 ${showUserList ? 'transform rotate-180' : ''}`} 
            />
          </button>
          {showUserList && (
            <div id="test-user-list" className="mt-3 text-xs text-gray-500 transition-all duration-300 ease-in-out">
              <p className="text-center mb-1">Para testar, use (senha: <code className="bg-gray-200 px-1 rounded">123</code> para todos):</p>
              <ul className="list-disc list-inside space-y-0.5 text-left pl-4 sm:pl-8">
                  <li>Admin: <code className="bg-gray-200 px-1 rounded">admin</code></li>
                  <li>Usuário Comum: <code className="bg-gray-200 px-1 rounded">user</code></li>
                  <li>Docente: <code className="bg-gray-200 px-1 rounded">docente</code></li>
                  <li>Planejamento Acadêmico: <code className="bg-gray-200 px-1 rounded">planejamento.academico</code></li>
                  <li>Controle Acadêmico: <code className="bg-gray-200 px-1 rounded">controle.academico</code></li>
                  <li>Gerente de Escola: <code className="bg-gray-200 px-1 rounded">gerente.escola</code></li>
                  <li>Decano: <code className="bg-gray-200 px-1 rounded">decano</code></li>
                  <li>Coordenador de Curso: <code className="bg-gray-200 px-1 rounded">coordenador.curso</code></li>
                  <li>Analista de Graduação: <code className="bg-gray-200 px-1 rounded">analista.graduacao</code></li>
                  <li>Analista Lato Sensu: <code className="bg-gray-200 px-1 rounded">analista.latosensu</code></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Jornada Docente. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LoginPage;