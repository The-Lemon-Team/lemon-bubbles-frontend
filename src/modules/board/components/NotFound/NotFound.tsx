import React from 'react';

import { Button, Card, Heading, Text } from 'rsuite';

import styles from './NotFound.module.scss';

interface INotFoundProps {
  onCreate: () => void;
}

export const NotFound: React.FC<INotFoundProps> = ({ onCreate }) => {
  return (
    <Card className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <Heading level={4}>Нет записей</Heading>
      </div>

      <div>
        <Button
          className={styles.button}
          appearance="primary"
          onClick={onCreate}
        >
          Добавить
        </Button>
      </div>
    </Card>
  );
};
