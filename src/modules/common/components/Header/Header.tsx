import { useState } from 'react';
import { Container, Grid, Row, Navbar, Nav, IconButton } from 'rsuite';
import SearchPeopleIcon from '@rsuite/icons/SearchPeople';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../Logo';
import { ThemeSwitcherContainer } from '../../containers';
import { toggleTheme as toggleThemeAction } from '../../../board/stores/commonSlice';
import { BoardGlobalLoader } from '../../../board';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import { ThemeMode } from '../../../../enums';

import styles from './Header.module.scss';

export const Header = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isDarkMode =
    useAppSelector((state) => state.common.theme) === ThemeMode.DARK;
  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };
  const navigateToSettings = () => {
    navigation('/settings');
    setUserMenuOpened(() => false);
  };

  return (
    <Container className={styles.main}>
      <Grid>
        <Row>
          <Navbar className={styles.navbar}>
            <Navbar.Brand className={styles.title}>
              <Logo className={styles.logo} />
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
                    appearance="pills"
                    vertical
                    reversed
                    className={styles.userNav}
                  >
                    <Nav.Item
                      eventKey="settings"
                      className={styles.userNavItem}
                      onClick={navigateToSettings}
                    >
                      Настройки
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
                    <Nav.Item eventKey="quit" className={styles.userNavItem}>
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
