import {
  applySnapshot,
  castToSnapshot,
  types,
  flow,
  destroy,
  getEnv,
  Instance,
} from 'mobx-state-tree';

import { notesService } from '../servies';

import { NotifierStore } from '../../common/stores';
import { NoteStore } from './NoteStore';
import { LoadingStore } from '../../common/stores/LoadingStore';

import { INote } from '../../../interfaces';

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const NotesStore = types
  .model('NotesStore', {
    loading: LoadingStore,
    notes: types.array(NoteStore),
    deleteLoading: LoadingStore,
  })
  .views((self) => ({
    getNotes() {
      return self.notes.map((note) => note);
    },
    findNote(id: string | number = '') {
      return self.notes.find((note) => {
        return note.id === id.toString();
      });
    },
  }))
  .actions((self) => ({
    setNotes(notes: INote[]) {
      self.notes = castToSnapshot(notes);
    },
    addNote: flow(function* (payload: INote) {
      const newNote = yield notesService.createNote(payload);

      self.notes.unshift(newNote);
    }),
    updateNote: (payload: INote) => {
      const note = self.findNote(payload.id);

      if (note) {
        applySnapshot(note, payload);
      }
    },
    deleteNote: flow(function* (id: string) {
      const note = self.findNote(id);

      self.deleteLoading.setLoading();
      try {
        notesService.deleteNote(id);

        yield wait(500);

        destroy(note);
        getEnv<{ notifier: Instance<typeof NotifierStore> }>(
          self,
        ).notifier.showSuccess(`Запись "${note?.title}" успешно удалена.`);
        self.deleteLoading.setSucceed();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        getEnv<{ notifier: Instance<typeof NotifierStore> }>(
          self,
        ).notifier.showError(`Удалить не удалось`);
      }
    }),
  }));
