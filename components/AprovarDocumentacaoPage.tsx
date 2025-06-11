import React, { useState, useEffect } from 'react';
import type { User } from '../App';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { HandThumbUpIcon } from './icons/HandThumbUpIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { EyeIcon } from './icons/EyeIcon'; 
import { TrashIcon } from './icons/TrashIcon';
import AdjustmentNeededModal from './AdjustmentNeededModal';
import DocumentRequestDetailsModal from './DocumentRequestDetailsModal'; 

interface AprovarDocumentacaoPageProps {
  currentUser: User;
  onDocumentRequestsUpdate: (count: number) => void;
}

export interface DocumentRequest {
  id: string;
  requesterName: string;
  requesterMatricula: string;
  documentTypeLabel: string; 
  details: string; 
  justification: string; 
  requestDate: string; 
  status: 'pending' | 'approved' | 'adjustment_needed' | 'cancelled_by_admin'; 
  adjustmentDetails?: string; 
}

export const MOCK_DOCUMENT_REQUESTS: DocumentRequest[] = [
  {
    id: 'doc_req1',
    requesterName: 'Bryan Luiz Pontarola',
    requesterMatricula: '900001',
    documentTypeLabel: 'TACH',
    details: '2023.1, 2023.2, 2024.1',
    justification: 'Ajuste de carga horária para o projeto de extensão "Comunidade Digital" e início de nova disciplina optativa.',
    requestDate: '2024-05-10',
    status: 'pending',
  },
  {
    id: 'doc_req2',
    requesterName: 'Pedro Augusto Gomes Achete',
    requesterMatricula: '100001',
    documentTypeLabel: 'Documento Pessoal - RG',
    details: 'RG (Identidade)',
    justification: 'Atualização de RG devido a alteração de nome após casamento. Necessário para conformidade com registros acadêmicos.',
    requestDate: '2024-05-12',
    status: 'pending',
  },
  {
    id: 'doc_req3',
    requesterName: 'Bryan Luiz Pontarola',
    requesterMatricula: '900001',
    documentTypeLabel: 'Registro de Ponto/Atividades',
    details: '2024.1',
    justification: 'Relatório de atividades docentes referente ao primeiro semestre de 2024 para fins de comprovação de horas.',
    requestDate: '2024-05-15',
    status: 'pending',
  },
  {
    id: 'doc_req4',
    requesterName: 'Mariana Brandl',
    requesterMatricula: '300001',
    documentTypeLabel: 'TACH',
    details: '2022.2',
    justification: 'Regularização de carga horária retroativa referente ao segundo semestre de 2022.',
    requestDate: '2024-04-20',
    status: 'pending',
  },
  {
    id: 'doc_req5',
    requesterName: 'João Victor',
    requesterMatricula: '600001',
    documentTypeLabel: 'Documento Pessoal - Atestado Médico',
    details: 'Atestado Médico',
    justification: 'Abono de faltas por motivo de saúde, conforme documento anexado.',
    requestDate: '2024-05-18',
    status: 'pending',
  },
];

const AprovarDocumentacaoPage: React.FC<AprovarDocumentacaoPageProps> = ({ currentUser, onDocumentRequestsUpdate }) => {
  const [requests, setRequests] = useState<DocumentRequest[]>(MOCK_DOCUMENT_REQUESTS);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [adjustmentRequestId, setAdjustmentRequestId] = useState<string | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRequestForDetails, setSelectedRequestForDetails] = useState<DocumentRequest | null>(null);

  useEffect(() => {
    const pendingCount = requests.filter(req => req.status === 'pending').length;
    onDocumentRequestsUpdate(pendingCount);
  }, [requests, onDocumentRequestsUpdate]);

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    await new Promise(resolve => setTimeout(resolve, 700)); 

    const approvedRequest = requests.find(req => req.id === requestId);
    if (approvedRequest) {
      console.log(`Document request for ${approvedRequest.documentTypeLabel} from ${approvedRequest.requesterName} APPROVED by ${currentUser.name}.`);
    }

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
    setProcessingId(null);
  };

  const handleOpenAdjustmentModal = (requestId: string) => {
    setAdjustmentRequestId(requestId);
    setIsAdjustmentModalOpen(true);
  };

  const handleCloseAdjustmentModal = () => {
    setIsAdjustmentModalOpen(false);
    setAdjustmentRequestId(null);
  };

  const handleSubmitAdjustment = async (details: string) => {
    if (!adjustmentRequestId) return;
    setProcessingId(adjustmentRequestId);
    await new Promise(resolve => setTimeout(resolve, 700)); 

    const requestToAdjust = requests.find(req => req.id === adjustmentRequestId);
    if (requestToAdjust) {
      console.log(`Document request for ${requestToAdjust.documentTypeLabel} from ${requestToAdjust.requesterName} marked for ADJUSTMENT by ${currentUser.name}. Details: "${details}"`);
    }

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === adjustmentRequestId ? { ...req, status: 'adjustment_needed', adjustmentDetails: details } : req
      )
    );
    setProcessingId(null);
    handleCloseAdjustmentModal();
  };
  
  const handleViewDetails = (request: DocumentRequest) => {
    setSelectedRequestForDetails(request);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedRequestForDetails(null);
  };

  const handleCancelRequest = async (requestId: string) => {
    const requestToCancel = requests.find(req => req.id === requestId);
    if (!requestToCancel) return;

    const confirmCancel = window.confirm(
      `Tem certeza que deseja cancelar a solicitação de "${requestToCancel.documentTypeLabel}" de ${requestToCancel.requesterName}? Esta ação não pode ser desfeita e a solicitação será excluída.`
    );

    if (confirmCancel) {
      setProcessingId(requestId);
      await new Promise(resolve => setTimeout(resolve, 700));

      console.log(`Document request for ${requestToCancel.documentTypeLabel} from ${requestToCancel.requesterName} has been DELETED BY ADMIN (${currentUser.name}).`);
      
      setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <DocumentTextIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Aprovar Documentação Solicitada
        </h1>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">Nenhuma solicitação de documentação pendente de aprovação.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Solicitante
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Tipo de Documento
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Detalhes da Solicitação
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell sm:px-6">
                  Justificativa (Solicitante)
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell sm:px-6">
                  Data da Solicitação
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRequests.map((req) => (
                <tr key={req.id} className={`${processingId === req.id ? 'opacity-50' : ''} hover:bg-gray-50 transition-colors`}>
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm font-medium text-gray-900">{req.requesterName}</div>
                    <div className="text-xs text-gray-500">Matrícula: {req.requesterMatricula}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-normal text-sm text-gray-600 sm:px-6">
                    {req.documentTypeLabel}
                  </td>
                  <td className="px-4 py-4 whitespace-normal text-sm text-gray-600 sm:px-6 max-w-xs">
                    {req.details}
                  </td>
                  <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 hidden md:table-cell sm:px-6 max-w-sm">
                    {req.justification}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell sm:px-6">
                    {formatDate(req.requestDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium sm:px-6">
                    <div className="flex justify-center items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleViewDetails(req)}
                        disabled={!!processingId}
                        className="p-1.5 text-gray-500 hover:text-jornada-primary hover:bg-jornada-primary/10 rounded-full transition-colors disabled:opacity-50"
                        aria-label={`Visualizar detalhes da solicitação de ${req.documentTypeLabel} de ${req.requesterName}`}
                        title="Visualizar Detalhes"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        disabled={!!processingId}
                        className="inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                        aria-label={`Aprovar solicitação de ${req.documentTypeLabel} de ${req.requesterName}`}
                        title="Aprovar Solicitação"
                      >
                        <HandThumbUpIcon className="h-4 w-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">Aprovar</span>
                      </button>
                      <button
                        onClick={() => handleOpenAdjustmentModal(req.id)}
                        disabled={!!processingId}
                        className="inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 transition-colors"
                        aria-label={`Solicitar ajuste para ${req.documentTypeLabel} de ${req.requesterName}`}
                        title="Solicitar Ajuste"
                      >
                        <XCircleIcon className="h-4 w-4 sm:mr-1.5" />
                         <span className="hidden sm:inline">Ajuste</span>
                      </button>
                      <button
                        onClick={() => handleCancelRequest(req.id)}
                        disabled={!!processingId}
                        className="inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                        aria-label={`Cancelar solicitação de ${req.documentTypeLabel} de ${req.requesterName}`}
                        title="Cancelar Solicitação"
                      >
                        <TrashIcon className="h-4 w-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">Cancelar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {adjustmentRequestId && (
        <AdjustmentNeededModal
          isOpen={isAdjustmentModalOpen}
          onClose={handleCloseAdjustmentModal}
          onSubmitJustification={handleSubmitAdjustment}
        />
      )}
      {selectedRequestForDetails && (
        <DocumentRequestDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          request={selectedRequestForDetails}
        />
      )}
    </div>
  );
};

export default AprovarDocumentacaoPage;