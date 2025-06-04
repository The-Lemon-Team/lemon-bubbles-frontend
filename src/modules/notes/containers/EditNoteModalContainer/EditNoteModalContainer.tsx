import { EditNoteModal } from '../../components/EditNoteModal';

import { useAppSelector } from '../../../common';
import { useEditNote } from '../../hooks/useEditNote';
import { useEditingNote } from '../../hooks/useEditingNote';

import { INote } from '../../../../interfaces';

export const EditNoteModalContainer = () => {
  const { isEditing, resetEditId, editNote } = useEditNote();
  const { data, isLoading } = useEditingNote();
  const editId = useAppSelector((state) => state.notes.editId);

  const onEdit = (payload: INote) => {
    editNote(payload).then(resetEditId);
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
