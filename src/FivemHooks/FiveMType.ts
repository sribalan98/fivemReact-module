export interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}
export interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

export interface FiveMWindow extends Window {
  invokeNative?: unknown;
  GetParentResourceName?: () => string;
}

export interface FivemResponse {
  data: unknown;
}
