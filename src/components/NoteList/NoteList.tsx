import React from 'react';
import { useMemo } from 'react';
import { Panel, PanelGroup } from 'rsuite';
import { format } from 'date-fns';

import { Hashtag } from '../Hashtag';

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
    <div>
      {Object.keys(notesByDay).map((date, index) => {
        const notes = notesByDay[date];

        return (
          <PanelGroup accordion bordered>
            <Panel
              eventKey={date}
              header={<p className={styles.dayLabel}>{date}</p>}
              className={styles.datePanel}
            >
              {notes.map((note, index) => (
                <PanelGroup accordion className={styles.panelGroup}>
                  <Panel
                    shaded
                    className={styles.notePanel}
                    header={
                      <div className={styles.noteWrapper}>
                        <p className={styles.noteLabel}>{note.title}</p>
                        <div>
                          {note.hashTags.map((hashTag) => (
                            <Hashtag {...hashTag} key={hashTag.id} />
                          ))}
                        </div>
                      </div>
                    }
                    eventKey={index}
                  >
                    <p>{note.description}</p>
                  </Panel>
                </PanelGroup>
              ))}
            </Panel>
          </PanelGroup>
        );
      })}
    </div>
  );
};
