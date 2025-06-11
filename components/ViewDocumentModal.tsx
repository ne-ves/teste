
import React from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ isOpen, onClose, documentName }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-document-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
      onClick={onClose} // Close on overlay click
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="view-document-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Visualizar Comprovante
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Arquivo:</label>
            <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded-md border border-gray-200">{documentName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Conteúdo do Documento:</label>
            <div className="mt-1 p-4 border border-dashed border-gray-300 rounded-md min-h-[200px] flex items-center justify-center bg-gray-50">
              <p className="text-gray-500 text-center">
                Visualização do documento indisponível nesta simulação.
                <br />
                Em uma aplicação real, o conteúdo do arquivo "{documentName}" seria exibido aqui (ex: PDF, imagem).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;