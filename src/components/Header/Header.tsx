import React from 'react';
import { Avatar, Container, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import avatarSrc from './avatar.jpg';
import styles from './Header.module.scss';

const Wrapper = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
}));

export const Header = () => {
  return (
    <Wrapper>
      <Container fixed className={styles.main}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={10}>
            <div>
              <h1 className={styles.title}>Lemon Bubbles</h1>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <IconButton>
                <Avatar src={avatarSrc} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};
