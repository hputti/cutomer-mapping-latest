import React, { useState,useEffect } from 'react'
import {  Grid, TextField, Button, Card, CardContent, Typography,Box,Autocomplete,Stack,Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import * as utils from "../../services/utils";


const ManageTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
      root: {
        fontSize : "0.8rem"
          },
      }
     },

     MuiFilledInput: {
      styleOverrides: {
      root: {
        fontSize : "0.8rem",
         height : "32px !important",
         border: "0px !important"
        },
      }
     },
     MuiInputLabel:{
      styleOverrides: {
        root: {
          fontSize : "0.8rem"
            },
        }
     },

     MuiSvgIcon:{
      styleOverrides: {
        root: {
          fontSize : ".87rem"
            },
        }
     },
     MuiAlert:{      
      styleOverrides: {
        message: {
          padding : "4px !important"
            },
        },
     },
     MuiAutocomplete:{
      styleOverrides: {
        root: {
          fontSize : "0.8rem"
            },
        },
        input :{
          fontSize : "0.8rem"
        },
        listbox: {
          fontSize: "10px !important"
        },
     }
    }
});


const addRolesStyles = makeStyles({
    textfield: {
    //width: 200,
    height:20
  },


  MuiOutlinedInput:{
    height:'0.57rem'
  }
 
});

     const customerList = [
      { title: '101282 : MILLER, LAURIE A.', label: 'MILLER, LAURIE A.' },
      { title: '120942 : MILLER, LAUR D.', label: 'The Godfather' },
      { title: '3498232 : STEVE, JOHN G MD', label: 'STEVE, JOHN G MD' },
      { title: '3498232 : MILLER  COUNTY NURSING HOME', label: 'MILLER  COUNTY NURSING HOME' },
      { title: '101282 : MILLER COSMETIC SURGERY', label: 'MILLER COSMETIC SURGERY' },
      { title: '101282 : MILLERS  HEALTHCARE', label: 'MILLERS  HEALTHCARE' },
      { title: '5441251 : MILLER JAMES A DMD', label: 'MILLER JAMES A DMD' },
      { title: '101282 : MILLER MD RUSSELL, MD', label: 'MILLER MD RUSSELL, MD' },
    ];
    


const FinalMapManage = (rowData,dialogClose,showAddFinal) => {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('Composed TextField');
    const [customerID, setcustomerID] = useState('');
    const [open, setOpen] = useState(false);
    const classes = addRolesStyles();
    const [customerName,setCustomerName]= useState('');
    const [pcustomerName,setpCustomerName]= useState('');
    const [assignmentL1,setassignmentL1]= useState('');
    const [assignmentReason,setassignmentReason]= useState('');
    const [isAddMode,setisAddMode]= useState(false);
    const [valCustomer,setvalCustomer]=useState({});    
    const [isPageValid,setisPageValid]= useState(false);


    useEffect(() => {          
      setisAddMode(showAddFinal);
       if(rowData && rowData.rowItem  && rowData.rowItem.length > 0 && !isAddMode)
        {
           //setcustomerID(rowData[0]);
            setassignmentL1(rowData.rowItem[4]);
            setassignmentReason(rowData.rowItem[6]);
            if(customerList){
             let custIndex = customerList.findIndex(x => x.title.includes(rowData.rowItem[1]));
              if(custIndex == 0 || custIndex > 0){
                setvalCustomer(utils.undefinedCheck(customerList[custIndex] , null));
              }else{
                  setvalCustomer(null);
              }
            }
            
       }else
       {
        setvalCustomer(null);
       }
    }, []);

    const saveManageData = ()=>{
      if(!validation()){
       setOpen(true);
       setTimeout(() => {
        setisPageValid(false);
      }, 2200);
      // rowData.handleSucessModelClose();
      }
    }


    const validation = () => {
      if (utils.uneCheck(customerName)) {
        setisPageValid(true);
      } else {
        setisPageValid(false);
      }

      return isPageValid;
    };

    const handleClose =()=>{
      setOpen(false);

    }

    const closeHandler =()=>{
      rowData.dialogClose();
    }

    const handleChange = (event) => {
        setName(event.target.value);
    };


    const onSelectCustomer = (e,item)=> {
      if(item){
       setCustomerName(item.label);
      }
    };

    
    const onprimarySelectCustomer = (e,item)=> {
      if(item){
        setpCustomerName(item.label);
      }
    };
    


return (

   
    // <Box sx={{ width: '100%', border: '2px solid #f1f2f3'  }} mt={1}>
    <Grid  sx={{width: '96%',marginLeft:"8px"}}> 
    <ThemeProvider theme={ManageTheme}>
    <Alert severity="success" color="info" sx={{width: '96%'}}> Status : Final </Alert>
        <Card  sx={{width: '100%', padding: "7px 2px", margin: "0 auto" }}>
          <CardContent>
            {/* <Typography gutterBottom variant="h7" sx={{fontSize : 15,fontWeight:"bold"}}>
              Customer Details
          </Typography>  */}
         {/* <Typography></Typography> */}
            {/* <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form and our team will get back to you within 24 hours.
          </Typography>  */}
         { isPageValid &&  <Alert severity="error"  sx={{width: '96%',marginTop:"-12px",marginBottom: "5px"}}> Please select customer Name..</Alert>}
         
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item >
                  {/* <TextField placeholder="Customer ID" label="Customer ID" variant="outlined" fullWidth required value={recMap[0]}/> */}
                  <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Customer*  </Typography> 
         
                  <Autocomplete size="small" sx={{fontSize : "10px"}} required  id="tags-outlined"  value={valCustomer} options={customerList} getOptionLabel={(option) => option.title} 
                     filterSelectedOptions onChange={onSelectCustomer}  renderInput={(params) => ( <TextField{...params} placeholder="CustomerID : Customer Name"  />   )}
                     ListboxProps={{
                      sx: { fontSize: "0.8rem" },
                    }}
                      />
                </Grid>
                {/* <Grid xs={12} sm={5} item>
                  <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Customer Name </Typography> 
                  <Tooltip title={customerName} arrow  placement="top">
                  <Chip label={customerName} rows={7} sx={{ minWidth : 200,maxWidth:300, justifyContent:"left"}}/>
                  </Tooltip>

                </Grid> */}

                <Grid xs={12} sm={6} item >
                  {/* <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Structure L1</Typography> 
                  <TextField id="outlined-size-small" fullWidth size="small" />      */}
                  <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Structure L1 </Typography> 

                  <Autocomplete size="small" sx={{fontSize : "10px"}} required id="tags-outlined"  options={customerList} getOptionLabel={(option) => option.title} 
                     filterSelectedOptions onChange={onSelectCustomer}  renderInput={(params) => ( <TextField{...params} placeholder="structure L1"  />   )}
                     ListboxProps={{
                      sx: { fontSize: "0.8rem" },
                    }}
                      />         
                </Grid>
              </Grid>
              &nbsp;
              <Grid container spacing={1}>
               
                <Grid xs={12} sm={12} item>
                <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Assignment Reason L1</Typography> 
                  <TextField  id="outlined-multiline-static" size="small"  required value={assignmentL1}  multiline  rows={4} fullWidth/>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        {/* <Card style={{width: '100%', padding: "10px 5px", margin: "0 auto" }}> */}
          <CardContent>
            {/* <Typography gutterBottom variant="h7" sx={{fontSize : 15,fontWeight:"bold"}}>
              Parent Customer Details
          </Typography>  */}
            {/* <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form and our team will get back to you within 24 hours.
          </Typography>  */}
            <form>
              <Grid container spacing={2}>
              <Grid xs={12} sm={12} item>
              <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Pramata CO Group</Typography> 
                  <Autocomplete  size="small" required id="tags-outlined" options={customerList} getOptionLabel={(option) => option.title} 
                     filterSelectedOptions  renderInput={(params) => ( <TextField{...params} placeholder="CustomerID : Customer Name"     />   )}
                     ListboxProps={{
                      sx: { fontSize: "0.8rem" },
                    }}

                    onChange={onprimarySelectCustomer}
                      />
                </Grid>
                {/* <Grid xs={12} sm={5} item>
                <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Customer Name </Typography> 
                <Tooltip title={pcustomerName} arrow  placement="top">
                 <Chip label={pcustomerName} rows={0} sx={{ minWidth : 200, maxWidth:300,justifyContent:"left"}}/>
                 </Tooltip>
              </Grid>  */}
              </Grid> 
              &nbsp;
             <Grid container spacing={2}>
              <Grid xs={12} sm={12} item>
                 <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Assignment Reason</Typography> 
                   <TextField  id="outlined-multiline-static" required size="small" fullWidth  multiline  rows={4}   value={assignmentReason}/>
                </Grid>
                {/* <Grid xs={12} sm={5} item>               
                   <Typography gutterBottom variant="h7" sx={{fontSize : 14}}> Status: </Typography> &nbsp;&nbsp;
                   <Chip label="Final" fullWidth   rows={3}/>
                   
                </Grid> */}
                </Grid>
              <Grid style={{marginTop : 30}}>
             <form >
             <Grid item xs={12} >  
               <Grid container spacing={1}>
                    <Grid xs={12} sm={2} item>
                    <Button type="button" variant="outlined" color="primary" size="small" fullWidth style={{ textTransform : "none" }} onClick={saveManageData}>
                    <SaveIcon fontSize="small"></SaveIcon> &nbsp;&nbsp;
                        Save</Button>
                </Grid>
                <Grid xs={12} sm={2} item>
                <Button type="button" variant="outlined" color="primary"  size="small" fullWidth style={{ textTransform : "none" }} onClick={closeHandler}>
                <CancelIcon fontSize="small"></CancelIcon>&nbsp;
                    Cancel</Button>
                </Grid>
                </Grid>
                </Grid>
             </form>
              </Grid>             
            </form>            
          </CardContent>
        </Card>
  </ThemeProvider>
        {/* </Card> */}
       </Grid> 
      
     
  //  </Box>


);

}


export default FinalMapManage;