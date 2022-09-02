import { types, flow } from 'mobx-state-tree';
import { flatten } from 'lodash';

import { notesService } from '../../notes/servies';
import { DateRangeStore } from '../../common/stores/DateRangeStore';
import { NotesStore } from '../../notes/stores';
import { HashtagsStore } from '../../hashtags/stores';

import { IHashTag, INote } from '../../../interfaces';

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const BoardStore = types
  .model('BoardStore', {
    dateRange: DateRangeStore,
    hashTagsStore: HashtagsStore,
    notesStore: NotesStore,
  })
  .actions((self) => ({
    addNote: flow(function* (payload: INote) {
      const newNote = yield notesService.createNote(payload);

      self.hashTagsStore.mergeHashTags(newNote.hashTags);

      self.notesStore.notes.unshift(newNote);
    }),
    loadNotes: flow(function* (startDate: Date, endDate: Date) {
      try {
        self.dateRange.setDateRange(startDate, endDate);
        self.notesStore.loading.setLoading();
        const notes = yield notesService.loadNotes(startDate, endDate);
        const hashtags = flatten(
          notes.map((note: INote) => note.hashTags) as IHashTag[],
        ).reduce((acc, cur) => {
          const isAlreadyAdded = acc.find((hashTag) => hashTag.id === cur.id);

          if (!isAlreadyAdded) {
            return [...acc, cur];
          }

          return acc;
        }, [] as IHashTag[]);

        yield wait();

        self.hashTagsStore.setHashTags(hashtags);
        self.notesStore.setNotes(notes);
        self.notesStore.loading.setSucceed();
      } catch (error) {
        self.dateRange.setDateRange(self.dateRange.start, self.dateRange.end);
        self.notesStore.loading.setError();
      }
      return self.notesStore.notes.length;
    }),
  }));
