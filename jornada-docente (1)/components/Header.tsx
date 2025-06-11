
import React, { useState, useEffect, useRef } from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon'; 
import { BellIcon } from './icons/BellIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon'; 
import { UserCheckIcon } from './icons/UserCheckIcon';
import { UsersIcon } from './icons/UsersIcon'; // For "Configurar Usuários"
import { GridIcon } from './icons/GridIcon'; 
import { CalendarDaysIcon } from './icons/CalendarDaysIcon'; 
import { AcademicCapIcon } from './icons/AcademicCapIcon'; 
import { SparklesIcon } from './icons/SparklesIcon'; 
// import { CheckCircleIcon } from './icons/CheckCircleIcon'; // No longer needed here for Eventos Avulsos submenu items
// import { GearIcon } from './icons/GearIcon'; // Removed settings icon import
// import { ClockIcon } from './icons/ClockIcon'; // Removed ClockIcon import
import type { PageName, User } from '../App';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  openChangeProfileModal: () => void;
  navigateTo: (page: PageName) => void;
  pendingTitulationApprovalsCount: number;
  pendingDocumentApprovalsCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  onLogout, 
  openChangeProfileModal, 
  navigateTo, 
  pendingTitulationApprovalsCount,
  pendingDocumentApprovalsCount
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [solicitacoesDropdownOpen, setSolicitacoesDropdownOpen] = useState(false);
  const [aprovacoesDropdownOpen, setAprovacoesDropdownOpen] = useState(false);
  const [admissaoDropdownOpen, setAdmissaoDropdownOpen] = useState(false);
  
  const [termoAditivoSubmenuOpen, setTermoAditivoSubmenuOpen] = useState(false); 
  const [termoAditivoGraduacaoSubmenuOpen, setTermoAditivoGraduacaoSubmenuOpen] = useState(false);
  const [termoAditivoLatoSensuSubmenuOpen, setTermoAditivoLatoSensuSubmenuOpen] = useState(false);
  // const [aprovacoesEventosAvulsosSubmenuOpen, setAprovacoesEventosAvulsosSubmenuOpen] = useState(false); // Removed


  const userDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const notificationPanelRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const solicitacoesContainerRef = useRef<HTMLDivElement>(null); 
  const solicitacoesTriggerRef = useRef<HTMLButtonElement>(null);

  const aprovacoesContainerRef = useRef<HTMLDivElement>(null);
  const aprovacoesTriggerRef = useRef<HTMLButtonElement>(null);

  const admissaoContainerRef = useRef<HTMLDivElement>(null);
  const admissaoTriggerRef = useRef<HTMLButtonElement>(null);
  
  const termoAditivoParentRef = useRef<HTMLDivElement>(null); 
  const termoAditivoGraduacaoParentRef = useRef<HTMLDivElement>(null); 
  const termoAditivoLatoSensuParentRef = useRef<HTMLDivElement>(null); 
  // const aprovacoesEventosAvulsosParentRef = useRef<HTMLDivElement>(null); // Removed


  const closeAllDropdowns = () => {
    setUserDropdownOpen(false);
    setNotificationPanelOpen(false);
    setSolicitacoesDropdownOpen(false);
    setAprovacoesDropdownOpen(false);
    setAdmissaoDropdownOpen(false);
    setTermoAditivoSubmenuOpen(false);
    setTermoAditivoGraduacaoSubmenuOpen(false);
    setTermoAditivoLatoSensuSubmenuOpen(false);
    // setAprovacoesEventosAvulsosSubmenuOpen(false); // Removed
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideUser = userDropdownTriggerRef.current?.contains(target) || userDropdownRef.current?.contains(target);
      const clickedInsideNotification = notificationButtonRef.current?.contains(target) || notificationPanelRef.current?.contains(target);
      
      let isClickInsideSolicitacoesChain = false;
      if (solicitacoesDropdownOpen) {
        if (solicitacoesContainerRef.current?.contains(target)) { 
            isClickInsideSolicitacoesChain = true;
        }
        if (termoAditivoSubmenuOpen && termoAditivoParentRef.current?.contains(target)) { 
            isClickInsideSolicitacoesChain = true;
        }
        if (termoAditivoGraduacaoSubmenuOpen && termoAditivoGraduacaoParentRef.current?.contains(target)) { 
            isClickInsideSolicitacoesChain = true;
        }
        if (termoAditivoLatoSensuSubmenuOpen && termoAditivoLatoSensuParentRef.current?.contains(target)) { 
            isClickInsideSolicitacoesChain = true;
        }
      }
      
      // Simplified aprovacoes chain check as Eventos Avulsos is no longer a submenu
      const clickedInsideAprovacoes = aprovacoesTriggerRef.current?.contains(target) || aprovacoesContainerRef.current?.contains(target);

      const clickedInsideAdmissao = admissaoTriggerRef.current?.contains(target) || admissaoContainerRef.current?.contains(target);

      if (!clickedInsideUser && !clickedInsideNotification && !isClickInsideSolicitacoesChain && !clickedInsideAprovacoes && !clickedInsideAdmissao) { 
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen, notificationPanelOpen, solicitacoesDropdownOpen, termoAditivoSubmenuOpen, termoAditivoGraduacaoSubmenuOpen, termoAditivoLatoSensuSubmenuOpen, aprovacoesDropdownOpen, admissaoDropdownOpen]); 


  const toggleUserDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentlyOpen = userDropdownOpen;
    if (!currentlyOpen) closeAllDropdowns();
    setUserDropdownOpen(prev => !prev);
  };
  
  const toggleNotificationPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentlyOpen = notificationPanelOpen;
    if (!currentlyOpen) closeAllDropdowns();
    setNotificationPanelOpen(prev => !prev);
  };

  const toggleSolicitacoesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentlyOpen = solicitacoesDropdownOpen;
    closeAllDropdowns(); 
    if (!currentlyOpen) {
        setSolicitacoesDropdownOpen(true); 
    }
  };

  const toggleAprovacoesDropdown = (e: React.MouseEvent) => { 
    e.stopPropagation();
    const currentlyOpen = aprovacoesDropdownOpen;
    closeAllDropdowns();
    if(!currentlyOpen) {
        setAprovacoesDropdownOpen(true);
    }
  };

  const toggleAdmissaoDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentlyOpen = admissaoDropdownOpen;
    closeAllDropdowns();
    if(!currentlyOpen) {
        setAdmissaoDropdownOpen(true);
    }
  };
  
  const toggleTermoAditivoSubmenu = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const currentlyOpen = termoAditivoSubmenuOpen;
    if (currentlyOpen) { 
        setTermoAditivoGraduacaoSubmenuOpen(false); 
        setTermoAditivoLatoSensuSubmenuOpen(false); 
    }
    setTermoAditivoSubmenuOpen(!currentlyOpen);
  };

  const toggleTermoAditivoGraduacaoSubmenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTermoAditivoGraduacaoSubmenuOpen(prev => !prev);
  };

  const toggleTermoAditivoLatoSensuSubmenu = (e: React.MouseEvent) => { 
    e.stopPropagation();
    setTermoAditivoLatoSensuSubmenuOpen(prev => !prev);
  };

  // Removed toggleAprovacoesEventosAvulsosSubmenu as it's no longer a submenu


  const handleSolicitacoesMouseEnter = () => {
    if (!solicitacoesDropdownOpen) {
      closeAllDropdowns();
      setSolicitacoesDropdownOpen(true);
    }
  };
  const handleSolicitacoesMouseLeave = () => { /* L1 closes via other interactions */ };
  
  const handleTermoAditivoParentMouseEnter = () => {
    if (solicitacoesDropdownOpen) { 
      setTermoAditivoSubmenuOpen(true);
    }
  };
  const handleTermoAditivoParentMouseLeave = () => {
    setTermoAditivoSubmenuOpen(false);
    setTermoAditivoGraduacaoSubmenuOpen(false);
    setTermoAditivoLatoSensuSubmenuOpen(false); 
  };

  const handleTermoAditivoGraduacaoParentMouseEnter = () => {
    if (termoAditivoSubmenuOpen) { 
      setTermoAditivoGraduacaoSubmenuOpen(true);
    }
  };
  const handleTermoAditivoGraduacaoParentMouseLeave = () => {
    setTermoAditivoGraduacaoSubmenuOpen(false);
  };

  const handleTermoAditivoLatoSensuParentMouseEnter = () => { 
    if (termoAditivoSubmenuOpen) { 
      setTermoAditivoLatoSensuSubmenuOpen(true);
    }
  };
  const handleTermoAditivoLatoSensuParentMouseLeave = () => { 
    setTermoAditivoLatoSensuSubmenuOpen(false);
  };

  const handleAprovacoesMouseEnter = () => { 
    if (!aprovacoesDropdownOpen) {
      closeAllDropdowns();
      setAprovacoesDropdownOpen(true);
    }
  };
   const handleAprovacoesMouseLeave = () => { /* L1 closes via other interactions */ };

  // Removed handleAprovacoesEventosAvulsosParentMouseEnter and MouseLeave


  const handleAdmissaoMouseEnter = () => {
    if (!admissaoDropdownOpen) {
      closeAllDropdowns();
      setAdmissaoDropdownOpen(true);
    }
  };
  const handleAdmissaoMouseLeave = () => { /* L1 closes via other interactions */ };
  
  const handleNavigationItemClick = (page: PageName) => {
    navigateTo(page);
    closeAllDropdowns();
  };
  
  const handleSubMenuItemClick = (page: PageName, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    navigateTo(page);
    closeAllDropdowns(); 
  };


  const handleViewTitulationApprovals = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigationItemClick('aprovacoes');
  };

  const handleViewDocumentApprovals = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigationItemClick('aprovar-documentacao');
  };
  
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAllDropdowns();
    onLogout();
  }

  const isMainApprover = currentUser.isAdmin || currentUser.username === 'planejamento.academico';
  const isGerenteEscola = currentUser.username === 'gerente.escola';
  const canViewAprovacoesMenu = isMainApprover || isGerenteEscola;
  const canViewAdmissao = currentUser.isAdmin || currentUser.username === 'planejamento.academico'; // This is isMainApprover
  
  // Condition for rendering the main nav container for Solicitações, Aprovações, Admissão
  const shouldRenderMainNavBarItems = canViewAprovacoesMenu || canViewAdmissao || currentUser.isAdmin;


  const canViewLicencas = ['admin', 'user', 'docente'].includes(currentUser.username);
  const hasAnyPendingApprovals = (isMainApprover && pendingTitulationApprovalsCount > 0) || (isMainApprover && pendingDocumentApprovalsCount > 0);


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigationItemClick('dashboard')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleNavigationItemClick('dashboard');}}}
            role="button"
            tabIndex={0}
            aria-label="Ir para o Dashboard"
          >
            <span className="ml-3 text-2xl font-bold text-jornada-primary">NOME A DEFINIR</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {shouldRenderMainNavBarItems && (
              <nav className="hidden md:flex space-x-1 lg:space-x-2">
                {/* Solicitações Dropdown - Only for Admin */}
                {currentUser.isAdmin && (
                  <div
                    ref={solicitacoesContainerRef} 
                    className="relative"
                    onMouseEnter={handleSolicitacoesMouseEnter}
                    onMouseLeave={handleSolicitacoesMouseLeave} 
                  >
                    <button
                      ref={solicitacoesTriggerRef}
                      onClick={toggleSolicitacoesDropdown}
                      id="solicitacoes-menu-button"
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-jornada-primary transition-colors"
                      aria-haspopup="true"
                      aria-expanded={solicitacoesDropdownOpen}
                      aria-controls="solicitacoes-menu"
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-1.5 text-gray-600" />
                      Solicitações
                      <ChevronDownIcon className={`h-4 w-4 ml-1.5 text-gray-500 transition-transform duration-200 ${solicitacoesDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>

                    {solicitacoesDropdownOpen && (
                      <div
                        id="solicitacoes-menu"
                        className="origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="solicitacoes-menu-button"
                      >
                        <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('atualizar-titulacao', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <PencilSquareIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Atualizar Titulação
                        </a>
                        {canViewLicencas && (
                          <a
                            href="#"
                            onClick={(e) => handleSubMenuItemClick('licencas', e)}
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                            role="menuitem"
                          >
                            <CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                            Licenças
                          </a>
                        )}
                         <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('declaracoes', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Declarações
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('documentacao-docente', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Documentação Docente
                        </a>
                        
                        {/* Termo Aditivo Submenu (L2) */}
                        <div 
                          ref={termoAditivoParentRef} 
                          className="relative"
                          onMouseEnter={handleTermoAditivoParentMouseEnter}
                          onMouseLeave={handleTermoAditivoParentMouseLeave}
                        >
                          <button
                            onClick={toggleTermoAditivoSubmenu}
                            className="w-full group flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                            role="menuitem"
                            aria-haspopup="true"
                            aria-expanded={termoAditivoSubmenuOpen}
                          >
                            <span className="flex items-center">
                              <PencilSquareIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                              Termo Aditivo
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500 group-hover:text-white" />
                          </button>
                          {termoAditivoSubmenuOpen && (
                            <div
                              className="origin-top-left absolute left-full top-0 ml-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                              role="menu"
                              aria-orientation="vertical"
                            >
                              {/* Graduação Submenu (L3) */}
                              <div
                                ref={termoAditivoGraduacaoParentRef} 
                                className="relative"
                                onMouseEnter={handleTermoAditivoGraduacaoParentMouseEnter}
                                onMouseLeave={handleTermoAditivoGraduacaoParentMouseLeave}
                              >
                                <button
                                  onClick={toggleTermoAditivoGraduacaoSubmenu}
                                  className="w-full group flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                  role="menuitem"
                                  aria-haspopup="true"
                                  aria-expanded={termoAditivoGraduacaoSubmenuOpen}
                                >
                                  <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                                    Graduação
                                  </span>
                                  <ChevronRightIcon className="h-4 w-4 text-gray-500 group-hover:text-white" />
                                </button>
                                {termoAditivoGraduacaoSubmenuOpen && (
                                  <div
                                    className="origin-top-left absolute left-full top-0 ml-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                    role="menu"
                                    aria-orientation="vertical"
                                  >
                                    <div className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      CARGA HORÁRIA
                                    </div>
                                    <a
                                      href="#"
                                      onClick={(e) => handleSubMenuItemClick('termo-aditivo-graduacao-normal', e)}
                                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                      role="menuitem"
                                    >
                                      <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white opacity-75" />
                                      Normal
                                    </a>
                                    <a
                                      href="#"
                                      onClick={(e) => handleSubMenuItemClick('termo-aditivo-graduacao-eventual', e)}
                                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                      role="menuitem"
                                    >
                                      <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white opacity-75" />
                                      Eventual
                                    </a>
                                    <a
                                      href="#"
                                      onClick={(e) => handleSubMenuItemClick('termo-aditivo-graduacao-substituicao', e)}
                                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                      role="menuitem"
                                    >
                                      <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white opacity-75" />
                                      Substituição
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* Lato Sensu Submenu (L3) */}
                              <div
                                ref={termoAditivoLatoSensuParentRef}
                                className="relative"
                                onMouseEnter={handleTermoAditivoLatoSensuParentMouseEnter}
                                onMouseLeave={handleTermoAditivoLatoSensuParentMouseLeave}
                              >
                                <button
                                  onClick={toggleTermoAditivoLatoSensuSubmenu}
                                  className="w-full group flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                  role="menuitem"
                                  aria-haspopup="true"
                                  aria-expanded={termoAditivoLatoSensuSubmenuOpen}
                                >
                                  <span className="flex items-center">
                                    <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                                    Lato Sensu
                                  </span>
                                  <ChevronRightIcon className="h-4 w-4 text-gray-500 group-hover:text-white" />
                                </button>
                                {termoAditivoLatoSensuSubmenuOpen && (
                                  <div
                                    className="origin-top-left absolute left-full top-0 ml-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                    role="menu"
                                    aria-orientation="vertical"
                                  >
                                    <div className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Regime Especial
                                    </div>
                                    <a
                                      href="#"
                                      onClick={(e) => handleSubMenuItemClick('termo-aditivo-lato-sensu-letiva', e)}
                                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                      role="menuitem"
                                    >
                                      <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white opacity-75" />
                                      Letiva
                                    </a>
                                    <a
                                      href="#"
                                      onClick={(e) => handleSubMenuItemClick('termo-aditivo-lato-sensu-nao-letiva', e)}
                                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                      role="menuitem"
                                    >
                                      <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white opacity-75" />
                                      Não Letiva
                                    </a>
                                  </div>
                                )}
                              </div>
                              
                              <a
                                href="#"
                                onClick={(e) => handleSubMenuItemClick('termo-aditivo-stricto-sensu', e)}
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                                role="menuitem"
                              >
                                <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                                Stricto Sensu
                              </a>
                            </div>
                          )}
                        </div>

                        <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('promocao-progressao', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Promoção e Progressão
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('gratificacao', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <SparklesIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Gratificação
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleSubMenuItemClick('ferias', e)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                          role="menuitem"
                        >
                          <CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                          Férias
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Aprovações Dropdown - Content varies by role */}
                {canViewAprovacoesMenu && (
                  <div
                    ref={aprovacoesContainerRef}
                    className="relative"
                    onMouseEnter={handleAprovacoesMouseEnter}
                    onMouseLeave={handleAprovacoesMouseLeave}
                  >
                    <button
                      ref={aprovacoesTriggerRef}
                      onClick={toggleAprovacoesDropdown}
                      id="aprovacoes-menu-button"
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-jornada-primary transition-colors"
                      aria-haspopup="true"
                      aria-expanded={aprovacoesDropdownOpen}
                      aria-controls="aprovacoes-menu"
                    >
                      <ShieldCheckIcon className="h-5 w-5 mr-1.5 text-gray-600" />
                      Aprovações
                      <ChevronDownIcon className={`h-4 w-4 ml-1.5 text-gray-500 transition-transform duration-200 ${aprovacoesDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>

                    {aprovacoesDropdownOpen && (
                      <div
                        id="aprovacoes-menu"
                        className="origin-top-left absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="aprovacoes-menu-button"
                      >
                        {isMainApprover && (
                          <>
                            <a
                              href="#"
                              onClick={(e) => handleSubMenuItemClick('aprovacoes', e)}
                              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                              role="menuitem"
                            >
                              <UserCheckIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                              Aprovar Titulações
                            </a>
                            <a
                              href="#"
                              onClick={(e) => handleSubMenuItemClick('aprovar-documentacao', e)}
                              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                              role="menuitem"
                            >
                              <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                              Aprovar Documentação
                            </a>
                          </>
                        )}
                        {isGerenteEscola && (
                          <a // Changed from div/button to a direct link
                            href="#"
                            onClick={(e) => handleSubMenuItemClick('aprovacoes-eventos-avulsos', e)}
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                            role="menuitem"
                          >
                            <CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                            Eventos Avulsos
                          </a>
                        )}
                         {!isMainApprover && !isGerenteEscola && canViewAprovacoesMenu && (
                            <div className="px-4 py-3 text-sm text-gray-500">
                                Nenhuma ação de aprovação disponível para seu perfil.
                            </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Admissão Dropdown - Visible for admin or 'planejamento.academico' */}
                {canViewAdmissao && ( // canViewAdmissao is equivalent to isMainApprover
                  <div
                    ref={admissaoContainerRef}
                    className="relative"
                    onMouseEnter={handleAdmissaoMouseEnter}
                    onMouseLeave={handleAdmissaoMouseLeave}
                  >
                    <button
                      ref={admissaoTriggerRef}
                      onClick={toggleAdmissaoDropdown}
                      id="admissao-menu-button"
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-jornada-primary transition-colors"
                      aria-haspopup="true"
                      aria-expanded={admissaoDropdownOpen}
                      aria-controls="admissao-menu"
                    >
                      <GridIcon className="h-5 w-5 mr-1.5 text-gray-600" />
                      Admissão
                      <ChevronDownIcon className={`h-4 w-4 ml-1.5 text-gray-500 transition-transform duration-200 ${admissaoDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>

                    {admissaoDropdownOpen && (
                      <div
                        id="admissao-menu"
                        className="origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="admissao-menu-button"
                      >
                        <div className="px-4 py-3 text-sm text-gray-500">
                          Nenhuma ação disponível.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </nav>
            )}
            
            {/* Notification bell - shown for users who can see main approver notifications */}
            {isMainApprover && (
              <div className="relative">
                <button
                  ref={notificationButtonRef}
                  onClick={toggleNotificationPanel}
                  className="p-1.5 rounded-full text-gray-500 hover:text-jornada-primary-dark hover:bg-jornada-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
                  aria-label="Notificações"
                  aria-haspopup="true"
                  aria-expanded={notificationPanelOpen}
                  aria-controls="notification-panel"
                >
                  <BellIcon className="h-6 w-6" />
                  {hasAnyPendingApprovals && (
                    <span className="absolute top-0.5 right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
                  )}
                </button>
                {notificationPanelOpen && (
                  <div
                    id="notification-panel"
                    ref={notificationPanelRef}
                    className="origin-top-right absolute right-0 mt-2 w-80 sm:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="notification-button"
                  >
                    <div className="px-4 py-3 text-sm font-semibold text-gray-800 border-b border-gray-200">
                      Notificações
                    </div>
                    <div className="py-1 max-h-60 overflow-y-auto" role="none">
                      {isMainApprover && pendingTitulationApprovalsCount > 0 && (
                        <a
                          href="#"
                          onClick={handleViewTitulationApprovals}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark transition-colors duration-150 ease-in-out"
                          role="menuitem"
                          tabIndex={-1}
                          id="notification-item-titulation-approvals"
                        >
                          Você tem {pendingTitulationApprovalsCount} atualizaç{pendingTitulationApprovalsCount === 1 ? 'ão' : 'ões'} de titulação pendente{pendingTitulationApprovalsCount === 1 ? '' : 's'} para aprovação.
                        </a>
                      )}
                       {isMainApprover && pendingDocumentApprovalsCount > 0 && (
                        <a
                          href="#"
                          onClick={handleViewDocumentApprovals}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-jornada-primary/10 hover:text-jornada-primary-dark transition-colors duration-150 ease-in-out"
                          role="menuitem"
                          tabIndex={-1}
                          id="notification-item-document-approvals"
                        >
                          Você tem {pendingDocumentApprovalsCount} solicitaç{pendingDocumentApprovalsCount === 1 ? 'ão' : 'ões'} de documentação pendente{pendingDocumentApprovalsCount === 1 ? '' : 's'} para aprovação.
                        </a>
                      )}
                      {!hasAnyPendingApprovals && ( 
                        <div className="px-4 py-3 text-sm text-gray-500">
                          Nenhuma notificação nova.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="relative" ref={userDropdownRef}>
              <button
                ref={userDropdownTriggerRef}
                onClick={toggleUserDropdown}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={userDropdownOpen}
                aria-controls="user-menu"
                id="user-menu-button" 
                aria-label="Menu do usuário"
              >
                <span className="sr-only sm:not-sr-only mr-2">{currentUser.name}</span>
                <UserCircleIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-700" />
                <ChevronDownIcon className={`h-4 w-4 ml-1 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {userDropdownOpen && (
                <div
                  id="user-menu"
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {isMainApprover && ( // Admin or Planejamento Academico can see their "Aprovações" link here
                     <a
                        href="#"
                        onClick={(e) => handleSubMenuItemClick('aprovacoes', e)}
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                        role="menuitem"
                      >
                        <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                        Aprovações (Titulação/Doc)
                      </a>
                  )}
                  {isGerenteEscola && (
                     <a
                        href="#"
                        onClick={(e) => handleSubMenuItemClick('aprovacoes-eventos-avulsos', e)}
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                        role="menuitem"
                      >
                        <CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                        Aprovar Eventos Avulsos
                      </a>
                  )}
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); openChangeProfileModal(); closeAllDropdowns(); }}
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                    role="menuitem"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                    Meu Perfil
                  </a>
                  {currentUser.isAdmin && (
                    <a
                      href="#"
                      onClick={(e) => handleSubMenuItemClick('configurar-usuarios', e)}
                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                      role="menuitem"
                    >
                      <UsersIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                      Configurar Usuários
                    </a>
                  )}
                  <a
                    href="#"
                    onClick={handleLogoutClick}
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-jornada-primary hover:text-white transition-colors duration-150 ease-in-out"
                    role="menuitem"
                  >
                    <LogoutIcon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-white" />
                    Sair
                  </a>
                </div>
              )}
            </div>
             <div className="md:hidden"> {/* Placeholder for mobile menu button if needed */} </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
