import { type RefObject, useEffect, useRef } from "react";
import { noop } from "./misc";

interface DuiMessageData<T> {
  type: string;
  payload: T;
}

type DuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manages event listeners for receiving data from DUI messages
 * @param eventType The specific event type that should be listened for
 * @param handler The callback function that will handle the payload data
 *
 * @example
 * useDuiEvent<boolean>('setVisible', (isVisible) => {
 *   // Handle visibility change
 *   setVisible(isVisible);
 * });
 *
 * useDuiEvent<{ progress: number }>('updateProgress', (data) => {
 *   // Handle progress update
 *   setProgress(data.progress);
 * });
 */
export const useDuiEvent = <T = unknown>(
  eventType: string,
  handler: (data: T) => void
) => {
  const savedHandler: RefObject<DuiHandlerSignature<T>> = useRef(noop);

  // Keep handler reference up to date with latest prop
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      try {
        // Parse the data if it's a string
        let messageData: DuiMessageData<T>;

        if (typeof event.data === 'string') {
          messageData = JSON.parse(event.data) as DuiMessageData<T>;
        } else {
          messageData = event.data as DuiMessageData<T>;
        }

        // Only handle if we have a handler and the event type matches
        if (savedHandler.current && messageData.type === eventType) {
          // Call the handler with just the payload
          savedHandler.current(messageData.payload);
        }
      } catch (error) {
        console.error("Error processing DUI message:", error);
        console.log("Raw event data:", event.data);
      }
    };

    window.addEventListener("message", eventListener);

    // Cleanup listener on unmount or when eventType changes
    return () => window.removeEventListener("message", eventListener);
  }, [eventType]);
};
