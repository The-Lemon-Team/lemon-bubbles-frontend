import React, { useState } from 'react';
import type { FC } from 'react';
import { Rnd } from 'react-rnd';
import { Paper, Box, Tab, Tabs, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useModalManager } from './useModalManager';
import { NoteList } from '../NoteList';

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
        color: 'warning',
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
        id: 'h-1',
        created: new Date().toString(),
        text: 'Юнг',
        color: 'success',
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
  const { isCreatingMode, isEditMode, toggleCreatingMode, togleEditMode } =
    useModalManager();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [sizes, setSizes] = useState({
    height: '300',
    width: '450',
  });

  return (
    <Rnd
      resizible
      minHeight={300}
      className={styles.resizbleContainer}
      minWidth={480}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSizes({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      size={sizes}
    >
      <Paper elevation={6} className={styles.wrapper}>
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
                  onClick={toggleCreatingMode}
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
    </Rnd>
  );
};
