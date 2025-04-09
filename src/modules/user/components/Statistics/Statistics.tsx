import React from 'react';
import { Card, Heading, IconButton } from 'rsuite';
import classNames from 'classnames';
import PlusIcon from '@rsuite/icons/Plus';

import { HashTag } from '../../../common/components/HashTag';
import { useStatistics } from '../../hooks/useStatistics';

import styles from './Statistics.module.scss';
import { NoteCard } from '../../../common/components/NoteCard';

export const Statistics = () => {
  const { hashTagsTop, lastNotes, isLoading } = useStatistics();

  return (
    <div>
      <div>
        <Heading level={4}>Хэштеги: </Heading>

        <div className={styles.contentItem}>
          <HashTag color="#9a7" size="md">
            Programming | 120
          </HashTag>

          <HashTag color="#9a7" size="md">
            Scala | 68
          </HashTag>

          <HashTag color="#9a7" size="md">
            Resume | 17
          </HashTag>
        </div>
      </div>
      <Heading level={4}>Записи: </Heading>

      <div>
        <div className={classNames(styles.contentItem, styles.notes)}>
          {lastNotes
            ?.slice(0, 5)
            .map((note) => (
              <NoteCard
                className={styles.card}
                key={note.id}
                title={note.title}
                created={note.created}
                description={note.description}
                width={180}
              />
            ))}
          <Card width={180}>
            <IconButton className={styles.addBtn} icon={<PlusIcon />} />
          </Card>
        </div>
      </div>
    </div>
  );
};
