import { CreateNoteModal } from '../../components/CreateNoteModal';

import { useHashTagsContext } from '../../../hashTags';
import { useCreateNote } from '../../hooks/useCreateNote';

export const CreateNoteModalContainer = () => {
  const { isCreatingMode, createNote, resetCreatingMode } = useCreateNote();
  const { transformTags } = useHashTagsContext();

  return isCreatingMode ? (
    <CreateNoteModal
      onCreate={createNote}
      onClose={resetCreatingMode}
      transformTags={transformTags}
    />
  ) : null;
};
