import { CreateNoteModal } from '../../components/CreateNoteModal';

import { useHashTags } from '../../../common';
import { useCreateNote } from '../../hooks/useCreateNote';

export const CreateNoteModalContainer = () => {
  const { isCreatingMode, createNote, resetCreatingMode } = useCreateNote();
  const { transformTags } = useHashTags();

  return isCreatingMode ? (
    <CreateNoteModal
      onCreate={createNote}
      onClose={resetCreatingMode}
      transformTags={transformTags}
    />
  ) : null;
};
