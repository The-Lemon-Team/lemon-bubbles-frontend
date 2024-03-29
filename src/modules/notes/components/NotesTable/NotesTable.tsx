import React, { useCallback } from 'react';
import { format } from 'date-fns';
import {
  DateRangePicker,
  Dropdown,
  IconButton,
  Popover,
  Table,
  Whisper,
  Message,
  Button,
} from 'rsuite';
import { observer } from 'mobx-react-lite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import MenuIcon from '@rsuite/icons/Menu';
import MoreIcon from '@rsuite/icons/More';
import GridIcon from '@rsuite/icons/Grid';
import cn from 'classnames';

import { LineTag } from '../../../common/components';
import { CreateNoteContainer } from '../../containers/CreateNoteContainer';

import styles from './NotesTable.module.scss';

import { IHashTag, INote } from '../../../../interfaces';
import { DateRange } from 'rsuite/esm/DateRangePicker';

interface NotesTableProps {
  dateRange: {
    end: Date;
    start: Date;
  };
  error: boolean;
  isFormEnabled: boolean;
  isLoading: boolean;
  mode: 'table' | 'cards';
  notes: INote[];

  onDateChange: (start: Date, end: Date) => void;
  onDelete: (id: string) => void;
  onEdit: (note: INote) => void;
  onRefresh: () => void;
  toggleCreatingMode: () => void;
}

interface IEmptyPlaceholderProps {
  onRefresh: () => void;
}

const EmptyPlaceholder = ({ onRefresh }: IEmptyPlaceholderProps) => {
  return (
    <div className={cn(styles.notFoundWrapper, styles.messageWrapper)}>
      <Message
        showIcon
        type="error"
        header="Ошибка загрузки"
        className={styles.message}
      >
        <span>
          Попробуйте ещё раз <br />
        </span>
        <Button
          appearance="subtle"
          color="cyan"
          size="md"
          className={styles.refreshBtn}
          onClick={onRefresh}
        >
          Обновить
        </Button>
      </Message>
    </div>
  );
};

export const NotesTable: React.FC<NotesTableProps> = observer(
  ({
    dateRange,
    error,
    notes = [],
    isLoading,
    isFormEnabled,
    mode,

    onEdit,
    onRefresh,
    onDateChange,
    onDelete,
    toggleCreatingMode,
  }) => {
    const isTableMode = mode === 'table';
    const handleDateChange = useCallback(
      (value: DateRange | null) => {
        value && onDateChange(value[0], value[1]);
      },
      [onDateChange],
    );

    return (
      <div>
        <div className={styles.actions}>
          <div className={styles.filters}>
            <div className={styles.filterItem}>
              <IconButton
                icon={<AddOutlineIcon />}
                onClick={toggleCreatingMode}
                active={isFormEnabled}
                circle
              />
            </div>
            <div className={styles.filterItem}>
              <DateRangePicker
                value={[dateRange.start, dateRange.end]}
                onChange={handleDateChange}
                className={styles.dateBtn}
              />
            </div>
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
              active={isTableMode}
            />
          </div>
        </div>
        <div className={cn({ [styles.content]: isFormEnabled })}>
          {isFormEnabled && (
            <div className={styles.formWrapper}>
              <CreateNoteContainer onAdd={() => void 0} />
            </div>
          )}

          <Table
            height={450}
            loading={isLoading}
            renderEmpty={() => {
              return error ? (
                <EmptyPlaceholder onRefresh={onRefresh} />
              ) : (
                'Not found'
              );
            }}
            data={notes}
            renderRow={(children, item) => {
              return item?.dayLabel ? (
                <div>{item.dayLabel}</div>
              ) : (
                <>{children}</>
              );
            }}
            headerHeight={50}
            className={cn(styles.table, {
              [styles.tableCreatingMode]: isFormEnabled,
            })}
          >
            <Table.Column flexGrow={2} key="title">
              <Table.HeaderCell
                className={styles.headerCell}
                style={{ padding: '4px 20px', marginRight: '2px' }}
              >
                <h3 className={styles.header}>Title</h3>
              </Table.HeaderCell>
              <Table.Cell
                dataKey="title"
                wordWrap="break-word"
                style={{ padding: '4px 20px' }}
              >
                {({ title }) => {
                  return <h4 className={styles.title}>{title}</h4>;
                }}
              </Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={2} key="description">
              <Table.HeaderCell
                className={styles.headerCell}
                style={{ padding: '4px 20px 4px 0' }}
              >
                <h3 className={styles.header}>Description</h3>
              </Table.HeaderCell>
              <Table.Cell
                dataKey="description"
                style={{ padding: '4px 25px 4px 5px' }}
              />
            </Table.Column>
            <Table.Column flexGrow={1} key="created">
              <Table.HeaderCell
                className={styles.headerCell}
                style={{ padding: '4px 20px 4px 0' }}
              >
                <h3 className={styles.header}>Date</h3>
              </Table.HeaderCell>
              <Table.Cell dataKey="created" style={{ padding: 4 }}>
                {({ created }) => format(new Date(created), 'd MMM Y')}
              </Table.Cell>
            </Table.Column>
            <Table.Column flexGrow={2} key="hashTags">
              <Table.HeaderCell
                className={styles.headerCell}
                style={{ padding: '4px 20px 4px 0' }}
              >
                <h3 className={styles.header}>HashTags</h3>
              </Table.HeaderCell>
              <Table.Cell dataKey="hashTags" style={{ padding: 4 }}>
                {({ hashTags }) => {
                  return hashTags.map((hashTag: IHashTag) => (
                    <LineTag
                      key={hashTag.id}
                      color={hashTag.color}
                      text={hashTag.text}
                    />
                  ));
                }}
              </Table.Cell>
            </Table.Column>
            <Table.Column width={60}>
              <Table.HeaderCell
                className={styles.headerCell}
                style={{ padding: '4px 20px 4px 0' }}
              >
                <></>
              </Table.HeaderCell>
              <Table.Cell dataKey="id" style={{ padding: 4 }}>
                {(item) => {
                  return (
                    <Whisper
                      placement="autoVerticalStart"
                      trigger="click"
                      speaker={({ className, left, top, onClose }, ref) => {
                        return (
                          <Popover
                            ref={ref}
                            className={className}
                            style={{ left, top }}
                            full
                          >
                            <Dropdown.Menu onSelect={() => onClose()}>
                              <Dropdown.Item
                                eventKey={1}
                                onSelect={() => onDelete(item.id)}
                              >
                                Удалить
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() => onEdit(item as INote)}
                                eventKey={2}
                              >
                                Редактировать
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Popover>
                        );
                      }}
                    >
                      <IconButton appearance="subtle" icon={<MoreIcon />} />
                    </Whisper>
                  );
                }}
              </Table.Cell>
            </Table.Column>
          </Table>
        </div>
      </div>
    );
  },
);
