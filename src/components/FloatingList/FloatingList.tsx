import React, { useRef, useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { subDays } from 'date-fns';
import EditIcon from '@rsuite/icons/Edit';
import classNames from 'classnames';
import {
  DateRangePicker,
  Popover,
  Panel,
  Whisper,
  Nav,
  IconButton,
} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

import { useModalManager } from './useModalManager';
import { NoteList } from '../NoteList';
import { AddNoteContainer } from '../../modules/notes/containers';

import styles from './FloatingList.module.scss';

import { INote } from '../../interfaces';

interface FloatingListProps {
  notes?: INote[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  eventKey: string;
  active: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, eventKey, active, ...other } = props;

  return (
    <div role="tabpanel" hidden={!active} {...other}>
      {active && <div>{children}</div>}
    </div>
  );
};

export const FloatingList: React.FC<FloatingListProps> = () => {
  const boxRef = useRef(null);
  const poperRef = useRef(null);
  const {
    isCreatingMode,
    isEditMode,
    openCreatingMode,
    closeCreatingMode,
    toggleCreatingMode,
    togleEditMode,
  } = useModalManager();
  const [activeTab, setActiveTab] = React.useState('notes');
  const [notes, setNotes] = React.useState([
    {
      id: '1',
      title: 'Title #1',
      description: 'Description #1',
      created: subDays(new Date(), 2).toString(),
      hashTags: [
        {
          id: 'h-1',
          created: new Date().toString(),
          text: 'Пожрал',
          color: '#1976d2',
        },
      ],
    },
    {
      id: '2',
      title: 'Title Title Title Title #2',
      description: 'Description #2',
      created: new Date().toString(),
      hashTags: [
        {
          id: 'h-3233',
          created: new Date().toString(),
          text: 'Пожрал',
          color: '#42a5f5',
        },
        {
          id: 'h-4112',
          created: new Date().toString(),
          text: 'посрал',
          color: '#42a5f5',
        },
      ],
    },
  ]);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
  };
  const [sizes, setSizes] = useState({
    height: '300',
    width: '450',
  });

  const handleCreatingMode = useCallback(() => {
    if (isCreatingMode) {
      closeCreatingMode();
    } else {
      openCreatingMode();
    }
  }, [isCreatingMode, closeCreatingMode, openCreatingMode]);

  const addNote = useCallback(
    (newNote: INote) => {
      closeCreatingMode();
      setNotes([...notes, newNote]);
    },
    [notes, setNotes, closeCreatingMode],
  );

  return (
    <div className={styles.container}>
      <Rnd
        resizible="true"
        minHeight={300}
        className={styles.resizbleContainer}
        dragHandleClassName="rnd-drag"
        minWidth={480}
        onDragStart={() => {
          closeCreatingMode();
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSizes({
            width: ref.style.width,
            height: ref.style.height,
          });
        }}
        size={sizes}
      >
        <Panel shaded className={classNames(styles.wrapper)} ref={boxRef}>
          <div className={styles.menuWrapper}>
            <Nav
              activeKey={activeTab}
              appearance="subtle"
              className={classNames(styles.tabs, 'rnd-drag')}
              onSelect={handleTabChange}
            >
              <Nav.Item eventKey="notes">By notes</Nav.Item>
              <Nav.Item eventKey="hashtags">By hashtag</Nav.Item>
            </Nav>
            <div className={styles.actions}>
              <div className={styles.actionWrapper}>
                <IconButton
                  active={isEditMode}
                  appearance="primary"
                  color={'green'}
                  icon={<EditIcon />}
                  onClick={togleEditMode}
                  circle
                />
              </div>
              <div className={styles.actionWrapper}>
                <Whisper
                  open={isCreatingMode}
                  onClick={handleCreatingMode}
                  trigger="none"
                  placement="rightStart"
                  speaker={
                    <Popover ref={poperRef} className={styles.creatingCloud}>
                      <Panel className={styles.creatingWrapper}>
                        <AddNoteContainer onAdd={addNote} />
                      </Panel>
                    </Popover>
                  }
                >
                  <IconButton
                    active={isCreatingMode}
                    appearance="primary"
                    icon={<PlusIcon />}
                    color={'blue'}
                    circle
                  />
                </Whisper>
              </div>
            </div>
          </div>

          <DateRangePicker className={styles.datePicker} />

          <div className={classNames(styles.contentWrapper, 'rnd-drag')}>
            <TabPanel active={activeTab === 'notes'} eventKey="notes">
              <NoteList notes={notes} />
            </TabPanel>
            <TabPanel active={activeTab === 'hashtags'} eventKey="hashtags">
              By hashtag list
            </TabPanel>
          </div>
        </Panel>
      </Rnd>
    </div>
  );
};
