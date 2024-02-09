import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navi = useNavigate();
  const butfun = () => {
    navi("./home");
  };

  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "left top",
          height: "100%",
          overflow: "scroll",
          // backgroundColor: "#2d3238",
          backgroundColor: "white",
        }}
      >
        <button
          onClick={butfun}
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
          }}
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default Landing;
