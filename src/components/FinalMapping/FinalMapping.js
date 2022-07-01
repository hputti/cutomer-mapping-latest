import React,{useState} from "react";
import Alert from '@mui/material/Alert';
import LoadingSpinner from "../ErrorHandler/LoadingSpinner";
import FinalMapGrid from './FinalMapGrid';
import { Box, CssBaseline } from "@mui/material";



const FinalMapping = () => {

    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
      }, 800);
    
return (
  <Box color="text.primary" clone>
  <div style = {{ width : 'auto',  marginLeft : 100 ,marginTop : 90}}>  
  { 
        isLoading ? <LoadingSpinner/> : <FinalMapGrid/>
      }
        
    </div>
    </Box>

);

}

export default FinalMapping;

