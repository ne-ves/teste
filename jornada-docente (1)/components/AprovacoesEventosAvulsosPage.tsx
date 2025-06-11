import React from 'react';
import type { User } from '../App';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon'; // Using CalendarDaysIcon as it relates to events

interface AprovacoesEventosAvulsosPageProps {
  currentUser: User;
}

const AprovacoesEventosAvulsosPage: React.FC<AprovacoesEventosAvulsosPageProps> = ({ currentUser }) => {
  // This page is primarily for 'gerente.escola'
  // currentUser.username === 'gerente.escola'

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <CalendarDaysIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Aprovações de Eventos Avulsos
        </h1>
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <p className="text-gray-600 mb-2">
          Olá, {currentUser.name}. Esta página é destinada à gestão e aprovação de eventos avulsos para o perfil "{currentUser.currentProfile}".
        </p>
        <p className="text-gray-600">
          Aqui você poderá:
        </p>
        <ul className="list-disc list-inside text-gray-600 ml-4 my-2">
          <li>Analisar e aprovar novas solicitações de eventos.</li>
          <li>Analisar e aprovar solicitações de distrato (cancelamento) de eventos.</li>
          <li>Analisar e aprovar regularizações diversas relacionadas a eventos.</li>
        </ul>
        
        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500 text-center">
            Funcionalidades de aprovação de eventos avulsos serão implementadas aqui.
            <br />
            (Ex: Listagem de solicitações pendentes com filtros, detalhes de cada solicitação, e opções para aprovar, reprovar ou solicitar ajustes).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AprovacoesEventosAvulsosPage;