import { useNavigate } from 'react-router-dom';
import { Nav, Grid, Row, Col } from 'rsuite';
import UserChangeIcon from '@rsuite/icons/UserChange';
import PieChartIcon from '@rsuite/icons/PieChart';
import ListIcon from '@rsuite/icons/List';

import { MainLayout, useRouteMatch } from '../../../common';
import { NotesContainer } from '../../../notes';

import { CopyRight, Profile, Statistics } from '../../components';

import {
  PROFILE_PATH,
  PROFILE_STATISTICS_PATH,
  PROFILE_NOTES_PATH,
  PROFILE_COPYRIGHT,
} from '../../../../constants/urls';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const isProfilePage = useRouteMatch(PROFILE_PATH);
  const isStatisticsPage = useRouteMatch(PROFILE_STATISTICS_PATH);
  const isNotesPage = useRouteMatch(PROFILE_NOTES_PATH);
  const isCopyrightPage = useRouteMatch(PROFILE_COPYRIGHT);

  return (
    <MainLayout
      content={
        <div className={styles.main}>
          <Grid fluid className={styles.grid}>
            <Row className={isCopyrightPage ? styles.copyRightRow : ''}>
              <Col xs={6}>
                <Nav vertical appearance="tabs">
                  <Nav.Item
                    eventKey="user"
                    active={isProfilePage}
                    onClick={() => navigate(PROFILE_PATH)}
                  >
                    Пользователь
                    <div className={styles.menuIcon}>
                      <UserChangeIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    eventKey="statistics"
                    active={isStatisticsPage}
                    onClick={() => navigate(PROFILE_STATISTICS_PATH)}
                  >
                    Статистика
                    <div className={styles.menuIcon}>
                      <PieChartIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    active={isNotesPage}
                    eventKey="notes"
                    onClick={() => navigate(PROFILE_NOTES_PATH)}
                  >
                    Записи
                    <div className={styles.menuIcon}>
                      <ListIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    active={isCopyrightPage}
                    eventKey="copyright"
                    onClick={() => navigate(PROFILE_COPYRIGHT)}
                  >
                    Copyright ©
                  </Nav.Item>
                </Nav>
              </Col>

              <Col xs={18}>
                <div className={styles.content}>
                  {isProfilePage && <Profile />}
                  {isStatisticsPage && <Statistics />}
                  {isNotesPage && <NotesContainer />}
                  {isCopyrightPage && <CopyRight />}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      }
    />
  );
};
