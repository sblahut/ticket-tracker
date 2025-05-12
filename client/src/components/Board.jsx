import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Column from './Column.jsx';

const Board = () => {
  const [columns] = useState([
    { id: 'col-1', title: 'To Do' },
    { id: 'col-2', title: 'In Progress' },
    { id: 'col-3', title: 'Done' }
  ]);

  return (
    <div className="board">
      <h1>Ticket Tracker</h1>
      <div style={{ display: 'flex' }}>
        {columns.map((column, index) => (
          <Column key={column.id} column={column} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Board;
