import React, { useState, useEffect, useRef } from 'react';
import { Alert, Paragraph } from './LessonUI';
import { chaptersMap } from '../data/chaptersMetadata';
import { pickQuestions } from '../utils/shuffle';

const ATTEMPTS_KEY = 'aem-manual-quiz-attempts';
const MAX_ATTEMPTS_PER_DAY = 2;

const getTodayStr = () => new Date().toISOString().slice(0, 10);

const getAttemptsData = () => {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || {};
  } catch {
    return {};
  }
};

const getAttemptsToday = (quizKey) => {
  const data = getAttemptsData();
  const entry = data[quizKey];
  if (!entry || entry.date !== getTodayStr()) return 0;
  return entry.count;
};

const registerAttempt = (quizKey) => {
  const data = getAttemptsData();
  const today = getTodayStr();
  const entry = data[quizKey];
  const count = entry && entry.date === today ? entry.count + 1 : 1;
  data[quizKey] = { date: today, count };
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
  return count;
};

/**
 * Cuestionario cronometrado y reutilizable para un Módulo o para el Examen Final.
 *
 * Props:
 * - quizKey: identificador único para el control de intentos diarios (ej. 'module-3' o 'final-exam')
 * - title: título mostrado en pantalla (ej. "Evaluación de Módulo 3")
 * - description: texto introductorio de la pantalla de inicio
 * - pool: array de preguntas { id, chapterId, question, type, options, answer, explanation?, category }
 * - questionCount: cuántas preguntas se seleccionan al azar en cada intento
 * - timeLimitSec: límite de tiempo en segundos
 * - passPercent: porcentaje mínimo para aprobar (default 80)
 * - enforceDailyLimit: si es true, aplica el límite de 2 intentos por día (default true)
 * - onSelectChapter: callback para navegar a un tema de repaso
 * - onQuizPass: callback(quizKey, percent) invocado cuando se aprueba
 */
export const ModuleQuiz = ({
  quizKey,
  title,
  description,
  pool,
  questionCount = 20,
  timeLimitSec = 1800,
  passPercent = 80,
  enforceDailyLimit = true,
  onSelectChapter,
  onQuizPass
}) => {
  const [quizState, setQuizState] = useState('not_started'); // 'not_started' | 'active' | 'finished'
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { qId: [indices] }
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [result, setResult] = useState(null); // { score, percent, passed, wrongTopics }
  const [attemptsToday, setAttemptsToday] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setAttemptsToday(getAttemptsToday(quizKey));
    // Reiniciar el estado si cambia el quiz (ej. navegación entre módulos)
    setQuizState('not_started');
    setResult(null);
    setTimeLeft(timeLimitSec);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizKey]);

  const attemptsRemaining = Math.max(0, MAX_ATTEMPTS_PER_DAY - attemptsToday);
  const isLocked = enforceDailyLimit && attemptsRemaining <= 0;

  // Mezclar preguntas y elegir questionCount al azar al iniciar
  const startQuiz = () => {
    if (isLocked) return;

    const selected = pickQuestions(pool, questionCount);
    setQuestions(selected);
    setAnswers({});
    setTimeLeft(timeLimitSec);
    setQuizState('active');
    setResult(null);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit(selected);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSelectOption = (qId, optionIdx, isMultiple) => {
    setAnswers(prev => {
      const current = prev[qId] || [];
      if (isMultiple) {
        if (current.includes(optionIdx)) {
          return { ...prev, [qId]: current.filter(idx => idx !== optionIdx) };
        } else {
          return { ...prev, [qId]: [...current, optionIdx].sort() };
        }
      } else {
        return { ...prev, [qId]: [optionIdx] };
      }
    });
  };

  const handleAutoSubmit = (activeQuestions) => {
    submitQuiz(activeQuestions);
  };

  const submitQuiz = (activeQuestions = questions) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const total = activeQuestions.length || 1;
    let correctCount = 0;
    const wrongTopicsMap = new Map();

    activeQuestions.forEach(q => {
      const userAnswers = answers[q.id] || [];
      const correctAnswers = q.answer || [];

      const isCorrect = userAnswers.length === correctAnswers.length &&
        userAnswers.every((val, index) => val === correctAnswers[index]);

      if (isCorrect) {
        correctCount++;
      } else {
        const topic = chaptersMap[q.chapterId];
        wrongTopicsMap.set(q.chapterId, {
          id: q.chapterId,
          title: topic ? `Tema ${topic.number}: ${topic.title}` : q.chapterId
        });
      }
    });

    const percent = Math.round((correctCount / total) * 100);
    const passed = percent >= passPercent;

    const finalResult = {
      score: correctCount,
      total,
      percent,
      passed,
      wrongTopics: Array.from(wrongTopicsMap.values())
    };

    setResult(finalResult);
    setQuizState('finished');

    if (enforceDailyLimit) {
      const newCount = registerAttempt(quizKey);
      setAttemptsToday(newCount);
    }

    if (passed) {
      onQuizPass(quizKey, percent);
    }
  };

  if (pool.length === 0) {
    return (
      <div className="quiz-container" style={{ padding: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
        <Alert type="info" title="Evaluación no disponible">
          {'Esta evaluación se habilita cuando sus temas tengan preguntas en el banco.'}
        </Alert>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (timeLeft / timeLimitSec) * 100;
  const timerColor = timeLeft < timeLimitSec * 0.17 ? 'var(--accent-red)' : timeLeft < timeLimitSec * 0.5 ? 'var(--accent-yellow)' : 'var(--accent-green)';
  const timeLimitMinutes = Math.round(timeLimitSec / 60);

  return (
    <div className="quiz-container" style={{ animation: 'fadeIn 0.3s ease', padding: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      {quizState === 'not_started' && (
        <div className="info-box" style={{ textAlign: 'center', padding: '3rem 2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>
            📝 {title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {description}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            <div className="stat-card" style={{ padding: '1rem' }}>
              <span className="stat-num" style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>{Math.min(questionCount, pool.length)}</span>
              <span className="stat-label">Preguntas</span>
            </div>
            <div className="stat-card" style={{ padding: '1rem' }}>
              <span className="stat-num" style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}>{timeLimitMinutes} min</span>
              <span className="stat-label">Límite de Tiempo</span>
            </div>
            <div className="stat-card" style={{ padding: '1rem' }}>
              <span className="stat-num" style={{ fontSize: '1.5rem', color: 'var(--accent-green)' }}>{passPercent}%</span>
              <span className="stat-label">Calificación Mínima</span>
            </div>
          </div>
          <Alert type="warning" title="Reglas del Cuestionario">
            {"- Al iniciar, el cronómetro correrá continuamente.\n" +
             "- Si el tiempo finaliza, tus respuestas se enviarán automáticamente.\n" +
             "- Algunas preguntas son de opción múltiple (cuadrados); debes marcar todas las opciones correctas.\n" +
             (enforceDailyLimit ? `- Tienes un máximo de ${MAX_ATTEMPTS_PER_DAY} intentos por día para este cuestionario.` : "")}
          </Alert>

          {enforceDailyLimit && (
            <p style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: isLocked ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
              {isLocked
                ? `Ya usaste tus ${MAX_ATTEMPTS_PER_DAY} intentos de hoy para este cuestionario. Vuelve mañana para intentarlo de nuevo.`
                : `Intentos disponibles hoy: ${attemptsRemaining} de ${MAX_ATTEMPTS_PER_DAY}.`}
            </p>
          )}

          <button
            className="nav-chapter-btn next"
            onClick={startQuiz}
            disabled={isLocked}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              display: 'inline-block',
              marginTop: '2rem',
              opacity: isLocked ? 0.5 : 1
            }}
          >
            {isLocked ? 'Límite diario alcanzado' : 'Iniciar Cuestionario'}
          </button>
        </div>
      )}

      {quizState === 'active' && (
        <div>
          <div style={{ position: 'sticky', top: '70px', zIndex: 10, background: 'var(--bg-content)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.3rem' }}>{title}</h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Responde las siguientes {questions.length} preguntas</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: timerColor, fontFamily: 'monospace' }}>
                ⏱ {formatTime(timeLeft)}
              </div>
              <div style={{ width: '120px', height: '6px', background: 'var(--border-color)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: timerColor, transition: 'width 1s linear' }}></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {questions.map((q, qIdx) => {
              const isMultiple = q.type === 'multiple';
              const userAnswers = answers[q.id] || [];

              return (
                <div key={q.id} className="info-box" style={{ border: '1px solid var(--border-color)', animation: 'slideIn 0.3s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="topic-number" style={{ fontSize: '0.85rem' }}>Pregunta {qIdx + 1} de {questions.length}</span>
                    <span className="chapter-module-badge" style={{ fontSize: '0.7rem' }}>
                      {isMultiple ? 'Selección Múltiple' : 'Opción Única'}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', lineHeight: '1.5' }}>{q.question}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {q.options.map((option, optIdx) => {
                      const isSelected = userAnswers.includes(optIdx);
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx, isMultiple)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.85rem 1rem',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(0, 191, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                            border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type={isMultiple ? 'checkbox' : 'radio'}
                            name={q.id}
                            checked={isSelected}
                            onChange={() => {}}
                            style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                          />
                          <span style={{ fontSize: '0.95rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {option}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <button
              className="nav-chapter-btn next"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas enviar el cuestionario?')) {
                  submitQuiz();
                }
              }}
              style={{ padding: '1rem 3rem', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Enviar Cuestionario
            </button>
          </div>
        </div>
      )}

      {quizState === 'finished' && result && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div className="info-box" style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            border: result.passed ? '2px solid var(--accent-green)' : '2px solid var(--accent-red)',
            background: result.passed ? 'rgba(0, 230, 115, 0.03)' : 'rgba(255, 77, 77, 0.03)',
            marginBottom: '2rem'
          }}>
            <span style={{ fontSize: '4rem' }}>{result.passed ? '🏆' : '❌'}</span>
            <h2 style={{ fontSize: '2rem', margin: '1rem 0 0.5rem 0', color: result.passed ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {result.passed ? '¡Aprobado!' : 'No Aprobado'}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Obtuviste <strong>{result.score} de {result.total}</strong> respuestas correctas.
            </p>
            <div style={{ display: 'inline-block', fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', color: result.passed ? 'var(--accent-green)' : 'var(--accent-red)', border: '1px solid var(--border-color)', padding: '0.5rem 2rem', borderRadius: '12px', background: 'var(--bg-content)', marginBottom: '2rem' }}>
              {result.percent}%
            </div>

            {result.passed ? (
              <Paragraph>
                {"¡Excelente trabajo! Has demostrado dominar los conceptos evaluados en este cuestionario. La evaluación ha sido marcada oficialmente como **Aprobada**."}
              </Paragraph>
            ) : (
              <Alert type="warning" title="Puntuación Insuficiente">
                {`Necesitas al menos ${passPercent}% de respuestas correctas para aprobar esta evaluación. Te recomendamos repasar los temas sugeridos abajo antes de volver a intentarlo.`}
              </Alert>
            )}

            {enforceDailyLimit && (
              <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {isLocked
                  ? `Ya usaste tus ${MAX_ATTEMPTS_PER_DAY} intentos de hoy. Vuelve mañana para intentarlo de nuevo.`
                  : `Intentos disponibles hoy: ${attemptsRemaining} de ${MAX_ATTEMPTS_PER_DAY}.`}
              </p>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                className="nav-chapter-btn prev"
                onClick={startQuiz}
                disabled={isLocked}
                style={{ padding: '0.8rem 1.8rem', cursor: isLocked ? 'not-allowed' : 'pointer', background: 'var(--bg-content)', border: '1px solid var(--border-color)', opacity: isLocked ? 0.5 : 1 }}
              >
                {isLocked ? 'Sin intentos disponibles hoy' : (result.passed ? 'Realizar de nuevo (Preguntas Aleatorias)' : 'Intentar Nuevamente')}
              </button>
            </div>
          </div>

          {!result.passed && result.wrongTopics.length > 0 && (
            <div className="info-box" style={{ border: '1px solid var(--accent-red)', background: 'rgba(255, 77, 77, 0.01)', marginBottom: '2rem', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔍</span> Temas de Repaso Sugeridos
              </h3>
              <Paragraph>
                {"Según las preguntas que fallaste en la evaluación, te sugerimos encarecidamente repasar los siguientes capítulos del manual para fortalecer tu conocimiento:"}
              </Paragraph>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                {result.wrongTopics.map(topic => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectChapter(topic.id)}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-content)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    className="topic-review-card"
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>Repasar</span>
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: 600 }}>{topic.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="info-box" style={{ border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Revisión Detallada de Preguntas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {questions.map((q, qIdx) => {
                const userAnswers = answers[q.id] || [];
                const correctAnswers = q.answer || [];
                const isCorrect = userAnswers.length === correctAnswers.length &&
                  userAnswers.every((val, index) => val === correctAnswers[index]);

                return (
                  <div key={q.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Pregunta {qIdx + 1}</span>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        color: isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'
                      }}>
                        {isCorrect ? '✓ Correcta' : '✕ Incorrecta'}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>{q.question}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                      {q.options.map((option, optIdx) => {
                        const isUserSelected = userAnswers.includes(optIdx);
                        const isOptCorrect = correctAnswers.includes(optIdx);

                        let borderColor = 'var(--border-color)';
                        let background = 'rgba(255,255,255,0.01)';
                        let badge = null;

                        if (isOptCorrect) {
                          borderColor = 'var(--accent-green)';
                          background = 'rgba(0, 230, 115, 0.05)';
                          badge = 'Respuesta Correcta';
                        } else if (isUserSelected && !isOptCorrect) {
                          borderColor = 'var(--accent-red)';
                          background = 'rgba(255, 77, 77, 0.05)';
                          badge = 'Tu Selección (Incorrecta)';
                        }

                        return (
                          <div
                            key={optIdx}
                            style={{
                              padding: '0.75rem 1rem',
                              border: `1px solid ${borderColor}`,
                              background,
                              borderRadius: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span style={{ fontSize: '0.9rem', color: isUserSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                              {option}
                            </span>
                            {badge && (
                              <span style={{
                                fontSize: '0.7rem',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: isOptCorrect ? 'rgba(0, 230, 115, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                                color: isOptCorrect ? 'var(--accent-green)' : 'var(--accent-red)',
                                fontWeight: 'bold'
                              }}>
                                {badge}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {q.explanation && (
                      <Alert type="info" title="Explicación Teórica">
                        {q.explanation}
                      </Alert>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleQuiz;
