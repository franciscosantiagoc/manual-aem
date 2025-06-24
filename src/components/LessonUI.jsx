import React from 'react';
import { allChapters, chaptersMap, levelClass, TRACKS } from '../data/chaptersMetadata';
import { questionsByChapter } from '../data/quizBank';
import { pickQuestions } from '../utils/shuffle';

const TOPIC_QUIZ_SIZE = 5;
const TOPIC_QUIZ_PASS_PERCENT = 80;

// Referencias cruzadas entre temas: [[ch-N]] -> "Tema X" y [[#ch-N]] -> "X",
// donde X es el número actual del tema en el temario.
function formatChapterRefs(text) {
  return text.replace(/\[\[(#?)(ch-\d+)\]\]/g, (all, numberOnly, id) => {
    const ref = chaptersMap[id];
    if (!ref) return all;
    const label = numberOnly ? ref.number : `Tema ${ref.number}`;
    const title = ref.title.replace(/"/g, '&quot;');
    return `<a class="chapter-ref" data-chapter-id="${id}" title="${title}">${label}</a>`;
  });
}

// Formato inline: **negritas**, `código` y referencias a otros temas
export function formatMarkdownInline(text) {
  if (!text) return '';
  return formatChapterRefs(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code style="font-size: 0.9em; padding: 2px 5px; color: var(--accent-cyan); font-family: var(--font-mono); background: var(--bg-tertiary); border-radius: 4px; overflow-wrap: anywhere;">$1</code>');
}

export const LevelBadge = ({ level, compact = false, style }) => (
  <span className={`difficulty-badge ${levelClass(level)}`} style={style} title={level}>
    {compact ? level[0] : level}
  </span>
);

export const TrackBadge = ({ track, compact = false, style }) => (
  <span className={`track-badge track-${track}`} style={style} title={TRACKS[track].label}>
    {compact ? TRACKS[track].short[0] : TRACKS[track].label}
  </span>
);

export const LessonPage = ({ chapterId, isCompleted, onToggleComplete, onNavigate, children }) => {
  const currentIndex = allChapters.findIndex(c => c.id === chapterId);
  const chapter = allChapters[currentIndex];

  if (!chapter) {
    return <div className="error-view">Tema no encontrado.</div>;
  }

  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
  const prerequisites = chapter.prerequisites.map(id => chaptersMap[id]).filter(Boolean);

  // Navegación desde las referencias [[ch-N]] renderizadas como HTML
  const handleContentClick = (e) => {
    const ref = e.target.closest('[data-chapter-id]');
    if (ref) {
      e.preventDefault();
      onNavigate(ref.dataset.chapterId);
    }
  };

  return (
    <article className="chapter-container" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Volver al Módulo
        </button>
      </div>

      <header className="chapter-header">
        <div className="chapter-meta">
          <span className="chapter-module-badge">{chapter.moduleTitle}</span>
          <LevelBadge level={chapter.level} />
          <TrackBadge track={chapter.track} />
        </div>
        <h1 className="chapter-title">Tema {chapter.number}: {chapter.title}</h1>
        <p className="chapter-summary">{chapter.summary}</p>

        {prerequisites.length > 0 && (
          <div className="prereq-box">
            <span className="prereq-label">Antes de este tema revisa:</span>
            <div className="prereq-list">
              {prerequisites.map(p => (
                <button key={p.id} className="prereq-item" onClick={() => onNavigate(p.id)} title={p.summary}>
                  <TrackBadge track={p.track} compact />
                  <span>Tema {p.number}: {p.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggleComplete(chapterId)}
              style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: 'var(--primary)' }}
            />
            <span>{isCompleted ? '✓ Tema leído y completado' : 'Marcar tema como leído'}</span>
          </label>
        </div>
      </header>

      <div className="chapter-content" onClick={handleContentClick}>
        {children}
      </div>

      <TopicQuiz
        key={chapterId}
        chapterId={chapterId}
        isCompleted={isCompleted}
        onToggleComplete={onToggleComplete}
      />

      <footer className="chapter-navigation">
        {prevChapter ? (
          <button className="nav-chapter-btn prev" onClick={() => onNavigate(prevChapter.id)}>
            <span className="nav-label">← Tema Anterior</span>
            <span className="nav-title">Tema {prevChapter.number}: {prevChapter.title}</span>
          </button>
        ) : (
          <button className="nav-chapter-btn prev" onClick={() => onNavigate('home')}>
            <span className="nav-label">← Volver al Inicio</span>
            <span className="nav-title">Panel de Control</span>
          </button>
        )}

        {nextChapter ? (
          <button className="nav-chapter-btn next" onClick={() => onNavigate(nextChapter.id)}>
            <span className="nav-label">
              {nextChapter.moduleId !== chapter.moduleId ? 'Siguiente Módulo →' : 'Siguiente Tema →'}
            </span>
            <span className="nav-title">Tema {nextChapter.number}: {nextChapter.title}</span>
          </button>
        ) : (
          <div style={{ width: '45%' }}></div>
        )}
      </footer>
    </article>
  );
};

// Vista de un tema planeado que aún no tiene contenido redactado
export const PendingChapter = ({ chapterId, isCompleted, onToggleComplete, onNavigate }) => {
  const chapter = chaptersMap[chapterId];
  return (
    <LessonPage chapterId={chapterId} isCompleted={isCompleted} onToggleComplete={onToggleComplete} onNavigate={onNavigate}>
      <Alert type="info" title="Tema en desarrollo">
        {'Este tema forma parte del nuevo temario y su contenido detallado se está redactando. Mientras tanto, este es el índice planeado:'}
      </Alert>
      <SectionTitle>Contenido planeado</SectionTitle>
      <List items={chapter.outline || []} />
    </LessonPage>
  );
};

export const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

export const Paragraph = ({ children }) => {
  if (typeof children === 'string') {
    return (
      <p className="element-paragraph" dangerouslySetInnerHTML={{ __html: formatMarkdownInline(children) }} />
    );
  }
  return <p className="element-paragraph">{children}</p>;
};

export const List = ({ items }) => (
  <ul className="element-list">
    {items.map((item, idx) => (
      <li key={idx} dangerouslySetInnerHTML={{ __html: formatMarkdownInline(item) }} />
    ))}
  </ul>
);

export const Alert = ({ type, title, children }) => {
  const icon = type === 'tip' ? '💡' : type === 'warning' ? '⚠️' : type === 'caution' ? '🚫' : 'ℹ️';
  return (
    <div className={`alert-box ${type}`}>
      <div className="alert-title">
        <span>{icon}</span>
        <span>{title || type.toUpperCase()}</span>
      </div>
      {typeof children === 'string' ? (
        <div className="alert-content" dangerouslySetInnerHTML={{ __html: formatMarkdownInline(children) }} />
      ) : (
        <div className="alert-content">{children}</div>
      )}
    </div>
  );
};

// Diagrama de flujo: pasos conectados por flechas con etiqueta opcional.
// Horizontal en pantallas anchas y vertical en móviles.
// steps: [{ title, detail, tone }] · tone: 'primary' | 'cyan' | 'purple' | 'success' | 'warning'
// connectors: etiquetas de las flechas (una menos que los pasos)
export const FlowDiagram = ({ steps = [], connectors = [], caption }) => (
  <figure className="flow-diagram">
    <div className="flow-track">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className={`flow-step tone-${step.tone || 'primary'}`}>
            <span className="flow-step-title">{step.title}</span>
            {step.detail && (
              <span className="flow-step-detail" dangerouslySetInnerHTML={{ __html: formatMarkdownInline(step.detail) }} />
            )}
          </div>
          {idx < steps.length - 1 && (
            <div className="flow-connector" aria-hidden="true">
              <span className="flow-arrow">→</span>
              {connectors[idx] && <span className="flow-connector-label">{connectors[idx]}</span>}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

// Tabla comparativa. Las celdas aceptan el mismo formato inline que Paragraph.
export const DataTable = ({ headers = [], rows = [], caption }) => (
  <div className="data-table-wrapper">
    <table className="data-table">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {headers.map((h, idx) => <th key={idx} scope="col">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIdx) => (
          <tr key={rIdx}>
            {row.map((cell, cIdx) => (
              cIdx === 0
                ? <th key={cIdx} scope="row" dangerouslySetInnerHTML={{ __html: formatMarkdownInline(cell) }} />
                : <td key={cIdx} dangerouslySetInnerHTML={{ __html: formatMarkdownInline(cell) }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CodeBlock = ({ filename, language, code }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-container">
      <div className="code-header">
        <span className="code-filename">{filename}</span>
        <span className="code-lang-tag">{language}</span>
      </div>
      <div className="code-body-wrapper">
        <button className="copy-code-btn" onClick={handleCopy}>
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
        <div className="code-body">
          <pre><code>{code}</code></pre>
        </div>
      </div>
    </div>
  );
};

export const GitFlow = ({ branch, description, files = [], commands = [] }) => (
  <section className="git-timeline-card">
    <div className="git-timeline-header">
      <span className="git-badge">Git Flow</span>
      <span className="git-branch-info">rama: {branch}</span>
    </div>
    <p className="git-desc">{description}</p>
    <div className="git-files-list">
      {files.map((file, idx) => (
        <span key={idx} className="git-file-tag">📂 {file}</span>
      ))}
    </div>
    <div className="git-commands-box">
      {commands.map((cmd, idx) => (
        <div key={idx} style={{ whiteSpace: 'nowrap' }}>
          <span>$ </span>{cmd}
        </div>
      ))}
    </div>
  </section>
);

export const ResourceLinks = ({ items = [] }) => (
  <section className="resource-links-card">
    <div className="git-timeline-header">
      <span className="git-badge" style={{ background: 'var(--accent-purple, var(--primary))' }}>Recursos</span>
      <span className="git-branch-info">Diagramas, capturas y videos de referencia</span>
    </div>
    <div className="resource-links-list">
      {items.map((item, idx) => (
        <a
          key={idx}
          className="resource-link-item"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="resource-link-icon">{item.type === 'video' ? '▶️' : '🖼️'}</span>
          <span className="resource-link-text">
            <span className="resource-link-title">{item.title}</span>
            <span className="resource-link-source">{item.source}</span>
          </span>
          <span className="resource-link-arrow">↗</span>
        </a>
      ))}
    </div>
  </section>
);

// Autoevaluación del tema: toma preguntas al azar del banco del tema y
// mezcla sus opciones en cada intento. Al aprobar marca el tema como completado.
export const TopicQuiz = ({ chapterId, isCompleted, onToggleComplete }) => {
  const pool = questionsByChapter[chapterId] || [];
  const [questions, setQuestions] = React.useState(() => pickQuestions(pool, TOPIC_QUIZ_SIZE));
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  if (pool.length === 0) return null;

  const isRight = (q) => {
    const given = [...(answers[q.id] || [])].sort();
    return given.length === q.answer.length && given.every((v, i) => v === q.answer[i]);
  };
  const correctCount = questions.filter(isRight).length;
  const percent = Math.round((correctCount / questions.length) * 100);
  const allAnswered = questions.every(q => (answers[q.id] || []).length > 0);

  const toggle = (q, idx) => {
    if (submitted) return;
    setAnswers(prev => {
      const current = prev[q.id] || [];
      if (q.type === 'multiple') {
        return { ...prev, [q.id]: current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx] };
      }
      return { ...prev, [q.id]: [idx] };
    });
  };

  const submit = () => {
    setSubmitted(true);
    if (percent >= TOPIC_QUIZ_PASS_PERCENT && !isCompleted && onToggleComplete) {
      onToggleComplete(chapterId);
    }
  };

  const retry = () => {
    setQuestions(pickQuestions(pool, TOPIC_QUIZ_SIZE));
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section className="quiz-card">
      <div className="quiz-header">
        <span>❓</span>
        <span>Autoevaluación del Tema</span>
      </div>
      <p className="quiz-explanation" style={{ marginBottom: '1.5rem' }}>
        {`${questions.length} preguntas al azar de un banco de ${pool.length}. Aprueba con ${TOPIC_QUIZ_PASS_PERCENT}% para marcar el tema como completado. Cada intento cambia las preguntas y el orden de las opciones.`}
      </p>

      {questions.map((q, qIdx) => {
        const selected = answers[q.id] || [];
        return (
          <div key={q.id} className="topic-quiz-question">
            <h3 className="quiz-question">
              {qIdx + 1}. {q.question}
              {q.type === 'multiple' && <span className="quiz-multi-hint"> (selecciona todas las correctas)</span>}
            </h3>
            <div className="quiz-options">
              {q.options.map((option, idx) => {
                let optionClass = selected.includes(idx) ? 'selected' : '';
                if (submitted) {
                  if (q.answer.includes(idx)) optionClass = 'correct';
                  else if (selected.includes(idx)) optionClass = 'incorrect';
                }
                return (
                  <button
                    key={idx}
                    className={`quiz-option-btn ${optionClass}`}
                    onClick={() => toggle(q, idx)}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="quiz-feedback">
                <div className={`quiz-feedback-status ${isRight(q) ? 'correct' : 'incorrect'}`}>
                  {isRight(q) ? '✓ Correcto' : '✕ Incorrecto'}
                </div>
                {q.explanation && (
                  <p className="quiz-explanation"><strong>Explicación:</strong> {q.explanation}</p>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="topic-quiz-actions">
        {!submitted ? (
          <button className="quiz-action-btn" onClick={submit} disabled={!allAnswered}>
            {allAnswered ? 'Calificar' : 'Responde todas las preguntas'}
          </button>
        ) : (
          <>
            <span className={`quiz-feedback-status ${percent >= TOPIC_QUIZ_PASS_PERCENT ? 'correct' : 'incorrect'}`}>
              {`${correctCount}/${questions.length} (${percent}%) — ${percent >= TOPIC_QUIZ_PASS_PERCENT ? 'Aprobado' : 'Repasa el tema e inténtalo de nuevo'}`}
            </span>
            <button className="quiz-action-btn" onClick={retry}>Nuevo intento</button>
          </>
        )}
      </div>
    </section>
  );
};
