import { useState } from 'react';

export const useCreatingMode = () => {
  const [isCreatingMode, setIsCreatingMode] = useState(false);

  return { isCreatingMode, setIsCreatingMode };
};
