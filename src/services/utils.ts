export const API_URL = process.env.REACT_APP_API_URL;

export function parseTimestamp(timestamp: string): Date {
  return new Date(timestamp);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}
