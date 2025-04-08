import React from 'react';
import { Heading } from 'rsuite';

import { NoteCard } from '../../../common/components/NoteCard';
import { generateHashTags } from '../../../common/api/dev/hashtags.mock';

import styles from './Notes.module.scss';

interface INotesProps {}

export const Notes: React.FC<INotesProps> = () => {
  return (
    <div>
      <div className={styles.heading}>
        <Heading level={4}>Последние записи: </Heading>
      </div>
      <div>
        <NoteCard
          title="test title #1"
          description="test description #1"
          created="Apr 28, 2025"
          hashTags={generateHashTags(5)}
        ></NoteCard>
      </div>
    </div>
  );
};
