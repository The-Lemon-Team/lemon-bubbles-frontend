import React from 'react';
import { Table } from 'rsuite';

import { INote } from '../../../../interfaces';

interface NotesTableProps {
  notes: INote[];
}

export const NotesTable: React.FC<NotesTableProps> = ({ notes }) => {
  return <div>NotesTable</div>;
};
