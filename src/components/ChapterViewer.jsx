import React from 'react';
import { chaptersMap } from '../data/chaptersMetadata';
import { PendingChapter } from './LessonUI';

// Registro automático: chapters/moduleNN/ChapterNN.jsx -> 'ch-NN'
const chapterModules = import.meta.glob('./chapters/*/Chapter*.jsx', { eager: true });
const chapterComponents = Object.fromEntries(
  Object.entries(chapterModules).map(([file, mod]) => [
    `ch-${Number(file.match(/Chapter(\d+)\.jsx$/)[1])}`,
    mod.default
  ])
);

export const ChapterViewer = ({ chapterId, onNavigate, progress, onToggleComplete }) => {
  const isCompleted = progress.completedList.includes(chapterId);
  const ChapterComponent = chapterComponents[chapterId];

  if (!chaptersMap[chapterId]) {
    return <div className="error-view">Tema no encontrado.</div>;
  }

  const Component = ChapterComponent || PendingChapter;
  return (
    <Component
      chapterId={chapterId}
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onNavigate={onNavigate}
    />
  );
};
