import React, { useEffect } from "react";
import { useMultiComponentVisibility } from "./useMultiComponentVisibility";

interface MultiComponentVisibilityProps {
  components: {
    id: string;
    defaultVisible?: boolean;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }[];
}

/**
 * A wrapper component that manages visibility for multiple components
 *
 * @example
 * <MultiComponentVisibility
 *   components={[
 *     {
 *       id: 'menu',
 *       children: <Menu />,
 *       defaultVisible: false,
 *       className: 'menu-container'
 *     },
 *     {
 *       id: 'inventory',
 *       children: <Inventory />,
 *       defaultVisible: false,
 *       className: 'inventory-container'
 *     }
 *   ]}
 * />
 */
export const MultiComponentVisibility: React.FC<
  MultiComponentVisibilityProps
> = ({ components }) => {
  const { states } = useMultiComponentVisibility(
    components.map(({ id, defaultVisible }) => ({ id, defaultVisible }))
  );

  // Log when components or visibility states change
  // useEffect(() => {
  //   console.log('MultiComponentVisibility - Components:', components);
  // }, [components]);

  // useEffect(() => {
  //   console.log('MultiComponentVisibility - Visibility states:', states);
  // }, [states]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {components.map(({ id, children, className = "", style = {} }) => {
        const isVisible = states[id];
        // console.log(`Rendering component ${id}, visible:`, isVisible);

        return (
          <div
            key={id}
            className={className}
            style={{
              ...style,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              visibility: isVisible ? "visible" : "hidden",
              opacity: isVisible ? 1 : 0,
            }}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
};
