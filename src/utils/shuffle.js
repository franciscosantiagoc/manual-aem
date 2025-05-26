// Mezcla Fisher-Yates: distribución uniforme, sin mutar el arreglo original.
export function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Devuelve una copia de la pregunta con las opciones en orden aleatorio
// y los índices de respuesta reasignados.
export function shuffleOptions(question) {
  const order = shuffle(question.options.map((_, idx) => idx));
  return {
    ...question,
    options: order.map(idx => question.options[idx]),
    answer: order
      .map((originalIdx, newIdx) => (question.answer.includes(originalIdx) ? newIdx : -1))
      .filter(idx => idx !== -1)
  };
}

// Selecciona `count` preguntas al azar y mezcla sus opciones.
export function pickQuestions(pool, count) {
  return shuffle(pool).slice(0, Math.min(count, pool.length)).map(shuffleOptions);
}
