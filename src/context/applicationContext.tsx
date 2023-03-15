import React from "react";

export interface IntAppContextInterface {
  isSideBarViewable: boolean;
}

export interface IntAppContextStateInterface {
  appState: IntAppContextInterface;
  setAppState: React.Dispatch<React.SetStateAction<IntAppContextInterface>>;
}

export type IntAppData = IntAppContextStateInterface;

export const appDefaultState: IntAppContextInterface = {
  isSideBarViewable: true
};

const AppContext = React.createContext<IntAppData>({
  appState: appDefaultState,
  setAppState: (): void => {}
});

interface IntAppContextProvider {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IntAppContextProvider> = ({ children }) => {
  const [appState, setAppState] = React.useState<IntAppContextInterface>({
    ...appDefaultState
  });

  const appContextValue = React.useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState]
  );

  return appContextValue ? (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  ) : null;
};

export { AppContext, AppContextProvider };
