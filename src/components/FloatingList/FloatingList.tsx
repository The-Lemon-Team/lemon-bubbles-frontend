import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import { Rnd } from 'react-rnd';
import {
  Paper,
  Box,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Popper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import classNames from 'classnames';

import { useModalManager } from './useModalManager';
import { NoteList } from '../NoteList';
import { AddNote } from '../AddNote';

import styles from './FloatingList.module.scss';

import { INote } from '../../interfaces';

interface FloatingListProps {
  notes?: INote[];
}

const notesExample: INote[] = [
  {
    id: '1',
    title: 'Title #1',
    description: 'Description #1',
    created: new Date().toString(),
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
        // color: '#42a5f5',
      },
    ],
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const FloatingList: FC<FloatingListProps> = () => {
  const boxRef = useRef(null);
  const poperRef = useRef(null);
  const {
    isCreatingMode,
    isEditMode,
    closeCreatingMode,
    toggleCreatingMode,
    togleEditMode,
  } = useModalManager();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [sizes, setSizes] = useState({
    height: '300',
    width: '450',
  });

  const handleCreatingMode = () => {
    toggleCreatingMode();
    console.log(poperRef);
  };
  const handleCloseCreateMode = (...rest: any[]) => {
    console.log(rest);
  };

  console.log(isCreatingMode);

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
        <Paper
          elevation={6}
          className={classNames(styles.wrapper, 'rnd-drag')}
          ref={boxRef}
        >
          <Box sx={{ width: '100%', background: '#fff' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                classes={{
                  flexContainer: styles.tabs,
                }}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="By notes" />
                <Tab label="By hashtag" />

                <div className={styles.actions}>
                  <IconButton
                    color={isEditMode ? 'primary' : 'default'}
                    onClick={togleEditMode}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color={isCreatingMode ? 'primary' : 'default'}
                    onClick={handleCreatingMode}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </Tabs>
              <TabPanel value={value} index={0}>
                <NoteList notes={notesExample} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                By hashtag list
              </TabPanel>
            </Box>
          </Box>
        </Paper>
        {boxRef.current && (
          <Popper
            ref={poperRef}
            open={isCreatingMode}
            className={styles.creatingCloud}
            disablePortal={false}
            anchorEl={boxRef.current}
            placement="right-start"
          >
            <Paper
              className={styles.creatingWrapper}
              elevation={6}
              sx={{
                width: 350,
                height: 450,
              }}
            >
              <AddNote />
            </Paper>
          </Popper>
        )}
      </Rnd>
    </div>
  );
};
