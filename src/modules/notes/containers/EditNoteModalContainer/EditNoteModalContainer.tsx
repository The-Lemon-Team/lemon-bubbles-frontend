import { EditNoteModal } from '../../components/EditNoteModal';

import { useEditNote } from '../../hooks/useEditNote';
import { useEditingNote } from '../../hooks/useEditingNote';

import { INote } from '../../../../interfaces';

export const EditNoteModalContainer = () => {
  const { isEditing, resetEditId, editNote } = useEditNote();
  const { data, isLoading } = useEditingNote();

  const onEdit = (payload: INote) => {
    editNote(payload).then(resetEditId);
  };

  return (
    <EditNoteModal
      disabled={isLoading || isEditing}
      editingNote={data}
      resetEditId={resetEditId}
      editNote={onEdit}
    />
  );
};
