import { observer } from 'mobx-react-lite';
import { Container, Grid, Row, Col } from 'rsuite';

import { useFeatureFlag } from '../../../common/hooks/useFeatureFlag';
import { NotesTablesContainer } from '../../../notes/containers';
import { FloatingListContainer } from '../../containers';
import { LivingBackground } from '../../../common/components';

import styles from './Board.module.scss';

export const Board = observer(() => {
  const isFloatingWindowActivated = useFeatureFlag('floatingWindow');

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
      {isFloatingWindowActivated && <FloatingListContainer />}

      <div className={styles.background}>
        <LivingBackground />
      </div>
    </div>
  );
});
