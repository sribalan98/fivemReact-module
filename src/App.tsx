import {  Routes, Route } from "react-router-dom";
function App() {
  return (
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/contextmenu" element={<h1>Context Menu</h1>} />
      </Routes>
  )
}

export default App
