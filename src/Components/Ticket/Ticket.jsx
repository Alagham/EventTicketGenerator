import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./Ticket.css";
import BarCode from "../../assets/BarCode.svg";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const Ticket = ({ goBack, restart }) => {
  const [savedInfo, setSavedInfo] = useState([]);
  const ticketRef = useRef(null); 

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSavedInfo(parsedData[parsedData.length - 1]);
    }
  }, []);

  
  const downloadTicket = async () => {
    if (!ticketRef.current) {
      console.error("Ticket section not found!");
      return;
    }

    try {
      const canvas = await html2canvas(ticketRef.current, { scale: 2 }); 
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "ticket.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing ticket:", error);
    }
  };

  return (
    <div className="ticketContainer">
      <div id="ticketTop">
        <h2>Ready</h2>
        <p>Step 3/3</p>
      </div>
      <ProgressBar step="99" />

      <div className="booked">
        <h3>Your Ticket is Booked!</h3>
        <p>
          Check your email for a copy or you can{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); downloadTicket(); }}>
            download
          </a>
        </p>
      </div>
      <div className="ticketbg" ref={ticketRef}>
        <div className="ticketDiv">
          <div className="deets">
            <h3>Techember Fest '25</h3>
            <p>📍 04 Rumens road, Ikoyi, Lagos</p>
            <p>📅 March 15, 2025 | 7:00 AM</p>
          </div>
          {savedInfo ? (
            <div>
              {savedInfo.imageUrl ? (
                <img src={savedInfo.imageUrl} alt="Profile" id="imageUrl" />
              ) : (
                <p>No image available</p>
              )}
              <div className="ticketInfo">
                <div>
                  <p>Name</p>
                  <h4>{savedInfo.yourname}</h4>
                </div>
                <div>
                  <p>Email</p>
                  <h4>{savedInfo.email}</h4>
                </div>
                <div>
                  <p>Ticket Type:</p>
                  <h4>Regular Access</h4>
                </div>
                <div>
                  <p>Ticket for:</p>
                  <h4>1</h4>
                </div>
                <div>
                  <p>Special request</p>
                  <p>{savedInfo.request}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No recent submission found.</p>
          )}
        </div>
        <div className="barCode">
          <img src={BarCode} alt="Barcode" />
        </div>
      </div>
      <div className="buttons">
        <button onClick={restart} id="bookBtn">
          Book Another Ticket
        </button>
        <button id="downloadBtn" onClick={downloadTicket}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
