import React, { useState } from 'react';
import { manualStats, allModules } from '../data/chaptersMetadata';
import { moduleQuizConfig } from '../data/moduleQuizConfig';
import { LevelBadge, TrackBadge } from './LessonUI';

export const Home = ({ onSelectChapter, progress, selectedModuleId, setSelectedModuleId }) => {
  const [moduleSearchTerm, setModuleSearchTerm] = useState('');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const completedCount = progress.completedList.length;
  const totalCount = progress.total;

  const handleSelectModule = (moduleId) => {
    setSelectedModuleId(moduleId);
    setModuleSearchTerm('');
  };

  const getModuleProgress = (module) => {
    const total = module.chapters.length;
    const completed = module.chapters.filter(c => progress.completedList.includes(c.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  };

  // Filtrar capítulos del módulo seleccionado
  const activeModule = allModules.find(m => m.id === selectedModuleId);
  const filteredModuleChapters = activeModule
    ? activeModule.chapters.filter(chapter => {
        if (!moduleSearchTerm) return true;
        const term = moduleSearchTerm.toLowerCase();
        return (
          chapter.title.toLowerCase().includes(term) ||
          chapter.summary.toLowerCase().includes(term) ||
          chapter.number.toString() === term
        );
      })
    : [];

  // Filtrar todos los capítulos globalmente si hay búsqueda global en el dashboard
  const allChaptersFlattened = allModules.reduce((acc, m) => [...acc, ...m.chapters], []);
  const filteredGlobalChapters = allChaptersFlattened.filter(chapter => {
    if (!globalSearchTerm) return false;
    const term = globalSearchTerm.toLowerCase();
    return (
      chapter.title.toLowerCase().includes(term) ||
      chapter.summary.toLowerCase().includes(term) ||
      chapter.number.toString() === term
    );
  });

  return (
    <div className="welcome-container" style={{ animation: 'fadeIn 0.4s ease' }}>
      
      {/* Vista 1: Explorador del Módulo Seleccionado */}
      {selectedModuleId && activeModule ? (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
          {/* Botón Volver y Cabecera del Módulo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => setSelectedModuleId(null)}
              style={{
                background: 'var(--bg-content)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              ← Volver al Menú
            </button>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Explorador de Módulos</span>
          </div>

          <div className="info-box" style={{ 
            borderLeft: '4px solid var(--primary)', 
            padding: '1.75rem', 
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, var(--bg-content) 0%, rgba(0, 191, 255, 0.02) 100%)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: 700 }}>{activeModule.title}</h1>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Progreso del Módulo: **{getModuleProgress(activeModule).completed} de {getModuleProgress(activeModule).total}** temas completados ({getModuleProgress(activeModule).percent}%)
                </p>
              </div>
              
              {/* Barra de progreso visual */}
              <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  <span>Completado</span>
                  <span>{getModuleProgress(activeModule).percent}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${getModuleProgress(activeModule).percent}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>

            {/* SECCIÓN: Evaluación del Módulo activo */}
            {moduleQuizConfig[activeModule.id]?.pool.length > 0 && (() => {
              const quizConfig = moduleQuizConfig[activeModule.id];
              const quizResult = progress.moduleQuizzes?.[activeModule.id];
              const quizMinutes = Math.round(quizConfig.timeLimitSec / 60);
              return (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                      📝 Evaluación Final del {activeModule.title.split(':')[0]}
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {`Cuestionario de ${Math.min(quizConfig.questionCount, quizConfig.pool.length)} preguntas (${quizMinutes} minutos) para validar esta unidad con al menos el 80%. Máximo 2 intentos por día.`}
                    </p>
                  </div>
                  <div>
                    {quizResult?.passed ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          background: 'rgba(0, 230, 115, 0.1)',
                          color: 'var(--accent-green)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          🏆 Aprobado ({quizResult.score}%)
                        </span>
                        <button
                          onClick={() => onSelectChapter(`quiz-${activeModule.id}`)}
                          style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                        >
                          Repetir
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectChapter(`quiz-${activeModule.id}`)}
                        style={{
                          background: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Iniciar Evaluación
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Buscador dentro del Módulo */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input 
                type="text" 
                placeholder={`Buscar temas dentro del Módulo ${selectedModuleId.replace('module-', '')}...`}
                value={moduleSearchTerm}
                onChange={(e) => setModuleSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-content)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
              {moduleSearchTerm && (
                <button 
                  onClick={() => setModuleSearchTerm('')}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Listado de Capítulos del Módulo */}
          {filteredModuleChapters.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredModuleChapters.map(chapter => {
                const isCompleted = progress.completedList.includes(chapter.id);
                
                return (
                  <div 
                    key={chapter.id} 
                    className="info-box" 
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s ease', 
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                    onClick={() => onSelectChapter(chapter.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="topic-number">
                        Tema {chapter.number} {isCompleted && <span style={{ color: 'var(--accent-green)', marginLeft: '4px' }}>✓ Completado</span>}
                      </span>
                      <span style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                        {chapter.status === 'pending' && <span className="pending-dot">● en desarrollo</span>}
                        <TrackBadge track={chapter.track} />
                        <LevelBadge level={chapter.level} />
                      </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{chapter.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{chapter.summary}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem' }}>✕ No se encontraron temas con esos criterios.</p>
            </div>
          )}
        </div>
      ) : (
        /* Vista 2: Menú Principal de Módulos (Dashboard) */
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="welcome-hero">
            <h1 className="welcome-title">Manual de Desarrollador AEM</h1>
            <p className="welcome-subtitle">
              Guía completa de Adobe Experience Manager de nivel básico a arquitecto: entorno local con Docker, componentes y HTL, backend con OSGi y Sling, Dispatcher y caché, headless, Edge Delivery Services y arquitectura de soluciones para AEM 6.5 y AEM as a Cloud Service.
            </p>
          </div>

          {/* Buscador Global Prominente */}
          <div style={{ margin: '2rem 0', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="🔍 Buscar cualquier tema en el manual... (Ej: Sling Models, Dispatcher, Tags, i18n)"
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-content)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            />
            {globalSearchTerm && (
              <button 
                onClick={() => setGlobalSearchTerm('')}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Resultados de Búsqueda Global */}
          {globalSearchTerm && (
            <div style={{ marginBottom: '2.5rem', animation: 'fadeIn 0.3s ease' }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
                Resultados Globales ({filteredGlobalChapters.length})
              </h3>
              {filteredGlobalChapters.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {filteredGlobalChapters.map(chapter => (
                    <div 
                      key={chapter.id} 
                      className="info-box" 
                      style={{ cursor: 'pointer', border: '1px solid var(--border-color)', padding: '1rem' }}
                      onClick={() => onSelectChapter(chapter.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span className="topic-number">Tema {chapter.number}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{chapter.moduleTitle.split(':')[0]}</span>
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem' }}>{chapter.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{chapter.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <p>No se encontraron resultados para tu búsqueda.</p>
                </div>
              )}
            </div>
          )}

          {/* Estadísticas de Progreso General */}
          <div className="stats-grid" style={{ marginBottom: '3rem' }}>
            <div className="stat-card">
              <span className="stat-num">{manualStats.totalModules}</span>
              <span className="stat-label">Módulos Temáticos</span>
              <span className="stat-desc">De Básico a Arquitecto</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{manualStats.totalChapters}</span>
              <span className="stat-label">Temas del Temario</span>
              <span className="stat-desc">{manualStats.totalChapters - manualStats.pendingChapters} redactados · {manualStats.pendingChapters} en desarrollo</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{completedCount}/{totalCount}</span>
              <span className="stat-label">Temas Completados</span>
              <span className="stat-desc">Progreso guardado localmente</span>
            </div>
          </div>

          {/* Banner de Examen Final */}
          <div
            className="info-box"
            onClick={() => onSelectChapter('final-exam')}
            style={{
              cursor: 'pointer',
              border: '1px solid var(--accent-purple, var(--primary))',
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.05) 0%, rgba(155, 89, 255, 0.05) 100%)',
              padding: '1.5rem 1.75rem',
              marginBottom: '2.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.2rem' }}>🎓 Examen Final del Manual</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Preguntas aleatorias por Frontend, Backend, Developer (AD0-E134) o Architect (AD0-E117). Preguntas y orden de opciones distintos en cada intento.
              </p>
            </div>
            <span
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}
            >
              Presentar Examen →
            </span>
          </div>

          {/* Menú de Módulos (Visual Grid) */}
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Módulos del Temario
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {allModules.map((module, idx) => {
              const { completed, total, percent } = getModuleProgress(module);
              const isCompleted = percent === 100;
              return (
                <div 
                  key={module.id} 
                  className={`info-box module-menu-card ${isCompleted ? 'completed-module' : ''}`}
                  onClick={() => handleSelectModule(module.id)}
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.25s ease', 
                    border: '1px solid var(--border-color)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    minHeight: '180px',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: isCompleted ? 'var(--color-success)' : 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Módulo {idx + 1} {isCompleted && '✓'}
                        <LevelBadge level={module.level} />
                      </span>
                      {progress.moduleQuizzes?.[module.id]?.passed && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 'bold' }}>
                          🏆 Aprobado
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                      {module.title.split(': ')[1]}
                    </h3>
                  </div>

                  <div>
                    {/* Progreso del módulo */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      <span>{completed}/{total} Temas</span>
                      <span>{percent}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: isCompleted ? 'var(--color-success)' : 'var(--primary)' }}></div>
                    </div>

                    <span 
                      style={{ 
                        color: isCompleted ? 'var(--color-success)' : 'var(--accent-cyan)', 
                        fontSize: '0.85rem', 
                        fontWeight: 'bold', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem' 
                      }}
                    >
                      {isCompleted ? 'Repasar Temas →' : 'Explorar Temas →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
