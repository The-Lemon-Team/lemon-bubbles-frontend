import { useDispatch } from 'react-redux';
import { Toggle } from 'rsuite';

import { toggleTheme as toggleThemeAction } from '../../../board/stores/commonSlice';
import { useAppSelector } from '../../stores/hooks';
import { ThemeMode } from '../../../../enums';

export const ThemeSwitcherContainer = () => {
  const dispatch = useDispatch();
  const toggleTheme = () => dispatch(toggleThemeAction());
  const isDarkMode =
    useAppSelector((state) => state.common.theme) === ThemeMode.DARK;

  return (
    <Toggle
      size="lg"
      unCheckedChildren="Light Mode"
      checkedChildren="Dark Mode"
      onChange={toggleTheme}
      defaultChecked={isDarkMode}
    />
  );
};
