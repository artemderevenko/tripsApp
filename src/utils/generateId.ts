export const generateId = (): string => {
  return `${Math.random().toString(36).substring(3, 11)}-${Math.random().toString(36).substring(7, 11)}-${Math.random().toString(36).substring(7, 11)}-${Math.random().toString(36).substring(7, 11)}-${Math.random().toString(36).substring(2, 15)}`;
}