import React, { useRef, useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { Tab, Tabs } from '@mui/material';
import { subDays } from 'date-fns';
import EditIcon from '@rsuite/icons/Edit';
import classNames from 'classnames';
import { DateRangePicker, Popover, Panel, Whisper } from 'rsuite';
import { IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

import { useModalManager } from './useModalManager';
import { NoteList } from '../NoteList';
import { AddNote } from '../AddNote';

import styles from './FloatingList.module.scss';

import { INote } from '../../interfaces';

interface FloatingListProps {
  notes?: INote[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

export const FloatingList: React.FC<FloatingListProps> = () => {
  const boxRef = useRef(null);
  const poperRef = useRef(null);
  const {
    isCreatingMode,
    isEditMode,
    closeCreatingMode,
    toggleCreatingMode,
    togleEditMode,
  } = useModalManager();
  const [tabIndex, setTabIndex] = React.useState(0);
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
          text: 'Юнг',
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
          id: 'h-2',
          created: new Date().toString(),
          text: 'Юнг',
          color: '#42a5f5',
        },
      ],
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const [sizes, setSizes] = useState({
    height: '300',
    width: '450',
  });

  const handleCreatingMode = () => {
    toggleCreatingMode();
  };

  const addNote = useCallback(
    (newNote: INote) => {
      setNotes([...notes, newNote]);
    },
    [notes, setNotes],
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
        <Panel
          shaded
          className={classNames(styles.wrapper, 'rnd-drag')}
          ref={boxRef}
        >
          <Tabs
            value={tabIndex}
            classes={{
              flexContainer: styles.tabs,
            }}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="By notes" />
            <Tab label="By hashtag" />

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
                  trigger="click"
                  placement="rightStart"
                  speaker={
                    <Popover ref={poperRef} className={styles.creatingCloud}>
                      <Panel className={styles.creatingWrapper}>
                        <AddNote onAdd={addNote} />
                      </Panel>
                    </Popover>
                  }
                >
                  <IconButton
                    active={isCreatingMode}
                    appearance="primary"
                    icon={<PlusIcon />}
                    color={'blue'}
                    onClick={handleCreatingMode}
                    circle
                  />
                </Whisper>
              </div>
            </div>
          </Tabs>
          <div>
            <DateRangePicker className={styles.datePicker} />
          </div>
          <TabPanel value={tabIndex} index={0}>
            <NoteList notes={notes} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            By hashtag list
          </TabPanel>
        </Panel>
      </Rnd>
    </div>
  );
};
