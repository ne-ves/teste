import React, { useState, useEffect } from 'react';
import { TITULATION_LEVELS, getTitulationLabelById } from './AtualizarTitulacaoPage'; 
import { HandThumbUpIcon } from './icons/HandThumbUpIcon';
import { XCircleIcon } from './icons/XCircleIcon'; 
import { EyeIcon } from './icons/EyeIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon'; 
import ViewDocumentModal from './ViewDocumentModal';
import AdjustmentNeededModal from './AdjustmentNeededModal'; 

interface TitulationRequest {
  id: string;
  requesterName: string;
  requesterMatricula: string;
  currentTitulationId: string;
  requestedTitulationId: string;
  requestDate: string; 
  documentName: string;
  status: 'pending' | 'approved' | 'reproved'; 
  reprovalJustification?: string; 
}

export const MOCK_REQUESTS: TitulationRequest[] = [
  {
    id: 'req1',
    requesterName: 'Ana Carolina Lima',
    requesterMatricula: '789012',
    currentTitulationId: 'mestre',
    requestedTitulationId: 'doutor',
    requestDate: '2024-07-28',
    documentName: 'diploma_ana_doutorado.pdf',
    status: 'pending',
  },
  {
    id: 'req2',
    requesterName: 'Bruno Alves Costa',
    requesterMatricula: '345678',
    currentTitulationId: 'especialista',
    requestedTitulationId: 'mestre',
    requestDate: '2024-07-25',
    documentName: 'certificado_bruno_mestre.pdf',
    status: 'pending',
  },
  {
    id: 'req3',
    requesterName: 'Carlos Eduardo Dias',
    requesterMatricula: '901234',
    currentTitulationId: 'graduado',
    requestedTitulationId: 'especialista',
    requestDate: '2024-08-01',
    documentName: 'historico_carlos_especialista.docx',
    status: 'pending',
  },
];

interface AprovacoesPageProps {
  onTitulationRequestsUpdate: (count: number) => void;
}

const AprovacoesPage: React.FC<AprovacoesPageProps> = ({ onTitulationRequestsUpdate }) => {
  const [requests, setRequests] = useState<TitulationRequest[]>(MOCK_REQUESTS);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const [isViewDocumentModalOpen, setIsViewDocumentModalOpen] = useState(false);
  const [documentToView, setDocumentToView] = useState<string | null>(null);

  const [isAdjustmentNeededModalOpen, setIsAdjustmentNeededModalOpen] = useState(false); 
  const [adjustmentNeededRequestId, setAdjustmentNeededRequestId] = useState<string | null>(null); 

  useEffect(() => {
    const pendingCount = requests.filter(req => req.status === 'pending').length;
    onTitulationRequestsUpdate(pendingCount);
  }, [requests, onTitulationRequestsUpdate]);


  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    await new Promise(resolve => setTimeout(resolve, 700));

    const approvedRequest = requests.find(req => req.id === requestId);
    if (approvedRequest) {
        console.log(`Email simulado enviado para ${approvedRequest.requesterName}: Sua solicitação de atualização de titulação para ${getTitulationLabelById(approvedRequest.requestedTitulationId)} foi APROVADA.`);
    }

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );
    setProcessingId(null);
  };

  const handleOpenAdjustmentNeededModal = (requestId: string) => { 
    setAdjustmentNeededRequestId(requestId);
    setIsAdjustmentNeededModalOpen(true);
  };

  const handleCloseAdjustmentNeededModal = () => { 
    setIsAdjustmentNeededModalOpen(false);
    setAdjustmentNeededRequestId(null);
  };

  const handleSubmitAdjustmentNeeded = async (details: string) => { 
    if (!adjustmentNeededRequestId) return;
    setProcessingId(adjustmentNeededRequestId); 

    await new Promise(resolve => setTimeout(resolve, 700));

    const requestToAdjust = requests.find(req => req.id === adjustmentNeededRequestId);
    if (requestToAdjust) {
        console.log(`Email simulado enviado para ${requestToAdjust.requesterName}: Sua solicitação de atualização de titulação para ${getTitulationLabelById(requestToAdjust.requestedTitulationId)} requer ajustes. Detalhes: "${details}"`);
    }

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === adjustmentNeededRequestId ? { ...req, status: 'reproved', reprovalJustification: details } : req
      )
    );

    setProcessingId(null);
    handleCloseAdjustmentNeededModal();
  };


  const handleViewDocument = (docName: string) => {
    setDocumentToView(docName);
    setIsViewDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    setIsViewDocumentModalOpen(false);
    setDocumentToView(null);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <ShieldCheckIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Painel de Aprovações - Atualização de Titulação
        </h1>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">Nenhuma solicitação de atualização de titulação pendente.</p>
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
                  Titulação Atual
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Titulação Solicitada
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell sm:px-6">
                  Data da Solicitação
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Comprovante
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRequests.map((req) => (
                <tr key={req.id} className={`${processingId === req.id ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm font-medium text-gray-900">{req.requesterName}</div>
                    <div className="text-xs text-gray-500">Matrícula: {req.requesterMatricula}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 sm:px-6">
                    {getTitulationLabelById(req.currentTitulationId)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 sm:px-6">
                    {getTitulationLabelById(req.requestedTitulationId)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell sm:px-6">
                    {formatDate(req.requestDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:px-6">
                    <button
                      onClick={() => handleViewDocument(req.documentName)}
                      className="flex items-center text-jornada-primary hover:text-jornada-primary-dark hover:underline text-xs sm:text-sm"
                      aria-label={`Ver comprovante ${req.documentName}`}
                      disabled={!!processingId}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Ver Comprovante
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium sm:px-6">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleApprove(req.id)}
                        disabled={!!processingId}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                        aria-label={`Aprovar solicitação de ${req.requesterName}`}
                      >
                        <HandThumbUpIcon className="h-4 w-4 mr-1.5" />
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleOpenAdjustmentNeededModal(req.id)} 
                        disabled={!!processingId}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 transition-colors" 
                        aria-label={`Solicitar ajuste para ${req.requesterName}`}
                      >
                        <XCircleIcon className="h-4 w-4 mr-1.5" /> 
                        Necessário ajuste 
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {documentToView && (
        <ViewDocumentModal
          isOpen={isViewDocumentModalOpen}
          onClose={handleCloseDocumentModal}
          documentName={documentToView}
        />
      )}
      {adjustmentNeededRequestId && ( 
        <AdjustmentNeededModal 
          isOpen={isAdjustmentNeededModalOpen} 
          onClose={handleCloseAdjustmentNeededModal} 
          onSubmitJustification={handleSubmitAdjustmentNeeded} 
        />
      )}
    </div>
  );
};

export default AprovacoesPage;