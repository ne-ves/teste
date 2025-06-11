
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import type { ManagedUser } from './ConfigurarUsuariosPage'; // Use ManagedUser

// Profile types, consider centralizing this if used in more places
const profileTypes = [
  { value: '', label: 'Selecione um perfil...' },
  { value: 'escola_politecnica', label: 'Escola/Politécnica' },
  { value: 'escola_direito', label: 'Escola/Direito' },
  { value: 'escola_educacao_humanidade', label: 'Escola/Educação e Humanidade' },
  { value: 'escola_medicina', label: 'Escola/Medicina' },
  { value: 'escola_ciencias_vida', label: 'Escola/Ciências da Vida' },
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Visitante', label: 'Visitante' },
  { value: 'Planejamento Acadêmico', label: 'Planejamento Acadêmico' }, // Updated from Planejamento GPCA
  { value: 'Controle Acadêmico', label: 'Controle Acadêmico' },
  { value: 'Gerente Negócios', label: 'Gerente Negócios' },
  { value: 'Decano', label: 'Decano' },
  { value: 'Coordenador', label: 'Coordenador' }, // Updated from Coordenador de Curso
  { value: 'Analista Negócio', label: 'Analista Negócio' },
  { value: 'Analista Lato Sensu', label: 'Analista Lato Sensu' },
  { value: 'Docente', label: 'Docente' },
  { value: 'Usuário', label: 'Usuário' },
];


interface EditUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: ManagedUser;
  onSave: (updatedUser: ManagedUser) => void;
}

const EditUserProfileModal: React.FC<EditUserProfileModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
  onSave,
}) => {
  const [selectedProfileType, setSelectedProfileType] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && userToEdit) {
      setSelectedProfileType(userToEdit.currentProfile || '');
      setError('');
    }
  }, [isOpen, userToEdit]);

  if (!isOpen || !userToEdit) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProfileType) {
      setError('Por favor, selecione um tipo de perfil.');
      return;
    }
    setError('');
    onSave({ ...userToEdit, currentProfile: selectedProfileType });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-profile-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-lg transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="edit-user-profile-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Editar Perfil do Usuário
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Usuário
            </label>
            <input
              type="text"
              id="userName"
              value={userToEdit.name}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="userMatricula" className="block text-sm font-medium text-gray-700 mb-1">
              Matrícula
            </label>
            <input
              type="text"
              id="userMatricula"
              value={userToEdit.matricula}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="selectedProfileType" className="block text-sm font-medium text-gray-700 mb-1">
              Novo Perfil
            </label>
            <select
              name="selectedProfileType"
              id="selectedProfileType"
              value={selectedProfileType}
              onChange={(e) => {
                setSelectedProfileType(e.target.value)
                if(error) setError('');
              }}
              className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} bg-white text-jornada-primary rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm`}
              required
              aria-describedby={error ? "profile-type-error" : undefined}
            >
              {profileTypes.map(profile => (
                <option
                  key={profile.value}
                  value={profile.value}
                  disabled={profile.value === ''}
                  className={`${profile.value === '' ? 'text-gray-400' : 'text-gray-900'} bg-white`}
                >
                  {profile.label}
                </option>
              ))}
            </select>
            {error && (
              <p id="profile-type-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row-reverse sm:justify-start gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfileModal;