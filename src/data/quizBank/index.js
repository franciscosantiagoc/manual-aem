// Banco global de preguntas. Cada pregunta pertenece a un tema (chapterId);
// su categoría (frontend/backend) se deriva del track del tema.
import { chaptersMap, allModules, certModules } from '../chaptersMetadata';
import module01 from './module01';
import module02 from './module02';
import module03 from './module03';
import module04 from './module04';
import module05 from './module05';
import module06 from './module06';
import module07 from './module07';
import module08 from './module08';
import module09 from './module09';
import module10 from './module10';
import module11 from './module11';
import module12 from './module12';
import module13 from './module13';
import module14 from './module14';
import module15 from './module15';
import module16 from './module16';
import module17 from './module17';
import module18 from './module18';
import module19 from './module19';
import module20 from './module20';
import module21 from './module21';

const raw = [
  ...module01,
  ...module02,
  ...module03,
  ...module04,
  ...module05,
  ...module06,
  ...module07,
  ...module08,
  ...module09,
  ...module10,
  ...module11,
  ...module12,
  ...module13,
  ...module14,
  ...module15,
  ...module16,
  ...module17,
  ...module18,
  ...module19,
  ...module20,
  ...module21,
];

export const allQuestions = raw
  .filter(q => chaptersMap[q.chapterId])
  .map(q => ({
    ...q,
    category: chaptersMap[q.chapterId].track === 'front' ? 'frontend' : 'backend'
  }));

export const questionsByChapter = allQuestions.reduce((acc, q) => {
  (acc[q.chapterId] ||= []).push(q);
  return acc;
}, {});

export const poolForModules = (moduleIds) => {
  const ids = new Set(
    allModules.filter(m => moduleIds.includes(m.id)).flatMap(m => m.chapters.map(c => c.id))
  );
  return allQuestions.filter(q => ids.has(q.chapterId));
};

export const poolForModule = (moduleId) => poolForModules([moduleId]);

export const poolForCert = (cert) => poolForModules(certModules[cert] || []);
