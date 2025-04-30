import React from 'react';
import { Col, Container, Grid, Row } from 'rsuite';

import { LivingBackground } from '../LivingBackground';

import styles from './MainLayout.module.scss';

interface IMainLayoutProps {
  content: React.ReactElement;
  additional?: React.ReactElement;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({
  content,
  additional,
}) => {
  return (
    <div className={styles.main}>
      <Container className={styles.container}>
        <Grid className={styles.grid}>
          <Row className={styles.contentWrapper}>
            <Col xs={24}>{content}</Col>
          </Row>
        </Grid>
      </Container>
      {additional}

      <div className={styles.background}>
        <LivingBackground />
      </div>
    </div>
  );
};
