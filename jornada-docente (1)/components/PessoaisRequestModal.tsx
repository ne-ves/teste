
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface PessoaisRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedDocumentType: string, justification: string) => void;
}

const PERSONAL_DOCUMENT_TYPES = [
  'RG',
  'CPF',
  'Carteira de Trabalho',
  'Atestado de Óbito',
  'Atestado Médico',
];

const PessoaisRequestModal: React.FC<PessoaisRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [justification, setJustification] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSelectedDocument('');
      setJustification('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDocumentChange = (docType: string) => {
    setSelectedDocument(docType);
    if (error && docType && justification.trim()) setError('');
  };

  const handleJustificationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJustification(e.target.value);
     if (error && selectedDocument && e.target.value.trim()) setError('');
  };

  const handleSubmit = () => {
    if (!selectedDocument && !justification.trim()) {
      setError('Por favor, selecione um tipo de documento e forneça uma justificativa.');
      return;
    }
    if (!selectedDocument) {
      setError('Por favor, selecione um tipo de documento.');
      return;
    }
    if (!justification.trim()) {
      setError('Por favor, forneça uma justificativa.');
      return;
    }
    setError('');
    onSubmit(selectedDocument, justification);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pessoais-request-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-lg transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="pessoais-request-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Solicitar Documento Pessoal
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Selecione o tipo de documento pessoal e forneça uma justificativa para a solicitação.
          </p>
          <fieldset className="mt-2">
            <legend className="sr-only">Tipos de Documento Pessoal</legend>
            <div className="space-y-2 border border-gray-200 rounded-md p-3 bg-gray-50 max-h-48 overflow-y-auto">
              {PERSONAL_DOCUMENT_TYPES.map((docType) => (
                <label
                  key={docType}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                  htmlFor={`modal-pessoal-type-${docType.replace(/\s+/g, '-')}`}
                >
                  <input
                    type="radio"
                    id={`modal-pessoal-type-${docType.replace(/\s+/g, '-')}`}
                    name="personalDocumentType"
                    value={docType}
                    checked={selectedDocument === docType}
                    onChange={() => handleDocumentChange(docType)}
                    className="form-radio h-4 w-4 text-jornada-primary border-gray-300 focus:ring-jornada-primary focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-800">{docType}</span>
                </label>
              ))}
            </div>
          </fieldset>
          
          <div>
            <label htmlFor="pessoais-justification" className="block text-sm font-medium text-gray-700 mb-1">
              Justificativa <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pessoais-justification"
              name="justification"
              rows={3}
              value={justification}
              onChange={handleJustificationChange}
              className={`mt-1 block w-full px-3 py-2 border ${error && !justification.trim() ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900`}
              placeholder="Descreva o motivo da solicitação."
              required
              aria-describedby={error && (!justification.trim() || !selectedDocument) ? "pessoais-error-message" : undefined}
            />
          </div>

          {error && (
            <p id="pessoais-error-message" role="alert" className="text-xs text-red-600">{error}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors disabled:opacity-50"
            disabled={!selectedDocument || !justification.trim()}
          >
            Solicitar
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

export default PessoaisRequestModal;