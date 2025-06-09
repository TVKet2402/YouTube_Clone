import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./pages/Video";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar";
import YoutubeStudio from "./pages/YoutubeStudio";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/YoutubeStudio" element={<YoutubeStudio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;