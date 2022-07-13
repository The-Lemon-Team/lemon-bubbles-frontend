import React from 'react';
import fontColorContrast from 'font-color-contrast';
import cn from 'classnames';
import { Divider } from 'rsuite';

import styles from './HashtagList.module.scss';

import { IHashTag } from '../../../../interfaces';

interface HashtagListProps {
  usedHashtags: IHashTag[];
  unusedHashtags?: string[];
}

export const HashtagList: React.FC<HashtagListProps> = ({
  usedHashtags,
  unusedHashtags = [],
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {usedHashtags.map((hashtag) => (
          <div
            key={hashtag.id}
            className={styles.item}
            style={{
              backgroundColor: hashtag.color,
              color: fontColorContrast(hashtag.color),
            }}
          >
            #{hashtag.text}
          </div>
        ))}
      </div>
      {!!unusedHashtags?.length && (
        <>
          <Divider className={styles.divider} />
          <div className={styles.list}>
            {unusedHashtags.map((tag) => (
              <div key={tag} className={cn(styles.item, styles.unusedItem)}>
                #{tag}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
