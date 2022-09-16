import React from 'react';
import { Container, Content, Panel, FlexboxGrid } from 'rsuite';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Content>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{
            height: '100%',
          }}
        >
          <FlexboxGrid.Item colspan={6}>
            <Panel style={{ overflow: 'initial' }}>
              <Outlet />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
