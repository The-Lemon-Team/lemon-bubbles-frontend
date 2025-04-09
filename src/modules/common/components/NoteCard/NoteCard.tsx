import { Card, Divider, Text } from 'rsuite';
import { format } from 'date-fns';

import { HashTag } from '../HashTag';

import styles from './NoteCard.module.scss';

import { IHashTag } from '../../../../interfaces';

interface INoteCardProps {
  title: string;
  description: string;
  created: string;
  hashTags?: IHashTag[];
  className?: string;
  width?: number;
  showHashTags?: boolean;
}

export const NoteCard: React.FC<INoteCardProps> = ({
  title,
  description,
  created,
  className = '',
  hashTags,
  showHashTags = true,
  width = 240,
}) => (
  <Card width={width} bordered className={className}>
    <Card.Header as="h5">{title}</Card.Header>
    <Card.Body>
      {description.length >= 50
        ? description.slice(0, 50) + '...'
        : description}

      {hashTags && (
        <>
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
        </>
      )}
    </Card.Body>
    <Divider
      style={{
        margin: '8px 0 20px',
      }}
    />
    <Card.Footer>
      <Text muted>{format(new Date(created), 'do MMM yyy')}</Text>
    </Card.Footer>
  </Card>
);
