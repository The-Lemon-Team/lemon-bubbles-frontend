import React from 'react';

import styles from './HashtagList.module.scss';

import { IHashTag } from '../../../../interfaces';

interface HashtagListProps {
  hashtags: IHashTag[];
}

export const HashtagList: React.FC<HashtagListProps> = ({ hashtags }) => {
  return (
    <div className={styles.list}>
      {hashtags.map((hashtag) => (
        <div className={styles.item} style={{ backgroundColor: hashtag.color }}>
          {hashtag.text}
        </div>
      ))}
    </div>
  );
};
