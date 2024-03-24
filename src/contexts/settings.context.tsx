import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { StorageService } from '@/services/storage.service.ts';
import { Coordinates } from '@/types/coordinate.type.ts';

export type SettingsContextType =
  | {
      staticCoordinates: Coordinates;
      setStaticCoordinates: (coordinates: Coordinates) => void;
      settingsOverlayVisible: boolean;
      setSettingsOverlayVisible: (visible: boolean) => void;
      backgroundUrl: string;
      setBackgroundUrl: (url: string) => void;
      darkMode: boolean;
      setDarkMode: (enabled: boolean) => void;
    }
  | undefined;

const SettingsContext = createContext<SettingsContextType>(undefined);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [staticCoordinates, setStaticCoordinatesState] = useState(StorageService.getCoordinates());
  const [backgroundUrl, setBackgroundUrlState] = useState(StorageService.getBackgroundUrl());
  const [settingsOverlayVisible, setSettingsOverlayVisibleState] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const setStaticCoordinates = (coordinates: Coordinates) => {
    StorageService.setCoordinates(coordinates);
    setStaticCoordinatesState(coordinates);
  };
  const setSettingsOverlayVisible = (visible: boolean) => {
    setSettingsOverlayVisibleState(visible);
  };
  const setBackgroundUrl = (url: string) => {
    StorageService.setBackgroundUrl(url);
    setBackgroundUrlState(url);
  };

  return (
    <SettingsContext.Provider
      value={{
        staticCoordinates,
        setStaticCoordinates,
        settingsOverlayVisible,
        setSettingsOverlayVisible,
        backgroundUrl,
        setBackgroundUrl,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}
