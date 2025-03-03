# FiveM React Module

A modular and type-safe React library for FiveM NUI development.

## Features

- 🎯 **Type-Safe**: Full TypeScript support for better development experience
- 🔄 **Visibility Management**: Enhanced visibility control with custom wrapper components
- 📡 **Event Handling**: Easy-to-use hooks for NUI event communication
- 🔌 **NUI Fetch**: Simplified fetch wrapper for NUI callbacks
- 🌐 **Environment Detection**: Automatic browser/CEF environment detection
- 🎨 **Customizable UI**: Flexible styling and component customization
- 🎮 **Keyboard Control**: Configurable keyboard event handling

## Installation

```git
git clone https://github.com/sribalan98/fivemReact-modual
```

## Quick Start

### TypeScript (TSX)

```tsx
import {
  VisibilityProvider,
  useVisibility,
  useNuiEvent,
  fetchNui,
} from "fivemReact-modual";

// Custom wrapper component example
const CustomWrapper: React.FC<{
  visible: boolean;
  children: React.ReactNode;
}> = ({ visible, children }) => (
  <div className={`custom-wrapper ${visible ? "visible" : "hidden"}`}>
    {children}
  </div>
);

interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = ({ title }) => {
  const { visible, setVisible } = useVisibility();

  useNuiEvent<{ message: string }>("updateMessage", (data) => {
    console.log(data.message);
  });

  const handleSubmit = async () => {
    const response = await fetchNui<{ success: boolean }>("submitForm", {
      data: "example",
    });
    console.log(response.success);
  };

  return (
    <VisibilityProvider
      wrapperComponent={CustomWrapper}
      visibilityStyle={{ opacity: visible ? 1 : 0 }}
      closeKeys={["Escape"]}
      onVisibilityChange={(isVisible) => console.log("Visibility:", isVisible)}
      onClose={() => console.log("UI Closed")}
      onShow={() => console.log("UI Shown")}
      handleKeyboard={true}
      className="app-container"
    >
      <div>
        <h1>{title}</h1>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </VisibilityProvider>
  );
};
```

### JavaScript (JSX)

```jsx
import {
  VisibilityProvider,
  useVisibility,
  useNuiEvent,
  fetchNui,
} from "fivemReact-modual";

const CustomWrapper = ({ visible, children }) => (
  <div className={`custom-wrapper ${visible ? "visible" : "hidden"}`}>
    {children}
  </div>
);

function App({ title }) {
  const { visible, setVisible } = useVisibility();

  useNuiEvent("updateMessage", (data) => {
    console.log(data.message);
  });

  const handleSubmit = async () => {
    const response = await fetchNui("submitForm", {
      data: "example",
    });
    console.log(response.success);
  };

  return (
    <VisibilityProvider
      wrapperComponent={CustomWrapper}
      visibilityStyle={{ opacity: visible ? 1 : 0 }}
      closeKeys={["Escape"]}
      onVisibilityChange={(isVisible) => console.log("Visibility:", isVisible)}
      onClose={() => console.log("UI Closed")}
      onShow={() => console.log("UI Shown")}
      handleKeyboard={true}
      className="app-container"
    >
      <div>
        <h1>{title}</h1>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </VisibilityProvider>
  );
}
```

## Documentation

### Components

#### VisibilityProvider

The enhanced `VisibilityProvider` component offers extensive customization options:

```tsx
<VisibilityProvider
  // Custom wrapper component
  wrapperComponent={CustomWrapper}
  // Custom visibility styles
  visibilityStyle={{ opacity: 0 }}
  visibilityClassName="custom-visibility"
  // Custom close key combinations
  closeKeys={["Escape", "Backspace"]}
  // Initial visibility state
  defaultVisible={false}
  // Event callbacks
  onVisibilityChange={(visible) => {}}
  onClose={() => {}}
  onShow={() => {}}
  // Feature flags
  handleKeyboard={true}
  handleNuiEvents={true}
  // General styling
  className="container"
  style={{ padding: "20px" }}
>
  {children}
</VisibilityProvider>
```

Props:

- `wrapperComponent`: Custom component to wrap the content
- `visibilityStyle`: Custom styles for visibility states
- `visibilityClassName`: Custom class for visibility states
- `closeKeys`: Array of keyboard keys that trigger close
- `defaultVisible`: Initial visibility state
- `onVisibilityChange`: Callback for visibility changes
- `onClose`: Callback when UI is closed
- `onShow`: Callback when UI is shown
- `handleKeyboard`: Enable/disable keyboard controls
- `handleNuiEvents`: Enable/disable NUI event handling
- `className`: Container class name
- `style`: Container inline styles

### Hooks

- `useVisibility`: Access and control visibility state
- `useNuiEvent`: Handle NUI events with type safety
- `fetchNui`: Make NUI callbacks with automatic environment handling

### Utilities

- `isEnvBrowser`: Detect if running in browser or FiveM CEF
- `noop`: No-operation function for default handlers

## TypeScript Support

The library provides comprehensive type definitions:

```tsx
// Type-safe visibility provider props
interface VisibilityProviderProps {
  children: ReactNode;
  wrapperComponent?: ComponentType<{ visible: boolean; children: ReactNode }>;
  visibilityStyle?: CSSProperties;
  // ... other typed props
}

// Type-safe event handling
useNuiEvent<{ message: string }>("updateMessage", (data) => {
  console.log(data.message); // data.message is typed as string
});

// Type-safe NUI calls
const response = await fetchNui<{ success: boolean }>("submitForm", {
  data: "example",
});
// response.success is typed as boolean
```

## Example Usage

Here's a simple example of how to use the `VisibilityProvider` in your application:

### TypeScript Example

```tsx
import React from "react";
import { VisibilityProvider, useVisibility } from "fivemReact-modual";

const CustomWrapper: React.FC<{
  visible: boolean;
  children: React.ReactNode;
}> = ({ visible, children }) => (
  <div className={`custom-wrapper ${visible ? "visible" : "hidden"}`}>
    {children}
  </div>
);

const App: React.FC = () => {
  const { visible, setVisible } = useVisibility();

  return (
    <VisibilityProvider
      wrapperComponent={CustomWrapper}
      visibilityStyle={{ opacity: visible ? 1 : 0 }}
      closeKeys={["Escape"]}
      onVisibilityChange={(isVisible) => console.log("Visibility:", isVisible)}
      onClose={() => console.log("UI Closed")}
      onShow={() => console.log("UI Shown")}
      handleKeyboard={true}
      className="app-container"
    >
      <div>
        <h1>Hello, World!</h1>
        <button onClick={() => setVisible(!visible)}>Toggle Visibility</button>
      </div>
    </VisibilityProvider>
  );
};

export default App;
```

### JavaScript Example

```jsx
import React from "react";
import { VisibilityProvider, useVisibility } from "fivemReact-modual";

const CustomWrapper = ({ visible, children }) => (
  <div className={`custom-wrapper ${visible ? "visible" : "hidden"}`}>
    {children}
  </div>
);

function App() {
  const { visible, setVisible } = useVisibility();

  return (
    <VisibilityProvider
      wrapperComponent={CustomWrapper}
      visibilityStyle={{ opacity: visible ? 1 : 0 }}
      closeKeys={["Escape"]}
      onVisibilityChange={(isVisible) => console.log("Visibility:", isVisible)}
      onClose={() => console.log("UI Closed")}
      onShow={() => console.log("UI Shown")}
      handleKeyboard={true}
      className="app-container"
    >
      <div>
        <h1>Hello, World!</h1>
        <button onClick={() => setVisible(!visible)}>Toggle Visibility</button>
      </div>
    </VisibilityProvider>
  );
}

export default App;
```

This example demonstrates how to create a simple application using the `VisibilityProvider` to manage visibility state with a custom wrapper component.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<div align="center">
<a href="https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fsribalan98%2FfivemReact-modual"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fsribalan98%2FfivemReact-modual&labelColor=%2337d67a&countColor=%23d9e3f0&style=plastic&labelStyle=lower" /></a>
</div>
