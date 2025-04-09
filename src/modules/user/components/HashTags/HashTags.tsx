import React from 'react';
import { Heading } from 'rsuite';

import { generateHashTags } from '../../../common/api/dev/hashtags.mock';
import { HashTag } from '../../../common/components/HashTag';

import styles from './HashTags.module.scss';

const hashTags = generateHashTags(20);

export const HashTags = () => {
  return (
    <div>
      <Heading level={4}>Хэштеги: </Heading>

      <div className={styles.hashTagsContainer}>
        {hashTags.map((hashTag) => (
          <div className={styles.hashTag}>
            <HashTag key={hashTag.id} color={hashTag.color}>
              {hashTag.text}
            </HashTag>
          </div>
        ))}
      </div>
    </div>
  );
};
