import React from 'react';
import { observer } from 'mobx-react-lite';

import { CustomProvider } from 'rsuite';
import { useRootStore } from '../../stores';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    const { boardUIStore } = useRootStore();
    const mode = boardUIStore.themeStore.mode;

    return <CustomProvider theme={mode}>{children}</CustomProvider>;
  },
);
