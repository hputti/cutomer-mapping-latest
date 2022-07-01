import React ,{ memo, useState }from "react";
import Alert from '@mui/material/Alert';
import LoadingSpinner from "../ErrorHandler/LoadingSpinner";
import { Box, CssBaseline } from "@mui/material";
import AuditHistoryGrid from '../AuditHistory/AuditHistoryGrid';


const AuditHistory = () => {

  const [isLoading, setIsLoading] = useState(true);
    
     setTimeout(() => {
          setIsLoading(false);
      }, 800);
      
  return (
  
       <Box color="text.primary" clone>
          <div style = {{ width : 'auto',  marginLeft : 100 ,marginTop : 90}}>  
            { 
              isLoading ? <LoadingSpinner/> :  <AuditHistoryGrid/>
            }
          </div>  
      </Box>
  
         ); 
  
};

export default AuditHistory;

