/**
 * FiveM NUI Utilities
 */

import { FiveMWindow } from "../types";

/**
 * Checks if the current environment is a regular browser
 * @returns boolean indicating if we're in a browser environment
 */
export const isEnvBrowser = (): boolean =>
  !(window as FiveMWindow).invokeNative;

/**
 * No-operation function
 */
export const noop = () => {};

/**
 * Fetches data from NUI callbacks
 * @param eventName - The endpoint event name
 * @param data - Data to send
 * @param mockData - Mock data for browser environment
 */
export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
  mockData?: T
): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockData) return mockData;

  const getParentResourceName = (window as FiveMWindow).GetParentResourceName;
  const resourceName = getParentResourceName
    ? getParentResourceName()
    : "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  return resp.json();
}
