import { render, screen, fireEvent } from '@testing-library/react';
import { DragDropContext } from '@hello-pangea/dnd';
import App from './App';

describe('App Component', () => {
  test('renders board title', () => {
    render(<App />);
    expect(screen.getByText('My Board')).toBeInTheDocument();
  });

  test('allows board title editing', () => {
    render(<App />);
    const title = screen.getByText('My Board');
    fireEvent.click(title);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Board' } });
    fireEvent.blur(input);
    expect(screen.getByText('Updated Board')).toBeInTheDocument();
  });

  test('adds new column', () => {
    render(<App />);
    const addButton = screen.getByText('Add Column');
    fireEvent.click(addButton);
    expect(screen.getByText('New Column')).toBeInTheDocument();
  });
});
