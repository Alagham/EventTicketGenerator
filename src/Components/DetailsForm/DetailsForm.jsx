import { useState, useEffect } from "react";
import "./DetailsForm.css";
import uploadIcon from "../../assets/uploadIcon.svg";
import ProgressBar from "../../Reuseables/ProgressBar/ProgressBar";

const DetailsForm = ({ goBack, goNext }) => {
  const [yourname, setYourname] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("userDetails");
    if (savedData) {
      setInfo(JSON.parse(savedData));
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "newPreset");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dth7bsvbq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setImageUrl(data.secure_url);
  };

  const postData = (e) => {
    e.preventDefault();
    const newEntry = { yourname, email, request, imageUrl };

    setInfo((prevInfo) => {
      const updatedInfo = [...prevInfo, newEntry];
      localStorage.setItem("userDetails", JSON.stringify(updatedInfo)); 
      return updatedInfo;
    });
    setTimeout(() => {
      goNext();
    }, 500);

    setYourname("");
    setEmail("");
    setRequest("");
    setImageUrl("");
    };

  return (
    <div className="detailsContainer">
      <div id="detailsTop"> 
            <h2>Attendee Details</h2>
            <p>Step 2/3</p>
          </div>
          <ProgressBar step="66"/>
          <form onSubmit={postData}>
        
        <div className="photoUpDiv">
          <p id="uploadText"> Upload Profile Photo</p>
          <div className="photoDiv">
            <input
              type="file"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: "none" }} required
            />
            <label htmlFor="fileInput" id="imgInput" >
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" width="240px"/>
              ) : (
                <div className="newUpload">
                  <img src={uploadIcon} alt="" />
                  <p>Drag & drop or click to upload</p>
                </div>
              )}
            </label>
          </div>
        </div>
        <hr className="border" />
        <label htmlFor="yourname">Enter your name*</label> <br />
        <input
          name="yourname"
          id="yourname"
          value={yourname}
          onChange={(e) => setYourname(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="email">Enter your email*</label> <br />
        <input
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="request">Special request ?</label> <br />
        <textarea
          name="request"
          id="request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          required
        />{" "}
        <br />
        <div className="buttons">
          <button type="button"  onClick={goBack} className="backBtn">
            Back
          </button>
          <button type="submit"  className="ticketBtn" onClick={() => setPage("Ticket")}>
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
