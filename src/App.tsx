import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/login.tsx";
import Logging from "./pages/auth pages/Logging.tsx";
import MyRoutine from "./pages/auth pages/my_routines.tsx";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Fourofour from "./pages/Fourofour.tsx";
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
        {Token ? (
          <Route path="/routine" element={<MyRoutine Token={Token} />} />
        ) : (
          ""
        )}
        {Token ? (
          <Route path="/logging" element={<Logging Token={Token} />} />
        ) : (
          ""
        )}
        <Route path="*" element={<Fourofour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
