import { StrictMode } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "../pages/Home";
import Details from "../pages/Details";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/details" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
  </StrictMode>
)}

export default App;
