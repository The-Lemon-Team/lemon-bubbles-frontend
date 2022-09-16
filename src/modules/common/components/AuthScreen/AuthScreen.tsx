import React, { useCallback, useEffect } from 'react';
import { useNavigate, Route, Routes, useMatch } from 'react-router-dom';
import { Animation, Panel, IconButton } from 'rsuite';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import { LoginFormContainer, SignUpContainer } from '../../auth/containers';
import { Layout } from './Layout';

import { useFirebaseAuth } from '../../../firebase/useFirebaseAuth';

import styles from './AuthScreen.module.scss';

export function AuthScreenContainer() {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();
  const match = useMatch('/auth');
  const goToAuth = useCallback(() => {
    navigate('/auth');
  }, [navigate]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

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
                    <LoginFormContainer />
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
                        <h3>Зарегистрироваться</h3>
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
}
