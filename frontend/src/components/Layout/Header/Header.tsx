import { useState, useRef, useEffect } from 'react';
import './Header.css';

interface User {
  name: string;
  email: string;
}

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user: User = {
    name: 'Millena Santana Borges',
    email: 'millena.santana@energy.org.br',
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {

    console.log('Logout clicked');
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-spacer"></div>
        <div className="user-menu" ref={dropdownRef}>
          <button
            className="user-menu-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="user-avatar">{getInitial(user.name)}</div>
            <img src='/user-dropdown.svg' className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}/>
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="user-avatar">{getInitial(user.name)}</div>
                <div className="dropdown-user-info">
                  <div className="dropdown-user-name">{user.name}</div>
                  <div className="dropdown-user-email">{user.email}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <img src="/logout.svg" alt="Logout" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
