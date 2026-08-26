import { QueryClient } from "@tanstack/react-query";
export interface IImg {
  id: string;
  width: string;
  height: string;
  url: string;
  orientation: string;
}

export interface INavSettingsAction {
  type: string;
  value: any;
  key?: string;
}

export interface INavSettingsStore {
  activeNavTab: "none" | "rooms" | "grounds" | "activities" | "habitat";
  activeMenuTab:
    | "none"
    | "guarumo"
    | "sunrise"
    | "yard"
    | "ranch"
    | "organic"
    | "restaurants"
    | "hiking"
    | "waterfall"
    | "wildlife"
    | "trees";
}

export interface INavSettingsStore {
  activeNavTab: "none" | "rooms" | "grounds" | "activities" | "habitat";
}

export interface INavSettingsContext {
  navSettingsStore: INavSettingsStore;
  dispatchNavSettingsStore: React.Dispatch<INavSettingsAction>;
}


export interface IRouterContext {
  queryClient: QueryClient;
}

export interface IImagePreview {
  id: string;
  url: string;
  orientation: string;
  description: string;
  figcaption: string;
}