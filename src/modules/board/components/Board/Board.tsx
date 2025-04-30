import { MainLayout } from '../../../common';
import { NotesTablesContainer } from '../../../notes';

export const Board = () => {
  return <MainLayout content={<NotesTablesContainer />} />;
};
