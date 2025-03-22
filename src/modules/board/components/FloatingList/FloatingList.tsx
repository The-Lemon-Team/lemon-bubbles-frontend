import React, { useRef, useCallback } from 'react';
import { Rnd, DraggableData, RndDragEvent } from 'react-rnd';
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
import { NoteList } from '../../../common/components/NoteList';
import {
  DEFAULT_FLOATING_MAX_WIDTH,
  DEFAULT_FLOATING_MAX_HEIGHT,
} from '../../../../constants';

import { useFloatingList } from './useFloatingList';
import styles from './FloatingList.module.scss';

import { INote } from '../../../../interfaces';

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

export const FloatingList: React.FC = () => {
  const { coords, sizes, setSizes, setCoordinates } = useFloatingList();

  const boxRef = useRef(null);
  const poperRef = useRef(null);
  const { isEditMode, closeCreatingMode, toggleCreatingMode, togleEditMode } =
    useModalManager();
  const [activeTab, setActiveTab] = React.useState('notes');
  const isCreatingMode = true;
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

  const createNote = useCallback(
    (newNote: INote) => {
      closeCreatingMode();
      setNotes([...notes, newNote]);
    },
    [notes, setNotes, closeCreatingMode],
  );

  const handleDragEnd = useCallback(
    (e: RndDragEvent, data: DraggableData) => {
      setCoordinates({
        x: data.x,
        y: data.y,
      });
    },
    [setCoordinates],
  );

  return (
    <div className={styles.container}>
      <Rnd
        resizible="true"
        minWidth={DEFAULT_FLOATING_MAX_WIDTH}
        minHeight={DEFAULT_FLOATING_MAX_HEIGHT}
        className={styles.resizbleContainer}
        position={coords}
        dragHandleClassName="rnd-drag"
        onDragStop={handleDragEnd}
        onDragStart={() => {
          closeCreatingMode();
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          const height = +ref.style.height.replace('px', '');
          const width = +ref.style.width.replace('px', '');

          setSizes({
            height,
            width,
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
                  onClick={toggleCreatingMode}
                  trigger="none"
                  placement="rightStart"
                  speaker={
                    <Popover ref={poperRef} className={styles.creatingCloud}>
                      <Panel className={styles.creatingWrapper}>
                        Floating Panel
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
