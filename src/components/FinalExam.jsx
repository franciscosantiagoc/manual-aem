import React, { useState } from 'react';
import { ModuleQuiz } from './ModuleQuiz';
import { allQuestions, poolForCert } from '../data/quizBank';

// Alcances del examen final. Los simulacros de certificación usan solo los
// módulos que cubren los dominios de cada examen oficial de Adobe.
const EXAMS = {
  frontend: {
    label: 'Frontend', icon: '🎨', color: 'var(--accent-cyan)',
    pool: () => allQuestions.filter(q => q.category === 'frontend'),
    questionCount: 50, timeLimitSec: 2700,
    blurb: 'Temas con tag Frontend: HTL, componentes, clientlibs, diálogos, SPA y Edge Delivery Services.'
  },
  backend: {
    label: 'Backend', icon: '⚙️', color: 'var(--accent-purple)',
    pool: () => allQuestions.filter(q => q.category === 'backend'),
    questionCount: 50, timeLimitSec: 2700,
    blurb: 'Temas con tag Backend: OSGi, Sling, JCR, servlets, schedulers, Dispatcher y DevOps.'
  },
  developer: {
    label: 'Sites Developer (AD0-E134)', icon: '👩‍💻', color: 'var(--color-success)',
    pool: () => poolForCert('developer'),
    questionCount: 50, timeLimitSec: 6000,
    blurb: 'Simulacro del examen AEM Sites Developer Expert: front y back de nivel Básico a Experto.'
  },
  architect: {
    label: 'Sites Architect (AD0-E117)', icon: '🏛️', color: 'var(--color-warning)',
    pool: () => poolForCert('architect'),
    questionCount: 50, timeLimitSec: 6000,
    blurb: 'Simulacro del examen AEM Sites Architect Master: plataforma, caché, seguridad, integraciones y arquitectura.'
  },
  all: {
    label: 'Todos los Temas', icon: '🎓', color: 'var(--primary)',
    pool: () => allQuestions,
    questionCount: 60, timeLimitSec: 3600,
    blurb: 'Banco completo del manual.'
  }
};

export const FinalExam = ({ onSelectChapter, onQuizPass }) => {
  const [category, setCategory] = useState(null);

  if (!category) {
    return (
      <div className="quiz-container" style={{ animation: 'fadeIn 0.3s ease', padding: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
        <div className="info-box" style={{ textAlign: 'center', padding: '3rem 2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>
            🎓 Exámenes Finales
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {'Elige el alcance. Cada intento selecciona preguntas al azar y mezcla el orden de sus opciones. Los simulacros Developer y Architect reproducen el formato de los exámenes de certificación de Adobe.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {Object.entries(EXAMS).map(([key, exam]) => (
              <div
                key={key}
                onClick={() => exam.pool().length > 0 && setCategory(key)}
                className="stat-card"
                style={{ padding: '1.5rem 1.25rem', cursor: exam.pool().length > 0 ? 'pointer' : 'not-allowed', opacity: exam.pool().length > 0 ? 1 : 0.5, border: `1px solid ${exam.color}`, borderRadius: '10px' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{exam.icon}</div>
                <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', color: exam.color }}>{exam.label}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>{exam.blurb}</p>
                <span className="stat-label">
                  {`${Math.min(exam.questionCount, exam.pool().length)} preguntas · ${Math.round(exam.timeLimitSec / 60)} min · banco de ${exam.pool().length}`}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {'Los exámenes finales no tienen límite de intentos por día: puedes repetirlos las veces que quieras para practicar.'}
          </p>
        </div>
      </div>
    );
  }

  const exam = EXAMS[category];
  const pool = exam.pool();

  return (
    <div>
      <div style={{ maxWidth: '850px', margin: '0 auto 1rem auto', padding: '0 1.5rem' }}>
        <button
          onClick={() => setCategory(null)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
        >
          ← Elegir otro examen
        </button>
      </div>
      <ModuleQuiz
        quizKey={`final-exam-${category}`}
        title={`Examen Final — ${exam.label}`}
        description={`${exam.blurb} Se seleccionarán ${Math.min(exam.questionCount, pool.length)} preguntas al azar de un banco de ${pool.length}.`}
        pool={pool}
        questionCount={exam.questionCount}
        timeLimitSec={exam.timeLimitSec}
        passPercent={80}
        enforceDailyLimit={false}
        onSelectChapter={onSelectChapter}
        onQuizPass={(quizKeyResult, percent) => onQuizPass(quizKeyResult, percent, category)}
      />
    </div>
  );
};

export default FinalExam;
