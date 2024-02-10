/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Typography } from "@mui/joy";

import { useState } from "react";

import Login from "../assets/components/login";
import brain from "../assets/images/ElevateBrain.png";

const Landing = ({ setToken }: any) => {
  const [openModal, setModal] = useState<any>(false);

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
          backgroundColor: "#212121",
        }}
      >
        <img
          src={brain}
          className="logo"
          alt="Descriptive Alt Text"
          style={{ maxWidth: "100%", maxHeight: "100%", position: "absolute" }}
        />
        <div style={{ zIndex: 2, background: "white" }}>
          <h1
            style={{
              color: "#212121",
              fontSize: "40px",
              fontWeight: "700",
              textAlign: "center",
              margin: "5px 0",
              fontFamily: "Poppins, sans-serif",
              zIndex: 3,
            }}
          >
            ELEVATE
          </h1>
          <Typography sx={{ color: "#212121", zIndex: 3 }}>
            Unlock the secret to a happier, healthier you with exercise! Wave
            goodbye to stress and welcome a boost in mood, thanks to the magic
            of endorphins. From enhancing sleep to sharpening your mind, regular
            physical activity is your all-in-one solution for mental wellness.
            Join us now and embark on a journey towards resilience and joy.
            Exercise isn't just good for the body—it's your mental health's best
            friend. Let's get moving and transform today!
          </Typography>
        </div>
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
          className="sayhello"
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
