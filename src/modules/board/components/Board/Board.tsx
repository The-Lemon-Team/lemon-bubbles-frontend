import { useEffect } from 'react';
import { Container, Grid, Row, Col, Modal } from 'rsuite';
import { useNavigate } from 'react-router-dom';

import { NotesTablesContainer } from '../../containers';
import { LivingBackground } from '../../../common/components';
import { FloatingList } from '../FloatingList';

import { ModalsManager } from '../ModalsManager';

import { useFeatureFlag } from '../../../common/hooks/useFeatureFlag';
import { useUser } from '../../hooks/useUser';

import styles from './Board.module.scss';

export const Board = () => {
  const isFloatingWindowActivated = useFeatureFlag('floatingWindow');
  const navigate = useNavigate();
  const { user, isLoading, loadUserByToken } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      loadUserByToken()
        .unwrap()
        .catch(() => navigate('/'));
    }
  }, []);

  return (
    <div className={styles.main}>
      <Container className={styles.container}>
        <Grid className={styles.grid}>
          <Row className={styles.tableWrapper}>
            <Col xl={24}>
              <NotesTablesContainer />
            </Col>
          </Row>
        </Grid>
      </Container>
      {isFloatingWindowActivated && <FloatingList />}
      <ModalsManager />

      <div className={styles.background}>
        <LivingBackground />
      </div>
    </div>
  );
};
