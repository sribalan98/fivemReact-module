import { useState, useCallback, useEffect } from "react";

interface ComponentConfig {
  id: string;
  defaultVisible?: boolean;
}

interface VisibilityState {
  [key: string]: boolean;
}

interface VisibilityActions {
  show: (componentId: string) => void;
  hide: (componentId: string) => void;
  toggle: (componentId: string) => void;
  setVisible: (componentId: string, value: boolean) => void;
  showOnly: (componentId: string) => void;
  hideAll: () => void;
  showAll: () => void;
  getVisible: (componentId: string) => boolean;
}

/**
 * Hook for managing visibility of multiple components
 * @param components Array of component configurations
 * @returns Object containing visibility states and actions
 *
 * @example
 * const components = [
 *   { id: 'menu', defaultVisible: false },
 *   { id: 'inventory', defaultVisible: false }
 * ];
 *
 * const { states, show, hide, toggle, showOnly } = useMultiComponentVisibility(components);
 *
 * // Show menu
 * show('menu');
 *
 * // Hide inventory
 * hide('inventory');
 *
 * // Toggle menu
 * toggle('menu');
 *
 * // Show only inventory (hides all others)
 * showOnly('inventory');
 */
export const useMultiComponentVisibility = (
  components: ComponentConfig[]
): {
  states: VisibilityState;
} & VisibilityActions => {
  // Initialize visibility states
  const [states, setStates] = useState<VisibilityState>(() => {
    const initialStates: VisibilityState = {};
    components.forEach(({ id, defaultVisible = false }) => {
      initialStates[id] = defaultVisible;
    });
    // console.log('Initial visibility states:', initialStates);
    return initialStates;
  });

  // Set up NUI event listeners
  useEffect(() => {
    // console.log('Setting up event listeners for components:', components.map(c => c.id));

    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const [componentId, action] = customEvent.type.split(":");

      // console.log(`Received ${action} event for ${componentId}:`, customEvent.detail);

      switch (action) {
        case "show":
          setStates((prev) => ({ ...prev, [componentId]: true }));
          break;
        case "hide":
          setStates((prev) => ({ ...prev, [componentId]: false }));
          break;
        case "toggle":
          setStates((prev) => ({ ...prev, [componentId]: !prev[componentId] }));
          break;
        case "set":
          setStates((prev) => ({ ...prev, [componentId]: customEvent.detail }));
          break;
      }
    };

    // Register event listeners for each component
    const eventTypes = ["show", "hide", "toggle", "set"];
    const registeredEvents: { id: string; type: string }[] = [];

    components.forEach(({ id }) => {
      eventTypes.forEach((type) => {
        const eventName = `${id}:${type}`;
        window.addEventListener(eventName, handleEvent);
        registeredEvents.push({ id, type: eventName });
      });
    });

    // Cleanup function
    return () => {
      registeredEvents.forEach(({ type }) => {
        window.removeEventListener(type, handleEvent);
      });
    };
  }, [components]);

  // Log state changes
  useEffect(() => {
    // console.log('Visibility states updated:', states);
  }, [states]);

  const show = useCallback((componentId: string) => {
    // console.log(`[${componentId}] Show action called`);
    setStates((prev) => ({ ...prev, [componentId]: true }));
  }, []);

  const hide = useCallback((componentId: string) => {
    // console.log(`[${componentId}] Hide action called`);
    setStates((prev) => ({ ...prev, [componentId]: false }));
  }, []);

  const toggle = useCallback((componentId: string) => {
    // console.log(`[${componentId}] Toggle action called`);
    setStates((prev) => ({ ...prev, [componentId]: !prev[componentId] }));
  }, []);

  const setVisible = useCallback((componentId: string, value: boolean) => {
    // console.log(`[${componentId}] SetVisible action called with value:`, value);
    setStates((prev) => ({ ...prev, [componentId]: value }));
  }, []);

  const showOnly = useCallback((componentId: string) => {
    // console.log(`[${componentId}] ShowOnly action called`);
    setStates((prev) => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach((key) => {
        newStates[key] = key === componentId;
      });
      return newStates;
    });
  }, []);

  const hideAll = useCallback(() => {
    // console.log('HideAll action called');
    setStates((prev) => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach((key) => {
        newStates[key] = false;
      });
      return newStates;
    });
  }, []);

  const showAll = useCallback(() => {
    // console.log('ShowAll action called');
    setStates((prev) => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach((key) => {
        newStates[key] = true;
      });
      return newStates;
    });
  }, []);

  const getVisible = useCallback(
    (componentId: string) => {
      const isVisible = states[componentId] || false;
      // console.log(`[${componentId}] GetVisible called, returning:`, isVisible);
      return isVisible;
    },
    [states]
  );

  return {
    states,
    show,
    hide,
    toggle,
    setVisible,
    showOnly,
    hideAll,
    showAll,
    getVisible,
  };
};
