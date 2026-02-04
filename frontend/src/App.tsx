import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { UsuariosPage } from './pages/UsuariosPage/UsuariosPage';
import { CadastroUsuarioPage } from './pages/CadastroUsuarioPage/CadastroUsuarioPage';
import { EditarUsuarioPage } from './pages/EditarUsuarioPage/EditarUsuarioPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/usuarios':
        return 'Usuários';
      case '/usuarios/cadastro':
        return 'Cadastro de Usuário';
      default:
        if (location.pathname.startsWith('/usuarios/editar/')) {
          return 'Editar Usuário';
        }
        return 'Home';
    }
  };

  return (
    <Layout pageTitle={getPageTitle()}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/usuarios/cadastro" element={<CadastroUsuarioPage />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuarioPage />} />
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
