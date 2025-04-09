import React from 'react';
import { Heading, Table } from 'rsuite';

import { HashTag } from '../../../common/components/HashTag';
const { Column, HeaderCell, Cell } = Table;

import styles from './Notes.module.scss';
import { generateNotes } from '../../../common/api/dev/notes.mock';

import { IHashTag } from '../../../../interfaces';

const defaultColumns = [
  {
    key: 'title',
    label: 'Title',
    width: 120,
  },
  {
    key: 'description',
    label: 'Description',
    flexGrow: 1,
    width: 130,
  },
  {
    key: 'created',
    label: 'Created',
    width: 140,
  },
];

interface INotesProps {}

const notes = generateNotes(20);

export const Notes: React.FC<INotesProps> = () => {
  return (
    <div>
      <div className={styles.heading}>
        <Heading level={4}>Последние записи: </Heading>
      </div>
      <div>
        <Table height={480} hover showHeader data={notes} cellBordered>
          {defaultColumns.map((column) => {
            const { key, label, ...rest } = column;

            return (
              <Column {...rest} key={key}>
                <HeaderCell>{label}</HeaderCell>
                <Cell dataKey={key} />
              </Column>
            );
          })}
          <Column flexGrow={1} key="hashTags">
            <HeaderCell>HashTags</HeaderCell>
            <Cell dataKey="hashTags">
              {(props) => {
                const hashTags = props.hashTags as IHashTag[];

                return (
                  <>
                    {hashTags.map((hashTag) => (
                      <HashTag color={hashTag.color}>{hashTag.text}</HashTag>
                    ))}
                  </>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    </div>
  );
};
