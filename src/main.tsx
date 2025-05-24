import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VisibilityProvider } from './FivemHooks/VisibilityProvider'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <VisibilityProvider>
        <App />
      </VisibilityProvider>
    </Router>
  </StrictMode>,
)
