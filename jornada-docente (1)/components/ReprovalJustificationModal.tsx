import React, { useState } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface AdjustmentNeededModalProps { // Renomeado de ReprovalJustificationModalProps
  isOpen: boolean;
  onClose: () => void;
  onSubmitJustification: (justification: string) => void; // A função ainda recebe uma justificação/detalhamento
}

const AdjustmentNeededModal: React.FC<AdjustmentNeededModalProps> = ({ // Renomeado de ReprovalJustificationModal
  isOpen,
  onClose,
  onSubmitJustification,
}) => {
  const [justification, setJustification] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!justification.trim()) {
      setError('Os detalhes do ajuste são obrigatórios para esta ação.'); // Mensagem atualizada
      return;
    }
    setError('');
    onSubmitJustification(justification);
    setJustification(''); 
  };

  const handleClose = () => {
    setJustification('');
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adjustment-needed-modal-title" // ID atualizado
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="adjustment-needed-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Solicitar Ajuste {/* Título atualizado */}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
              Detalhes do Ajuste Necessário {/* Label atualizado */}
            </label>
            <textarea
              id="justification"
              name="justification"
              rows={5}
              value={justification}
              onChange={(e) => {
                setJustification(e.target.value);
                if (error) setError('');
              }}
              className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900`}
              placeholder="Descreva quais ajustes são necessários para esta solicitação." // Placeholder atualizado
              required
              aria-describedby={error ? "justification-error" : undefined}
            />
            {error && (
              <p id="justification-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
          >
            Enviar Pedido de Ajuste {/* Texto do botão atualizado */}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentNeededModal; // Export Renomeado