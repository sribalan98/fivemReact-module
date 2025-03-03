/**
 * FiveM NUI Types
 */

import { ComponentType, CSSProperties, ReactNode } from "react";

export interface VisibilityProviderProps {
  children: ReactNode;
  /** Custom wrapper component to replace the default div */
  wrapperComponent?: ComponentType<{ visible: boolean; children: ReactNode }>;
  /** Custom visibility style to override defaults */
  visibilityStyle?: CSSProperties;
  /** Custom class name for visibility state */
  visibilityClassName?: string;
  /** Keys that will trigger the close action */
  closeKeys?: string[];
  /** Initial visibility state (defaults to browser environment check) */
  defaultVisible?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Callback when frame is closed */
  onClose?: () => void;
  /** Callback when frame is shown */
  onShow?: () => void;
  /** Whether to handle keyboard events */
  handleKeyboard?: boolean;
  /** Whether to handle NUI events */
  handleNuiEvents?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom style for the container */
  style?: CSSProperties;
}

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
