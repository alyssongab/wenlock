import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  iconActive?: string;
  path?: string;
  submenu?: { id: string; label: string; icon: string; path: string }[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ collapsed, onToggleCollapse }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('home');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['controle-acesso']);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', icon: '/home-white.svg', iconActive: '/home-menu.svg', path: '/' },
    {
      id: 'controle-acesso',
      label: 'Controle de Acesso',
      icon: '/controle-acesso.svg',
      submenu: [{ id: 'usuarios', label: 'Usuários', icon: '/usuarios-menu.svg', path: '/usuarios' }],
    },
  ];

  // Update active menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if path matches a menu item
    const matchedMenuItem = menuItems.find(item => item.path === currentPath);
    if (matchedMenuItem) {
      setActiveMenu(matchedMenuItem.id);
      return;
    }

    // Check if path matches a submenu item
    for (const item of menuItems) {
      if (item.submenu) {
        const matchedSubitem = item.submenu.find(sub => sub.path === currentPath);
        if (matchedSubitem) {
          setActiveMenu(matchedSubitem.id);
          if (!expandedMenus.includes(item.id)) {
            setExpandedMenus(prev => [...prev, item.id]);
          }
          return;
        }
      }
    }
  }, [location.pathname]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
      setActiveMenu(item.id);
    }
    
    if (item.submenu) {
      toggleSubmenu(item.id);
    }
  };

  const handleSubmenuClick = (subitem: { id: string; path: string }) => {
    navigate(subitem.path);
    setActiveMenu(subitem.id);
  };

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">
            <img 
              id='wenlock-title' 
              src={collapsed ? "/title-collapsed.svg" : "/title.svg"} 
              alt="Wenlock" 
              className={collapsed ? 'title-collapsed' : ''}
            />
        </h1>
        <button className="collapse-button" onClick={onToggleCollapse}>
          <img src="/hide-sidebar.svg" alt="Toggle sidebar" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item-wrapper">
            <div
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon && (
                <img 
                  src={activeMenu === item.id && item.iconActive ? item.iconActive : item.icon} 
                  alt={item.label} 
                  className="menu-icon" 
                />
              )}
              <span className="menu-label">{item.label}</span>
              {item.submenu && (
                <span className={`menu-arrow ${expandedMenus.includes(item.id) ? 'expanded' : ''}`}>
                  ▼
                </span>
              )}
            </div>
            {item.submenu && expandedMenus.includes(item.id) && (
              <div className="submenu">
                {item.submenu.map((subitem) => (
                  <div
                    key={subitem.id}
                    className={`submenu-item ${activeMenu === subitem.id ? 'active' : ''}`}
                    onClick={() => handleSubmenuClick(subitem)}
                  >
                    {subitem.icon && (
                      <img src={subitem.icon} alt={subitem.label} className="menu-icon" />
                    )}
                    <span className="submenu-label">{subitem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div id='company-footer' className="footer-item">&copy; WenLock</div>
        <div className="footer-item">Powered by Conecthus</div>
        <div className="footer-item">V 0.0.0</div>
      </div>
    </aside>
  );
};
