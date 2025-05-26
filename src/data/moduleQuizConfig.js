import { allModules } from './chaptersMetadata';
import { poolForModule } from './quizBank';

// Configuración del cuestionario cronometrado de cada módulo, calculada a partir
// del banco de preguntas: ~60% del pool (entre 10 y 25 preguntas), 1.5 min por pregunta.
export const moduleQuizConfig = Object.fromEntries(
  allModules.map(module => {
    const pool = poolForModule(module.id);
    const questionCount = Math.min(25, Math.max(10, Math.round(pool.length * 0.6)));
    const effective = Math.min(questionCount, pool.length);
    return [
      module.id,
      {
        moduleNumber: module.number,
        title: `Evaluación del Módulo ${module.number}`,
        description: `Pon a prueba lo aprendido en "${module.title.split(': ')[1]}". Las preguntas y el orden de sus opciones cambian en cada intento.`,
        pool,
        questionCount,
        timeLimitSec: Math.max(600, Math.round(effective * 90))
      }
    ];
  })
);
