import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Rnd } from 'react-rnd';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import classNames from 'classnames';

import { Hashtag } from '../Hashtag/Hashtag';

import { INote } from '../../interfaces';

import styles from './NoteList.module.scss';

interface NoteListProps {
  className?: string;
  notes?: INote[];
}

const notesExample = [
  {
    id: '1',
    description: 'note text',
    created: new Date().toString(),
    hashTags: [],
  },
  {
    id: '2',
    description: 'note text',
    created: new Date().toString(),
    hashTags: [],
  },
];

export const NoteList: React.FC<NoteListProps> = ({
  notes = notesExample,
  className = '',
}) => {
  const [sizes, setSizes] = useState({
    height: 300,
    width: 450,
  });

  return (
    <Rnd
      resizible
      minHeight={300}
      minWidth={480}
      className={classNames(styles.resizbleContainer, className)}
      size={sizes}
    >
      {notes.map(({ description, hashTags, id }) => (
        <Accordion key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container>
              <Grid item xs={6}>
                <Typography>{description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {hashTags.map((hashTag) => (
                    <Hashtag key={hashTag.id} text={hashTag.text} />
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
      ))}
    </Rnd>
  );
};
