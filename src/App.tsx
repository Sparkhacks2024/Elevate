import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/login.tsx";
const App = () => {
  //return everything else
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        {/* <Route path="/home" element={<Home character={Characteristicble} />} />
        <Route path="/test" element={<Test character={Characteristicble} />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
