
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { UploadIcon } from './icons/UploadIcon';
import type { User } from '../App';

interface NovaSolicitacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (documento1: File | null, documento2: File | null) => void;
  currentUser: User;
}

const NovaSolicitacaoModal: React.FC<NovaSolicitacaoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}) => {
  const [documento1, setDocumento1] = useState<File | null>(null);
  const [documento2, setDocumento2] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setDocumento1(null);
      setDocumento2(null);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocumento1(event.target.files[0]);
      if (error && event.target.files[0]) setError(''); // Clear error if a file is selected
    } else {
      setDocumento1(null);
    }
  };

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocumento2(event.target.files[0]);
    } else {
      setDocumento2(null);
    }
  };

  const handleSubmit = () => {
    if (!documento1) {
      setError('O Documento Principal é obrigatório.');
      return;
    }
    setError('');
    onSubmit(documento1, documento2);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nova-solicitacao-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="nova-solicitacao-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Nova Solicitação de Evento Avulso
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
            <label htmlFor="userNameReadOnly" className="block text-sm font-medium text-gray-700 mb-1">
              Solicitante
            </label>
            <input
              type="text"
              id="userNameReadOnly"
              value={`${currentUser.name} (Matrícula: ${currentUser.matricula})`}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="documento1" className="block text-sm font-medium text-gray-700 mb-1">
              Documento Principal <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <label
                htmlFor="documento1"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary"
              >
                <UploadIcon className="h-5 w-5 mr-2 text-gray-500" />
                Anexar Documento 1
              </label>
              <input
                type="file"
                id="documento1"
                name="documento1"
                onChange={handleFileChange1}
                className="sr-only"
                aria-describedby="documento1-name file-constraints"
                required
              />
              {documento1 && (
                <span id="documento1-name" className="text-sm text-gray-600 truncate max-w-xs sm:max-w-md" title={documento1.name}>
                  {documento1.name}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="documento2" className="block text-sm font-medium text-gray-700 mb-1">
              Documento Adicional (Opcional)
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <label
                htmlFor="documento2"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary"
              >
                <UploadIcon className="h-5 w-5 mr-2 text-gray-500" />
                Anexar Documento 2
              </label>
              <input
                type="file"
                id="documento2"
                name="documento2"
                onChange={handleFileChange2}
                className="sr-only"
                aria-describedby="documento2-name file-constraints"
              />
              {documento2 && (
                <span id="documento2-name" className="text-sm text-gray-600 truncate max-w-xs sm:max-w-md" title={documento2.name}>
                  {documento2.name}
                </span>
              )}
            </div>
          </div>
           <p id="file-constraints" className="text-xs text-gray-500">
              Tipos aceitos: PDF, DOC, DOCX, JPG, PNG. (Exemplo)
            </p>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!documento1}
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

export default NovaSolicitacaoModal;