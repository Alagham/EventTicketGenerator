import "./ProgressBar.css";

const ProgressBar = ({ step }) => {
  return (
    <div className="progressContainer">
      <div className="progress-bar" style={{ width: `${step}%` }}></div>
    </div>
  );
};

export default ProgressBar;
