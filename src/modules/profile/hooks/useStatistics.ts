import { useAppDispatch, useAppSelector } from '../../common';
import { useLoadTagsWithNotesQuery } from '../../hashTags';
import { setCreatingMode, useLoadNotesQuery } from '../../notes';

export const useStatistics = () => {
  const dispatch = useAppDispatch();
  const { data: lastNotes, isLoading: notesLoading } = useLoadNotesQuery({});
  const { data: hashTagsWithNotes, isLoading: hashTagsLoading } =
    useLoadTagsWithNotesQuery({ limit: 10 });
  const openCreatingModal = () => dispatch(setCreatingMode());
  const isCreatingModalOpened = useAppSelector(
    (state) => !!state.notes.createMode,
  );

  return {
    lastNotes,
    hashTagsWithNotes,
    hashTagsLoading,
    notesLoading,
    isCreatingModalOpened,

    openCreatingModal,
  };
};
