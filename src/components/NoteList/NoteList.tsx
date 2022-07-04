import React from 'react';
import { useMemo } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  FormLabel,
} from '@mui/material';
import { format } from 'date-fns';

import { Hashtag } from '../Hashtag/Hashtag';
import styles from './NoteList.module.scss';

import { INote } from '../../interfaces';

interface NoteListProps {
  className?: string;
  notes?: INote[];
}

export const NoteList: React.FC<NoteListProps> = ({ notes = [] }) => {
  const notesByDay = useMemo(() => {
    return notes.reduce((result, cur) => {
      const formattedDate = format(new Date(cur.created), 'd MMM Y');

      return {
        ...result,
        [formattedDate]: result[formattedDate]
          ? [...result[formattedDate], cur]
          : [cur],
      };
    }, {} as { [key: string]: INote[] });
  }, [notes]);

  return (
    <>
      {Object.keys(notesByDay).map((date) => {
        const notes = notesByDay[date];

        return (
          <div>
            <FormLabel className={styles.dayLabel}>{date}</FormLabel>
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
                            className={styles.hashTagWrapper}
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
          </div>
        );
      })}
    </>
  );
};
