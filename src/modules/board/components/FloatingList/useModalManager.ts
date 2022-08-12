import { useCallback, useState } from 'react';

export const useModalManager = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreatingMode, setIsCreatingMode] = useState(false);

  const toggleCreatingMode = useCallback(
    () => setIsCreatingMode(!isCreatingMode),
    [setIsCreatingMode, isCreatingMode],
  );
  const togleEditMode = useCallback(
    () => setIsEditMode(!isEditMode),
    [isEditMode, setIsEditMode],
  );
  const closeCreatingMode = useCallback(
    () => setIsCreatingMode(false),
    [setIsCreatingMode],
  );
  const openCreatingMode = useCallback(
    () => setIsCreatingMode(true),
    [setIsCreatingMode],
  );

  return {
    isCreatingMode,
    isEditMode,
    closeCreatingMode,
    toggleCreatingMode,
    togleEditMode,
    openCreatingMode,
  };
};
