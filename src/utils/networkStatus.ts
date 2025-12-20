export const isOnline = (): boolean => {
  return typeof navigator !== "undefined" && navigator.onLine;
};

export const isOffline = (): boolean => {
  return !isOnline();
};

