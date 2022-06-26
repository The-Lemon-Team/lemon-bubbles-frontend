import React from 'react';

import { NoteList } from '../NoteList';

import styles from './Board.module.scss';

export const Board = () => {
  return (
    <div className={styles.main}>
      <NoteList />
    </div>
  );
};
