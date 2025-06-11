import React from 'react';
import type { User } from '../App';
import { CheckCircleIcon } from './icons/CheckCircleIcon'; // Using CheckCircleIcon

interface AprovarEventoNovaSolicitacaoPageProps {
  currentUser: User;
}

const AprovarEventoNovaSolicitacaoPage: React.FC<AprovarEventoNovaSolicitacaoPageProps> = ({ currentUser }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <CheckCircleIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Aprovar Novas Solicitações (Eventos Avulsos)
        </h1>
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <p className="text-gray-600">
          Esta página é para o perfil "{currentUser.currentProfile}" ({currentUser.name}) aprovar novas solicitações de eventos avulsos.
        </p>
        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500 text-center">
            Funcionalidades de aprovação de novas solicitações de eventos avulsos serão implementadas aqui.
            <br />
            (Ex: Listagem de solicitações pendentes, detalhes, botões de aprovar/reprovar).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AprovarEventoNovaSolicitacaoPage;