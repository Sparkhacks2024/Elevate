import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Fourofour = () => {
  const navi = useNavigate();
  return (
    <div>
      <h5>404!!!!</h5>
      <Button
        onClick={() => {
          navi("/");
        }}
      >
        Log In
      </Button>
    </div>
  );
};

export default Fourofour;
