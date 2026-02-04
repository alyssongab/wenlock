import './HomePage.css';

export const HomePage = () => {
  const userName = 'Millena';
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="greeting-box">
          <h2 className="greeting-title">Olá {userName}!</h2>
          <p className="greeting-date">{currentDate}</p>
        </div>

        <div className="welcome-container">
          <div className="welcome-illustration">
            <img
              src="/welcome-home.svg"
              alt="Welcome to WenLock"
              className="welcome-svg"
            />
          </div>
          <div className="welcome-message-box">
            Bem-vindo ao WenLock!
          </div>
        </div>
      </div>
    </div>
  );
};
