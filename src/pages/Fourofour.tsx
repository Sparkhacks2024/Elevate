import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

//404 page if user is not logged in or page not found
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
