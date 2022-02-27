// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMap = Record<string, any>;


export interface IPageConfigData {
  id: string;
  banner: string;
  name: string;
  updated_time: string;

  icon: string;

  action: string;
  action_type: string;

  desc: string;
  sort: number;
}
export interface IfallbackMap {
  [url: string]: IPageConfigData[];
}
 
export interface IfallbackOptions {
  fallback: IfallbackMap;
}
