import { useEffect } from 'react';
import { useLazyLoadNoteQuery } from '../api/notesApi';

export const useNote = (id: string) => {
  // @todo убрать lazy
  const [loadNoteApi, { isLoading, isSuccess, data }] = useLazyLoadNoteQuery();

  useEffect(() => {
    if (id) {
      loadNoteApi(id);
    }
  }, [id]);

  return {
    isLoading,
    isSuccess,
    data,
  };
};
