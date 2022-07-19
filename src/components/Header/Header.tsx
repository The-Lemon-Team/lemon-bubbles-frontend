import React from 'react';
import { Container, Grid, Row, Navbar, Nav } from 'rsuite';

import { Logo } from '../../modules/common/components';
import { ThemeSwitcherContainer } from '../../modules/common/containers';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <Container className={styles.main}>
      <Grid>
        <Row>
          <Navbar className={styles.navbar}>
            <Navbar.Brand className={styles.title}>
              <Logo className={styles.logo} />
            </Navbar.Brand>

            <Nav pullRight className={styles.nav}>
              <ThemeSwitcherContainer />
            </Nav>
          </Navbar>
        </Row>
      </Grid>
    </Container>
  );
};
