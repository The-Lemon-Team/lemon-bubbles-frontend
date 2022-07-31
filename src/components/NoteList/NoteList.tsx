import React from 'react';
import { useMemo } from 'react';
import { Panel, PanelGroup } from 'rsuite';

import { groupNotesByDays } from '../../modules/notes/utils/groupNotesByDays';
import { Hashtag } from '../Hashtag';

import styles from './NoteList.module.scss';

import { INote } from '../../interfaces';

interface NoteListProps {
  className?: string;
  notes?: INote[];
}

export const NoteList: React.FC<NoteListProps> = ({ notes = [] }) => {
  const notesByDay = useMemo(() => groupNotesByDays(notes), [notes]);

  return (
    <div>
      {Object.keys(notesByDay).map((date, index) => {
        const notes = notesByDay[date];

        return (
          <PanelGroup accordion bordered key={date}>
            <Panel
              eventKey={date}
              header={<p className={styles.dayLabel}>{date}</p>}
              className={styles.datePanel}
            >
              {notes.map((note, index) => (
                <PanelGroup
                  accordion
                  className={styles.panelGroup}
                  key={note.id}
                >
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
