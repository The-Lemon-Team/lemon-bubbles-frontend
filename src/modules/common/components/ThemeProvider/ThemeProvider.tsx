import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CustomProvider } from 'rsuite';

import { useAppSelector } from '../../stores/hooks';
import { toggleTheme as toggleThemeAction } from '../../../board/stores/commonSlice';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction());
  }, [dispatch]);
  const theme = useAppSelector((state) => state.common.theme);

  return <CustomProvider theme={theme}>{children}</CustomProvider>;
};
