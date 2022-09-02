import React from 'react';
import { observer } from 'mobx-react-lite';

import { CustomProvider } from 'rsuite';
import { useRootStore } from '../../stores';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    const { settingsStore } = useRootStore();
    const mode = settingsStore.themeStore.mode;

    return <CustomProvider theme={mode}>{children}</CustomProvider>;
  },
);
