import { createSlice } from '@reduxjs/toolkit';

import { ICommonStore } from '../../common/api/interfaces/IStore';
import { ThemeMode } from '../../../enums';

const initialState: ICommonStore = {
  featureFlags: {
    floatingWindow: false,
  },
  theme: ThemeMode.DARK,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: () => ({
    setDarkTheme: (state) => {
      state.theme = ThemeMode.DARK;
    },
    setLightTheme: (state) => {
      state.theme = ThemeMode.LIGHT;
    },
    toggleTheme: (state) => {
      if (state.theme === ThemeMode.DARK) {
        state.theme = ThemeMode.LIGHT;
      }

      if (state.theme === ThemeMode.LIGHT) {
        state.theme = ThemeMode.DARK;
      }
    },
  }),
});

export const { toggleTheme } = commonSlice.actions;
