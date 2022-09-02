import { isWithinInterval } from 'date-fns';
import { Polly } from '@pollyjs/core';
import { v4 as uuid } from 'uuid';
import FetchAdapter from '@pollyjs/adapter-fetch';
import XHRAdapter from '@pollyjs/adapter-xhr';
import LocalStoragePersister from '@pollyjs/persister-local-storage';

import { hashTagsMock } from './hashTags.mock';
import { generateNote, notesMock } from './notes.mock';

import { IDateRange } from '../../../../interfaces';

export const setupDevServer = () => {
  Polly.register(FetchAdapter);
  Polly.register(XHRAdapter);
  Polly.register(LocalStoragePersister);

  const { server } = new Polly('Simple Example', {
    adapters: ['fetch', 'xhr'], // Hook into `fetch`
    persister: 'local-storage', // Read/write to/from local-storage
    logLevel: 'info', // Log requests to console
  });

  server.get('/api/notes').intercept((req, res) => {
    const filteredNotes = notesMock.filter((note) => {
      return isWithinInterval(new Date(note.created), {
        start: new Date(req.query.start as string),
        end: new Date(req.query.end as string),
      });
    });

    res.status(200).json(filteredNotes);
  });

  server.put('/api/notes').intercept((req, res) => {
    const newNote = generateNote(JSON.parse(req.body || ''));

    const mappedTags = newNote.hashTags.map((tag) => {
      if (!tag.id) {
        const newTag = {
          ...tag,
          id: uuid(),
        };

        hashTagsMock.push(newTag);

        return newTag;
      }

      return tag;
    });
    const withNewTags = {
      ...newNote,
      hashTags: mappedTags,
    };

    notesMock.push(withNewTags);

    res.status(200).json(withNewTags);
  });

  server.get('/api/hashTags/').intercept((req, res) => {
    const searchQuery = req.query.text;
    const dateRange: IDateRange = JSON.parse(
      req.query.excludeDateRange as string,
    );
    const tagsOutOfRange = hashTagsMock
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
};
