import React from 'react';
import {
  Card,
  Heading,
  IconButton,
  Popover,
  Whisper,
  Tag,
  List,
  Text,
} from 'rsuite';
import classNames from 'classnames';
import PlusIcon from '@rsuite/icons/Plus';

import { NoteCard } from '../../../notes';
import { displayDate } from '../../../common';
import { useStatistics } from '../../hooks/useStatistics';

import styles from './Statistics.module.scss';

import { INote } from '../../../../interfaces';

interface IDefaultPopoverProps {
  content: string;
  title: string;
  color: string;
  notes: INote[];
}

const DefaultPopover: React.FC<IDefaultPopoverProps> = React.forwardRef(
  ({ content, title, color, notes, ...props }, ref: any) => {
    return (
      <Popover
        ref={ref}
        title={
          <Heading
            level={6}
            className={styles.headingTag}
            style={{
              backgroundColor: color,
            }}
          >
            {title}
          </Heading>
        }
        {...props}
      >
        <div>
          <List bordered size="xs" className={styles.list}>
            {notes.map((note) => (
              <List.Item className={styles.listItem}>
                <Text weight="bold">{note.title}</Text>
                <Text>{displayDate(note.created)}</Text>
              </List.Item>
            ))}
          </List>
        </div>
      </Popover>
    );
  },
);

export const Statistics = () => {
  const { lastNotes, hashTagsWithNotes, openCreatingModal } = useStatistics();

  return (
    <div>
      <div>
        <Heading level={4}>Хэштеги: </Heading>

        <div className={styles.contentItem}>
          {hashTagsWithNotes?.map((hashTag) => (
            <Whisper
              key={hashTag.id}
              enterable
              trigger={'hover'}
              placement="rightStart"
              controlId={hashTag.id}
              speaker={
                <DefaultPopover
                  title={'# ' + hashTag.text}
                  content={`I am positioned to the rightStart`}
                  color={hashTag.color}
                  notes={hashTag.notes}
                />
              }
            >
              <Tag
                key={hashTag.id}
                size="md"
                style={{
                  backgroundColor: hashTag.color,
                }}
              >
                {hashTag.text} | {hashTag.notes.length}
              </Tag>
            </Whisper>
          ))}
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
            <IconButton
              onClick={openCreatingModal}
              className={styles.addBtn}
              icon={<PlusIcon />}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
