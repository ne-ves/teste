
import React from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import type { DocumentRequest } from './AprovarDocumentacaoPage'; // Import the interface

interface DocumentRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: DocumentRequest | null;
}

const getStatusLabel = (status: DocumentRequest['status']): string => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'approved':
      return 'Aprovado';
    case 'adjustment_needed':
      return 'Necessita Ajuste';
    case 'cancelled_by_admin':
      return 'Cancelada pelo Admin';
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString; // Fallback if format is unexpected
};

const DetailItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
    <p className="mt-1 text-sm text-gray-800 bg-gray-50 p-2 rounded-md border border-gray-200 min-h-[30px] break-words">
      {value || <span className="italic text-gray-400">Não informado</span>}
    </p>
  </div>
);

const DocumentRequestDetailsModal: React.FC<DocumentRequestDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  if (!isOpen || !request) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-request-details-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="document-request-details-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Detalhes da Solicitação de Documento
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <DetailItem label="Solicitante" value={`${request.requesterName} (Matrícula: ${request.requesterMatricula})`} />
          <DetailItem label="Tipo de Documento" value={request.documentTypeLabel} />
          <DetailItem label="Detalhes da Solicitação" value={request.details} />
          <DetailItem label="Justificativa do Solicitante" value={request.justification} />
          <DetailItem label="Data da Solicitação" value={formatDate(request.requestDate)} />
          <DetailItem label="Status Atual" value={getStatusLabel(request.status)} />
          {request.status === 'adjustment_needed' && request.adjustmentDetails && (
            <DetailItem label="Detalhes do Ajuste Solicitado" value={request.adjustmentDetails} />
          )}
           {request.status === 'cancelled_by_admin' && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700 font-medium">Esta solicitação foi cancelada pelo administrador.</p>
            </div>
          )}
           {request.status === 'approved' && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 font-medium">Esta solicitação foi aprovada.</p>
            </div>
          )}

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

export default DocumentRequestDetailsModal;