const dontNeedLayout: string[] = ['/', '/login', '/forgot-password'];

export const isNeedLayout = (): boolean => {
  const path = window.location.pathname;
  return !dontNeedLayout.includes(path);
};
