import { types, flow } from 'mobx-state-tree';

import { notesService } from '../servies';

import { NoteStore } from './NoteStore';
import { LoadingStore } from '../../common/stores/LoadingStore';
import { INote } from '../../../interfaces';

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const NotesStore = types
  .model('NotesStore', {
    loading: LoadingStore,
    notes: types.array(NoteStore),
  })
  .actions((self) => ({
    loadNotes: flow(function* (startDate?: string, endDate?: string) {
      self.loading.setLoading();
      try {
        self.loading.setLoading();
        const notes = yield notesService.loadNotes();
        yield wait();

        self.notes = notes;
        self.loading.setSucceed();
      } catch (error) {
        self.loading.setError();
      }
      return self.notes.length;
    }),
    addNote: flow(function* (payload: INote) {
      const newNote = {
        ...payload,
        id: +new Date() + '',
      };

      yield wait();

      self.notes.push(newNote);
    }),
  }));
