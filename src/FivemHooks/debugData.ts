import { isEnvBrowser } from "./misc";

interface DebugEvent<T = unknown> {
  action: string;
  data: T;
}

/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 * @param runOnce - Whether to run the events only once or repeatedly
 */
export const debugData = <P>(
  events: DebugEvent<P>[],
  timer: number,
  runOnce: boolean
): void => {
  if (isEnvBrowser()) {
    const dispatchEvents = () => {
      for (const event of events) {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: {
              action: event.action,
              data: event.data,
            },
          })
        );
      }
    };

    if (runOnce) {
      setTimeout(dispatchEvents, timer);
    } else {
      setInterval(dispatchEvents, timer);
    }
  }
};
