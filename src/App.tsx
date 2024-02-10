import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/login.tsx";
import Logging from "./pages/auth pages/Logging.tsx";
import Routine from "./pages/auth pages/my_routines.tsx";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const App = () => {
  const tokenCookie = Cookies.get("Token");
  const [Token, setToken] = useState(
    tokenCookie ? JSON.parse(tokenCookie) : null
  );

  useEffect(() => {
    if (Token) {
      Cookies.set("Token", JSON.stringify(Token), { expires: 7 });
    } else {
      Cookies.remove("Token");
    }
  }, [Token]);

  //return everything else
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="/home" element={<Login setToken={setToken} />} />
        <Route path="/routine" element={<Routine Token={Token} />} />
        <Route path="/logging" element={<Logging Token={Token} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
