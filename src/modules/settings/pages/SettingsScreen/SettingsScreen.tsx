import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from 'rsuite';
import UserChangeIcon from '@rsuite/icons/UserChange';
import PieChartIcon from '@rsuite/icons/PieChart';
import TagIcon from '@rsuite/icons/Tag';
import ListIcon from '@rsuite/icons/List';

import { Statistics, UserForm, Notes, CopyRight } from '../../components';
import { MainLayout } from '../../../common/components';
import { useRouteMatch } from '../../../common/hooks';

import styles from './SettingsScreen.module.scss';

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const isSettingsPage = useRouteMatch('/settings');
  const isUserPage = useRouteMatch('/settings/user');
  const isStatisticsPage = useRouteMatch('/settings/statistics');
  const isHashTagsPage = useRouteMatch('/settings/hashtags');
  const isNotesPage = useRouteMatch('/settings/notes');
  const isCopyrightPage = useRouteMatch('/settings/copyright');

  useEffect(() => {
    if (isSettingsPage) {
      navigate('/settings/user');
    }
  }, []);

  return (
    <MainLayout
      content={
        <div className={styles.main}>
          <Nav vertical style={{ width: 185 }} appearance="tabs">
            <Nav.Item
              eventKey="user"
              active={isUserPage}
              onClick={() => navigate('/settings/user')}
            >
              Пользователь
              <div className={styles.menuIcon}>
                <UserChangeIcon />
              </div>
            </Nav.Item>
            <Nav.Item
              eventKey="statistics"
              active={isStatisticsPage}
              onClick={() => navigate('/settings/statistics')}
            >
              Статистика
              <div className={styles.menuIcon}>
                <PieChartIcon />
              </div>
            </Nav.Item>
            <Nav.Item
              eventKey="hashtags"
              active={isHashTagsPage}
              onClick={() => navigate('/settings/hashtags')}
            >
              Хэштеги
              <div className={styles.menuIcon}>
                <TagIcon />
              </div>
            </Nav.Item>
            <Nav.Item
              active={isNotesPage}
              eventKey="notes"
              onClick={() => navigate('/settings/notes')}
            >
              Записи
              <div className={styles.menuIcon}>
                <ListIcon />
              </div>
            </Nav.Item>
            <Nav.Item
              active={isCopyrightPage}
              eventKey="copyright"
              onClick={() => navigate('/settings/copyright')}
            >
              Copyright ©
            </Nav.Item>
          </Nav>

          <div className={styles.content}>
            {isUserPage && <UserForm />}
            {isStatisticsPage && <Statistics />}
            {isNotesPage && <Notes />}
            {isCopyrightPage && <CopyRight />}
          </div>
        </div>
      }
    />
  );
};
