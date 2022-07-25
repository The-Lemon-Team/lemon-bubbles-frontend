import React from 'react';
import { IconButton, Table } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import MenuIcon from '@rsuite/icons/Menu';
import GridIcon from '@rsuite/icons/Grid';

import styles from './NotesTable.module.scss';

import { IHashTag, INote } from '../../../../interfaces';
import { Hashtag } from '../../../../components/Hashtag';
import { format } from 'date-fns';

interface NotesTableProps {
  isCreatingMode: boolean;
  mode: 'table' | 'cards';
  isLoading: boolean;
  notes: INote[];

  toggleCreatingMode: () => void;
}

export const NotesTable: React.FC<NotesTableProps> = ({
  notes,
  isLoading,
  isCreatingMode,
  mode,

  toggleCreatingMode,
}) => {
  return (
    <div>
      <div className={styles.actions}>
        <div>
          <IconButton
            icon={<AddOutlineIcon />}
            onClick={toggleCreatingMode}
            active={isCreatingMode}
            circle
          />
        </div>
        <div>
          <IconButton
            icon={<GridIcon />}
            appearance="subtle"
            active={mode === 'cards'}
          />
          <IconButton
            icon={<MenuIcon />}
            appearance="subtle"
            active={mode === 'table'}
          />
        </div>
      </div>
      <Table
        loading={isLoading}
        height={300}
        data={notes}
        headerHeight={50}
        className={styles.table}
      >
        <Table.Column flexGrow={2} key="title">
          <Table.HeaderCell style={{ padding: '4px 20px' }}>
            <h3 className={styles.header}>Title</h3>
          </Table.HeaderCell>
          <Table.Cell dataKey="title" style={{ padding: '4px 20px' }}>
            {({ title }) => {
              return <h4 className={styles.title}>{title}</h4>;
            }}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={2} key="description">
          <Table.HeaderCell style={{ padding: '4px 20px 4px 0' }}>
            <h3 className={styles.header}>Description</h3>
          </Table.HeaderCell>
          <Table.Cell
            dataKey="description"
            style={{ padding: '4px 25px 4px 5px' }}
          />
        </Table.Column>
        <Table.Column flexGrow={1} key="created">
          <Table.HeaderCell style={{ padding: '4px 20px 4px 0' }}>
            <h3 className={styles.header}>Created Date</h3>
          </Table.HeaderCell>
          <Table.Cell dataKey="created" style={{ padding: 4 }}>
            {({ created }) => format(new Date(created), 'd MMM Y')}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={2} key="hashTags">
          <Table.HeaderCell style={{ padding: '4px 20px 4px 0' }}>
            <h3 className={styles.header}>HashTags</h3>
          </Table.HeaderCell>
          <Table.Cell dataKey="hashTags" style={{ padding: 4 }}>
            {({ hashTags }) => {
              return hashTags.map((hashTag: IHashTag) => (
                <Hashtag
                  key={hashTag.id}
                  color={hashTag.color}
                  text={hashTag.text}
                />
              ));
            }}
          </Table.Cell>
        </Table.Column>
      </Table>
    </div>
  );
};
