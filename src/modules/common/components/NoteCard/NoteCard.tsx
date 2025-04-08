import { Card, Divider, Text } from 'rsuite';

import { HashTag } from '../HashTag';

import styles from './NoteCard.module.scss';

import { IHashTag } from '../../../../interfaces';

interface INoteCardProps {
  title: string;
  description: string;
  created: string;
  hashTags: IHashTag[];
}

export const NoteCard: React.FC<INoteCardProps> = ({
  title,
  description,
  created,
  hashTags = [],
}) => (
  <Card width={240}>
    <Card.Header as="h5">{title}</Card.Header>
    <Card.Body>
      {description}

      <Divider />
      <div className={styles.hashTagsContainer}>
        <Text
          size="md"
          style={{
            margin: 4,
          }}
        >
          Хэштеги:
        </Text>
        {hashTags.map((hashTag) => (
          <HashTag key={hashTag.id} color={hashTag.color}>
            {hashTag.text}
          </HashTag>
        ))}
      </div>
    </Card.Body>
    <Divider
      style={{
        margin: '8px 0 20px',
      }}
    />
    <Card.Footer>
      <Text muted>{created}</Text>
    </Card.Footer>
  </Card>
);
