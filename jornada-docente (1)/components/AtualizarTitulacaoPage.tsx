import React, { useState, useEffect } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import type { User } from '../App'; // Import User type

interface TitulationLevel {
  id: string;
  label: string;
}

export const TITULATION_LEVELS: TitulationLevel[] = [
  { id: 'graduado', label: 'Graduado(a)' },
  { id: 'especialista', label: 'Especialista' },
  { id: 'mestre', label: 'Mestre' },
  { id: 'doutor', label: 'Doutor(a)' },
  { id: 'pos_doutor', label: 'Pós-Doutor(a)' },
];

export const getTitulationLabelById = (id: string): string => {
  const level = TITULATION_LEVELS.find(l => l.id === id);
  return level ? level.label : 'Desconhecida';
};

interface AtualizarTitulacaoPageProps {
  currentUser: User; // Use the User type from App.tsx
}

const AtualizarTitulacaoPage: React.FC<AtualizarTitulacaoPageProps> = ({ currentUser }) => {
  const [currentTitulationLabel, setCurrentTitulationLabel] = useState<string>('');
  const [newTitulationId, setNewTitulationId] = useState<string>('');
  const [selectableTitulations, setSelectableTitulations] = useState<TitulationLevel[]>([]);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  useEffect(() => {
    setCurrentTitulationLabel(getTitulationLabelById(currentUser.currentTitulationId));
    
    const currentIndex = TITULATION_LEVELS.findIndex(level => level.id === currentUser.currentTitulationId);
    
    if (currentIndex !== -1 && currentIndex < TITULATION_LEVELS.length - 1) {
      const nextLevel = TITULATION_LEVELS[currentIndex + 1];
      setSelectableTitulations([nextLevel]);
    } else {
      setSelectableTitulations([]);
    }
    setNewTitulationId(''); // Reset selection when current titulation changes or on load
  }, [currentUser.currentTitulationId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setSubmissionStatus('idle'); 
      setSubmissionMessage('');
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus('idle');
    setSubmissionMessage('');

    if (!newTitulationId) {
      // This check ensures a selection was made from the dropdown
      setSubmissionMessage('Por favor, selecione a nova titulação desejada.');
      setSubmissionStatus('error');
      return;
    }
    if (!selectedFile) {
      setSubmissionMessage('Por favor, anexe o comprovante da nova titulação.');
      setSubmissionStatus('error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Submitting Titulation Update Request:', {
      userName: currentUser.name,
      userMatricula: currentUser.matricula,
      currentTitulation: currentUser.currentTitulationId,
      requestedNewTitulationId: newTitulationId,
      supportingDocumentName: selectedFile.name,
      supportingDocumentSize: selectedFile.size,
    });

    setIsLoading(false);
    setSubmissionStatus('success');
    setSubmissionMessage('Solicitação de atualização de titulação enviada com sucesso! Aguarde a aprovação.');
    setSelectedFile(null); 
    const fileInput = document.getElementById('supportingDocument') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setNewTitulationId(''); // Reset dropdown after successful submission
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Atualizar Titulação</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-8">
        
        <fieldset>
          <legend className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <DocumentTextIcon className="h-6 w-6 mr-2 text-jornada-primary" />
            Seus Dados Atuais
          </legend>
          <div className="space-y-6">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                id="userName"
                value={currentUser.name}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
                aria-label="Nome completo do usuário (somente leitura)"
              />
            </div>
            <div>
              <label htmlFor="userMatricula" className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula
              </label>
              <input
                type="text"
                id="userMatricula"
                value={currentUser.matricula}
                readOnly
                className="mt-1 block w-full max-w-sm px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
                aria-label="Matrícula do usuário (somente leitura)"
              />
            </div>
            <div>
              <label htmlFor="currentTitulation" className="block text-sm font-medium text-gray-700 mb-1">
                Titulação Atual
              </label>
              <input
                type="text"
                id="currentTitulation"
                value={currentTitulationLabel}
                readOnly
                className="mt-1 block w-full max-w-sm px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
                aria-label="Titulação atual do usuário (somente leitura)"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xl font-semibold text-gray-700 mb-4 pt-4 border-t border-gray-200">
            Solicitar Nova Titulação
          </legend>
          
          {selectableTitulations.length > 0 ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="newTitulationId" className="block text-sm font-medium text-gray-700 mb-1">
                  Nova Titulação Desejada
                </label>
                <select
                  name="newTitulationId"
                  id="newTitulationId"
                  value={newTitulationId}
                  onChange={(e) => {
                    setNewTitulationId(e.target.value);
                    setSubmissionStatus('idle');
                    setSubmissionMessage('');
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-jornada-primary rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm"
                  required
                  aria-label="Selecione a nova titulação desejada"
                >
                  <option value="" disabled>Selecione a titulação...</option>
                  {selectableTitulations.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="supportingDocument" className="block text-sm font-medium text-gray-700 mb-1">
                  Comprovante da Nova Titulação (Ex: Diploma)
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <label
                    htmlFor="supportingDocument"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary"
                  >
                    <UploadIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Selecionar Arquivo
                  </label>
                  <input
                    type="file"
                    id="supportingDocument"
                    name="supportingDocument"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                    aria-describedby="file-upload-constraints"
                    required 
                  />
                  {selectedFile && (
                    <span className="text-sm text-gray-600 truncate max-w-xs" title={selectedFile.name}>
                      {selectedFile.name}
                    </span>
                  )}
                </div>
                <p id="file-upload-constraints" className="mt-1 text-xs text-gray-500">
                  Tipos aceitos: PDF, DOC, DOCX, JPG, PNG. Tamanho máximo: 5MB (exemplo).
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
              Você já atingiu o nível máximo de titulação ou não há próxima titulação definida no sistema.
            </p>
          )}
        </fieldset>

        {selectableTitulations.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            {submissionStatus === 'success' && (
              <div role="alert" className="mb-4 p-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-md">
                {submissionMessage}
              </div>
            )}
            {submissionStatus === 'error' && (
              <div role="alert" className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                {submissionMessage}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading || submissionStatus === 'success'}
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-jornada-primary hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando Solicitação...
                </>
              ) : (
                'Enviar Solicitação de Atualização'
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AtualizarTitulacaoPage;