import { Polly } from '@pollyjs/core';
import { v4 as uuid } from 'uuid';
import FetchAdapter from '@pollyjs/adapter-fetch';
import XHRAdapter from '@pollyjs/adapter-xhr';
import LocalStoragePersister from '@pollyjs/persister-local-storage';

import { hashtagsMock } from './hashtags.mock';
import { generateNote, notesMock } from './notes.mock';

import { IDateRangeDto, INote } from '../../../../../interfaces';
import { isWithinInterval } from 'date-fns';

export const setupDevServer = () => {
  Polly.register(FetchAdapter);
  Polly.register(XHRAdapter);
  Polly.register(LocalStoragePersister);
  const { server } = new Polly('Simple Example', {
    adapters: ['fetch', 'xhr'],
    persister: 'local-storage',
    logLevel: 'info',
  });
  server.post('/api/notes').intercept((req, res) => {
    res.status(200).json(notesMock);
  });
  server.put('/api/notes').intercept((req, res) => {
    const newNote = generateNote(JSON.parse(req.body || ''));
    const mappedTags = newNote.hashTags.map((tag) => {
      if (!tag.id) {
        const newTag = {
          ...tag,
          id: uuid(),
        };
        hashtagsMock.push(newTag);
        return newTag;
      }
      return tag;
    });
    const withNewTags = {
      ...newNote,
      hashtags: mappedTags,
    };
    notesMock.push(withNewTags);
    res.status(200).json(withNewTags);
  });
  server.get('/api/hashtags').intercept((req, res) => {
    res.status(200).json(hashtagsMock);
  });
  server.get('/api/hashtags/').intercept((req, res) => {
    const searchQuery = req.query.text;
    const dateRange: IDateRangeDto = JSON.parse(
      req.query.excludeDateRange as string,
    );
    const tagsOutOfRange = hashtagsMock
      .filter(
        (tag) =>
          !isWithinInterval(new Date(tag.created), {
            start: new Date(dateRange.start),
            end: new Date(dateRange.end),
          }),
      )
      .filter((tag) => tag.text.startsWith(searchQuery as string));
    res.status(200).json(tagsOutOfRange);
  });
  server.delete('/api/notes/:id').intercept((req, res) => {
    res.status(200).send(true);
  });
  server.patch('/api/notes/:id').intercept((req, res) => {
    const updatingNote: INote = JSON.parse(req.body || '');
    notesMock.forEach((note) => {
      if (note.id === updatingNote.id) {
        note = updatingNote;
      }
    });
    res.status(200).json(updatingNote);
  });
};
