import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IStatisticsStore } from '../../common/interfaces';
import { userService } from '../../common/services';

const initialState: IStatisticsStore = {
  data: {},
  loading: {
    status: 'idle',
  },
};

const loadProfileStatistics = createAsyncThunk(
  'profile/loadProfileStatistics',
  () => {
    return userService.loadProfileStatistics();
  },
);

const loadEntireStatistics = createAsyncThunk(
  'profile/loadEntireStatistics',
  () => {
    return userService.loadEntireStatistics();
  },
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    builder
      .addCase(loadProfileStatistics.pending, (state) => {
        state.loading.status = 'loading';
      })
      .addCase(loadProfileStatistics.fulfilled, (state, action) => {
        state.loading.status = 'succeed';
        state.data.top5HashTags = action.payload.top5HashTags;
        state.data.notesCount = action.payload.notesCount;
      })
      .addCase(loadProfileStatistics.rejected, (state) => {
        state.loading.status = 'error';
      })

      .addCase(loadEntireStatistics.pending, (state) => {
        state.loading.status = 'loading';
      })
      .addCase(loadEntireStatistics.fulfilled, (state, action) => {
        state.loading.status = 'succeed';
        state.data.lastNotes = action.payload.lastNotes;
        state.data.hashTagsTop = action.payload.hashTags;
      })
      .addCase(loadEntireStatistics.rejected, (state) => {
        state.loading.status = 'error';
      });
  },
});

export { loadProfileStatistics, loadEntireStatistics };
