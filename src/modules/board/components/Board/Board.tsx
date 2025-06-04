import { MainLayout } from '../../../common';
import { NotesBoardContainer } from '../../../notes';

import { useBoard } from '../../hooks/useBoard';

export const Board = () => {
  const { mode, changeDate } = useBoard();

  return (
    <MainLayout
      content={
        <NotesBoardContainer
          mode={mode as 'table' | 'cards'}
          onDateChange={changeDate}
        />
      }
    />
  );
};
