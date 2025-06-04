import { EditNoteModal } from '../../components/EditNoteModal';

import { useAppSelector, useNotifier } from '../../../common';
import { useHashTagsContext } from '../../../hashTags';
import { useEditNote } from '../../hooks/useEditNote';
import { useEditingNote } from '../../hooks/useEditingNote';

import { INote } from '../../../../interfaces';

export const EditNoteModalContainer = () => {
  const { isEditing, resetEditId, editNote } = useEditNote();
  const { refreshTags } = useHashTagsContext();
  const { showSuccess } = useNotifier();

  const { data, isLoading } = useEditingNote();
  const editId = useAppSelector((state) => state.notes.editId);

  const onEdit = (payload: INote) => {
    editNote(payload).then(() => {
      resetEditId();
      refreshTags();
      showSuccess(`Запись "${payload.title}" успешно обновлена`);
    });
  };

  return (
    <EditNoteModal
      opened={!!editId}
      disabled={isLoading || isEditing}
      editingNote={data}
      resetEditId={resetEditId}
      editNote={onEdit}
    />
  );
};
