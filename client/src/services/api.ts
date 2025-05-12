const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const BoardService = {
  async getBoard(boardId: string) {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`);
    return response.json();
  },

  async updateBoard(boardId: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};