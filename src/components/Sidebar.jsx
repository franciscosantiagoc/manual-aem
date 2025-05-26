import React, { useState, useEffect } from 'react';
import { allModules } from '../data/chaptersMetadata';
import { moduleQuizConfig } from '../data/moduleQuizConfig';
import { LevelBadge, TrackBadge } from './LessonUI';

const TRACK_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'front', label: 'Frontend' },
  { id: 'back', label: 'Backend' }
];

export const Sidebar = ({ activeChapterId, onSelectChapter, progress, isOpen, onClose, setSelectedModuleId }) => {
  const totalChapters = progress.total;
  const completedChapters = progress.completedList.length;
  const percent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  // Estado para controlar qué módulos están expandidos (acordeón)
  const [expandedModules, setExpandedModules] = useState({
    'module-1': true // Por defecto expandimos el Módulo 1
  });

  // Filtro de temas por track (front / back), recordado por visitante
  const [trackFilter, setTrackFilter] = useState(() => {
    try { return localStorage.getItem('aem-manual-track-filter') || 'all'; } catch { return 'all'; }
  });
  const changeTrackFilter = (id) => {
    setTrackFilter(id);
    try { localStorage.setItem('aem-manual-track-filter', id); } catch { /* sin almacenamiento */ }
  };

  // Efecto para auto-expandir el módulo que contiene el tema activo actual
  useEffect(() => {
    const containingModule = allModules.find(m => m.chapters.some(c => c.id === activeChapterId));
    if (containingModule) {
      setExpandedModules(prev => ({
        ...prev,
        [containingModule.id]: true
      }));
    }
  }, [activeChapterId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logotipo */}
      <div 
        className="sidebar-logo" 
        onClick={() => {
          onSelectChapter('home');
          if (setSelectedModuleId) setSelectedModuleId(null);
          if (onClose) onClose();
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="logo-icon">A</div>
        <div className="logo-text">Manual AEM</div>
        {isOpen && (
          <button 
            className="theme-toggle-btn" 
            onClick={(e) => {
              e.stopPropagation(); // Evitar navegar a home al cerrar sidebar móvil
              onClose();
            }}
            style={{ marginLeft: 'auto', border: 'none', fontSize: '1.2rem' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Acceso directo al Examen Final */}
      <div style={{ padding: '0 0.75rem', marginBottom: '0.75rem', flexShrink: 0 }}>
        <button
          className={`topic-item ${activeChapterId === 'final-exam' ? 'active' : ''}`}
          onClick={() => {
            onSelectChapter('final-exam');
            if (onClose) onClose();
          }}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.82rem'
          }}
        >
          🎓 Examen Final
        </button>
      </div>

      {/* Título de la sección del temario */}
      <div style={{ padding: '0 1rem 0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', flexShrink: 0 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Contenido del Curso (Acordeón)
        </span>
      </div>

      <div className="track-filter">
        {TRACK_FILTERS.map(t => (
          <button key={t.id} className={trackFilter === t.id ? 'active' : ''} onClick={() => changeTrackFilter(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Menú de Acordeón */}
      <nav className="sidebar-menu" style={{ overflowY: 'auto', flex: 1 }}>
        {allModules.map((module) => {
          const isExpanded = !!expandedModules[module.id];
          const visibleChapters = module.chapters.filter(c => trackFilter === 'all' || c.track === trackFilter);
          if (visibleChapters.length === 0) return null;
          return (
            <div key={module.id} className="module-group" style={{ marginBottom: '0.75rem' }}>
              
              {/* Encabezado clickable del Acordeón */}
              <h3 
                className={`module-title ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleModule(module.id)}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  userSelect: 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease',
                  background: isExpanded ? 'var(--bg-tertiary)' : 'transparent'
                }}
                onMouseOver={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
                onMouseOut={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {module.title.split(':')[0]}
                    <LevelBadge level={module.level} style={{ fontSize: '0.55rem' }} />
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.25 }}>
                    {module.title.split(': ')[1]}
                  </span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>
                    {visibleChapters.length} temas
                  </span>
                  <span 
                    style={{ 
                      fontSize: '0.65rem',
                      display: 'inline-block',
                      transition: 'transform 0.2s ease',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      color: isExpanded ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  >
                    ▶
                  </span>
                </div>
              </h3>
              
              {/* Lista de Capítulos Colapsables */}
              {isExpanded && (
                <div style={{ animation: 'slideIn 0.2s ease', paddingLeft: '4px', marginTop: '4px' }}>
                  {visibleChapters.map((chapter) => {
                    const isActive = activeChapterId === chapter.id;
                    const isCompleted = progress.completedList.includes(chapter.id);
                    
                    return (
                      <button
                        key={chapter.id}
                        className={`topic-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          onSelectChapter(chapter.id);
                          if (setSelectedModuleId) setSelectedModuleId(module.id);
                          if (onClose) onClose(); // Cierra sidebar en móvil
                        }}
                        style={{ padding: '0.45rem 0.75rem', margin: '2px 0' }}
                      >
                        <div className="topic-details">
                          <span className="topic-number">
                            Tema {chapter.number} {isCompleted && '✓'}
                            {chapter.status === 'pending' && <span className="pending-dot" title="Contenido en desarrollo">● en desarrollo</span>}
                          </span>
                          <span className="topic-title-text" style={{ fontSize: '0.82rem' }}>
                            {chapter.title}
                          </span>
                        </div>
                        <span style={{ marginLeft: '6px', alignSelf: 'center', flexShrink: 0, display: 'flex', gap: '3px' }}>
                          <TrackBadge track={chapter.track} compact style={{ fontSize: '0.55rem', padding: '0 3px' }} />
                          <LevelBadge level={chapter.level} compact style={{ fontSize: '0.55rem', padding: '1px 4px' }} />
                        </span>
                      </button>
                    );
                  })}

                  {/* Acceso a la evaluación del módulo (solo si ya tiene preguntas) */}
                  {moduleQuizConfig[module.id]?.pool.length > 0 && <button
                    className={`topic-item ${activeChapterId === `quiz-${module.id}` ? 'active' : ''}`}
                    onClick={() => {
                      onSelectChapter(`quiz-${module.id}`);
                      if (setSelectedModuleId) setSelectedModuleId(module.id);
                      if (onClose) onClose();
                    }}
                    style={{ padding: '0.45rem 0.75rem', margin: '6px 0 2px 0', fontWeight: 700 }}
                  >
                    <div className="topic-details">
                      <span className="topic-title-text" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                        📝 Evaluación del Módulo
                      </span>
                    </div>
                  </button>}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Progreso del Manual */}
      <div className="sidebar-footer" style={{ flexShrink: 0 }}>
        <div className="progress-card">
          <div className="progress-title">
            <span>Progreso del Manual</span>
            <span>{completedChapters}/{totalChapters} ({percent}%)</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
