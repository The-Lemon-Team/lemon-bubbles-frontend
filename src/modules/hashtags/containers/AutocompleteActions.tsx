import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../common/stores/RootStore';

export const AutocompleteActions = observer(() => {
  const { createHashtagStore } = useRootStore();

  return (
    <div>
      <Button
        variant={createHashtagStore.isCreatingMode ? 'contained' : 'outlined'}
        startIcon={<EditIcon />}
        onClick={createHashtagStore.toggleCreatingMode}
        fullWidth
      >
        Создать новый хештег
      </Button>
    </div>
  );
});
