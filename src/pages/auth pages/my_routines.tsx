/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

//MESSY CODE :'( was too tired to fix. Clean it up in the morning if we have time

//NEED TO STYLE the lists

//x=data[0].Routine gives the array of objects
//x[0] gives the first element in the object then
//x[0].Name is the Name of the routine
//x[0].routine will give the array of exercises
//x[0].routine[0] will give the first exercise in that routine
//x[0].rotuine[0].Exercise will give the name of the first exercise for that routine
//x[0].routine[0].Sets will give sets for that routine and then Reps will give Reps and so on

import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../../assets/components/Navbar";

import {
  Divider,
  Stack,
  Button,
  List,
  ListItem,
  ListItemButton,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";

function MyRoutine({ Token }: any) {
  const [routines, setRoutines] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("userprofiles")
        .select("Routines")
        .eq("id", Token.user.id);
      if (data) {
        setRoutines(data[0].Routines);
      }
    };

    fetchData();
  }, []);

  const [Draweropen, setDrawerOpen] = useState(false);
  const [modalopen, setmodalOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState(""); //for routine modal form
  const [expandedroutine, setexpandedroutine] = useState(0); //for checking which routine was clicked

  //for the exercise modal form
  const [exercisemodalopen, setexercisemodalOpen] = useState(false);
  const [exercisename, setexercisename] = useState("");
  const [sets, setsets] = useState<number | null>(null);
  const [reps, setreps] = useState<number | null>(null);
  const [weight, setweight] = useState<number | null>(null);
  const [editindex, seteditindex] = useState<number | null>(null);

  //handles what happens when you choose the rotuine
  const checkClick = (routineName: number) => {
    setDrawerOpen(true);
    setexpandedroutine(routineName);
  };

  ///

  //handles the submit for adding the routines -DONE
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newRoutineName.trim() !== "") {
      const rout = { Name: newRoutineName.trim(), routine: [] };

      const test = routines;
      test.push(rout);

      const update = async () => {
        await supabase
          .from("userprofiles")
          .update({ Routines: test })
          .eq("id", Token.user.id);
      };

      update();

      setRoutines(test);
      setNewRoutineName("");
      setmodalOpen(false);
    }
  };

  //For the exercise modal to update or add a new exercise
  const handleexerciseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exercisename.trim() !== "") {
      const pushel = {
        Reps: reps,
        Sets: sets,
        Exercise: exercisename,
        weight: weight,
        Complete: false,
      };
      if (editindex == null) {
        routines[expandedroutine].routine.push(pushel);
      } else {
        routines[expandedroutine].routine[editindex] = pushel;
      }

      const test = routines;

      const update = async () => {
        await supabase
          .from("userprofiles")
          .update({ Routines: test })
          .eq("id", Token.user.id);
      };

      update();

      setexercisemodalOpen(false);
      setexercisename("");
      setsets(null);
      setreps(null);
      setweight(null);
    }
  };

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
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={modalopen}
          onClose={() => setmodalOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: "350px",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h5"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="md"
              mb={1}
            >
              Name the Routine
            </Typography>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Ex. Push Day"
                required
                value={newRoutineName}
                onChange={(e) => setNewRoutineName(e.target.value)}
              />
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button type="submit" disabled={newRoutineName.trim() === ""}>
                  Submit
                </button>
              </div>
            </form>
          </Sheet>
        </Modal>

        {/* display div */}

        <div
          style={{
            marginTop: "100px",
            border: "solid 1px black",
            width: "calc(400px + 16px)",
            height: "600px",
            display: "flex",
            overflowY: "auto",
            background: "white",
            position: "relative",
            flexDirection: "column",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "40px",
            }}
            onClick={() => setmodalOpen(true)}
            sx={{ width: "35px", height: "20px" }}
          >
            <Add />
          </Button>
          <div style={{ marginTop: "50px" }}></div>
          {routines.map((routine: any, index: any) => (
            <button
              key={index}
              onClick={() => checkClick(index)}
              style={{
                background: "#212121",
                margin: "10px",
                padding: "10px",
                borderRadius: "20px",
                border: "solid 1px black",
                display: "flex",
                zIndex: 2,
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0, // Prevent button sizes from changing
              }}
            >
              <div style={{}}>{routine.Name}</div>
              <div style={{ background: "transparent" }}>{" > "}</div>
            </button>
          ))}
        </div>

        {/* Drawer code */}
        <Drawer
          size="md"
          variant="plain"
          open={Draweropen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            content: {
              sx: {
                bgcolor: "transparent",
                p: { md: 3, sm: 0 },
                boxShadow: "none",
              },
            },
          }}
        >
          <Sheet
            sx={{
              borderRadius: "md",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              useFlexGap
              spacing={1}
            >
              {routines[expandedroutine] && (
                <DialogTitle level="h2">
                  {routines[expandedroutine].Name}
                </DialogTitle>
              )}
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setsets(null);
                  setreps(null);
                  setweight(null);
                  seteditindex(null);
                  setexercisename("");

                  setexercisemodalOpen(true);
                }}
                sx={{ width: "35px", height: "20px" }}
              >
                <Add />
              </Button>
            </Stack>
            <Divider sx={{ mt: "auto" }} />
            <DialogContent
              sx={{
                gap: 2,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#aaa",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
              }}
            >
              <List>
                {routines[expandedroutine] &&
                  routines[expandedroutine].routine.map(
                    (exercise: any, index: number) => (
                      <ListItem key={index} sx={{ marginBottom: "30px" }}>
                        <ListItemButton
                          sx={{
                            m: "1px",
                            border: "solid 1px black",
                            borderRadius: "20px",
                            display: "flex",
                            justifyContent: "space-between", // Align items horizontally
                            alignItems: "center", // Align items vertically
                          }}
                          onClick={() => {
                            seteditindex(index);
                            setexercisemodalOpen(true);
                            setsets(exercise.Sets);
                            setreps(exercise.Reps);
                            setweight(exercise.weight);
                            setexercisename(exercise.Exercise);
                          }}
                        >
                          <Typography
                            level="h4"
                            fontWeight={400}
                            sx={{
                              fontSize: "16px", // Default font size
                              "@media (max-width: 600px)": {
                                fontSize: "13px", // Adjust font size for smaller screens
                              },
                            }}
                          >
                            {exercise.Exercise}: {exercise.Sets}{" "}
                            <span style={{ fontSize: "12px" }}>sets</span>,{" "}
                            {exercise.Reps}{" "}
                            <span style={{ fontSize: "12px" }}>reps</span>,{" "}
                            {exercise.weight}{" "}
                            <span style={{ fontSize: "12px" }}>lbs</span>
                          </Typography>
                          <EditIcon
                            sx={{
                              width: "15px", // Default width
                              height: "15px", // Default height
                              "@media (min-width: 1234px)": {
                                width: "15px", // Adjust width for larger screens
                                height: "15px", // Adjust height for larger screens
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
              </List>
            </DialogContent>

            <Divider sx={{ mt: "auto" }} />
            <Button
              onClick={() => {
                routines.splice(expandedroutine, 1);
                const test = routines;
                const update = async () => {
                  await supabase
                    .from("userprofiles")
                    .update({ Routines: test })
                    .eq("id", Token.user.id);
                };

                update();

                setDrawerOpen(false);
              }}
              color="danger"
            >
              Delete
            </Button>
          </Sheet>

          {/* Edit and Add exercise */}
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={exercisemodalopen}
            onClose={() => setexercisemodalOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                width: "350px",
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                useFlexGap
                spacing={1}
              >
                <Typography
                  component="h5"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="md"
                  mb={1}
                >
                  Exercise Info
                </Typography>
                {editindex === null ? (
                  <ModalClose variant="plain" sx={{ m: 1 }} />
                ) : (
                  <Button
                    variant="plain"
                    color="neutral"
                    sx={{ width: "10px", height: "10px", mt: "-9px" }}
                    onClick={() => {
                      routines[expandedroutine].routine.splice(editindex, 1);
                      const test = routines;
                      setexercisemodalOpen(false);
                      const update = async () => {
                        await supabase
                          .from("userprofiles")
                          .update({ Routines: test })
                          .eq("id", Token.user.id);
                      };

                      update();

                      setexercisemodalOpen(false);
                      setexercisename("");
                      setsets(null);
                      setreps(null);
                      setweight(null);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Stack>

              <form onSubmit={handleexerciseSubmit}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  useFlexGap
                  spacing={1}
                >
                  <Input
                    placeholder="Exercise Name"
                    required
                    value={exercisename}
                    onChange={(e) => setexercisename(e.target.value)}
                  />
                  <Input
                    placeholder="Sets"
                    required
                    type="Number"
                    value={sets !== null ? sets.toString() : ""}
                    onChange={(e) => setsets(parseInt(e.target.value))}
                  />
                </Stack>
                <Stack
                  mt={"10px"}
                  direction="row"
                  justifyContent="space-between"
                  useFlexGap
                  spacing={1}
                >
                  <Input
                    placeholder="Reps"
                    required
                    type="Number"
                    value={reps !== null ? reps.toString() : ""}
                    onChange={(e) => setreps(parseInt(e.target.value))}
                  />
                  <Input
                    placeholder="Weight"
                    required
                    type="Number"
                    value={weight !== null ? weight.toString() : ""}
                    onChange={(e) => setweight(parseInt(e.target.value))}
                  />
                </Stack>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button type="submit" disabled={exercisename.trim() === ""}>
                    Submit
                  </button>
                </div>
              </form>
            </Sheet>
          </Modal>
        </Drawer>
      </div>
    </>
  );
}

export default MyRoutine;
