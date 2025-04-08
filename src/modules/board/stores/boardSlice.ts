import { createSlice } from '@reduxjs/toolkit';

import {
  DEFAULT_FLOATING_HEIGHT,
  DEFAULT_FLOATING_WIDTH,
  DEFAULT_FLOATING_X,
  DEFAULT_FLOATING_Y,
} from '../../../constants';
import { getInitialDates } from '../../common/utils';

import { IBoardStore } from '../../common/interfaces/IStore';
import { ICoordinates, IDateRange, ISizes } from '../../../interfaces';

const dates = getInitialDates();
const initialState: IBoardStore = {
  mode: 'table',
  isCreatingMode: false,
  editId: undefined,
  deleteId: undefined,
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
    setCreatingMode: (state) => {
      state.editId = undefined;
      state.isCreatingMode = true;
    },
    resetCreatingMode: (state) => {
      state.isCreatingMode = false;
    },
    toggleCreatingMode: (state) => {
      state.deleteId = undefined;
      state.editId = undefined;
      state.isCreatingMode = !state.isCreatingMode;
    },

    setTableMode: (state) => {
      state.mode = 'table';
    },
    setCardsMode: (state) => {
      state.mode = 'cards';
    },

    setEditId: create.reducer<string>((state, action) => {
      state.isCreatingMode = false;
      state.editId = action.payload;
    }),
    resetEditId: (state) => {
      state.isCreatingMode = false;
      state.editId = undefined;
    },

    setDelitingId: (state, action) => {
      state.deleteId = action.payload;
    },
    resetDelitingId: (state) => {
      state.deleteId = undefined;
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

export const {
  setCreatingMode,
  resetCreatingMode,
  setTableMode,
  setCardsMode,
  setEditId,
  resetEditId,
  setDate,
  setCoordinates,
  setSizes,
  setDelitingId,
  resetDelitingId,
  toggleCreatingMode,
} = boardSlice.actions;
