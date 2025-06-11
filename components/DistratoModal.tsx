
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import type { User } from '../App';

interface DistratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (solicitacaoId: string, justification: string) => void;
  currentUser: User;
}

const DistratoModal: React.FC<DistratoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}) => {
  const [solicitacaoId, setSolicitacaoId] = useState<string>('');
  const [justification, setJustification] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSolicitacaoId('');
      setJustification('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSolicitacaoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolicitacaoId(event.target.value);
    if (error && event.target.value.trim() && justification.trim()) setError('');
  };
  
  const handleJustificationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJustification(event.target.value);
    if (error && solicitacaoId.trim() && event.target.value.trim()) setError('');
  };

  const handleSubmit = () => {
    if (!solicitacaoId.trim() && !justification.trim()) {
      setError('O ID da Solicitação e a Justificativa são obrigatórios.');
      return;
    }
    if (!solicitacaoId.trim()) {
      setError('O ID da Solicitação Original é obrigatório.');
      return;
    }
    if (!justification.trim()) {
      setError('A Justificativa do Distrato é obrigatória.');
      return;
    }
    setError('');
    onSubmit(solicitacaoId, justification);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="distrato-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="distrato-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Solicitação de Distrato de Evento Avulso
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="distratoUserNameReadOnly" className="block text-sm font-medium text-gray-700 mb-1">
              Solicitante
            </label>
            <input
              type="text"
              id="distratoUserNameReadOnly"
              value={`${currentUser.name} (Matrícula: ${currentUser.matricula})`}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="solicitacaoId" className="block text-sm font-medium text-gray-700 mb-1">
              ID da Solicitação Original <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="solicitacaoId"
              name="solicitacaoId"
              value={solicitacaoId}
              onChange={handleSolicitacaoIdChange}
              className={`mt-1 block w-full px-3 py-2 border ${error && !solicitacaoId.trim() ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900`}
              placeholder="Insira o ID da solicitação a ser distratada"
              required
              aria-describedby={error && !solicitacaoId.trim() ? "solicitacaoId-error" : undefined}
            />
             {error && !solicitacaoId.trim() && (
              <p id="solicitacaoId-error" role="alert" className="mt-1 text-xs text-red-600">O ID da Solicitação é obrigatório.</p>
            )}
          </div>

          <div>
            <label htmlFor="distratoJustification" className="block text-sm font-medium text-gray-700 mb-1">
              Justificativa do Distrato <span className="text-red-500">*</span>
            </label>
            <textarea
              id="distratoJustification"
              name="distratoJustification"
              rows={4}
              value={justification}
              onChange={handleJustificationChange}
              className={`mt-1 block w-full px-3 py-2 border ${error && !justification.trim() ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900`}
              placeholder="Descreva o motivo do distrato."
              required
              aria-describedby={error && !justification.trim() ? "justification-error" : undefined}
            />
            {error && !justification.trim() && (
              <p id="justification-error" role="alert" className="mt-1 text-xs text-red-600">A Justificativa é obrigatória.</p>
            )}
          </div>
            
          {error && solicitacaoId.trim() && justification.trim() && ( // General error if both fields are filled but something else is wrong
            <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!solicitacaoId.trim() || !justification.trim()}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-50 transition-colors"
          >
            Enviar Solicitação de Distrato
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistratoModal;