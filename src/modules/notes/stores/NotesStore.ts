import { types, flow, destroy } from 'mobx-state-tree';

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

      yield wait(100);

      self.notes.push(newNote);
    }),
    deleteNote: flow(function* (id: string) {
      const note = self.findNote(id);

      yield wait(500);

      destroy(note);
    }),
  }));