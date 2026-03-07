export const updateDocumentTitle = (title: string): void => {
  document.title = title;
};

export const updateHistory = (path: string): void => {
  if (typeof window !== 'undefined' && window.history?.pushState) {
    window.history.pushState({}, '', path);
  }
};