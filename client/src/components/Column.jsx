import React, { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Ticket from './Ticket';
import './Column.css';

const Column = ({ column, index, onDelete, onAddTicket, onUpdateTicket, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleTitleSubmit = () => {
    onUpdateTitle(column.id, title);  // Update column title
    setIsEditing(false);
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
