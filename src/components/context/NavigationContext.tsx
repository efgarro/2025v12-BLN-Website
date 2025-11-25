import * as React from "react";
import { INavSettingsStore, INavSettingsContext } from "../../types/blnTypes";
import useReducerPersist from "../../hooks/useReducerPersist";
import navSettingsStoreReducer from "../../utils/navSettingsStoreReducer";

let NavSettingsContext = React.createContext<INavSettingsContext>(undefined!);
// let NavSettingsContext = React.createContext<INavSettingsContext>(null!);

const defaultNavSettingsStore: INavSettingsStore = {
  activeNavTab: "none",
  activeMenuTab: "none",
};

export function NavSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navSettingsStore, dispatchNavSettingsStore] = useReducerPersist(
    "navSettingsStore",
    defaultNavSettingsStore,
    navSettingsStoreReducer
  );

  let value: INavSettingsContext = {
    navSettingsStore,
    dispatchNavSettingsStore,
  };

  return (
    <NavSettingsContext.Provider value={value}>
      {children}
    </NavSettingsContext.Provider>
  );
}

export function useNavSettings() {
  return React.useContext(NavSettingsContext);
}
