import React, { useEffect } from 'react';
import {
  Card,
  Heading,
  IconButton,
  Popover,
  Whisper,
  Tag,
  List,
  Text,
  Pagination,
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
  const {
    lastNotes,
    hashTagsWithNotes,
    pagination,
    created,
    openCreatingModal,
    setPage,
  } = useStatistics();

  useEffect(() => {
    if (created) {
      setPage(1);
    }
  }, [created]);

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
      <Heading level={4} className={styles.headerWrapper}>
        <Text>Записи:</Text>
        <Pagination
          prev
          last
          next
          first
          total={pagination.totalItems || 0}
          limit={5}
          activePage={pagination.page}
          onChangePage={setPage}
        />
      </Heading>

      <div>
        <div className={classNames(styles.contentItem, styles.notes)}>
          {lastNotes.map((note) => (
            <NoteCard
              className={styles.card}
              key={note.id}
              title={note.title}
              created={note.created}
              description={note.description}
              width={200}
            />
          ))}
          <Card width={200}>
            <IconButton
              onClick={openCreatingModal}
              className={classNames(styles.addBtn, styles.card)}
              icon={<PlusIcon />}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
