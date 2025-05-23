import {
  useAppDispatch,
  useAppSelector,
  useInfiniteAssets,
} from '../../common';
import { useLoadTagsWithNotesQuery } from '../../hashTags';
import { setCreatingMode, useLoadNotesQuery } from '../../notes';

const INITIAL_PAGE = 1;
const LIMIT = 5;

export const useStatistics = () => {
  const dispatch = useAppDispatch();
  const { page, limit, setPage } = useInfiniteAssets(INITIAL_PAGE, LIMIT);
  const { data: response, isLoading: notesLoading } = useLoadNotesQuery({
    pagination: {
      limit: limit,
      page: page,
    },
  });
  const { data: hashTagsWithNotes, isLoading: hashTagsLoading } =
    useLoadTagsWithNotesQuery({ limit: 10 });
  const isCreatingModalOpened = useAppSelector(
    (state) => !!state.notes.createMode,
  );
  const created = useAppSelector((state) => state.notes.created);

  const openCreatingModal = () => dispatch(setCreatingMode());

  return {
    lastNotes: response?.items || [],
    hashTagsWithNotes,
    hashTagsLoading,
    notesLoading,
    isCreatingModalOpened,
    created,
    pagination: {
      page,
      limit,
      totalItems: response?.meta.totalItems,
    },

    openCreatingModal,
    setPage,
  };
};
