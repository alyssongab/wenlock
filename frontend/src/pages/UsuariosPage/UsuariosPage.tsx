import './UsuariosPage.css';

export const UsuariosPage = () => {
  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <div className="search-box">
          <img src='/search.svg' alt='search' className="search-icon"/>
          <input
            type="text"
            placeholder="Pesquisa"
            className="search-input"
          />
        </div>
        <button className="btn-cadastrar">
          + Cadastrar Usuário
        </button>
      </div>

      <div className="usuarios-content">
        <div className="empty-state">
          <h3 className="empty-state-title">Nenhum Usuário Registrado</h3>
          <p className="empty-state-subtitle">
            Clique em "Cadastrar Usuário" para começar a cadastrar.
          </p>
        </div>
      </div>

      <div className="usuarios-footer">
        <div className="pagination-info">
          <span>Total de itens: -</span>
        </div>
        <div className="pagination-controls">
          <span className="pagination-label">Itens por página</span>
          <select className="pagination-select">
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <div className="pagination-buttons">
            <button className="pagination-btn" disabled>«</button>
            <button className="pagination-btn" disabled>‹</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn" disabled>›</button>
            <button className="pagination-btn" disabled>»</button>
          </div>
          <span className="pagination-total">de 10</span>
        </div>
      </div>
    </div>
  );
};
