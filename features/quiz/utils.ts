// Placeholder for Quiz feature utility functions

export const formatQuizScore = (score: number, total: number): string => {
  if (total === 0) return 'N/A';
  const percentage = Math.round((score / total) * 100);
  return `${score}/${total} (${percentage}%)`;
}; 