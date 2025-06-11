
import React from 'react';
import type { User } from '../App';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon'; // Example Icon

interface LicencasPageProps {
  currentUser: User;
}

const LicencasPage: React.FC<LicencasPageProps> = ({ currentUser }) => {
  // This page is only accessible to admins, so currentUser.isAdmin can be assumed true here if needed.
  // For now, it's a placeholder.

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <CalendarDaysIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Gerenciar Licenças (Admin)
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Visão Geral das Licenças
        </h2>
        <p className="text-gray-600">
          Bem-vindo(a) à página de gerenciamento de licenças, {currentUser.name}.
        </p>
        <p className="text-gray-600 mt-2">
          Esta seção permitirá que administradores visualizem, aprovem, reprovem e gerenciem as solicitações de licença dos docentes.
        </p>
        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500 text-center">
            Funcionalidades de gerenciamento de licenças serão implementadas aqui.
            <br />
            (Ex: Listagem de solicitações, filtros, formulário para registrar nova licença, etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LicencasPage;
