import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { UsuariosPage } from './pages/UsuariosPage/UsuariosPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/usuarios':
        return 'Usuários';
      default:
        return 'Home';
    }
  };

  return (
    <Layout pageTitle={getPageTitle()}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
