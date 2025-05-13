import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Ticket.css';

interface TicketProps {
  ticket: {
    id: string;
    title: string;
    description: string;
  };
  index: number; // The index of the ticket within the column
  onUpdate: (updatedTicket: { title: string; description: string }) => void; // Function to update the ticket's data
}

const Ticket: React.FC<TicketProps> = ({ ticket, index, onUpdate }) => {
  // State for handling the edit mode of the ticket
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<{ title: string; description: string }>({
    title: ticket.title,
    description: ticket.description
  });

  // Handle submitting the updated ticket data
  const handleSubmit = () => {
    onUpdate(editData); // Call the parent update function
    setIsEditing(false); // Exit edit mode
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
};

export default Ticket;
