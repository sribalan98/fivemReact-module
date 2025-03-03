/**
 * FiveM NUI Components
 */

import React, { createContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks";
import { fetchNui, isEnvBrowser } from "../utils";
import { VisibilityProviderValue } from "../types";

export const VisibilityCtx = createContext<VisibilityProviderValue | null>(
  null
);

/**
 * Provider component for managing NUI visibility
 *
 * Usage:
 * ```tsx
 * <VisibilityProvider>
 *   <App />
 * </VisibilityProvider>
 * ```
 */
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(isEnvBrowser());

  useNuiEvent<boolean>("setVisible", setVisible);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <VisibilityCtx.Provider value={{ visible, setVisible }}>
      <div
        style={{ visibility: visible ? "visible" : "hidden", height: "100%" }}
      >
        {children}
      </div>
    </VisibilityCtx.Provider>
  );
};
