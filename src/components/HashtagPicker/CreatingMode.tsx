import React, { createContext, useCallback, useContext, useState } from 'react';

interface CreatingModeProviderProps {
  children: React.ReactNode;
}

interface HashtagCreatingMode {
  isCreatingMode: boolean;
  setIsCreatingMode: (flag: boolean) => void;
  setUpCreatingMode: () => void;
  switchOffCreatingMode: () => void;
  switchCreatingMode: () => void;
}

export const CreatingModeContext = createContext<HashtagCreatingMode>({
  isCreatingMode: false,
  setIsCreatingMode: () => void 0,
  setUpCreatingMode: () => void 0,
  switchOffCreatingMode: () => void 0,
  switchCreatingMode: () => void 0,
});

export const useMakeCreatingMode = (): HashtagCreatingMode => {
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const setUpCreatingMode = useCallback(
    () => setIsCreatingMode(true),
    [setIsCreatingMode],
  );
  const switchOffCreatingMode = useCallback(
    () => setIsCreatingMode(false),
    [setIsCreatingMode],
  );
  const switchCreatingMode = useCallback(
    () => setIsCreatingMode(!isCreatingMode),
    [setIsCreatingMode, isCreatingMode],
  );

  return {
    isCreatingMode,
    setIsCreatingMode,
    setUpCreatingMode,
    switchOffCreatingMode,
    switchCreatingMode,
  };
};

export const useCreatingMode = () => {
  return useContext(CreatingModeContext);
};

export const CreatingModeProvider: React.FC<CreatingModeProviderProps> = ({
  children,
}) => {
  const {
    isCreatingMode,
    setIsCreatingMode,
    setUpCreatingMode,
    switchOffCreatingMode,
    switchCreatingMode,
  } = useMakeCreatingMode();

  return (
    <CreatingModeContext.Provider
      value={{
        isCreatingMode,
        setUpCreatingMode,
        switchOffCreatingMode,
        switchCreatingMode,
        setIsCreatingMode,
      }}
    >
      {children}
    </CreatingModeContext.Provider>
  );
};
