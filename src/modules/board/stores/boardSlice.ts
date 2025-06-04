import { createSlice } from '@reduxjs/toolkit';

import {
  DEFAULT_FLOATING_HEIGHT,
  DEFAULT_FLOATING_WIDTH,
  DEFAULT_FLOATING_X,
  DEFAULT_FLOATING_Y,
} from '../../../constants';
import { IBoardStore } from '../../common';
import { getInitialDates } from '../../common/utils/dateFns';

import { ICoordinates, IDateRange, ISizes } from '../../../interfaces';

const dates = getInitialDates();
const initialState: IBoardStore = {
  mode: 'table',
  dateRange: {
    startDate: dates.startDate,
    endDate: dates.endDate,
  },
  floatingList: {
    sizes: {
      width: DEFAULT_FLOATING_WIDTH,
      height: DEFAULT_FLOATING_HEIGHT,
    },
    coords: {
      x: DEFAULT_FLOATING_X,
      y: DEFAULT_FLOATING_Y,
    },
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: (create) => ({
    setTableMode: (state) => {
      state.mode = 'table';
    },
    setCardsMode: (state) => {
      state.mode = 'cards';
    },

    setDate: create.reducer<IDateRange>((state, action) => {
      state.dateRange = action.payload;
    }),

    setCoordinates: create.reducer<ICoordinates>((state, action) => {
      state.floatingList.coords = action.payload;
    }),
    setSizes: create.reducer<ISizes>((state, action) => {
      state.floatingList.sizes = action.payload;
    }),
  }),
});

export const { setCardsMode, setCoordinates, setDate, setSizes, setTableMode } =
  boardSlice.actions;
