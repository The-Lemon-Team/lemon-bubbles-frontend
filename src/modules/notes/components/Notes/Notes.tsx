import React from 'react';
import {
  Dropdown,
  IconButton,
  Message,
  Popover,
  Table,
  Text,
  Whisper,
  Button,
  Pagination,
} from 'rsuite';
import cn from 'classnames';
import { format } from 'date-fns';
import MoreIcon from '@rsuite/icons/More';

import { NotFound } from '../NotFound';
import { LineTag } from '../../../hashTags';

import { IHashTag, INote } from '../../../../interfaces';

import styles from './Notes.module.scss';

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

interface INotesProps {
  isLoading: boolean;
  data: INote[];
  error?: boolean;
  pagination: {
    page: number;
    limit: number;
    totalItems?: number;
  };

  onRefresh?: () => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPageChange: (page: number) => void;
}

export const Notes: React.FC<INotesProps> = ({
  isLoading,
  data,
  error,
  pagination,

  onCreate,
  onRefresh,
  onDelete,
  onEdit,
  onPageChange,
}) => {
  return (
    <div>
      <Table
        height={520}
        loading={isLoading}
        renderEmpty={() => {
          return error ? (
            <EmptyPlaceholder onRefresh={onRefresh} />
          ) : (
            <NotFound onCreate={onCreate} />
          );
        }}
        data={data}
        renderRow={(children, item) => {
          return item?.dayLabel ? <div>{item.dayLabel}</div> : <>{children}</>;
        }}
        headerHeight={50}
        className={styles.table}
      >
        <Table.Column flexGrow={2} key="title">
          <Table.HeaderCell
            className={styles.headerCell}
            style={{ padding: '4px 20px', marginRight: '2px' }}
          >
            <Text size="md">Title</Text>
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
            <Text size="md">Description</Text>
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
            <Text size="md">Date</Text>
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
            <Text size="md">HashTags</Text>
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
      <div className={styles.paginationWrapper}>
        <Pagination
          prev
          last
          next
          first
          total={pagination.totalItems || 0}
          limit={pagination.limit}
          activePage={pagination.page}
          onChangePage={onPageChange}
        />
      </div>
    </div>
  );
};
