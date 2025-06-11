import React, { useState, useMemo, useCallback } from 'react';
import type { User } from '../App';
import { UsersIcon } from './icons/UsersIcon';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { KeyIcon } from './icons/KeyIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import EditUserProfileModal from './EditUserProfileModal'; // New Modal

export interface ManagedUser extends User {
  isActive: boolean;
}

// Extended mock users list for this page
const MOCK_MANAGED_USERS: ManagedUser[] = [
  { id: 'admin', username: 'admin', name: 'Otávio Barbosa', matricula: '90008724', currentTitulationId: 'mestre', isAdmin: true, currentProfile: 'Administrador Global', isActive: true },
  { id: 'user', username: 'user', name: 'Pedro Augusto Gomes Achete', matricula: '100001', currentTitulationId: 'mestre', isAdmin: false, currentProfile: 'Usuário', isActive: true },
  { id: 'gpca', username: 'planejamento.academico', name: 'Joao Anilson', matricula: '200001', currentTitulationId: 'doutor', isAdmin: false, currentProfile: 'Planejamento Acadêmico', isActive: true },
  { id: 'controle_academico', username: 'controle.academico', name: 'Mariana Brandl', matricula: '300001', currentTitulationId: 'graduado', isAdmin: false, currentProfile: 'Controle Acadêmico', isActive: false },
  { id: 'gerente_escola', username: 'gerente.escola', name: 'Thalita Porto Henequim', matricula: '400001', currentTitulationId: 'doutor', isAdmin: false, currentProfile: 'Gerente Negócios', isActive: true },
  { id: 'decano', username: 'decano', name: 'Patricia Piassetta', matricula: '500001', currentTitulationId: 'doutor', isAdmin: false, currentProfile: 'Decano', isActive: true },
  { id: 'coordenador_curso', username: 'coordenador.curso', name: 'João Victor', matricula: '600001', currentTitulationId: 'mestre', isAdmin: false, currentProfile: 'Coordenador', isActive: true }, // Updated profile name
  { id: 'analista_graduacao', username: 'analista.graduacao', name: 'Flavia Lima Morares', matricula: '700001', currentTitulationId: 'especialista', isAdmin: false, currentProfile: 'Analista Negócio', isActive: false },
  { id: 'analista_latosensu', username: 'analista.latosensu', name: 'Andrea Trovo', matricula: '800001', currentTitulationId: 'especialista', isAdmin: false, currentProfile: 'Analista Lato Sensu', isActive: true }, // Updated name
  { id: 'docente', username: 'docente', name: 'Bryan Luiz Pontarola', matricula: '900001', currentTitulationId: 'mestre', isAdmin: false, currentProfile: 'Docente', isActive: true }, // Name was already updated, kept for consistency
  { id: 'user1', name: 'Ana Silva', username: 'ana.silva', matricula: '654321', currentTitulationId: 'pos_doutor', currentProfile: 'Escola/Politécnica', isAdmin: false, isActive: true },
  { id: 'user2', name: 'Bruno Costa', username: 'bruno.costa', matricula: '789012', currentTitulationId: 'doutor', currentProfile: 'Escola/Direito', isAdmin: false, isActive: true },
  { id: 'user3', name: 'Carla Dias', username: 'carla.dias', matricula: '101112', currentTitulationId: 'graduado', currentProfile: 'Visitante', isAdmin: false, isActive: false },
];


interface ConfigurarUsuariosPageProps {
  currentUser: User; // Logged-in admin
}

type SortableKeys = 'name' | 'matricula' | 'currentProfile';

const ConfigurarUsuariosPage: React.FC<ConfigurarUsuariosPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_MANAGED_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys | null; direction: 'ascending' | 'descending' }>({ key: 'name', direction: 'ascending' });

  const filteredUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    if (!searchTerm) {
      return sortableUsers;
    }
    return sortableUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableKeys) => {
    if (sortConfig.key !== key) {
      return <ArrowUpIcon className="h-3 w-3 text-gray-400 opacity-50 inline-block ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <ArrowUpIcon className="h-3 w-3 text-jornada-primary inline-block ml-1" /> : 
      <ArrowDownIcon className="h-3 w-3 text-jornada-primary inline-block ml-1" />;
  };

  const handleEditUser = (user: ManagedUser) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUserChanges = (updatedUser: ManagedUser) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditModalOpen(false);
    setEditingUser(null);
    // Here you would typically make an API call to save changes
    console.log('User updated (simulated):', updatedUser);
  };

  const toggleAdminStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
    // API call
    console.log(`Admin status toggled for user ${userId} (simulated)`);
  };

  const toggleActiveStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
    // API call
    console.log(`Active status toggled for user ${userId} (simulated)`);
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <UsersIcon className="h-8 w-8 text-jornada-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          Configurar Usuários
        </h1>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome ou matrícula..."
          className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-jornada-primary focus:border-jornada-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Filtrar usuários"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 sm:px-6" onClick={() => requestSort('name')}>
                Nome {getSortIcon('name')}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 sm:px-6" onClick={() => requestSort('matricula')}>
                Matrícula {getSortIcon('matricula')}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 sm:px-6" onClick={() => requestSort('currentProfile')}>
                Perfil Atual {getSortIcon('currentProfile')}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Status Admin
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Status Conta
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`${!user.isActive ? 'bg-gray-50 opacity-70' : ''} hover:bg-gray-50 transition-colors`}>
                <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                  <div className={`text-sm font-medium ${user.isActive ? 'text-gray-900' : 'text-gray-500'}`}>{user.name}</div>
                  <div className={`text-xs ${user.isActive ? 'text-gray-500' : 'text-gray-400'}`}>{user.username}</div>
                </td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm ${user.isActive ? 'text-gray-600' : 'text-gray-400'} sm:px-6`}>
                  {user.matricula}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm ${user.isActive ? 'text-gray-600' : 'text-gray-400'} sm:px-6`}>
                  {user.currentProfile}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm ${user.isActive ? 'text-gray-600' : 'text-gray-400'} sm:px-6`}>
                  {user.isAdmin ? 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Admin</span> : 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Usuário</span>
                  }
                </td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm ${user.isActive ? 'text-gray-600' : 'text-gray-400'} sm:px-6`}>
                  {user.isActive ? 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Ativa</span> : 
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inativa</span>
                  }
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium sm:px-6">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-jornada-primary hover:text-jornada-primary-dark p-1 rounded-full hover:bg-jornada-primary/10 transition-colors"
                      title="Editar Perfil"
                      aria-label={`Editar perfil de ${user.name}`}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleAdminStatus(user.id)}
                      className={`${user.isAdmin ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'} p-1 rounded-full ${user.isAdmin ? 'hover:bg-red-100' : 'hover:bg-green-100'} transition-colors`}
                      title={user.isAdmin ? 'Remover Admin' : 'Tornar Admin'}
                      aria-label={user.isAdmin ? `Remover privilégios de admin de ${user.name}` : `Tornar ${user.name} admin`}
                    >
                      <KeyIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleActiveStatus(user.id)}
                       className={`${user.isActive ? 'text-yellow-600 hover:text-yellow-800' : 'text-teal-600 hover:text-teal-800'} p-1 rounded-full ${user.isActive ? 'hover:bg-yellow-100' : 'hover:bg-teal-100'} transition-colors`}
                      title={user.isActive ? 'Desativar Conta' : 'Ativar Conta'}
                      aria-label={user.isActive ? `Desativar conta de ${user.name}` : `Ativar conta de ${user.name}`}
                    >
                      {user.isActive ? <XCircleIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                  Nenhum usuário encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingUser && isEditModalOpen && (
        <EditUserProfileModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          userToEdit={editingUser}
          onSave={handleSaveUserChanges}
        />
      )}
    </div>
  );
};

export default ConfigurarUsuariosPage;