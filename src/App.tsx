import {  Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

import Main from "./components/Main";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
