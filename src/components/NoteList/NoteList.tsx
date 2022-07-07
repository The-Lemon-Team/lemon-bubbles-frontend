import React from 'react';
import { useMemo } from 'react';
import { Panel, PanelGroup } from 'rsuite';
import { format } from 'date-fns';

import styles from './NoteList.module.scss';

import { INote } from '../../interfaces';

interface NoteListProps {
  className?: string;
  notes?: INote[];
}

export const NoteList: React.FC<NoteListProps> = ({ notes = [] }) => {
  const notesByDay = useMemo(() => {
    return notes.reduce((result, cur) => {
      const formattedDate = format(new Date(cur.created), 'd MMM Y');

      return {
        ...result,
        [formattedDate]: result[formattedDate]
          ? [...result[formattedDate], cur]
          : [cur],
      };
    }, {} as { [key: string]: INote[] });
  }, [notes]);

  return (
    <PanelGroup accordion defaultActiveKey={1} bordered>
      {Object.keys(notesByDay).map((date, index) => {
        const notes = notesByDay[date];

        return (
          <div>
            <p className={styles.dayLabel}>{date}</p>
            {notes.map((note) => {
              return (
                <Panel header={note.title} eventKey={index}>
                  <p>{note.description}</p>
                </Panel>
              );
            })}
          </div>
        );
      })}
    </PanelGroup>
  );
};
