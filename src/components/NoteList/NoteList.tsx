import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { Hashtag } from '../Hashtag/Hashtag';
import styles from './NoteList.module.scss';

import { INote } from '../../interfaces';

interface NoteListProps {
  className?: string;
  notes?: INote[];
}

export const NoteList: React.FC<NoteListProps> = ({ notes = [] }) => {
  return (
    <>
      {notes.map(({ title, description, hashTags, id }) => (
        <Accordion key={id} className={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid item>
                <div className={styles.titleWrapper}>
                  <Typography>{title}</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {hashTags.map((hashTag) => (
                    <Hashtag
                      key={hashTag.id}
                      color={hashTag.color}
                      text={hashTag.text}
                    />
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
