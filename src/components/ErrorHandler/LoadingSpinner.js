import React from "react";
import CircularProgress from '@mui/material/CircularProgress';


const model = {
  position: "absolute",
  top: "38%",
  left: "50%" 
};

const LoadingSpinner = () => {
  return (
    <div className="spinner-container" >
      <CircularProgress sx={model} color="secondary"></CircularProgress>
    </div>
  );
}

export default LoadingSpinner



