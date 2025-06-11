import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import ChangeProfileModal from './components/ChangeProfileModal';
import AtualizarTitulacaoPage from './components/AtualizarTitulacaoPage';
import AprovacoesPage, { MOCK_REQUESTS as mockTitulationRequests } from './components/AprovacoesPage';
import LoginPage from './components/LoginPage'; // Import the new LoginPage
import LicencasPage from './components/LicencasPage'; // Import LicencasPage
import DocumentacaoDocentePage from './components/DocumentacaoDocentePage'; // Import DocumentacaoDocentePage
import ConfigurarUsuariosPage from './components/ConfigurarUsuariosPage'; // Import ConfigurarUsuariosPage
import AprovarDocumentacaoPage, { MOCK_DOCUMENT_REQUESTS as mockDocumentRequests } from './components/AprovarDocumentacaoPage'; // Import the new page and its mock data
import AprovarEventoNovaSolicitacaoPage from './components/AprovarEventoNovaSolicitacaoPage';
import AprovarEventoDistratoPage from './components/AprovarEventoDistratoPage';
import AprovarEventoRegularizacaoPage from './components/AprovarEventoRegularizacaoPage';
import AprovacoesEventosAvulsosPage from './components/AprovacoesEventosAvulsosPage'; // Nova página


export type PageName = 
  | 'dashboard' 
  | 'atualizar-titulacao' 
  | 'aprovacoes' 
  | 'licencas'
  | 'declaracoes'
  | 'documentacao-docente'
  | 'termo-aditivo' // This might become an overview or be removed
  | 'promocao-progressao'
  | 'gratificacao'
  | 'ferias'
  | 'termo-aditivo-graduacao' // This specific page might be obsolete if it's just a parent
  | 'termo-aditivo-lato-sensu' // This specific page might be obsolete if it's just a parent
  | 'termo-aditivo-stricto-sensu'
  | 'termo-aditivo-graduacao-normal'
  | 'termo-aditivo-graduacao-eventual'
  | 'termo-aditivo-graduacao-substituicao'
  | 'termo-aditivo-lato-sensu-letiva'
  | 'termo-aditivo-lato-sensu-nao-letiva'
  | 'configurar-usuarios' // New page for user configuration
  | 'aprovar-documentacao' // New page for approving documentation
  | 'aprovar-evento-nova-solicitacao' // Old page, will become obsolete from header
  | 'aprovar-evento-distrato' // Old page, will become obsolete from header
  | 'aprovar-evento-regularizacao' // Old page, will become obsolete from header
  | 'aprovacoes-eventos-avulsos'; // Nova página consolidada
  // | 'termo-aditivo-graduacao-carga-horaria'; // Removed page

export interface User {
  id: string;
  username: string;
  name: string;
  matricula: string;
  currentTitulationId: string;
  isAdmin: boolean;
  currentProfile: string; 
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageName>('dashboard');
  const [pendingTitulationApprovalsCount, setPendingTitulationApprovalsCount] = useState(0);
  const [pendingDocumentApprovalsCount, setPendingDocumentApprovalsCount] = useState(0);


  useEffect(() => {
    const titulationCount = mockTitulationRequests.filter(req => req.status === 'pending').length;
    setPendingTitulationApprovalsCount(titulationCount);

    const documentCount = mockDocumentRequests.filter(req => req.status === 'pending').length;
    setPendingDocumentApprovalsCount(documentCount);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setLoggedInUser(user);
    setCurrentPage('dashboard'); // Navigate to dashboard after login
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    // Potentially reset other states if needed
  };

  const openChangeProfileModal = () => setIsChangeProfileModalOpen(true);
  const closeChangeProfileModal = () => setIsChangeProfileModalOpen(false);

  const navigateTo = (page: PageName) => {
    if (!loggedInUser) return;

    const isMainApprover = loggedInUser.isAdmin || loggedInUser.username === 'planejamento.academico';
    const isGerenteEscola = loggedInUser.username === 'gerente.escola';

    if (page === 'aprovacoes' && !isMainApprover) {
      console.warn("Access to 'aprovacoes' (titulation) denied for this user.");
      return;
    }
    if (page === 'aprovar-documentacao' && !isMainApprover) {
      console.warn("Access to 'aprovar-documentacao' denied for this user.");
      return;
    }
     if (
      (page === 'aprovar-evento-nova-solicitacao' || // These remain for direct access if ever needed, but not from header
       page === 'aprovar-evento-distrato' ||
       page === 'aprovar-evento-regularizacao' ||
       page === 'aprovacoes-eventos-avulsos') && // New consolidated page
      !isGerenteEscola
    ) {
      console.warn(`Access to '${page}' denied for this user. Requires 'gerente.escola'.`);
      return;
    }
    if (page === 'licencas' && !['admin', 'user', 'docente'].includes(loggedInUser.username)) {
      console.warn("Access to 'licencas' denied for this user.");
      return; 
    }
    if (page === 'configurar-usuarios' && !loggedInUser.isAdmin) {
      console.warn("Access to 'configurar-usuarios' denied for this user.");
      return;
    }
    setCurrentPage(page);
  };
  
  const handleTitulationRequestsUpdate = (count: number) => {
    setPendingTitulationApprovalsCount(count);
  };

  const handleDocumentRequestsUpdate = (count: number) => {
    setPendingDocumentApprovalsCount(count);
  };


  const renderPage = () => {
    if (!loggedInUser) return null; 

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'atualizar-titulacao':
        return <AtualizarTitulacaoPage currentUser={loggedInUser} />;
      case 'aprovacoes':
        if (loggedInUser.isAdmin || loggedInUser.username === 'planejamento.academico') {
          return <AprovacoesPage onTitulationRequestsUpdate={handleTitulationRequestsUpdate} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'aprovar-documentacao':
        if (loggedInUser.isAdmin || loggedInUser.username === 'planejamento.academico') {
          return <AprovarDocumentacaoPage currentUser={loggedInUser} onDocumentRequestsUpdate={handleDocumentRequestsUpdate} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      
      // Old individual event approval pages - might be removed or kept for other access points later
      case 'aprovar-evento-nova-solicitacao':
        if (loggedInUser.username === 'gerente.escola') {
          return <AprovarEventoNovaSolicitacaoPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'aprovar-evento-distrato':
        if (loggedInUser.username === 'gerente.escola') {
          return <AprovarEventoDistratoPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'aprovar-evento-regularizacao':
        if (loggedInUser.username === 'gerente.escola') {
          return <AprovarEventoRegularizacaoPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      
      // New consolidated event approval page
      case 'aprovacoes-eventos-avulsos':
        if (loggedInUser.username === 'gerente.escola') {
          return <AprovacoesEventosAvulsosPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;

      case 'licencas':
        if (['admin', 'user', 'docente'].includes(loggedInUser.username)) {
          return <LicencasPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'documentacao-docente':
        return <DocumentacaoDocentePage currentUser={loggedInUser} />;
      case 'configurar-usuarios':
        if (loggedInUser.isAdmin) {
          return <ConfigurarUsuariosPage currentUser={loggedInUser} />;
        }
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      case 'declaracoes':
      case 'termo-aditivo': 
      case 'promocao-progressao':
      case 'gratificacao':
      case 'ferias':
      case 'termo-aditivo-graduacao': 
      case 'termo-aditivo-lato-sensu': 
      case 'termo-aditivo-stricto-sensu':
      case 'termo-aditivo-graduacao-normal':
      case 'termo-aditivo-graduacao-eventual':
      case 'termo-aditivo-graduacao-substituicao':
      case 'termo-aditivo-lato-sensu-letiva':
      case 'termo-aditivo-lato-sensu-nao-letiva':
        // For now, all these specific pages will just show the dashboard if not implemented
        // This is where you would add their specific components if they exist
        console.log(`Navigating to ${currentPage}, but showing Dashboard as placeholder.`);
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
      default:
        return <DashboardPage openChangeProfileModal={openChangeProfileModal} currentUser={loggedInUser} />;
    }
  };

  if (!loggedInUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {loggedInUser && ( // Header is shown for all logged-in users
        <Header
          currentUser={loggedInUser}
          onLogout={handleLogout}
          openChangeProfileModal={openChangeProfileModal}
          navigateTo={navigateTo}
          pendingTitulationApprovalsCount={pendingTitulationApprovalsCount}
          pendingDocumentApprovalsCount={pendingDocumentApprovalsCount}
        />
      )}
      <main className="flex-grow pt-16"> {/* Assuming header height is h-16 (64px) */}
        {renderPage()}
      </main>
      {loggedInUser && ( // Modal trigger "Meu Perfil" is always available for loggedInUser
          <ChangeProfileModal
            isOpen={isChangeProfileModalOpen}
            onClose={closeChangeProfileModal}
            loggedInUser={loggedInUser}
          />
      )}
    </div>
  );
};

export default App;