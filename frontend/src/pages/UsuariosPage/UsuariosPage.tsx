import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, User } from '../../services/user-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UsuariosPage.css';

export const UsuariosPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({
        page,
        limit,
        name: searchQuery || undefined,
      });
      setUsers(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await userService.delete(userToDelete);
        setShowDeleteModal(false);
        setUserToDelete(null);
        fetchUsers();
        toast.success('Exclusão Realizada!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: () => <img src="/check.svg" alt="Success" style={{ width: '24px', height: '24px' }} />,
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Erro ao excluir usuário', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const totalPages = Math.ceil(total / limit);
  const hasUsers = users.length > 0;

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <div className="search-box">
          <img src='/search.svg' alt='search' className="search-icon"/>
          <input
            type="text"
            placeholder="Pesquisa"
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={handleClearSearch}>
              ×
            </button>
          )}
        </div>
        <button className="btn-cadastrar" onClick={() => navigate('/usuarios/cadastro')}>
          + Cadastrar Usuário
        </button>
      </div>

      <div className="usuarios-content">
        {loading ? (
          <div className="loading-state">Carregando...</div>
        ) : hasUsers ? (
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="Visualizar">
                        <img src="/eye-icon.svg" alt="View" />
                      </button>
                      <button className="action-btn edit" title="Editar">
                        <img src="/edit-icon.svg" alt="Edit" />
                      </button>
                      <button 
                        className="action-btn delete" 
                        title="Excluir"
                        onClick={() => handleDeleteClick(user.id!)}
                      >
                        <img src="/delete-icon.svg" alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : searchQuery ? (
          <div className="empty-state">
            <img src="/not-found-user.svg" alt="No results" className="empty-state-image" />
            <h3 className="empty-state-title">Nenhum Resultado Encontrado</h3>
            <p className="empty-state-subtitle">
              Não foi possível achar nenhum resultado para sua busca.<br />
              Tente refazer a pesquisa para encontrar o que busca.
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <h3 className="empty-state-title">Nenhum Usuário Registrado</h3>
            <p className="empty-state-subtitle">
              Clique em "Cadastrar Usuário" para começar a cadastrar.
            </p>
          </div>
        )}
      </div>

      <div className="usuarios-footer">
        <div className="pagination-info">
          <span>Total de itens: {total}</span>
        </div>
        <div className="pagination-controls">
          <span className="pagination-label">Itens por página</span>
          <select className="pagination-select" value={limit} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <div className="pagination-buttons">
            <button 
              className="pagination-btn" 
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              «
            </button>
            <button 
              className="pagination-btn" 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ‹
            </button>
            <button className="pagination-btn active">{page}</button>
            <button 
              className="pagination-btn" 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              ›
            </button>
            <button 
              className="pagination-btn" 
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              »
            </button>
          </div>
          <span className="pagination-total">de {totalPages}</span>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Deseja excluir?</h2>
            <p className="modal-message">O usuário será excluído.</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={handleDeleteCancel}>
                Não
              </button>
              <button className="modal-btn modal-btn-confirm" onClick={handleDeleteConfirm}>
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};
