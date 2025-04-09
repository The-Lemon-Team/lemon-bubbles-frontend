import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav, Grid, Row, Col } from 'rsuite';
import UserChangeIcon from '@rsuite/icons/UserChange';
import PieChartIcon from '@rsuite/icons/PieChart';
import TagIcon from '@rsuite/icons/Tag';
import ListIcon from '@rsuite/icons/List';

import {
  Statistics,
  Profile,
  Notes,
  CopyRight,
  HashTags,
} from '../../components';
import { MainLayout } from '../../../common/components';
import { useRouteMatch } from '../../../common/hooks';

import styles from './UserScreen.module.scss';

export const UserScreen = () => {
  const navigate = useNavigate();
  const isUserPage = useRouteMatch('/user');
  const isProfilePage = useRouteMatch('/user/profile');
  const isStatisticsPage = useRouteMatch('/user/statistics');
  const isHashTagsPage = useRouteMatch('/user/hashtags');
  const isNotesPage = useRouteMatch('/user/notes');
  const isCopyrightPage = useRouteMatch('/user/copyright');

  useEffect(() => {
    if (isUserPage) {
      navigate('/user/profile');
    }
  }, []);

  return (
    <MainLayout
      content={
        <div className={styles.main}>
          <Grid fluid className={styles.grid}>
            <Row className={isCopyrightPage && styles.copyRightRow}>
              <Col xs={6}>
                <Nav vertical appearance="tabs">
                  <Nav.Item
                    eventKey="user"
                    active={isProfilePage}
                    onClick={() => navigate('/user/profile')}
                  >
                    Пользователь
                    <div className={styles.menuIcon}>
                      <UserChangeIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    eventKey="statistics"
                    active={isStatisticsPage}
                    onClick={() => navigate('/user/statistics')}
                  >
                    Статистика
                    <div className={styles.menuIcon}>
                      <PieChartIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    eventKey="hashtags"
                    active={isHashTagsPage}
                    onClick={() => navigate('/user/hashtags')}
                  >
                    Хэштеги
                    <div className={styles.menuIcon}>
                      <TagIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    active={isNotesPage}
                    eventKey="notes"
                    onClick={() => navigate('/user/notes')}
                  >
                    Записи
                    <div className={styles.menuIcon}>
                      <ListIcon />
                    </div>
                  </Nav.Item>
                  <Nav.Item
                    active={isCopyrightPage}
                    eventKey="copyright"
                    onClick={() => navigate('/user/copyright')}
                  >
                    Copyright ©
                  </Nav.Item>
                </Nav>
              </Col>

              <Col xs={18}>
                <div className={styles.content}>
                  {isProfilePage && <Profile />}
                  {isStatisticsPage && <Statistics />}
                  {isHashTagsPage && <HashTags />}
                  {isNotesPage && <Notes />}
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
