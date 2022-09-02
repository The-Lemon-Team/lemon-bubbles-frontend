import React from 'react';
import { Toggle } from 'rsuite';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../stores';

export const ThemeSwitcherContainer = observer(() => {
  const { settingsStore } = useRootStore();

  return (
    <Toggle
      size="lg"
      unCheckedChildren="Light Mode"
      checkedChildren="Dark Mode"
      onChange={settingsStore.themeStore.swtichMode}
      defaultChecked={settingsStore.themeStore.isDarkMode}
    />
  );
});
