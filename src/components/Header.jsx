import React from 'react';

export const Header = ({ onToggleSidebar, theme, onToggleTheme, searchTerm, onSearchChange }) => {
  return (
    <header className="header-bar">
      {/* Botón menú móvil */}
      <button 
        className="theme-toggle-btn" 
        onClick={onToggleSidebar}
        style={{ display: 'none', marginRight: '1rem' }}
        id="mobile-nav-toggle"
      >
        ☰
        <style>{`
          @media (max-width: 1024px) {
            #mobile-nav-toggle { display: flex !important; }
          }
        `}</style>
      </button>

      {/* Caja de Búsqueda */}
      <div className="search-container">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Buscar temas, JCR, Sling..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Acciones */}
      <div className="header-actions">
        {/* Enlace rápido a GIT LOG */}
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'none' }}>
          Git Control: Activo
        </span>
        
        {/* Alternador de Tema */}
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
        >
          {theme === 'dark' ? (
            <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};
