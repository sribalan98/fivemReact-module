/**
 * FiveM NUI Components
 */

import React, { createContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks";
import { fetchNui, isEnvBrowser } from "../utils";
import { VisibilityProviderValue, VisibilityProviderProps } from "../types";

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
 *
 * Customization:
 * ```tsx
 * <VisibilityProvider
 *   wrapperComponent={CustomWrapper}
 *   visibilityStyle={{ opacity: 0 }}
 *   closeKeys={['Escape']}
 *   onVisibilityChange={(visible) => console.log(visible)}
 * >
 *   <App />
 * </VisibilityProvider>
 * ```
 */
export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({
  children,
  wrapperComponent: WrapperComponent,
  visibilityStyle,
  visibilityClassName,
  closeKeys = ["Backspace", "Escape"],
  defaultVisible = isEnvBrowser(),
  onVisibilityChange,
  onClose,
  onShow,
  handleKeyboard = true,
  handleNuiEvents = true,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(defaultVisible);

  if (handleNuiEvents) {
    useNuiEvent<boolean>("setVisible", (value) => {
      setVisible(value);
      onVisibilityChange?.(value);
      if (value) onShow?.();
      else onClose?.();
    });
  }

  useEffect(() => {
    if (!visible || !handleKeyboard) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (closeKeys.includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else {
          setVisible(false);
          onClose?.();
        }
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible, closeKeys, handleKeyboard, onClose]);

  const handleVisibilityChange = (newVisible: boolean) => {
    setVisible(newVisible);
    onVisibilityChange?.(newVisible);
    if (newVisible) onShow?.();
    else onClose?.();
  };

  const contextValue = {
    visible,
    setVisible: handleVisibilityChange,
  };

  const visibilityProps = {
    style: {
      ...style,
      ...(visibilityStyle || {
        visibility: visible ? "visible" : "hidden",
        height: "100%",
      }),
    },
    className: `${className || ""} ${visibilityClassName || ""}`.trim(),
  };

  return (
    <VisibilityCtx.Provider value={contextValue}>
      {WrapperComponent ? (
        <WrapperComponent visible={visible}>{children}</WrapperComponent>
      ) : (
        <div {...visibilityProps}>{children}</div>
      )}
    </VisibilityCtx.Provider>
  );
};
