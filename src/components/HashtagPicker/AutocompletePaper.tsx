import React from 'react';
import { Button, Box, Paper, PaperProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { CreateHashtag } from '../CreateHashtag';
import { AutocompleteActions } from './AutocompleteActions';
import { useCreatingMode } from './CreatingMode';

import styles from './AutocompletePaper.module.scss';

interface AutocompletePaperProps extends PaperProps {}

export const AutocompletePaper: React.FC<AutocompletePaperProps> = ({
  children,
  ...rest
}) => {
  const { isCreatingMode } = useCreatingMode();

  return (
    <Paper>
      {isCreatingMode ? <CreateHashtag /> : children}
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
};
