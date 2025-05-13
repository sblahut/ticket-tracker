import React, { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Ticket from './Ticket.tsx';
import './Column.css';

interface TicketData {
  id: string;
  title: string;
  description: string;
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    tickets: TicketData[]; // Array of tickets in the column
  };
  index: number; 
  onDelete: () => void; // Function to delete the column
  onAddTicket: () => void; // Function to add a new ticket to the column
  onUpdateTicket: (ticketId: string, updates: { title: string; description: string }) => void; // Function to update a ticket
  onUpdateTitle: (columnId: string, newTitle: string) => void; // Function to update column title
}

const Column: React.FC<ColumnProps> = ({ column, index, onDelete, onAddTicket, onUpdateTicket, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);

  // Handle the submission of the column title update
  const handleTitleSubmit = () => {
    onUpdateTitle(column.id, title); // Pass the updated title to the parent
    setIsEditing(false); // Exit edit mode
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="column-header" {...provided.dragHandleProps}>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                autoFocus
              />
            ) : (
              <h2 onClick={() => setIsEditing(true)}>{column.title}</h2>
            )}
            <button onClick={onDelete} className="delete-button">×</button>
          </div>
          
          <Droppable droppableId={column.id} type="ticket">
            {(provided) => (
              <div
                className="ticket-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.tickets.map((ticket, index) => (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    index={index}
                    onUpdate={(updates) => onUpdateTicket(ticket.id, updates)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          <button onClick={onAddTicket} className="add-ticket">
            + Add Ticket
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
