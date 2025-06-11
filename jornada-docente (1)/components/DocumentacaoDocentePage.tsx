
import React, { useState, useMemo, useEffect } from 'react';
import type { User } from '../App';
import { FolderPlusIcon } from './icons/FolderPlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
// import TachRequestModal from './TachRequestModal'; // Removed as TACH option is replaced
import PontoRequestModal from './PontoRequestModal';
import PessoaisRequestModal from './PessoaisRequestModal'; 

interface DocumentacaoDocentePageProps {
  currentUser: User;
}

type DocumentType = 'MEC_SOLICITACAO_RELATORIO' | 'PONTO' | 'PESSOAIS';

interface DocumentOption {
  id: DocumentType;
  label: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const DOCUMENT_OPTIONS: DocumentOption[] = [
  {
    id: 'MEC_SOLICITACAO_RELATORIO',
    label: 'Solicitação MEC / Relatório Documentos MEC',
    description: 'Gerar e consultar solicitações e relatórios para o MEC.',
    icon: DocumentTextIcon,
  },
  {
    id: 'PONTO',
    label: 'Registro de Ponto/Atividades',
    description: 'Folha de Ponto ou Relatório de Atividades Docentes',
    icon: DocumentTextIcon,
  },
  {
    id: 'PESSOAIS',
    label: 'Documentos Pessoais',
    description: 'Atualização de RG, CPF, Comprovante de Residência, etc.',
    icon: DocumentTextIcon,
  },
];

const DocumentacaoDocentePage: React.FC<DocumentacaoDocentePageProps> = ({ currentUser }) => {
  const [isSolicitarOpen, setIsSolicitarOpen] = useState(false);
  // const [isTachModalOpen, setIsTachModalOpen] = useState(false); // Removed
  const [isPontoModalOpen, setIsPontoModalOpen] = useState(false);
  const [isPessoaisModalOpen, setIsPessoaisModalOpen] = useState(false); 

  const academicPeriods = useMemo(() => {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    const finalPeriods: string[] = [];
    const currentMonth = new Date().getMonth() + 1; // 1-12

    for (let year = startYear; year <= currentYear; year++) {
        finalPeriods.push(`${year}.1`);
        if (year < currentYear) {
            finalPeriods.push(`${year}.2`);
        } else { // Current year
            if (currentMonth >= 7) { // Assuming semester 2 starts in July
                finalPeriods.push(`${year}.2`);
            }
        }
    }
    // Ensure the list is sorted and unique, just in case logic above has quirks with exact dates
    return finalPeriods.sort().filter((value, index, self) => self.indexOf(value) === index);
  }, []);


  const toggleSolicitarOpen = () => {
    setIsSolicitarOpen(prev => !prev);
    if (isSolicitarOpen) { 
        // setIsTachModalOpen(false); // Removed
        setIsPontoModalOpen(false);
        setIsPessoaisModalOpen(false); 
    }
  };

  const handleDocumentOptionClick = (docType: DocumentOption) => {
    if (docType.id === 'MEC_SOLICITACAO_RELATORIO') {
      const message = `Opção "${docType.label}" selecionada. Funcionalidade para gerar/consultar solicitações e relatórios MEC será implementada aqui. (Simulação)`;
      console.log(message, currentUser.name);
      alert(message);
    } else if (docType.id === 'PONTO') {
      setIsPontoModalOpen(true);
    } else if (docType.id === 'PESSOAIS') {
      setIsPessoaisModalOpen(true);
    }
     else { // Fallback, though all options should be covered
      const message = `Solicitação para "${docType.label} - ${docType.description}" iniciada. (Simulação)`;
      console.log(message, currentUser.name);
      alert(message);
    }
  };

  // const handleTachSubmit = (selectedPeriods: string[], justification: string) => { // Removed
  //   const message = `Solicitação de TACH para os períodos: ${selectedPeriods.join(', ')} enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
  //   console.log("TACH Request:", {
  //     user: currentUser.name,
  //     periods: selectedPeriods,
  //     justification: justification,
  //   });
  //   alert(message);
  //   setIsTachModalOpen(false);
  // };

  const handlePontoSubmit = (selectedPeriods: string[], justification: string) => {
    // Validation is now handled within the modal
    const message = `Solicitação de Registro de Ponto/Atividades para os períodos: ${selectedPeriods.join(', ')} enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
    console.log("Ponto/Atividades Request:", {
      user: currentUser.name,
      periods: selectedPeriods,
      justification: justification,
    });
    alert(message);
    setIsPontoModalOpen(false);
  };

  const handlePessoaisSubmit = (selectedDocumentType: string, justification: string) => {
    // Validation is now handled within the modal
    const message = `Solicitação para o documento pessoal: "${selectedDocumentType}" enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
    console.log("Documento Pessoal Request:", {
      user: currentUser.name,
      documentType: selectedDocumentType,
      justification: justification,
    });
    alert(message);
    setIsPessoaisModalOpen(false);
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-8">
        <FolderPlusIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Documentação Docente
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <button
          onClick={toggleSolicitarOpen}
          className="w-full flex items-center justify-between p-4 bg-jornada-primary hover:bg-jornada-primary-dark text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-jornada-primary focus:ring-opacity-75 transition-colors duration-150 ease-in-out"
          aria-expanded={isSolicitarOpen}
          aria-controls="solicitar-documentos-options"
        >
          <span className="flex items-center">
            <FolderPlusIcon className="h-6 w-6 mr-3" />
            <span className="text-lg font-semibold">Solicitar Documentos</span>
          </span>
          <ChevronDownIcon
            className={`h-6 w-6 transition-transform duration-300 ${isSolicitarOpen ? 'transform rotate-180' : ''}`}
          />
        </button>

        {isSolicitarOpen && (
          <div
            id="solicitar-documentos-options"
            className="mt-6 space-y-4 border-t border-gray-200 pt-6"
            role="region"
            aria-labelledby="solicitar-documentos-heading"
          >
            {DOCUMENT_OPTIONS.map((option) => {
              const IconComponent = option.icon;
              return (
                <div key={option.id}>
                  <button
                    onClick={() => handleDocumentOptionClick(option)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md border border-gray-200 hover:border-jornada-primary focus:outline-none focus:ring-2 focus:ring-jornada-primary focus:ring-opacity-50 transition-all duration-150 ease-in-out group"
                  >
                    <div className="flex items-center flex-grow min-w-0">
                      <IconComponent className="h-5 w-5 mr-3 text-jornada-primary opacity-75 group-hover:opacity-100 flex-shrink-0" />
                      <div className="text-left flex-grow">
                        <span className="font-medium text-gray-800 group-hover:text-jornada-primary-dark block truncate">{option.label}</span>
                        <p className="text-sm text-gray-500 group-hover:text-gray-600 block truncate">{option.description}</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-jornada-primary transition-colors ml-2 flex-shrink-0" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {!isSolicitarOpen && (
          <div className="mt-6 text-center text-gray-500">
            <p>Clique em "Solicitar Documentos" para ver as opções disponíveis.</p>
          </div>
        )}
      </div>
      
      {/* <TachRequestModal // Removed
        isOpen={isTachModalOpen}
        onClose={() => setIsTachModalOpen(false)}
        onSubmit={handleTachSubmit}
        academicPeriods={academicPeriods}
      /> */}

      <PontoRequestModal
        isOpen={isPontoModalOpen}
        onClose={() => setIsPontoModalOpen(false)}
        onSubmit={handlePontoSubmit}
        academicPeriods={academicPeriods}
      />

      <PessoaisRequestModal
        isOpen={isPessoaisModalOpen}
        onClose={() => setIsPessoaisModalOpen(false)}
        onSubmit={handlePessoaisSubmit}
      />
    </div>
  );
};

export default DocumentacaoDocentePage;
