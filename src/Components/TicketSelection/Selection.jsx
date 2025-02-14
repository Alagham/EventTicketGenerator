import { useState } from "react";
import DetailsForm from "../DetailsForm/DetailsForm";
import Ticket from "../Ticket/Ticket";
import TypeProp from "../../Reuseables/TypeProps/Typeprop";
import "./Selection.css";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const Selection = () => {
  const [page, setPage] = useState("Selection");

  return (
    <div>
      {page === "Selection" && (
        <div className="selectionContainer">
          <div id="selectionTop">
            <h2>Ticket Selection</h2>
            <p>Step 1/3</p>
          </div>
          <ProgressBar step="33" />
          <div className="innerContainer">
            <div className="detailsDiv">
              <div className="festDiv">
                <h1>Techember Fest "25</h1>
                <p>
                  Join us for an unforgettable experience at [Event Name]!
                  Secure your spot now.
                </p>
              </div>

              <div className="location">
                <p>📍 Landmark Centre</p>
                <p id="slash">| |</p>
                <p>March 15, 2025 | 7:00 AM</p>
              </div>
            </div>

            <hr />

            <div className="type">
              <p id="select">Select Ticket Type:</p>
              <div className="ticketType">
                <TypeProp access="REGULAR ACCESS" unit="20 slot available" price="Free" />
                <TypeProp access="VIP ACCESS" unit="20 slot available" price="$50" />
                <TypeProp access="VVIP ACCESS" unit="20 20 slot available" price="$100" />
              </div>
            </div>

            <div className="number">
              <p>Number of Tickets:</p>
              <select name="" id="ticketNum">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3 </option>
              </select>
            </div>

            <div className="buttons">
              <button className="cancelBtn">Cancel</button>
              <button
                className="nextBtn"
                onClick={() => setPage("DetailsForm")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {page === "DetailsForm" && (
        <DetailsForm
          goBack={() => setPage("Selection")}
          goNext={() => setPage("Ticket")}
        />
      )}
      {page === "Ticket" && (
        <Ticket
          goBack={() => setPage("DetailsForm")}
          restart={() => setPage("Selection")}
        />
      )}
    </div>
  );
};

export default Selection;
