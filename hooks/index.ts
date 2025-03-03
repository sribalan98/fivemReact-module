/**
 * FiveM NUI Hooks
 */

import { RefObject, useEffect, useRef } from "react";
import { noop } from "../utils";
import { NuiMessageData } from "../types";

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * Hook for handling NUI events
 * @param action - The specific action to listen for
 * @param handler - Callback function to handle the event data
 */
export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: RefObject<NuiHandlerSignature<T>> = useRef(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
