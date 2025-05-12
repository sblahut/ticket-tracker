import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Ticket.css';

const Ticket = ({ ticket, index, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: ticket.title,
    description: ticket.description
  });

  const handleSubmit = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className="ticket"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className="ticket-edit">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
              />
              <button onClick={handleSubmit}>Save</button>
            </div>
          ) : (
            <div onClick={() => setIsEditing(true)}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Ticket;
