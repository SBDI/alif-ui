// Placeholder for chat utility functions

export const formatTimestamp = (date?: Date): string => {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}; 