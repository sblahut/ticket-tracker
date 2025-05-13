import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './components/Column.tsx';
import './App.css';

function App() {
  const [boardName, setBoardName] = useState('My Board');
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [columns, setColumns] = useState({});

  // Load board and columns from localStorage on mount
  useEffect(() => {
    const savedBoard = localStorage.getItem(boardName);
    if (savedBoard) {
      setColumns(JSON.parse(savedBoard));
    }
  }, [boardName]);

  // Save columns to localStorage
  const saveBoard = (newColumns) => {
    localStorage.setItem(boardName, JSON.stringify(newColumns));
    setColumns(newColumns);
  };

  // Add a new column to the board
  const addColumn = () => {
    const newColumnId = `column-${Date.now()}`;
    const newColumns = {
      ...columns,
      [newColumnId]: {
        id: newColumnId,
        title: 'New Column',
        tickets: []
      }
    };
    saveBoard(newColumns);
  };

  // Delete a column from the board
  const deleteColumn = (columnId) => {
    const newColumns = { ...columns };
    delete newColumns[columnId];
    saveBoard(newColumns);
  };

  // Add a new ticket to a column
  const addTicket = (columnId) => {
    const newTicket = {
      id: `ticket-${Date.now()}`,
      title: 'New Ticket',
      description: ''
    };
    
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tickets: [...columns[columnId].tickets, newTicket]
      }
    };
    saveBoard(newColumns);
  };

  // Update an existing ticket in a column
  const updateTicket = (columnId, ticketId, updates) => {
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tickets: columns[columnId].tickets.map(ticket => 
          ticket.id === ticketId ? { ...ticket, ...updates } : ticket
        )
      }
    };
    saveBoard(newColumns);
  };

  // Handle column and ticket drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'column') {
      const entries = Object.entries(columns);
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reorderedColumns = Object.fromEntries(entries);
      saveBoard(reorderedColumns);
      return;
    }

    // Handle ticket dragging within the same column or between columns
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newTickets = Array.from(column.tickets);
      const [removed] = newTickets.splice(source.index, 1);
      newTickets.splice(destination.index, 0, removed);

      saveBoard({
        ...columns,
        [source.droppableId]: {
          ...column,
          tickets: newTickets
        }
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTickets = Array.from(sourceColumn.tickets);
      const destTickets = Array.from(destColumn.tickets);
      const [removed] = sourceTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      saveBoard({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tickets: sourceTickets
        },
        [destination.droppableId]: {
          ...destColumn,
          tickets: destTickets
        }
      });
    }
  };

  // Update the title of a column
  const updateColumnTitle = (columnId, newTitle) => {
    const updatedColumns = { 
      ...columns, 
      [columnId]: { 
        ...columns[columnId], 
        title: newTitle 
      } 
    };
    saveBoard(updatedColumns);
  };

  return (
    <div className="App">
      {isEditingBoard ? (
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          onBlur={() => setIsEditingBoard(false)}
          autoFocus
        />
      ) : (
        <h1 onClick={() => setIsEditingBoard(true)}>{boardName}</h1>
      )}
      <button onClick={addColumn}>Add Column</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div 
              className="board"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Object.values(columns).map((column, index) => (
                <Column 
                  key={column.id}
                  column={column}
                  index={index}
                  onDelete={() => deleteColumn(column.id)}
                  onAddTicket={() => addTicket(column.id)}
                  onUpdateTicket={(ticketId, updates) => updateTicket(column.id, ticketId, updates)}
                  onUpdateTitle={updateColumnTitle}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
