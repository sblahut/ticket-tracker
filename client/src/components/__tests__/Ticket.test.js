import { render, screen, fireEvent } from '@testing-library/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Ticket from '../Ticket';

const mockTicket = {
  id: 'ticket-1',
  title: 'Test Ticket',
  description: 'Test Description'
};

const TestWrapper = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="test-column" type="ticket">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

describe('Ticket Component', () => {
  test('renders ticket content', () => {
    render(
      <TestWrapper>
        <Ticket ticket={mockTicket} index={0} />
      </TestWrapper>
    );
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('allows ticket editing', () => {
    const onUpdate = jest.fn();
    render(
      <TestWrapper>
        <Ticket ticket={mockTicket} index={0} onUpdate={onUpdate} />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('Test Ticket'));
    const titleInput = screen.getByDisplayValue('Test Ticket');
    const descInput = screen.getByDisplayValue('Test Description');
    
    fireEvent.change(titleInput, { target: { value: 'Updated Ticket' } });
    fireEvent.change(descInput, { target: { value: 'Updated Description' } });
    fireEvent.click(screen.getByText('Save'));
    
    expect(onUpdate).toHaveBeenCalledWith({
      title: 'Updated Ticket',
      description: 'Updated Description'
    });
  });
});