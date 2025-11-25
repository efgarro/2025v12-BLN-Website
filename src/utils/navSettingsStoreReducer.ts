import { INavSettingsAction, INavSettingsStore } from "../types/blnTypes";

const navSettingsStoreReducer = (
  navSettingsStore: INavSettingsStore,
  action: INavSettingsAction
) => {
  let newNavSettingsStore: INavSettingsStore;
  switch (action.type) {
    case "reset":
      newNavSettingsStore = {
        ...navSettingsStore,
        activeNavTab: "none",
        activeMenuTab: "none",
      };
      //   localStorage.setItem(
      //     action.key as string,
      //     JSON.stringify(newNavSettingsStore)
      //   );
      return newNavSettingsStore;
    case "nav-tab":
      newNavSettingsStore = {
        ...navSettingsStore,
        activeNavTab: action.value,
      };
      //   localStorage.setItem(
      //     action.key as string,
      //     JSON.stringify(newNavSettingsStore)
      //   );
      return newNavSettingsStore;
    case "menu-tab":
      newNavSettingsStore = {
        ...navSettingsStore,
        activeMenuTab: action.value,
      };
      //   localStorage.setItem(
      //     action.key as string,
      //     JSON.stringify(newNavSettingsStore)
      //   );
      console.log(newNavSettingsStore);
      return newNavSettingsStore;
    default:
      throw new Error();
  }
};

export default navSettingsStoreReducer;
