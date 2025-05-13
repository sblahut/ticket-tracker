import { saveBoard, loadBoard } from '../localStorage';

describe('LocalStorage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves board data', () => {
    const boardData = {
      name: 'Test Board',
      columns: []
    };
    saveBoard('test-board', boardData);
    expect(JSON.parse(localStorage.getItem('test-board'))).toEqual(boardData);
  });

  test('loads board data', () => {
    const boardData = {
      name: 'Test Board',
      columns: []
    };
    localStorage.setItem('test-board', JSON.stringify(boardData));
    expect(loadBoard('test-board')).toEqual(boardData);
  });
});