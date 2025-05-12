import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Ticket.css';

const Ticket = ({ ticket, index }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className="ticket"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {ticket.content}
        </div>
      )}
    </Draggable>
  );
}

export default Ticket;
