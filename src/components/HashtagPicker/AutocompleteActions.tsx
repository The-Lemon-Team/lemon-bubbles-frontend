import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useCreatingMode } from './CreatingMode';

export const AutocompleteActions = () => {
  const { isCreatingMode, switchCreatingMode } = useCreatingMode();

  return (
    <div>
      <Button
        variant={isCreatingMode ? 'contained' : 'outlined'}
        startIcon={<EditIcon />}
        onClick={switchCreatingMode}
        fullWidth
      >
        Создать новый хештег
      </Button>
    </div>
  );
};
