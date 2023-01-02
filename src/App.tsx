import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index";
import Chaejun from "./pages/Chaejun";
import Dahye from "./pages/Dahye";
import Hyeonwook from "./pages/Hyeonwook";
import Minju from "./pages/Minju";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Index />} />
        <Route path="/chaejunlee" element={<Chaejun />} />
        <Route path="/hyeonwook" element={<Hyeonwook />} />
        <Route path="/minju" element={<Minju />} />
        <Route path="/dahye" element={<Dahye />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
