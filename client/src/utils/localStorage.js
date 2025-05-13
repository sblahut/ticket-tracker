export const saveBoard = (boardId, data) => {
  localStorage.setItem(boardId, JSON.stringify(data));
};

export const loadBoard = (boardId) => {
  const data = localStorage.getItem(boardId);
  return data ? JSON.parse(data) : null;
};