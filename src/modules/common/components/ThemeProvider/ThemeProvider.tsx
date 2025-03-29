import React from 'react';
import { CustomProvider } from 'rsuite';

import { useAppSelector } from '../../stores/hooks';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useAppSelector((state) => state.common.theme);

  return <CustomProvider theme={theme}>{children}</CustomProvider>;
};
