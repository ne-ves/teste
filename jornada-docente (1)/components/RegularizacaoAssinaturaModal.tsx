
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { UploadIcon } from './icons/UploadIcon';
import type { User } from '../App';

interface RegularizacaoAssinaturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (regularizacaoId: string, oficioFile: File) => void;
  currentUser: User;
}

const RegularizacaoAssinaturaModal: React.FC<RegularizacaoAssinaturaModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}) => {
  const [regularizacaoId, setRegularizacaoId] = useState<string>('');
  const [oficioFile, setOficioFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setRegularizacaoId('');
      setOficioFile(null);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setOficioFile(event.target.files[0]);
      if (error && regularizacaoId.trim() && event.target.files[0]) setError('');
    } else {
      setOficioFile(null);
    }
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegularizacaoId(event.target.value);
    if (error && event.target.value.trim() && oficioFile) setError('');
  };

  const handleSubmit = () => {
    if (!regularizacaoId.trim() && !oficioFile) {
      setError('O ID de Regularização e o Ofício são obrigatórios.');
      return;
    }
    if (!regularizacaoId.trim()) {
      setError('O ID de Regularização é obrigatório.');
      return;
    }
    if (!oficioFile) {
      setError('O Ofício de Regularização é obrigatório.');
      return;
    }
    setError('');
    onSubmit(regularizacaoId, oficioFile);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="regularizacao-assinatura-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="regularizacao-assinatura-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Regularização de Assinatura
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
            <label htmlFor="regAssinaturaUserNameReadOnly" className="block text-sm font-medium text-gray-700 mb-1">
              Solicitante
            </label>
            <input
              type="text"
              id="regAssinaturaUserNameReadOnly"
              value={`${currentUser.name} (Matrícula: ${currentUser.matricula})`}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="regularizacaoId" className="block text-sm font-medium text-gray-700 mb-1">
              ID de Regularização <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="regularizacaoId"
              name="regularizacaoId"
              value={regularizacaoId}
              onChange={handleIdChange}
              className={`mt-1 block w-full px-3 py-2 border ${error && !regularizacaoId.trim() ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900`}
              placeholder="Insira o ID da regularização"
              required
              aria-describedby={error && !regularizacaoId.trim() ? "regularizacaoId-error" : undefined}
            />
             {error && !regularizacaoId.trim() && (
              <p id="regularizacaoId-error" role="alert" className="mt-1 text-xs text-red-600">O ID de Regularização é obrigatório.</p>
            )}
          </div>

          <div>
            <label htmlFor="oficioFile" className="block text-sm font-medium text-gray-700 mb-1">
              Ofício de Regularização <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <label
                htmlFor="oficioFile"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary"
              >
                <UploadIcon className="h-5 w-5 mr-2 text-gray-500" />
                Anexar Ofício
              </label>
              <input
                type="file"
                id="oficioFile"
                name="oficioFile"
                onChange={handleFileChange}
                className="sr-only"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                aria-describedby="oficioFile-name file-upload-constraints-reg-assinatura"
                required
              />
              {oficioFile && (
                <span id="oficioFile-name" className="text-sm text-gray-600 truncate max-w-xs sm:max-w-md" title={oficioFile.name}>
                  {oficioFile.name}
                </span>
              )}
            </div>
            <p id="file-upload-constraints-reg-assinatura" className="mt-1 text-xs text-gray-500">
              Tipos aceitos: PDF, DOC, DOCX, JPG, PNG. (Exemplo)
            </p>
            {error && !oficioFile && (
              <p role="alert" className="mt-1 text-xs text-red-600">O Ofício de Regularização é obrigatório.</p>
            )}
          </div>
            
          {error && regularizacaoId.trim() && oficioFile && ( 
            <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!regularizacaoId.trim() || !oficioFile}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-50 transition-colors"
          >
            Enviar Solicitação
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

export default RegularizacaoAssinaturaModal;