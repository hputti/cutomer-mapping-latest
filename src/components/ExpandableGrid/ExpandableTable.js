import React,{useState} from "react";
import Alert from '@mui/material/Alert';
import LoadingSpinner from "../ErrorHandler/LoadingSpinner";
import ExpandableGrid from './ExpandableGrid';
import { Box, CssBaseline } from "@mui/material";



const ExpandableTable = () => {

    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
      }, 800);
    
return (
  <Box color="text.primary" clone>
    <div style = {{ width : 'auto',  marginLeft : 100, marginRight: 50,marginTop : 90}}>  
     { 
        isLoading ? <LoadingSpinner/> : <ExpandableGrid/>
     }
        
    </div>
 </Box>

);

}

export default ExpandableTable;
