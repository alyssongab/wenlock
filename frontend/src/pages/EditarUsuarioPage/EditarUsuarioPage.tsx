import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userService } from '../../services/user-service';
import 'react-toastify/dist/ReactToastify.css';
import './EditarUsuarioPage.css';

export const EditarUsuarioPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        navigate('/usuarios');
        return;
      }

      try {
        setIsLoading(true);
        const user = await userService.getById(Number(id));
        setFormData({
          nome: user.nome,
          matricula: String(user.matricula || ''),
          email: user.email,
          senha: user.senha,
          confirmarSenha: user.senha,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Erro ao carregar dados do usuário', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate('/usuarios');
        }, 3500);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    if (!formData.nome || !formData.matricula || !formData.email) {
      return false;
    }

    if (formData.nome.length > 30 || !/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(formData.nome)) {
      return false;
    }

    const matriculaNum = Number(formData.matricula);
    if (isNaN(matriculaNum) || matriculaNum < 1000 || matriculaNum > 9999999999 || !/^\d+$/.test(formData.matricula)) {
      return false;
    }

    if (formData.email.length > 40 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }

    // Validate password (now required)
    if (!formData.senha || formData.senha.length < 6 || !/^[a-zA-Z0-9]+$/.test(formData.senha)) {
      return false;
    }
    if (formData.senha !== formData.confirmarSenha) {
      return false;
    }

    return true;
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    toast.warning('Edição cancelada', {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      navigate('/usuarios');
    }, 2000);
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        nome: formData.nome,
        matricula: Number(formData.matricula),
        email: formData.email,
        senha: formData.senha,
      };

      await userService.update(Number(id), updateData);

      toast.success('Usuário atualizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: () => <img src="/check.svg" alt="Success" style={{ width: '24px', height: '24px' }} />,
      });

      setTimeout(() => {
        navigate('/usuarios');
      }, 3500);
    } catch (error: any) {
      console.error('Error updating user:', error);
      
      if (error.name === 'ZodError') {
        const firstError = error.issues[0];
        toast.error(firstError.message, {
          position: 'top-right',
          autoClose: 3000,
        });
      } 
      else if (error.response?.data?.message) {
        const message = Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error.response.data.message;
        toast.error(message, {
          position: 'top-right',
          autoClose: 3000,
        });
      } 
      else {
        toast.error('Erro ao atualizar usuário. Tente novamente.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="editar-usuario-container">
        <div className="loading-state">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="editar-usuario-container">
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={() => navigate('/usuarios')}>
          Usuários
        </button>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">Editar Usuário</span>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="editar-form">
        <div className="form-section">
          <h2 className="section-title">Dados do Usuário</h2>
          
          <div className="form-row">
            <div className="form-field">
              <label className={`form-label ${formData.nome ? 'active' : ''}`}>Nome Completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Insira o nome completo*"
                className="form-input"
                value={formData.nome}
                onChange={handleInputChange}
                maxLength={30}
                required
              />
              <span className="field-hint">• Máx. 30 Caracteres</span>
            </div>

            <div className="form-field">
              <label className={`form-label ${formData.matricula ? 'active' : ''}`}>Insira o Nº da matrícula</label>
              <input
                type="text"
                name="matricula"
                placeholder="Insira o Nº da matrícula"
                className="form-input"
                value={formData.matricula}
                onChange={handleInputChange}
                required
              />
              <span className="field-hint">• Mín. 4 dígitos | Máx. 10 Caracteres</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full-width">
              <label className={`form-label ${formData.email ? 'active' : ''}`}>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="Insira o E-mail*"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                maxLength={40}
                required
              />
              <span className="field-hint">• Máx. 40 Caracteres</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Dados de acesso</h2>
          <p className="section-description">Deixe os campos em branco para manter a senha atual</p>
          
          <div className="form-row">
            <div className="form-field">
              <label className={`form-label ${formData.senha ? 'active' : ''}`}>Senha</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  placeholder="Nova senha (opcional)"
                  className="form-input"
                  value={formData.senha}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img 
                    src={showPassword ? '/eye-open.svg' : '/eye-closed.svg'} 
                    alt="Toggle password visibility"
                  />
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className={`form-label ${formData.confirmarSenha ? 'active' : ''}`}>Repetir Senha</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmarSenha"
                  placeholder="Repetir nova senha"
                  className="form-input"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img 
                    src={showConfirmPassword ? '/eye-open.svg' : '/eye-closed.svg'} 
                    alt="Toggle password visibility"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={handleCancelClick}>
            Cancelar
          </button>
          <button type="submit" className="btn-salvar" disabled={isSubmitting || !isFormValid()}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
      </div>

      {showCancelModal && (
        <div className="modal-overlay" onClick={handleCancelModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Deseja cancelar?</h2>
            <p className="modal-message">As alterações não serão salvas</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={handleCancelModalClose}>
                Não
              </button>
              <button className="modal-btn modal-btn-confirm" onClick={handleCancelConfirm}>
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
