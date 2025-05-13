import { render, screen, fireEvent } from '@testing-library/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from '../Column';

const mockColumn = {
  id: 'col-1',
  title: 'Test Column',
  tickets: []
};

const mockProps = {
  column: mockColumn,
  index: 0,
  onDelete: jest.fn(),
  onAddTicket: jest.fn(),
  onUpdateTicket: jest.fn()
};

const TestWrapper = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="test-board" type="column">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

describe('Column Component', () => {
  test('renders column title', () => {
    render(
      <TestWrapper>
        <Column {...mockProps} />
      </TestWrapper>
    );
    expect(screen.getByText('Test Column')).toBeInTheDocument();
  });

  test('allows column title editing', () => {
    render(
      <TestWrapper>
        <Column {...mockProps} />
      </TestWrapper>
    );
    const title = screen.getByText('Test Column');
    fireEvent.click(title);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Column' } });
    fireEvent.blur(input);
    expect(mockProps.onUpdateTicket).toHaveBeenCalledWith(mockColumn.id, { title: 'Updated Column' });
  });
});