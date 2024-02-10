/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import dayjs from "dayjs";
import Checkbox from "@mui/joy/Checkbox";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "bootstrap/dist/css/bootstrap.css";
import Button from "@mui/joy/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Navbar from "../../assets/components/Navbar";

import "../../index.css";

/* eslint-disable @typescript-eslint/no-unused-vars */

//page for logging workout of predefined routines
function Logging({ Token }: any) {
  const [Routines, setRoutines] = useState<any>([]);
  const [Todayroutine, setTodayroutine] = useState<any>(null);
  const [opendeletemodal, setopendeletemodal] = useState<any>(false);
  const [teststate, settest] = useState<any>(false);
  const [deleteindex, setdeleteindex] = useState<any>(null);

  //getting todays date

  const fetchdata = async () => {
    const { data } = await supabase
      .from("logs")
      .select("todays_lifts")
      .eq("uuid", Token.user.id)
      .eq("created_at", dayjs().startOf("day").format("YYYY-MM-DD"));

    if (data?.length === 0) {
      console.log("empty");
      const { data } = await supabase
        .from("userprofiles")
        .select("Routines")
        .eq("id", Token.user.id);
      if (data && data?.length > 0) {
        setRoutines(data[0].Routines);
      }
    } else {
      if (data) {
        setTodayroutine(data[0].todays_lifts);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [teststate]);

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "left top",
          height: "100%",
          backgroundColor: "#212121",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Todayroutine === null ? (
          <div style={{ marginTop: "100px" }}>
            <Select
              placeholder="Select Today's Routine"
              indicator={<KeyboardArrowDown />}
              value={Todayroutine}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {Routines.map((routine: any, index: any) => (
                <Option
                  key={index}
                  value={index}
                  onClick={async () => {
                    await supabase.from("logs").insert({
                      uuid: Token.user.id,
                      created_at: dayjs().startOf("day").format("YYYY-MM-DD"),
                      todays_lifts: Routines[index],
                    });

                    setTodayroutine(Routines[index]);
                    console.log(Todayroutine);
                  }}
                >
                  {routine.Name}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div
            className="card-1"
            style={{
              marginTop: "100px",
              border: "",
              borderRadius: "10px",
              background: "white",
            }}
          >
            <Modal
              open={opendeletemodal}
              onClose={() => setopendeletemodal(false)}
            >
              <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                  <WarningRoundedIcon />
                  Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                  Are you sure you want to delete this Exercise?
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="solid"
                    color="danger"
                    onClick={() => {
                      Todayroutine.routine.splice(deleteindex, 1);
                      const temp = Todayroutine;
                      setopendeletemodal(false);
                      if (temp.routine.length === 0) {
                        const update = async () => {
                          await supabase
                            .from("logs")
                            .delete()
                            .eq("uuid", Token.user.id)
                            .eq(
                              "created_at",
                              dayjs().startOf("day").format("YYYY-MM-DD")
                            );
                          settest(!teststate);
                          setTodayroutine(null);
                        };
                        update();
                      } else {
                        console.log("here", Todayroutine);
                        const update = async () => {
                          await supabase
                            .from("logs")
                            .update({ todays_lifts: temp })
                            .eq("uuid", Token.user.id)
                            .eq(
                              "created_at",
                              dayjs().startOf("day").format("YYYY-MM-DD")
                            );
                        };
                        update();
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => setopendeletemodal(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </ModalDialog>
            </Modal>
            <h3 style={{ marginLeft: "10px", marginTop: "10px" }}>
              {Todayroutine.Name}
            </h3>
            <div style={{ padding: "20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Delete</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sets</th>
                    <th scope="col">Reps</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {Todayroutine.routine.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>
                        <Button
                          color="danger"
                          size="sm"
                          sx={{
                            minWidth: 0,
                            width: "30px",
                            height: "24px",
                            p: 0,
                            maxHeight: "24px",
                          }}
                          onClick={() => {
                            setdeleteindex(index);
                            setopendeletemodal(true);
                          }}
                        >
                          <CloseIcon sx={{ fontSize: "15px" }} />
                        </Button>
                      </td>
                      <th scope="row">{item.Exercise}</th>
                      <td>{item.Sets}</td>
                      <td>{item.Reps}</td>
                      <td>{item.weight}</td>
                      <td>
                        <Checkbox
                          color="primary"
                          defaultChecked={item.Complete ? true : false}
                          sx={{ marginLeft: "20px" }}
                          onChange={(event) => {
                            if (event.target.checked) {
                              Todayroutine.routine[index].Complete = true;
                            } else {
                              Todayroutine.routine[index].Complete = false;
                            }

                            const temp = Todayroutine;
                            const update = async () => {
                              await supabase
                                .from("logs")
                                .update({ todays_lifts: temp })
                                .eq("uuid", Token.user.id)
                                .eq(
                                  "created_at",
                                  dayjs().startOf("day").format("YYYY-MM-DD")
                                );
                            };
                            update();
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Logging;
