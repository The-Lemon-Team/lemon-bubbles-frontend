import {
  Container,
  Divider,
  Content,
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
} from 'rsuite';
import GoogleIcon from '@rsuite/icons/legacy/Google';

import styles from './LoginForm.module.scss';

export interface ILoginFormProps {
  onGoogleAuth: () => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onGoogleAuth }) => {
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
            <Panel>
              <Form fluid>
                <Form.Group>
                  <div>
                    <div className={styles.formWrapper}>
                      <Button
                        color="red"
                        appearance="primary"
                        size="lg"
                        onClick={onGoogleAuth}
                        block
                      >
                        <GoogleIcon /> Авторизировать с помощью Google
                      </Button>
                    </div>
                    <div>
                      <Divider>или</Divider>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>
                    Username or email address
                  </Form.ControlLabel>
                  <Form.Control disabled name="name" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    disabled
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group>
                  <FlexboxGrid justify="start" align="middle">
                    <span>Ещё не зарегистрированы? </span>
                    <Button appearance="link">Создать аккаунт</Button>
                  </FlexboxGrid>
                </Form.Group>

                <ButtonToolbar>
                  <Button appearance="primary" block size="md" disabled>
                    Войти
                  </Button>
                </ButtonToolbar>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
