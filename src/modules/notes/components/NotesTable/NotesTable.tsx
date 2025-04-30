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
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import MenuIcon from '@rsuite/icons/Menu';
import MoreIcon from '@rsuite/icons/More';
import cn from 'classnames';
import { DateRange } from 'rsuite/esm/DateRangePicker';

import { LineTag } from '../../../common/components';
import { NotFound } from '../NotFound';

import styles from './NotesTable.module.scss';

import { IHashTag, INote } from '../../../../interfaces';

interface NotesTableProps {
  dateRange: {
    end: Date;
    start: Date;
  };
  isLoading: boolean;
  notes: INote[];
  error?: boolean;
  mode?: 'table' | 'cards';

  onDateChange: (start: Date, end: Date) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onCreate: () => void;
  toggleCreatingMode: () => void;
  onRefresh?: () => void;
}

interface IEmptyPlaceholderProps {
  onRefresh?: () => void;
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

export const NotesTable: React.FC<NotesTableProps> = ({
  dateRange,
  error,
  notes = [],
  isLoading,
  mode = 'table',

  onCreate,
  onEdit,
  onRefresh,
  onDateChange,
  onDelete,
  toggleCreatingMode,
}) => {
  const isTableMode = mode === 'table';
  const handleDateChange = useCallback(
    (dateRange: DateRange | null) => {
      const [endDate, startDate] = dateRange || [];

      startDate && endDate && onDateChange(startDate, endDate);
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
              circle
            />
          </div>
          <div className={styles.filterItem}>
            <DateRangePicker
              value={[dateRange.start, dateRange.end]}
              onOk={handleDateChange}
              className={styles.dateBtn}
            />
          </div>
        </div>
        <div>
          <IconButton
            icon={<MenuIcon />}
            appearance="subtle"
            active={isTableMode}
          />
        </div>
      </div>
      <div>
        <Table
          height={450}
          loading={isLoading}
          renderEmpty={() => {
            return error ? (
              <EmptyPlaceholder onRefresh={onRefresh} />
            ) : (
              <NotFound onCreate={onCreate} />
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
          className={cn(styles.table)}
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
          <Table.Column flexGrow={2} key="hashtags">
            <Table.HeaderCell
              className={styles.headerCell}
              style={{ padding: '4px 20px 4px 0' }}
            >
              <h3 className={styles.header}>HashTags</h3>
            </Table.HeaderCell>
            <Table.Cell dataKey="hashTags" style={{ padding: 4 }}>
              {({ hashTags }) => {
                return hashTags?.map((hashTag: IHashTag) => (
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
                              onSelect={() => onEdit(item.id)}
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
};
