import React from 'react';
import { Toggle } from 'rsuite';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../stores';

export const ThemeSwitcherContainer = observer(() => {
  const { boardUIStore } = useRootStore();

  return (
    <Toggle
      size="lg"
      unCheckedChildren="Light Mode"
      checkedChildren="Dark Mode"
      onChange={boardUIStore.themeStore.swtichMode}
      defaultChecked={boardUIStore.themeStore.isDarkMode}
    />
  );
});
