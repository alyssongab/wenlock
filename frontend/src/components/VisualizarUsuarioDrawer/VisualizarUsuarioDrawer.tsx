import { useEffect, useState } from 'react';
import { userService, User } from '../../services/user-service';
import './VisualizarUsuarioDrawer.css';

interface VisualizarUsuarioDrawerProps {
  userId: number;
  onClose: () => void;
}

export const VisualizarUsuarioDrawer = ({ userId, onClose }: VisualizarUsuarioDrawerProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await userService.getById(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formatMatricula = (matricula?: number) => {
    if (!matricula) return '-';
    return matricula.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-container">
        <div className="drawer-header">
          <h2 className="drawer-title">Visualizar Usuário</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="drawer-content">
          {isLoading ? (
            <div className="drawer-loading">Carregando...</div>
          ) : user ? (
            <>
              <div className="drawer-section">
                <h3 className="drawer-section-title">Dados do Usuário</h3>
                
                <div className="drawer-field-row">
                  <div className="drawer-field">
                    <span className="drawer-field-label">Nome</span>
                    <span className="drawer-field-value">{user.nome}</span>
                  </div>
                  
                  <div className="drawer-field">
                    <span className="drawer-field-label">Matrícula</span>
                    <span className="drawer-field-value">{formatMatricula(user.matricula)}</span>
                  </div>
                </div>

                <div className="drawer-field-row">
                  <div className="drawer-field full-width">
                    <span className="drawer-field-label">E-mail</span>
                    <span className="drawer-field-value">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <h3 className="drawer-section-title">Detalhes</h3>
                
                <div className="drawer-field-row">
                  <div className="drawer-field">
                    <span className="drawer-field-label">Data de criação</span>
                    <span className="drawer-field-value">{formatDate(user.createdAt)}</span>
                  </div>
                  
                  <div className="drawer-field">
                    <span className="drawer-field-label">Última edição</span>
                    <span className="drawer-field-value">
                      {user.updatedAt ? formatDate(user.updatedAt) : 'Nunca editado'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="drawer-error">Erro ao carregar dados do usuário</div>
          )}
        </div>

        <div className="drawer-footer">
          <button className="btn-fechar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
};
