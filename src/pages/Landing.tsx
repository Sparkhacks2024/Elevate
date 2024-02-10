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
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              This is the modal title
            </Typography>
            <Login setToken={setToken} />
          </Sheet>
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

    /*
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
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              This is the modal title
            </Typography>
            <Login setToken={setToken} />
          </Sheet>
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
    */
  );
};

export default Landing;
