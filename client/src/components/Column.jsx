import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Ticket from './Ticket';
import './Column.css';

const Column = ({ column }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="ticket-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tickets.map((ticket, index) => (
              <Ticket key={ticket.id} ticket={ticket} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
