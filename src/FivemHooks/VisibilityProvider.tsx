import React, { useEffect, useState } from "react";
import { useNuiEvent } from "./useNuiEvent";
import { fetchNui } from "./fetchNui";
import { isEnvBrowser } from "./misc";
import VisibilityCtx from "./VisibilityContext";


/**
 * ===========================================
 * IMPORTANT: VisibilityProvider Usage
 * ===========================================
 *
 * To use this provider, import it in your main.tsx or App.tsx:
 * import { VisibilityProvider } from "./fivem/VisibilityProvider";
 *
 * Then wrap your app with it:
 * <VisibilityProvider>
 *   <App />
 * </VisibilityProvider>
 *
 * This provider handles visibility state and keyboard events
 * for both browser and FiveM CEF environments.
 * ===========================================
 */

// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(isEnvBrowser());

  // ------------------- App Visibility start ----------------------
  useNuiEvent("sriyoMDT:setVisible", (data: boolean) => {
    setVisible(data);
    if (data) {
      console.log("Visible is true");
    }
  });

  // ####################################################
  // Handle pressing escape/backspace
  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;
    const keyHandler = async (e: KeyboardEvent) => {
      // Check if the event target is an input, textarea, or contenteditable element
      const target = e.target as HTMLElement;
      if (
        ["INPUT", "TEXTAREA"].includes(target.tagName) ||
        target.isContentEditable
      ) {
        return;
      }

      if (["Backspace", "Escape"].includes(e.code)) {
        e.preventDefault();

        if (!isEnvBrowser()) {
          // In FiveM environment
      await fetchNui("hidePoliceMDT",false);
          setVisible(false);
        } else {
          // In browser environment
          setVisible(!visible);
        }
      }
    };

    // Listen for both keydown and keyup events
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keyup", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keyup", keyHandler);
    };
  }, [visible, setVisible]);




  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      <div style={{ height: "100%" }}>
        {children}
      </div>
    </VisibilityCtx.Provider>
  );
};
