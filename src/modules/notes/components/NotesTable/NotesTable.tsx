import React, { useCallback } from 'react';
import { DateRangePicker, IconButton, Panel } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import MenuIcon from '@rsuite/icons/Menu';
import { DateRange } from 'rsuite/esm/DateRangePicker';

import { Notes } from '../Notes';
import styles from './NotesTable.module.scss';

import { INote } from '../../../../interfaces';

interface NotesTableProps {
  dateRange: {
    end: Date;
    start: Date;
  };
  pagination: {
    page: number;
    limit: number;
    totalItems?: number;
  };
  isLoading: boolean;
  notes: INote[];
  error?: boolean;
  mode: 'table' | 'cards';

  toggleCreatingMode: () => void;
  onPageChange: (page: number) => void;
  onDateChange: (start: Date, end: Date) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onCreate: () => void;
  onRefresh?: () => void;
}

export const NotesTable: React.FC<NotesTableProps> = ({
  dateRange,
  error,
  notes = [],
  isLoading,
  mode = 'table',
  pagination,

  onPageChange,
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
    <Panel bordered className={styles.main}>
      <div className={styles.actions}>
        <div className={styles.filters}>
          <div className={styles.filterItem}>
            <IconButton
              icon={<AddOutlineIcon />}
              onClick={toggleCreatingMode}
              data-testid="addButton"
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
      <div className={styles.tableWrapper}>
        <Notes
          isLoading={isLoading}
          error={error}
          data={notes}
          pagination={pagination}
          onRefresh={onRefresh}
          onCreate={onCreate}
          onDelete={onDelete}
          onEdit={onEdit}
          onPageChange={onPageChange}
        />
        {/* <div className={styles.paginationWrapper}>
          <Pagination
            prev
            last
            next
            first
            total={totalItems || 0}
            limit={10}
            activePage={currentPage}
            onChangePage={onPageChange}
          />
        </div> */}
      </div>
    </Panel>
  );
};
