import { types, flow, destroy } from 'mobx-state-tree';

import { notesService } from '../servies';

import { NoteStore } from './NoteStore';
import { LoadingStore } from '../../common/stores/LoadingStore';
import { DateRangeStore } from '../../common/stores/DateRangeStore';

import { INote } from '../../../interfaces';

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const NotesStore = types
  .model('NotesStore', {
    loading: LoadingStore,
    dateRange: DateRangeStore,
    notes: types.array(NoteStore),
  })
  .views((self) => ({
    getNotes() {
      return self.notes.map((note) => note);
    },
    findNote(id: string | number) {
      return self.notes.find((note) => {
        return note.id === id.toString();
      });
    },
  }))
  .actions((self) => ({
    loadNotes: flow(function* (startDate: Date, endDate: Date) {
      self.loading.setLoading();
      try {
        self.dateRange.setDateRange(startDate, endDate);
        self.loading.setLoading();
        const notes = yield notesService.loadNotes(startDate, endDate);

        yield wait();

        self.notes = notes;
        self.loading.setSucceed();
      } catch (error) {
        self.dateRange.setDateRange(self.dateRange.start, self.dateRange.end);
        self.loading.setError();
      }
      return self.notes.length;
    }),
    addNote: flow(function* (payload: INote) {
      const newNote = yield notesService.createNote(payload);

      self.notes.push(newNote);
    }),
    deleteNote: flow(function* (id: string) {
      const note = self.findNote(id);

      yield wait(500);

      destroy(note);
    }),
  }));
