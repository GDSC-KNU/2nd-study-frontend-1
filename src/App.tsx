import { HashRouter, Route, Routes } from "react-router-dom";
import Index from "./Index";
import Chaejun from "./pages/Chaejun";
import Dahye from "./pages/Dahye/Dahye";
import Hyeonwook from "./pages/Hyeonwook";
import Study from "./pages/Study";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Index />} />
          <Route path="/chaejunlee" element={<Chaejun />} />
          <Route path="/hyeonwook" element={<Hyeonwook />} />
          <Route path="/dahye" element={<Dahye />} />
          <Route path="/study" element={<Study />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
