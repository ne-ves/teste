
import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import type { User } from '../App'; // Import the User type

interface ChangeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  loggedInUser: User; 
}

interface FormData {
  selectedProfileType: string;
  justification: string;
  targetUserName: string;
  targetUserMatricula: string;
}

const profileTypes = [
  { value: '', label: 'Selecione um perfil...' },
  { value: 'escola_politecnica', label: 'Escola/Politécnica' },
  { value: 'escola_direito', label: 'Escola/Direito' },
  { value: 'escola_educacao_humanidade', label: 'Escola/Educação e Humanidade' },
  { value: 'escola_medicina', label: 'Escola/Medicina' },
  { value: 'escola_ciencias_vida', label: 'Escola/Ciências da Vida' },
  { value: 'Administrador Global', label: 'Administrador Global' },
  { value: 'Visitante', label: 'Visitante' },
];

interface MockUser {
  id: string;
  name: string;
  matricula: string;
  currentProfile: string;
}

const mockUsers: MockUser[] = [
  { id: 'user1', name: 'Ana Silva', matricula: '654321', currentProfile: 'Escola/Politécnica' },
  { id: 'user2', name: 'Bruno Costa', matricula: '789012', currentProfile: 'Escola/Direito' },
  { id: 'user3', name: 'Carla Dias', matricula: '101112', currentProfile: 'Visitante' },
  { id: 'user4', name: 'Daniel Faria', matricula: '131415', currentProfile: 'Escola/Medicina' },
  { id: 'user5', name: 'Otávio Ramos', matricula: '987654', currentProfile: 'Escola/Educação e Humanidade' },
  { id: 'user6', name: 'Fernanda Lima', matricula: '246813', currentProfile: 'Escola/Ciências da Vida' },
  { id: 'user7', name: 'Gustavo Almeida', matricula: '135792', currentProfile: 'Visitante' },
];


const ChangeProfileModal: React.FC<ChangeProfileModalProps> = ({ isOpen, onClose, loggedInUser }) => {
  const initialFormData: FormData = {
    selectedProfileType: '',
    justification: '',
    targetUserName: '',
    targetUserMatricula: '',
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isChangingForOtherUser, setIsChangingForOtherUser] = useState(false);
  const [isRequestingProfileChangeForSelf, setIsRequestingProfileChangeForSelf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MockUser[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setIsChangingForOtherUser(false);
      setIsRequestingProfileChangeForSelf(false); // Reset this new state
      setSubmissionStatus('idle');
      setSubmissionMessage('');
      setSearchTerm('');
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isChangingForOtherUser) {
      setSearchTerm('');
      setSearchResults([]);
      setShowSearchResults(false);
      setFormData(prev => ({
        ...prev,
        targetUserName: '',
        targetUserMatricula: '',
      }));
    }
    // If admin switches between "for other" and "for self", reset the self-request state
    setIsRequestingProfileChangeForSelf(false); 
  }, [isChangingForOtherUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'targetUserName' && isChangingForOtherUser) {
      setSearchTerm(value);
      if (!value.trim()) {
        setFormData(prev => ({ ...prev, targetUserMatricula: '' }));
      }
      
      if (!value.trim()) {
        setShowSearchResults(false);
        setSearchResults([]);
      } else {
        const filtered = mockUsers.filter(user =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.matricula.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered);
        setShowSearchResults(filtered.length > 0 || !!value.trim()); 
      }
    }
  };
  
  const handleUserSelect = (user: MockUser) => {
    setFormData(prev => ({
      ...prev,
      targetUserName: user.name,
      targetUserMatricula: user.matricula,
    }));
    setSearchTerm(user.name); 
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleTargetUserToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChangingForOtherUser(checked);
    // Reset form data for target user and self-request state if toggling
    setFormData(prev => ({
        ...prev,
        targetUserName: '',
        targetUserMatricula: '',
        selectedProfileType: '', // Also reset profile type and justification
        justification: '',
    }));
    setSearchTerm(''); 
    setIsRequestingProfileChangeForSelf(false); // Reset self-request state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isChangingForOtherUser && !isRequestingProfileChangeForSelf) {
      // Should not happen as submit button won't be visible
      console.warn("Attempted to submit form in an invalid state.");
      return;
    }

    let errors: string[] = [];
    if (!formData.selectedProfileType) {
      errors.push('Por favor, selecione o tipo de perfil desejado.');
    }
    if (isChangingForOtherUser) {
      if (!formData.targetUserName.trim()) {
        errors.push('Por favor, informe o nome do usuário alvo.');
      }
      if (!formData.targetUserMatricula.trim()) {
        errors.push('Por favor, informe a matrícula do usuário alvo.');
      }
      const isValidUser = mockUsers.some(u => u.name === formData.targetUserName && u.matricula === formData.targetUserMatricula);
      if (!isValidUser && formData.targetUserName.trim() && formData.targetUserMatricula.trim()) {
          errors.push('Usuário alvo não encontrado ou inválido. Por favor, selecione um usuário da busca.')
      }
    }
    if (!formData.justification.trim()) {
        errors.push('Por favor, forneça uma justificativa.');
    }

    if (errors.length > 0) {
        setSubmissionStatus('error');
        setSubmissionMessage(errors.join(' '));
        return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setSubmissionMessage('');

    const submissionData = {
      userName: isChangingForOtherUser ? formData.targetUserName : loggedInUser.name,
      userMatricula: isChangingForOtherUser ? formData.targetUserMatricula : loggedInUser.matricula,
      requestedProfileType: formData.selectedProfileType,
      justification: formData.justification,
      requestedFor: isChangingForOtherUser ? 'other_user' : 'self',
      currentUserProfile: isChangingForOtherUser 
        ? mockUsers.find(u => u.matricula === formData.targetUserMatricula)?.currentProfile 
        : loggedInUser.currentProfile,
    };

    console.log('Submitting profile change request:', submissionData);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmissionStatus('success');
    setSubmissionMessage('Sua solicitação de alteração de perfil foi enviada para aprovação com sucesso!');
    setIsSubmitting(false);
  };

  const selectedTargetUser = isChangingForOtherUser && formData.targetUserMatricula 
    ? mockUsers.find(u => u.matricula === formData.targetUserMatricula) 
    : null;

  if (!isOpen) return null;

  const showRequestFields = isChangingForOtherUser || (!isChangingForOtherUser && isRequestingProfileChangeForSelf);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-profile-modal-title"
      className="fixed inset-0 z-70 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 id="change-profile-modal-title" className="text-xl sm:text-2xl font-semibold text-gray-800">
            Solicitar Alteração de Perfil
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {submissionStatus === 'success' ? (
          <div className="text-center">
            <p className="text-green-600 bg-green-50 p-4 rounded-md">{submissionMessage}</p>
            <button
              onClick={onClose}
              className="mt-6 w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {loggedInUser.isAdmin && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="changeForOtherUser"
                  name="changeForOtherUser"
                  checked={isChangingForOtherUser}
                  onChange={handleTargetUserToggle}
                  className="h-4 w-4 bg-white text-jornada-primary border-gray-300 rounded focus:ring-jornada-primary mr-2"
                  aria-describedby="changeForOtherUserDescription"
                />
                <label htmlFor="changeForOtherUser" className="text-sm font-medium text-gray-700">
                  Solicitar alteração para outro usuário
                </label>
                <p id="changeForOtherUserDescription" className="sr-only">
                  Marque esta caixa para inserir os dados de outro usuário para o qual deseja solicitar a alteração de perfil.
                </p>
              </div>
            )}

            {isChangingForOtherUser ? (
              <>
                <div>
                  <label htmlFor="targetUserName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Usuário Alvo
                  </label>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      name="targetUserName"
                      id="targetUserName"
                      value={formData.targetUserName}
                      onChange={handleChange}
                      onFocus={() => {
                        if (searchTerm.trim() && searchResults.length > 0) {
                           setShowSearchResults(true);
                        } else if (searchTerm.trim()) { 
                           const filtered = mockUsers.filter(user =>
                              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.matricula.toLowerCase().includes(searchTerm.toLowerCase())
                           );
                           setSearchResults(filtered);
                           setShowSearchResults(true);
                        } else if (!searchTerm.trim() && formData.targetUserName.trim()) { 
                            const filtered = mockUsers.filter(user =>
                              user.name.toLowerCase().includes(formData.targetUserName.toLowerCase()) ||
                              user.matricula.toLowerCase().includes(formData.targetUserName.toLowerCase())
                           );
                           setSearchResults(filtered);
                           setShowSearchResults(true);
                        }
                      }}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900"
                      placeholder="Digite nome ou matrícula para buscar..."
                      required={isChangingForOtherUser}
                      autoComplete="off"
                      aria-expanded={showSearchResults}
                      aria-controls="user-search-results"
                    />
                    {showSearchResults && (
                      <ul
                        ref={searchResultsRef}
                        id="user-search-results"
                        className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg"
                        role="listbox"
                      >
                        {searchResults.length > 0 ? (
                          searchResults.map((user) => (
                            <li
                              key={user.id}
                              onClick={() => handleUserSelect(user)}
                              className="px-3 py-2 hover:bg-jornada-primary hover:text-white cursor-pointer text-sm text-gray-700 group-hover:text-white"
                              role="option"
                              aria-selected={formData.targetUserMatricula === user.matricula}
                            >
                              {user.name} <span className="text-xs text-gray-500 group-[.hover]:text-jornada-primary/70">({user.matricula})</span>
                            </li>
                          ))
                        ) : (
                          searchTerm.trim() && (
                            <li className="px-3 py-2 text-sm text-gray-500">
                              Nenhum usuário encontrado.
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="targetUserMatricula" className="block text-sm font-medium text-gray-700 mb-1">
                    Matrícula do Usuário Alvo
                  </label>
                  <input
                    type="text"
                    name="targetUserMatricula"
                    id="targetUserMatricula"
                    value={formData.targetUserMatricula}
                    onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-700"
                    placeholder="Matrícula (preenchida pela busca)"
                    required={isChangingForOtherUser}
                    readOnly 
                  />
                </div>
                {selectedTargetUser && (
                  <div className="mt-2"> {/* Reduced top margin */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Perfil Atual do Usuário Alvo
                    </label>
                    <p className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700">
                      {selectedTargetUser.currentProfile}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seu Nome de Usuário
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700">
                    {loggedInUser.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sua Matrícula
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700">
                    {loggedInUser.matricula}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seu Perfil Atual
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-700">
                    {loggedInUser.currentProfile}
                  </p>
                </div>
              </>
            )}

            {showRequestFields && (
              <>
                <div>
                  <label htmlFor="selectedProfileType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Perfil Desejado
                  </label>
                  <select
                    name="selectedProfileType"
                    id="selectedProfileType"
                    value={formData.selectedProfileType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-jornada-primary rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm"
                    required
                    aria-label="Selecione o novo tipo de perfil para o usuário"
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
                </div>

                <div>
                  <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
                    Justificativa da Alteração
                  </label>
                  <textarea
                    name="justification"
                    id="justification"
                    rows={4}
                    value={formData.justification}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-jornada-primary focus:border-jornada-primary sm:text-sm text-gray-900"
                    placeholder="Descreva o motivo da solicitação de alteração."
                    required
                    aria-label="Justificativa para a solicitação de alteração de perfil"
                  />
                </div>
              </>
            )}
            
            {submissionStatus === 'error' && showRequestFields && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{submissionMessage || "Ocorreu um erro ao enviar sua solicitação. Tente novamente."}</p>
            )}

            <div className="flex flex-col sm:flex-row-reverse sm:justify-start gap-3 pt-2">
              {showRequestFields && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar para Aprovação'}
                </button>
              )}
              
              {!isChangingForOtherUser && !isRequestingProfileChangeForSelf && (
                 <button
                    type="button"
                    onClick={() => setIsRequestingProfileChangeForSelf(true)}
                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-jornada-primary text-base font-medium text-white hover:bg-jornada-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary transition-colors"
                  >
                    Solicitar Mudança de Perfil
                  </button>
              )}

              {/* Cancelar button removed
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting && showRequestFields} 
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jornada-primary disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
              */}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangeProfileModal;