import type{ FiveMWindow } from "./FiveMType.ts";
// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean =>
  !(window as FiveMWindow).invokeNative;
// Log whether we're in browser environment
// console.log("Browser Environment:", isEnvBrowser());

// Basic no operation function
export const noop = () => {};
