/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Typography } from "@mui/joy";

import { useState } from "react";

import Login from "../assets/components/login";
import brain from "../assets/images/ElevateBrain.png";
// landing page
// contains logo and welcome message
const Landing = ({ setToken }: any) => {
  const [openModal, setModal] = useState<any>(false);

  const butfun = () => {
    setModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "scroll",
          backgroundColor: "#212121",
        }}
      >
        <img
          src={brain}
          className="logo"
          alt="Descriptive Alt Text"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            position: "absolute",
            bottom: 0,
            right: 5,
          }}
        />
        <div
          style={{
            zIndex: 2,
            width: "500px",
            height: "400px",
            borderRadius: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 20,
            padding: "20p",
          }}
        >
          <h1
            style={{
              color: "white",
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
          <Typography sx={{ color: "white", zIndex: 3 }}>
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
