import { Modal, ModalClose, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet/Sheet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../assets/components/login";
import brain from "../assets/images/ElevateBrain.png";

const Landing = ({ setToken }) => {
  const [openModal, setModal] = useState<any>(false);
  const navi = useNavigate();
  const butfun = () => {
    setModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex", // Enable flexbox
          flexDirection: "column",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          height: "100vh", // Full viewport height
          overflow: "scroll",
          backgroundColor: "white",
        }}
      >
        <img
          src={brain}
          alt="Descriptive Alt Text"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "700",
            textAlign: "center",
            margin: "5px 0",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          ELEVATE
        </h1>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openModal}
          onClose={() => setModal(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Login setToken={setToken} />
        </Modal>
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
