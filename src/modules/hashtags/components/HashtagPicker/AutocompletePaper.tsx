import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper, PaperProps } from '@mui/material';

import { CreateHashtag } from '../CreateHashtag';
import { AutocompleteActions } from '../../containers';

import { useRootStore } from '../../../common/stores';
import styles from './AutocompletePaper.module.scss';

interface AutocompletePaperProps extends PaperProps {}

export const AutocompletePaper: React.FC<AutocompletePaperProps> = observer(
  ({ children }: AutocompletePaperProps) => {
    const { createHashtagStore } = useRootStore();

    return (
      <Paper>
        {createHashtagStore.isCreatingMode ? <CreateHashtag /> : children}
        <Box
          className={styles.actionsWrapper}
          sx={{
            borderBottom: `1px solid '#30363d'`,
            padding: '8px 10px',
            fontWeight: 600,
          }}
        >
          <AutocompleteActions />
        </Box>
      </Paper>
    );
  },
);
