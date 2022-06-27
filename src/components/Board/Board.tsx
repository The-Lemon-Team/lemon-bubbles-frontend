import React from 'react';

import { FloatingList } from '../FloatingList';

import styles from './Board.module.scss';

export const Board = () => {
  return (
    <div className={styles.main}>
      <FloatingList />
    </div>
  );
};
