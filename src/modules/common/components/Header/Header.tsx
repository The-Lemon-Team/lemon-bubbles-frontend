import { useRef, useState } from 'react';
import { Container, Grid, Row, Navbar, Nav, IconButton, Button } from 'rsuite';
import SearchPeopleIcon from '@rsuite/icons/SearchPeople';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import { BoardGlobalLoader } from '../../../board';
import { Logo } from '../Logo';

import { toggleTheme as toggleThemeAction } from '../../stores/commonSlice';
import { useRouteMatch } from '../../hooks';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import { authTransport } from '../../utils';

import { ThemeMode } from '../../../../enums';
import { PROFILE_PATH, PROFILE_STATISTICS_PATH } from '../../../../constants';

import styles from './Header.module.scss';

export const Header = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const navRef = useRef(null);
  const isProfilePage = useRouteMatch(PROFILE_PATH);
  const isStatisticsPage = useRouteMatch(PROFILE_STATISTICS_PATH);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isDarkMode =
    useAppSelector((state) => state.common.theme) === ThemeMode.DARK;
  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };
  const navigateToProfile = () => {
    navigation(PROFILE_PATH);
    setUserMenuOpened(() => false);
  };
  const navigateToStatistics = () => {
    navigation(PROFILE_STATISTICS_PATH);
    setUserMenuOpened(() => false);
  };

  useOnClickOutside(navRef, () => {
    setUserMenuOpened(() => false);
  });

  return (
    <Container className={styles.main}>
      <Grid>
        <Row>
          <Navbar className={styles.navbar} as="nav">
            <Navbar.Brand className={styles.title}>
              <Button appearance="link" onClick={() => navigation('/board')}>
                <Logo className={styles.logo} />
              </Button>
            </Navbar.Brand>

            <Nav pullRight className={styles.nav}>
              <div className={styles.userContainer}>
                <IconButton
                  active={userMenuOpened}
                  icon={<SearchPeopleIcon />}
                  onClick={() => setUserMenuOpened((opened) => !opened)}
                />

                {userMenuOpened && (
                  <Nav
                    ref={navRef}
                    appearance="pills"
                    vertical
                    reversed
                    className={styles.userNav}
                  >
                    <Nav.Item
                      active={isProfilePage}
                      eventKey="users"
                      className={styles.userNavItem}
                      onClick={navigateToProfile}
                    >
                      Настройки
                    </Nav.Item>
                    <Nav.Item
                      active={isStatisticsPage}
                      eventKey="statistics"
                      className={styles.userNavItem}
                      onClick={navigateToStatistics}
                    >
                      Статистика
                    </Nav.Item>
                    <Nav.Item
                      eventKey="theme"
                      className={classNames(
                        styles.userNavItem,
                        isDarkMode && styles.themeSwitcherItem,
                        !isDarkMode && styles.lightThemeSwitcherItem,
                      )}
                      onClick={toggleTheme}
                    >
                      Dark Mode
                    </Nav.Item>
                    <Nav.Item
                      eventKey="quit"
                      className={styles.userNavItem}
                      onClick={() => authTransport.logout()}
                    >
                      Выход
                    </Nav.Item>
                  </Nav>
                )}
              </div>
            </Nav>
          </Navbar>
        </Row>
      </Grid>
      <BoardGlobalLoader />
    </Container>
  );
};
