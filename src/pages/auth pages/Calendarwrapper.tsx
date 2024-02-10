/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../../assets/components/Navbar";
import Calender from "../../assets/components/Calendar";
function CalendarPage({ Token }: any) {
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
        <Calender Token={Token} />
      </div>
    </>
  );
}

export default CalendarPage;
