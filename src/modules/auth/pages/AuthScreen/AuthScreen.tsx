import { useCallback, useEffect } from 'react';
import { useNavigate, Route, Routes, useMatch } from 'react-router-dom';
import { Animation, Panel, IconButton, Text, Divider } from 'rsuite';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import { LoginForm } from '../../components';
import { SignUpContainer } from '../../containers';
import { Layout } from './Layout';

import { useLogged } from '../../../board/hooks/useLogged';

import styles from './AuthScreen.module.scss';

export const AuthScreen = () => {
  const { isLogged } = useLogged();
  const navigate = useNavigate();
  const match = useMatch('/auth');
  const goToAuth = useCallback(() => {
    navigate('/auth');
  }, [navigate]);

  useEffect(() => {
    if (isLogged) {
      navigate('/board');
    }
  }, [isLogged]);

  return (
    <div>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route
            path="/"
            element={
              <Animation.Bounce
                key="auth-animation"
                in={!!match}
                timeout={500}
                unmountOnExit
                transitionAppear
              >
                {(props, ref) => (
                  <Panel {...props} style={{ overflow: 'initial' }} ref={ref}>
                    <LoginForm />
                  </Panel>
                )}
              </Animation.Bounce>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Animation.Bounce
                key="sign-up-animation"
                in={!match}
                timeout={500}
                unmountOnExit
                transitionAppear
              >
                {(props, ref) => (
                  <Panel
                    {...props}
                    style={{ overflow: 'initial' }}
                    header={
                      <div className={styles.registrationHeader}>
                        <div className={styles.floating}>
                          <IconButton
                            icon={<PagePreviousIcon />}
                            circle
                            onClick={goToAuth}
                            size="lg"
                          />
                        </div>
                        <Text as="h3" align="center">
                          Зарегистрироваться
                        </Text>
                      </div>
                    }
                    ref={ref}
                  >
                    <SignUpContainer />
                  </Panel>
                )}
              </Animation.Bounce>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
