import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { ChapterViewer } from './components/ChapterViewer';
import { ModuleQuiz } from './components/ModuleQuiz';
import { FinalExam } from './components/FinalExam';
import { allChapters } from './data/chaptersMetadata';

// Versión del esquema de progreso. La v2 reorganizó los módulos, así que los
// resultados de evaluaciones anteriores se descartan (los temas completados se conservan
// porque los ids de tema no cambiaron).
const PROGRESS_SCHEMA = 2;
import { moduleQuizConfig } from './data/moduleQuizConfig';

function App() {
  // Estado para el tema (oscuro por defecto)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aem-manual-theme') || 'dark';
  });

  // Estado del capítulo seleccionado
  const [activeChapterId, setActiveChapterId] = useState('home');

  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Estado de progreso
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('aem-manual-progress');
    const defaultVal = {
      schema: PROGRESS_SCHEMA,
      total: allChapters.length,
      completedList: [],
      // Resultados por módulo: { 'module-1': { passed: true, score: 90 }, ... }
      moduleQuizzes: {},
      // Resultados del Examen Final por categoría: { frontend: {...}, backend: {...}, all: {...} }
      finalExam: {}
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validIds = new Set(allChapters.map(c => c.id));
        const completedList = (parsed.completedList || []).filter(id => validIds.has(id));
        if ((parsed.schema || 1) < PROGRESS_SCHEMA) {
          return { ...defaultVal, completedList };
        }
        return { ...defaultVal, ...parsed, completedList, total: allChapters.length };
      } catch (e) {
        return defaultVal;
      }
    }
    return defaultVal;
  });

  // Estado para el módulo seleccionado en el Home dashboard
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  // Estado para sidebar móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sincronizar tema con atributo HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aem-manual-theme', theme);
  }, [theme]);

  // Al cambiar de tema, evaluación o módulo, volver al inicio de la vista
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeChapterId, selectedModuleId]);

  // Sincronizar progreso con LocalStorage
  useEffect(() => {
    localStorage.setItem('aem-manual-progress', JSON.stringify(progress));
  }, [progress]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSelectChapter = (id) => {
    setActiveChapterId(id);
    setSearchTerm(''); // Limpia búsqueda al navegar
  };

  const handleToggleComplete = (id) => {
    setProgress(prev => {
      const list = [...prev.completedList];
      const idx = list.indexOf(id);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(id);
      }
      return {
        ...prev,
        completedList: list
      };
    });
  };

  // Aprobación de un cuestionario de módulo (quizKey = 'module-1', 'module-2', etc.)
  const handleModuleQuizPass = (quizKey, percent) => {
    setProgress(prev => ({
      ...prev,
      moduleQuizzes: {
        ...prev.moduleQuizzes,
        [quizKey]: { passed: true, score: percent }
      }
    }));
  };

  // Aprobación del Examen Final (quizKey = 'final-exam-frontend', etc.; category = 'frontend'|'backend'|'all')
  const handleFinalExamPass = (quizKey, percent, category) => {
    setProgress(prev => ({
      ...prev,
      finalExam: {
        ...prev.finalExam,
        [category]: { passed: true, score: percent }
      }
    }));
  };

  // Filtrado de capítulos por buscador
  const filteredChapters = allChapters.filter(chapter => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    // Buscar en título, resumen y número de tema
    const matchTitle = chapter.title.toLowerCase().includes(term);
    const matchSummary = chapter.summary.toLowerCase().includes(term) ||
      (chapter.outline || []).some(item => item.toLowerCase().includes(term));
    const matchNumber = chapter.number.toString() === term;
    
    return matchTitle || matchSummary || matchNumber;
  });

  return (
    <div className="app-container">
      {/* Sidebar de Navegación */}
      <Sidebar 
        activeChapterId={activeChapterId}
        onSelectChapter={handleSelectChapter}
        progress={progress}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setSelectedModuleId={setSelectedModuleId}
      />

      {/* Cabecera superior */}
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Contenido Principal */}
      <main className="content-area">
        {searchTerm ? (
          // Vista de resultados del buscador
          <div className="search-results" style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Resultados de Búsqueda para "{searchTerm}" ({filteredChapters.length})
            </h2>
            {filteredChapters.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredChapters.map(chapter => (
                  <div 
                    key={chapter.id} 
                    className="info-box" 
                    style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid var(--border-color)' }}
                    onClick={() => handleSelectChapter(chapter.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span className="topic-number">Tema {chapter.number}</span>
                      <span className="chapter-module-badge" style={{ fontSize: '0.7rem' }}>{chapter.moduleTitle.split(':')[0]}</span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem' }}>{chapter.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{chapter.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>✕ No se encontraron resultados</p>
                <p style={{ fontSize: '0.9rem' }}>Prueba buscando otros términos como "Sling Model", "Clientlibs" o "CA-Config".</p>
              </div>
            )}
          </div>
        ) : activeChapterId === 'home' ? (
          // Vista de Bienvenida / Home
          <Home 
            onSelectChapter={handleSelectChapter}
            progress={progress}
            selectedModuleId={selectedModuleId}
            setSelectedModuleId={setSelectedModuleId}
          />
        ) : activeChapterId === 'final-exam' ? (
          // Vista del Examen Final (elección de categoría + cuestionario)
          <FinalExam
            onSelectChapter={handleSelectChapter}
            onQuizPass={handleFinalExamPass}
          />
        ) : activeChapterId.startsWith('quiz-module-') ? (
          // Vista de Evaluación de un Módulo (quiz-module-1 ... quiz-module-10)
          (() => {
            const moduleId = activeChapterId.replace('quiz-', '');
            const config = moduleQuizConfig[moduleId];
            if (!config) return null;
            return (
              <ModuleQuiz
                quizKey={moduleId}
                title={config.title}
                description={config.description}
                pool={config.pool}
                questionCount={config.questionCount}
                timeLimitSec={config.timeLimitSec}
                passPercent={80}
                enforceDailyLimit={true}
                onSelectChapter={handleSelectChapter}
                onQuizPass={handleModuleQuizPass}
              />
            );
          })()
        ) : (
          // Vista del lector de capítulos
          <ChapterViewer 
            chapterId={activeChapterId}
            onNavigate={setActiveChapterId}
            progress={progress}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
