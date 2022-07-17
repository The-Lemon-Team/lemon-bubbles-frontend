import React from 'react';
import { Container, Grid, Row, Navbar, Nav, Avatar } from 'rsuite';

import avatarSrc from './avatar.jpg';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <Container className={styles.main}>
      <Grid>
        <Row>
          <Navbar className={styles.navbar}>
            <Navbar.Brand className={styles.title}>
              Lemon Bubbles - deployed twice!
            </Navbar.Brand>
            <Nav pullRight>
              <div className={styles.avatar}>
                <Avatar src={avatarSrc} circle />
              </div>
            </Nav>
          </Navbar>
        </Row>
      </Grid>
    </Container>
  );
};
