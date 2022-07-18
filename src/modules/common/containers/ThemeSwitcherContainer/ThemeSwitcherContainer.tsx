import React from 'react';
import { Toggle } from 'rsuite';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../stores';

export const ThemeSwitcherContainer = observer(() => {
  const { boardUIStore } = useRootStore();

  // console.log(boardUIStore.themeStore.isDarkMode);

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
