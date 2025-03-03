# FiveM React Module

A modular and type-safe React library for FiveM NUI development.

## Features

- 🎯 **Type-Safe**: Full TypeScript support for better development experience
- 🔄 **Visibility Management**: Built-in visibility control for NUI interfaces
- 📡 **Event Handling**: Easy-to-use hooks for NUI event communication
- 🔌 **NUI Fetch**: Simplified fetch wrapper for NUI callbacks
- 🌐 **Environment Detection**: Automatic browser/CEF environment detection

## Installation

```bash
npm install fivemReact-modual
# or
yarn add fivemReact-modual
```

## Quick Start

### TypeScript (TSX)

```tsx
import { VisibilityProvider, useNuiEvent, fetchNui } from "fivemReact-modual";

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
    <VisibilityProvider>
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
import { VisibilityProvider, useNuiEvent, fetchNui } from "fivemReact-modual";

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
    <VisibilityProvider>
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

- `VisibilityProvider`: Manages NUI visibility state and keyboard events
- `useVisibility`: Hook to access visibility state

### Hooks

- `useNuiEvent`: Handle NUI events with type safety
- `fetchNui`: Make NUI callbacks with automatic environment handling

### Utilities

- `isEnvBrowser`: Detect if running in browser or FiveM CEF
- `noop`: No-operation function for default handlers

## TypeScript Support

The library is written in TypeScript and provides full type definitions:

```tsx
// Type-safe event handling
useNuiEvent<{ message: string }>("updateMessage", (data) => {
  // data.message is typed as string
  console.log(data.message);
});

// Type-safe NUI calls
const response = await fetchNui<{ success: boolean }>("submitForm", {
  data: "example",
});
// response.success is typed as boolean
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
