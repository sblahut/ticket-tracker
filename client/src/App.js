import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './components/Column.jsx';
import './App.css';

function App() {
  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'To Do',
      tickets: [
        { id: 'task-1', content: 'Create login page' },
        { id: 'task-2', content: 'Design database schema' }
      ]
    },
    'inDevelopment': {
      id: 'inDevelopment',
      title: 'In Development',
      tickets: [
        { id: 'task-3', content: 'Set up CI/CD pipeline' }
      ]
    },
    'inQA': {
      id: 'inQA',
      title: 'In QA',
      tickets: [
        { id: 'task-4', content: 'Create Repository' }
      ]
    },
    'done': {
      id: 'done',
      title: 'Done',
      tickets: [
        { id: 'task-5', content: 'Project setup' }
      ]
    }
  });

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newTickets = Array.from(column.tickets);
      const [removed] = newTickets.splice(source.index, 1);
      newTickets.splice(destination.index, 0, removed);

      setColumns({
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

      setColumns({
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

  return (
    <div className="App">
      <h1>Ticket Tracker</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.values(columns).map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
