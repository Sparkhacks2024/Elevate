/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "../../assets/css files/login.css";
import { supabase } from "../../utils/client.ts";
import { useNavigate } from "react-router-dom";

function Login({ setToken }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      //if there is an error
      if (error) {
        alert("Invalid password or email");

        setEmail("");
        setPassword("");
      } else {
        console.log("Logged in", data.session);
        setToken(data.session);
        navi("/logging");
      }
    } catch (error) {
      //catch block
      alert(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div
        className="profile"
        style={{ width: "400px", height: "500px", display: "flex" }}
      >
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "10%" }}></div>
          <div
            className="form-group"
            style={{
              marginRight: "20%",
              marginLeft: "20%",
              marginTop: "50px",
            }}
          >
            <label
              htmlFor="exampleInputEmail1"
              style={{
                fontWeight: "300",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <small id="emailHelp" className="form-text text-muted"></small>
          </div>
          <div className="form-group" style={{ margin: "30px 20%" }}>
            <label
              htmlFor="exampleInputPassword1"
              style={{
                fontWeight: "300",
              }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              style={{ fontFamily: "Poppins, sans-serif" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="sayhello" style={{ margin: "20px 10px" }}>
              Create Account
            </button>
            <button
              className="sayhello"
              type="submit"
              style={{ margin: "20px 10px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
