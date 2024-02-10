/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { supabase } from "../../utils/client";
import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useRef, useState } from "react";
import Checkbox from "@mui/joy/Checkbox";

function DateCalendarServerRequest({ Token }: any) {
  //const toastTrigger = document.getElementById("liveToastBtn");
  // const toastLiveExample = document.getElementById("liveToast")!;
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  //this is for the table which will have the information
  const [thatday, setthatday] = useState([]);
  const [IsClicked, setIsClicked] = useState(false);
  async function getdaysworked(month: number, year: number) {
    const { data, error } = await supabase
      .from("logs")
      .select("created_at")
      .eq("uuid", Token.user.id);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    const filteredDates = data
      .filter((item) => {
        const createdAt = dayjs(item.created_at); // Parse the date with Day.js
        return createdAt.month() === month && createdAt.year() === year;
      })
      .map((item) => dayjs(item.created_at).date()); // Map to Day.js objects
    return filteredDates;
  }

  function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(async () => {
        const daysToHighlight = [];
        const highlightedDays = await getdaysworked(date.month(), date.year());
        daysToHighlight.push(...highlightedDays);

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  const initialValue = dayjs().startOf("day");
  // const initialValue = dayjs("2022-04-17");

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "✅" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([0]);
  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };
  useEffect(() => {
    console.log(thatday);
  });

  useEffect(() => {
    fetchHighlightedDays(initialValue);

    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    //toastBootstrap.show();

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  //to handle the click from the user on different dates
  async function HandleDateChange(date: any) {
    if (highlightedDays.includes(date.date())) {
      setIsClicked(true);

      const fetchData = async () => {
        const { data } = await supabase
          .from("logs")
          .select("todays_lifts")
          .eq("uuid", Token.user.id)
          .eq("created_at", dayjs(date).format("YYYY-MM-DD"));

        if (data != null) {
          if (data[0] != null) {
            if (data[0].todays_lifts.length === 0) {
              setthatday([]);
              setIsClicked(false);
            } else {
              setthatday([]);
              setthatday(data[0].todays_lifts.routine);
            }
          }
        }
      };

      fetchData();
    } else {
      setIsClicked(false);

      setthatday([]);
    }
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "inline-block",
          borderRadius: "20px",
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          marginTop: "35px",
          backgroundColor: "white",
        }}
        className="my-calendar-container"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onChange={HandleDateChange}
            onMonthChange={handleMonthChange}
            onYearChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </LocalizationProvider>
      </div>

      {IsClicked ? (
        <div style={{ padding: "20px" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Sets</th>
                <th scope="col">Reps</th>
                <th scope="col">Weight</th>
                <th scope="col">Complete</th>
              </tr>
            </thead>
            <tbody>
              {thatday.map((item: any, index: any) => (
                <tr key={index}>
                  <th scope="row">{item.Exercise}</th>
                  <td>{item.Sets}</td>
                  <td>{item.Reps}</td>
                  <td>{item.weight}</td>
                  <td>
                    <Checkbox
                      disabled
                      color="primary"
                      defaultChecked={item.Complete ? true : false}
                      sx={{ marginLeft: "20px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default DateCalendarServerRequest;
