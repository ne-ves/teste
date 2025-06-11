
import React, { useState, useMemo, useEffect } from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import InfoCard from './InfoCard';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { FolderPlusIcon } from './icons/FolderPlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon'; // New Icon
import { SparklesIcon } from './icons/SparklesIcon'; // Icon for Gratificação
import type { User } from '../App';
// import PontoRequestModal from './PontoRequestModal'; // Removed
import PessoaisRequestModal from './PessoaisRequestModal';
import NovaSolicitacaoModal from './NovaSolicitacaoModal';
import DistratoModal from './DistratoModal';
import RegularizacaoAssinaturaModal from './RegularizacaoAssinaturaModal';
import RegularizacaoCheckinModal from './RegularizacaoCheckinModal';
import RegularizacaoSubstituicaoModal from './RegularizacaoSubstituicaoModal';
import RegularizacaoForaPrazoModal from './RegularizacaoForaPrazoModal'; // Import the new modal

interface DashboardPageProps {
  openChangeProfileModal: () => void;
  currentUser: User;
}

type DocumentType = 'MEC_SOLICITACAO_RELATORIO' | 'JURIDICO_SOLICITACAO_RELATORIO' | 'PESSOAIS';

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
    id: 'JURIDICO_SOLICITACAO_RELATORIO',
    label: 'Solicitação Jurídico / Relatório Documentos Jurídico',
    description: 'Gerar e consultar solicitações e relatórios para o setor jurídico.',
    icon: DocumentTextIcon,
  },
  {
    id: 'PESSOAIS',
    label: 'Solicitação de Documentos',
    description: 'Solicite diversos tipos de documentos institucionais.',
    icon: DocumentTextIcon,
  },
];

interface ActionItem {
  id: string;
  label: string;
  description?: string;
  onClick: () => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Added for consistency if needed
}

const DashboardPage: React.FC<DashboardPageProps> = ({ openChangeProfileModal, currentUser }) => {
  const [isEventosAvulsosVisible, setIsEventosAvulsosVisible] = useState(false);
  const [isOficiosVisible, setIsOficiosVisible] = useState(false);
  const [isDocumentacaoDocenteVisible, setIsDocumentacaoDocenteVisible] = useState(false);
  const [isDeclaracaoVisible, setIsDeclaracaoVisible] = useState(false);
  const [isGratificacaoVisible, setIsGratificacaoVisible] = useState(false);
  const [isLicencasVisible, setIsLicencasVisible] = useState(false); // State for Licenças section
  const [isRegularizacaoSubmenuOpen, setIsRegularizacaoSubmenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // const [isPontoModalOpen, setIsPontoModalOpen] = useState(false); // Removed
  const [isPessoaisModalOpen, setIsPessoaisModalOpen] = useState(false);
  const [isNovaSolicitacaoModalOpen, setIsNovaSolicitacaoModalOpen] = useState(false);
  const [isDistratoModalOpen, setIsDistratoModalOpen] = useState(false);
  const [isRegularizacaoAssinaturaModalOpen, setIsRegularizacaoAssinaturaModalOpen] = useState(false);
  const [isRegularizacaoCheckinModalOpen, setIsRegularizacaoCheckinModalOpen] = useState(false);
  const [isRegularizacaoSubstituicaoModalOpen, setIsRegularizacaoSubstituicaoModalOpen] = useState(false);
  const [isRegularizacaoForaPrazoModalOpen, setIsRegularizacaoForaPrazoModalOpen] = useState(false);


  const handleActionItemClick = (actionTitle: string) => {
    console.log(`${actionTitle} clicked by ${currentUser.name}. (Simulação)`);
    alert(`Ação: "${actionTitle}" foi acionada. (Simulação)`);
  };
  
  const handleDeclaracaoActionClick = (actionTitle: string) => {
    console.log(`${actionTitle} (Declaração) clicked by ${currentUser.name}. (Simulação)`);
    alert(`Ação (Declaração): "${actionTitle}" foi acionada. (Simulação)`);
  };

  const handleGratificacaoActionClick = (actionTitle: string) => {
    console.log(`${actionTitle} (Gratificação) clicked by ${currentUser.name}. (Simulação)`);
    alert(`Ação (Gratificação): "${actionTitle}" foi acionada. (Simulação)`);
  };

  const handleLicencasActionClick = (actionTitle: string) => {
    console.log(`${actionTitle} (Licenças) clicked by ${currentUser.name}. (Simulação)`);
    alert(`Ação (Licenças): "${actionTitle}" foi acionada. (Simulação)`);
  };

  const handleDocumentacaoOptionClick = (docType: DocumentOption) => {
    if (docType.id === 'MEC_SOLICITACAO_RELATORIO') {
      alert(`Opção "${docType.label}" selecionada. Funcionalidade para gerar/consultar solicitações e relatórios MEC será implementada aqui. (Simulação)`);
    } else if (docType.id === 'JURIDICO_SOLICITACAO_RELATORIO') {
      alert(`Opção "${docType.label}" selecionada. Funcionalidade para gerar/consultar solicitações e relatórios jurídicos será implementada aqui. (Simulação)`);
    } else if (docType.id === 'PESSOAIS') {
      setIsPessoaisModalOpen(true);
    } else {
      alert(`Solicitação para "${docType.label}" iniciada. (Simulação)`);
    }
  };
  
  const regularizacaoSubActions: ActionItem[] = [
    { 
      id: 'regularizacao-assinatura', 
      label: 'Regularização de Assinatura', 
      onClick: () => setIsRegularizacaoAssinaturaModalOpen(true) 
    },
    { 
      id: 'regularizacao-checkin', 
      label: 'Regularização de Check-in', 
      onClick: () => setIsRegularizacaoCheckinModalOpen(true) 
    },
    { 
      id: 'regularizacao-substituicao', 
      label: 'Regularização de Substituição (Docente)', 
      onClick: () => setIsRegularizacaoSubstituicaoModalOpen(true) 
    },
    { 
      id: 'regularizacao-fora-prazo', 
      label: 'Regularização de Solicitação Fora de Prazo', 
      onClick: () => setIsRegularizacaoForaPrazoModalOpen(true) 
    },
  ];

  const baseEventosAvulsosActions: ActionItem[] = [
    { id: 'nova-solicitacao-evento', label: 'Nova Solicitação', onClick: () => setIsNovaSolicitacaoModalOpen(true) },
    { id: 'distrato-evento', label: 'Distrato', onClick: () => setIsDistratoModalOpen(true) },
    { id: 'regularizacao-evento', label: 'Regularização', onClick: () => setIsRegularizacaoSubmenuOpen(prev => !prev) },
  ];
  

  const baseDocumentacaoDocenteActions: ActionItem[] = DOCUMENT_OPTIONS.map(opt => ({
    id: opt.id,
    label: opt.label,
    description: opt.description,
    onClick: () => handleDocumentacaoOptionClick(opt),
    icon: opt.icon,
  }));

  const baseOficiosActions: ActionItem[] = [
    { id: 'oficios', label: 'Ofícios', onClick: () => handleActionItemClick('Ofícios') },
    { id: 'alteracao-vinculo', label: 'Alteração de Vínculo', onClick: () => handleActionItemClick('Alteração de Vínculo') },
    { id: 'termo-eventual-substituicao', label: 'Termo Eventual / Substituição', onClick: () => handleActionItemClick('Termo Eventual / Substituição') },
  ];

  const baseDeclaracaoActions: ActionItem[] = [
    { id: 'solicitar-declaracao', label: 'Solicitar Declaração', onClick: () => handleDeclaracaoActionClick('Solicitar Declaração') },
  ];

  const baseGratificacaoActions: ActionItem[] = [
    { id: 'gratificacao-portarias-termos', label: 'Gratificação / Portarias Termos de Gratificação', onClick: () => handleGratificacaoActionClick('Gratificação / Portarias Termos de Gratificação') },
    { id: 'gratificacao-cp', label: 'Gratificação CP', onClick: () => handleGratificacaoActionClick('Gratificação CP') },
    { id: 'gratificacao-londrina', label: 'Gratificação Londrina', onClick: () => handleGratificacaoActionClick('Gratificação Londrina') },
  ];

  const baseLicencasActions: ActionItem[] = [
    { id: 'solicitar-licenca', label: 'Solicitar Licença', onClick: () => handleLicencasActionClick('Solicitar Licença') },
  ];

  const sectionsConfig = useMemo(() => [
    {
      id: 'eventosAvulsos',
      title: 'Eventos Avulsos',
      icon: CalendarDaysIcon,
      actions: baseEventosAvulsosActions,
      subActionsMap: { 'regularizacao-evento': regularizacaoSubActions },
      isSubmenuOpenGetter: () => isRegularizacaoSubmenuOpen,
      isVisible: isEventosAvulsosVisible,
      toggle: () => {
        const opening = !isEventosAvulsosVisible;
        setIsEventosAvulsosVisible(opening);
        if (opening) { setIsOficiosVisible(false); setIsDocumentacaoDocenteVisible(false); setIsDeclaracaoVisible(false); setIsGratificacaoVisible(false); setIsLicencasVisible(false); }
        if (!opening) { setIsRegularizacaoSubmenuOpen(false); } 
      },
      placeholder: 'Clique para expandir e ver opções de eventos avulsos.',
    },
    {
      id: 'documentacaoDocente',
      title: 'Documentação Docente',
      icon: FolderPlusIcon,
      actions: baseDocumentacaoDocenteActions,
      isVisible: isDocumentacaoDocenteVisible,
      toggle: () => {
        const opening = !isDocumentacaoDocenteVisible;
        setIsDocumentacaoDocenteVisible(opening);
        if (opening) { setIsEventosAvulsosVisible(false); setIsOficiosVisible(false); setIsDeclaracaoVisible(false); setIsGratificacaoVisible(false); setIsLicencasVisible(false); setIsRegularizacaoSubmenuOpen(false); }
      },
      placeholder: 'Clique para expandir e ver opções de documentação docente.',
    },
    {
      id: 'oficios',
      title: 'Ofícios',
      icon: DocumentTextIcon,
      actions: baseOficiosActions,
      isVisible: isOficiosVisible,
      toggle: () => {
        const opening = !isOficiosVisible;
        setIsOficiosVisible(opening);
        if (opening) { setIsEventosAvulsosVisible(false); setIsDocumentacaoDocenteVisible(false); setIsDeclaracaoVisible(false); setIsGratificacaoVisible(false); setIsLicencasVisible(false); setIsRegularizacaoSubmenuOpen(false); }
      },
      placeholder: 'Clique para expandir e ver opções de ofícios.',
    },
    {
      id: 'declaracao',
      title: 'Declaração',
      icon: DocumentTextIcon, 
      actions: baseDeclaracaoActions,
      isVisible: isDeclaracaoVisible,
      toggle: () => {
        const opening = !isDeclaracaoVisible;
        setIsDeclaracaoVisible(opening);
        if (opening) { 
            setIsEventosAvulsosVisible(false); 
            setIsOficiosVisible(false); 
            setIsDocumentacaoDocenteVisible(false); 
            setIsGratificacaoVisible(false);
            setIsLicencasVisible(false);
            setIsRegularizacaoSubmenuOpen(false); 
        }
      },
      placeholder: 'Clique para expandir e ver opções de declaração.',
    },
    {
      id: 'gratificacao',
      title: 'Gratificação',
      icon: SparklesIcon,
      actions: baseGratificacaoActions,
      isVisible: isGratificacaoVisible,
      toggle: () => {
        const opening = !isGratificacaoVisible;
        setIsGratificacaoVisible(opening);
        if (opening) { 
            setIsEventosAvulsosVisible(false); 
            setIsOficiosVisible(false); 
            setIsDocumentacaoDocenteVisible(false);
            setIsDeclaracaoVisible(false);
            setIsLicencasVisible(false);
            setIsRegularizacaoSubmenuOpen(false); 
        }
      },
      placeholder: 'Clique para expandir e ver opções de gratificação.',
    },
    {
      id: 'licencas',
      title: 'Licenças',
      icon: CalendarDaysIcon,
      actions: baseLicencasActions,
      isVisible: isLicencasVisible,
      toggle: () => {
        const opening = !isLicencasVisible;
        setIsLicencasVisible(opening);
        if (opening) { 
            setIsEventosAvulsosVisible(false); 
            setIsOficiosVisible(false); 
            setIsDocumentacaoDocenteVisible(false);
            setIsDeclaracaoVisible(false);
            setIsGratificacaoVisible(false);
            setIsRegularizacaoSubmenuOpen(false); 
        }
      },
      placeholder: 'Clique para expandir e ver opções de licenças.',
    },
  ], [
      isEventosAvulsosVisible, 
      isDocumentacaoDocenteVisible, 
      isOficiosVisible, 
      isDeclaracaoVisible, 
      isGratificacaoVisible,
      isLicencasVisible,
      isRegularizacaoSubmenuOpen, 
      baseDocumentacaoDocenteActions, 
      baseDeclaracaoActions,
      baseGratificacaoActions,
      baseLicencasActions
    ]); 

  const normalizeText = (text: string = '') => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredAndProcessedSections = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    if (!normalizedSearch) {
      return sectionsConfig.map(section => ({
        ...section,
        displayActions: section.actions,
        isForceOpen: false,
        isRegularizacaoSubmenuForceOpen: false,
        displayRegularizacaoSubActions: section.subActionsMap?.['regularizacao-evento'] || [],
      }));
    }

    return sectionsConfig.map(section => {
      const titleMatches = normalizeText(section.title).includes(normalizedSearch);
      
      let sectionMatchesSearch = titleMatches;
      let isRegularizacaoSubmenuForceOpenForThisSection = false;
      let filteredSubActions = section.subActionsMap?.['regularizacao-evento'] || [];

      const matchingTopLevelActions = section.actions.filter(action => {
        const actionLabelNormalized = normalizeText(action.label);
        const actionDescNormalized = normalizeText(action.description);
        let actionMatches = actionLabelNormalized.includes(normalizedSearch) || actionDescNormalized.includes(normalizedSearch);

        if (action.id === 'regularizacao-evento' && section.id === 'eventosAvulsos') { // Ensure this check is specific to 'eventosAvulsos'
          const subActions = section.subActionsMap?.[action.id] || [];
          const matchingSubs = subActions.filter(sub => 
            normalizeText(sub.label).includes(normalizedSearch) || 
            normalizeText(sub.description).includes(normalizedSearch)
          );
          if (actionMatches || matchingSubs.length > 0) {
            isRegularizacaoSubmenuForceOpenForThisSection = true;
            actionMatches = true; 
            if (matchingSubs.length > 0) {
              filteredSubActions = matchingSubs;
            } else {
               filteredSubActions = subActions; 
            }
          } else {
            actionMatches = false; 
          }
        }
        if(actionMatches) sectionMatchesSearch = true;
        return actionMatches;
      });

      const isVisibleDueToSearch = sectionMatchesSearch;
      
      return {
        ...section,
        isVisible: isVisibleDueToSearch, // This is correct, section visibility is tied to search match.
        displayActions: matchingTopLevelActions.length > 0 ? matchingTopLevelActions : (titleMatches ? section.actions : []),
        isForceOpen: isVisibleDueToSearch, // This forces the section open if any part matches.
        isRegularizacaoSubmenuForceOpen: isRegularizacaoSubmenuForceOpenForThisSection, // Specific to 'regularizacao-evento' submenu logic
        displayRegularizacaoSubActions: filteredSubActions, // Specific to 'regularizacao-evento' submenu logic
      };
    }).filter(section => section.isVisible); // Only return sections that should be visible based on search
  }, [searchTerm, sectionsConfig, isRegularizacaoSubmenuOpen]);


  // const handlePontoSubmit = (selectedPeriods: string[], justification: string) => { // Removed
  //   const message = `Solicitação de Registro de Ponto/Atividades para os períodos: ${selectedPeriods.join(', ')} enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
  //   console.log("Ponto/Atividades Request from Dashboard:", { user: currentUser.name, periods: selectedPeriods, justification });
  //   alert(message);
  //   setIsPontoModalOpen(false);
  // };

  const handlePessoaisSubmit = (selectedDocumentType: string, justification: string) => {
    const message = `Solicitação para o documento pessoal: "${selectedDocumentType}" enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
    console.log("Documento Pessoal Request from Dashboard:", { user: currentUser.name, documentType: selectedDocumentType, justification });
    alert(message);
    setIsPessoaisModalOpen(false);
  };

  const handleNovaSolicitacaoSubmit = (documento1: File | null, documento2: File | null) => {
    let message = `Nova Solicitação de Evento Avulso enviada por ${currentUser.name}.`;
    const attachedFiles = [];
    if (documento1) {
      console.log('Documento 1:', documento1.name);
      attachedFiles.push(`Documento Principal: ${documento1.name}`);
    }
    if (documento2) {
      console.log('Documento 2:', documento2.name);
      attachedFiles.push(`Documento Adicional: ${documento2.name}`);
    }
    if (attachedFiles.length > 0) {
        message += ` Arquivos: ${attachedFiles.join('; ')}.`;
    } else {
        message += ` Nenhum arquivo anexado.`;
    }
    message += ' (Simulação)';
    
    console.log("Nova Solicitação - Evento Avulso from Dashboard:", {
      user: currentUser.name,
      documento1Name: documento1?.name,
      documento2Name: documento2?.name,
    });
    alert(message);
    setIsNovaSolicitacaoModalOpen(false);
  };

  const handleDistratoSubmit = (solicitacaoId: string, justification: string) => {
    const message = `Solicitação de Distrato para o ID: ${solicitacaoId} enviada com sucesso. Justificativa: "${justification}". (Simulação)`;
    console.log("Distrato Request from Dashboard:", {
      user: currentUser.name,
      solicitacaoId,
      justification,
    });
    alert(message);
    setIsDistratoModalOpen(false);
  };

  const handleRegularizacaoAssinaturaSubmit = (regularizacaoId: string, oficioFile: File) => {
    const message = `Solicitação de Regularização de Assinatura (ID: ${regularizacaoId}) com ofício "${oficioFile.name}" enviada por ${currentUser.name}. (Simulação)`;
    console.log('Regularização de Assinatura - Dashboard:', {
        user: currentUser.name,
        regularizacaoId,
        oficioFileName: oficioFile.name,
        oficioFileSize: oficioFile.size,
    });
    alert(message);
    setIsRegularizacaoAssinaturaModalOpen(false);
  };

  const handleRegularizacaoCheckinSubmit = (solicitacaoId: string, oficioFile: File) => {
    const message = `Solicitação de Regularização de Check-in (ID da Solicitação: ${solicitacaoId}) com ofício "${oficioFile.name}" enviada por ${currentUser.name}. (Simulação)`;
    console.log('Regularização de Check-in - Dashboard:', {
        user: currentUser.name,
        solicitacaoId: solicitacaoId,
        oficioFileName: oficioFile.name,
        oficioFileSize: oficioFile.size,
    });
    alert(message);
    setIsRegularizacaoCheckinModalOpen(false);
  };

  const handleRegularizacaoSubstituicaoSubmit = (solicitacaoId: string, oficioFile: File) => {
    const message = `Solicitação de Regularização de Substituição (Docente) (ID da Solicitação: ${solicitacaoId}) com ofício "${oficioFile.name}" enviada por ${currentUser.name}. (Simulação)`;
    console.log('Regularização de Substituição (Docente) - Dashboard:', {
        user: currentUser.name,
        solicitacaoId,
        oficioFileName: oficioFile.name,
        oficioFileSize: oficioFile.size,
    });
    alert(message);
    setIsRegularizacaoSubstituicaoModalOpen(false);
  };

  const handleRegularizacaoForaPrazoSubmit = (planilhaFile: File, oficioFile: File) => {
    const message = `Solicitação de Regularização Fora de Prazo com planilha "${planilhaFile.name}" e ofício "${oficioFile.name}" enviada por ${currentUser.name}. (Simulação)`;
    console.log('Regularização de Solicitação Fora de Prazo - Dashboard:', {
        user: currentUser.name,
        planilhaFileName: planilhaFile.name,
        planilhaFileSize: planilhaFile.size,
        oficioFileName: oficioFile.name,
        oficioFileSize: oficioFile.size,
    });
    alert(message);
    setIsRegularizacaoForaPrazoModalOpen(false);
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 mb-8">
        <InfoCard
          title="Bem-Vindo(a)"
          value={`${currentUser.name} - ${currentUser.currentProfile}`}
          subtitle={`Matrícula: ${currentUser.matricula} | Último Login: 27/05/2025 - 14:20:28 (Exemplo)`}
          icon={<UserCircleIcon className="h-10 w-10" />}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="dashboardSearch"
            id="dashboardSearch"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900 shadow-sm"
            placeholder="Pesquisar por tema ou ação..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Pesquisar no dashboard"
          />
        </div>
      </div>
      
      {searchTerm.trim() && filteredAndProcessedSections.length === 0 && (
        <div className="text-center py-10">
          <MagnifyingGlassIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">Nenhum resultado encontrado</p>
          <p className="text-gray-500 mt-1">Tente ajustar seus termos de pesquisa para encontrar o que procura.</p>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-8">
          {filteredAndProcessedSections
            .filter((_, index) => index % 2 === 0) 
            .map(section => {
              // Use section.isVisible when searchTerm is present, otherwise use the section's own visibility state (e.g., isEventosAvulsosVisible)
              const sectionIsActuallyOpen = searchTerm.trim() ? section.isVisible : section.isVisible;
              return (
                <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={section.toggle}
                     // Disable toggle if search term forces it open, unless it's 'eventosAvulsos' which has its own submenu logic
                    disabled={searchTerm.trim() && section.isForceOpen && section.id !== 'eventosAvulsos'}
                    className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-jornada-primary focus:ring-opacity-50 transition-colors ${sectionIsActuallyOpen ? 'bg-slate-50' : ''} ${(searchTerm.trim() && section.isForceOpen && section.id !== 'eventosAvulsos') ? 'cursor-default' : ''}`}
                    aria-expanded={sectionIsActuallyOpen}
                    aria-controls={`${section.id}-content`}
                  >
                    <div className="flex items-center">
                      <section.icon className="h-6 w-6 mr-3 text-jornada-primary opacity-75" />
                      <span className="text-xl font-semibold text-gray-800">{section.title}</span>
                    </div>
                    <ChevronDownIcon
                      className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                        sectionIsActuallyOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {sectionIsActuallyOpen && (
                    <div id={`${section.id}-content`} className="p-4 border-t border-gray-200 space-y-2">
                      {section.displayActions.length > 0 ? section.displayActions.map(action => {
                        // Special handling for 'eventosAvulsos' section's 'regularizacao-evento' action (submenu)
                        if (action.id === 'regularizacao-evento' && section.id === 'eventosAvulsos') {
                          const actualRegularizacaoSubmenuOpen = searchTerm.trim() ? section.isRegularizacaoSubmenuForceOpen : section.isSubmenuOpenGetter?.();
                          return (
                            <div key={action.id}>
                              <button
                                onClick={action.onClick}
                                className="group flex items-center justify-between w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark rounded-md transition-colors"
                                aria-expanded={actualRegularizacaoSubmenuOpen}
                              >
                                <span className="flex-grow">{action.label}</span>
                                <ChevronDownIcon className={`h-4 w-4 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2 transition-transform duration-200 ${actualRegularizacaoSubmenuOpen ? 'transform rotate-180': ''}`} />
                              </button>
                              {actualRegularizacaoSubmenuOpen && (
                                <div className="pl-4 mt-1 space-y-1 border-l-2 border-jornada-primary/20">
                                  {(searchTerm.trim() ? section.displayRegularizacaoSubActions : regularizacaoSubActions).map(subAction => (
                                    <button
                                      key={subAction.id}
                                      onClick={subAction.onClick}
                                      className="group flex items-center justify-between w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-jornada-primary/5 hover:text-jornada-primary-dark rounded-md transition-colors"
                                    >
                                      <span className="flex-grow">{subAction.label}</span>
                                      <ChevronRightIcon className="h-3 w-3 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2" />
                                    </button>
                                  ))}
                                   {(searchTerm.trim() ? section.displayRegularizacaoSubActions : regularizacaoSubActions).length === 0 && searchTerm.trim() && (
                                    <p className="px-3 py-2 text-xs text-gray-500">Nenhuma sub-ação de regularização encontrada para "{searchTerm}".</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }
                        // Default rendering for other actions
                        return (
                          <button
                            key={action.id}
                            onClick={action.onClick}
                            className="group flex items-center justify-between w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark rounded-md transition-colors"
                          >
                            <span className="flex-grow">{action.label} {action.description && <span className="text-xs text-gray-500 group-hover:text-gray-600">({action.description})</span>}</span>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2" />
                          </button>
                        );
                      }) : ( // If no actions match the search term within this section
                        <p className="text-sm text-gray-500">Nenhuma ação encontrada para "{searchTerm}" nesta seção.</p>
                      )}
                    </div>
                  )}
                  {!sectionIsActuallyOpen && (
                    <div className="p-4 text-sm text-gray-500 border-t border-gray-100">
                      {section.placeholder}
                    </div>
                  )}
                </div>
              );
          })}
        </div>
        
        {/* Column 2 */}
        <div className="space-y-8">
          {filteredAndProcessedSections
            .filter((_, index) => index % 2 !== 0)
             .map(section => {
              const sectionIsActuallyOpen = searchTerm.trim() ? section.isVisible : section.isVisible;
              return (
                <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={section.toggle}
                    disabled={searchTerm.trim() && section.isForceOpen && section.id !== 'eventosAvulsos'}
                    className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-jornada-primary focus:ring-opacity-50 transition-colors ${sectionIsActuallyOpen ? 'bg-slate-50' : ''} ${(searchTerm.trim() && section.isForceOpen && section.id !== 'eventosAvulsos') ? 'cursor-default' : ''}`}
                    aria-expanded={sectionIsActuallyOpen}
                    aria-controls={`${section.id}-content-col2`}
                  >
                    <div className="flex items-center">
                      <section.icon className="h-6 w-6 mr-3 text-jornada-primary opacity-75" />
                      <span className="text-xl font-semibold text-gray-800">{section.title}</span>
                    </div>
                    <ChevronDownIcon
                      className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                        sectionIsActuallyOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {sectionIsActuallyOpen && (
                    <div id={`${section.id}-content-col2`} className="p-4 border-t border-gray-200 space-y-2">
                       {section.displayActions.length > 0 ? section.displayActions.map(action => {
                          if (action.id === 'regularizacao-evento' && section.id === 'eventosAvulsos') {
                            const actualRegularizacaoSubmenuOpen = searchTerm.trim() ? section.isRegularizacaoSubmenuForceOpen : section.isSubmenuOpenGetter?.();
                            return (
                              <div key={action.id}>
                                <button
                                  onClick={action.onClick}
                                  className="group flex items-center justify-between w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark rounded-md transition-colors"
                                  aria-expanded={actualRegularizacaoSubmenuOpen}
                                >
                                  <span className="flex-grow">{action.label}</span>
                                  <ChevronDownIcon className={`h-4 w-4 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2 transition-transform duration-200 ${actualRegularizacaoSubmenuOpen ? 'transform rotate-180': ''}`} />
                                </button>
                                {actualRegularizacaoSubmenuOpen && (
                                   <div className="pl-4 mt-1 space-y-1 border-l-2 border-jornada-primary/20">
                                    {(searchTerm.trim() ? section.displayRegularizacaoSubActions : regularizacaoSubActions).map(subAction => (
                                      <button
                                        key={subAction.id}
                                        onClick={subAction.onClick}
                                        className="group flex items-center justify-between w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-jornada-primary/5 hover:text-jornada-primary-dark rounded-md transition-colors"
                                      >
                                        <span className="flex-grow">{subAction.label}</span>
                                        <ChevronRightIcon className="h-3 w-3 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2" />
                                      </button>
                                    ))}
                                    {(searchTerm.trim() ? section.displayRegularizacaoSubActions : regularizacaoSubActions).length === 0 && searchTerm.trim() && (
                                      <p className="px-3 py-2 text-xs text-gray-500">Nenhuma sub-ação de regularização encontrada para "{searchTerm}".</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          return (
                            <button
                              key={action.id}
                              onClick={action.onClick}
                              className="group flex items-center justify-between w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark rounded-md transition-colors"
                            >
                              <span className="flex-grow">{action.label} {action.description && <span className="text-xs text-gray-500 group-hover:text-gray-600">({action.description})</span>}</span>
                              <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-jornada-primary-dark opacity-50 group-hover:opacity-100 ml-2" />
                            </button>
                          );
                        }) : (
                         <p className="text-sm text-gray-500">Nenhuma ação encontrada para "{searchTerm}" nesta seção.</p>
                      )}
                    </div>
                  )}
                   {!sectionIsActuallyOpen && (
                    <div className="p-4 text-sm text-gray-500 border-t border-gray-100">
                      {section.placeholder}
                    </div>
                  )}
                </div>
              );
          })}
        </div>
      </div>
      
      {/* <PontoRequestModal // Removed
        isOpen={isPontoModalOpen}
        onClose={() => setIsPontoModalOpen(false)}
        onSubmit={handlePontoSubmit}
        academicPeriods={academicPeriods}
      /> */}
      <PessoaisRequestModal
        isOpen={isPessoaisModalOpen}
        onClose={() => setIsPessoaisModalOpen(false)}
        onSubmit={handlePessoaisSubmit}
      />
      <NovaSolicitacaoModal
        isOpen={isNovaSolicitacaoModalOpen}
        onClose={() => setIsNovaSolicitacaoModalOpen(false)}
        onSubmit={handleNovaSolicitacaoSubmit}
        currentUser={currentUser}
      />
      <DistratoModal
        isOpen={isDistratoModalOpen}
        onClose={() => setIsDistratoModalOpen(false)}
        onSubmit={handleDistratoSubmit}
        currentUser={currentUser}
      />
      <RegularizacaoAssinaturaModal
        isOpen={isRegularizacaoAssinaturaModalOpen}
        onClose={() => setIsRegularizacaoAssinaturaModalOpen(false)}
        onSubmit={handleRegularizacaoAssinaturaSubmit}
        currentUser={currentUser}
      />
      <RegularizacaoCheckinModal
        isOpen={isRegularizacaoCheckinModalOpen}
        onClose={() => setIsRegularizacaoCheckinModalOpen(false)}
        onSubmit={handleRegularizacaoCheckinSubmit}
        currentUser={currentUser}
      />
      <RegularizacaoSubstituicaoModal
        isOpen={isRegularizacaoSubstituicaoModalOpen}
        onClose={() => setIsRegularizacaoSubstituicaoModalOpen(false)}
        onSubmit={handleRegularizacaoSubstituicaoSubmit}
        currentUser={currentUser}
      />
      <RegularizacaoForaPrazoModal
        isOpen={isRegularizacaoForaPrazoModalOpen}
        onClose={() => setIsRegularizacaoForaPrazoModalOpen(false)}
        onSubmit={handleRegularizacaoForaPrazoSubmit}
        currentUser={currentUser}
      />
    </div>
  );
};

export default DashboardPage;
