import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Board, Header } from './components';

export const App = () => {
  return (
    <div>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
};
