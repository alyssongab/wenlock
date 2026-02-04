import { useState } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const Layout = ({ children, pageTitle }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="layout">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
      <div className="layout-main">
        <Header />
        <div className="layout-content-wrapper">
          {pageTitle && <h1 className="page-title-outside">{pageTitle}</h1>}
          <main className="layout-content">{children}</main>
        </div>
      </div>
    </div>
  );
};
