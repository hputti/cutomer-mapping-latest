import React ,{ memo, useState, useEffect}from "react";
import {   Box, Button, Card,Checkbox, FormControlLabel,FormGroup, 
           Grid, IconButton, Link, Paper,Stack, Table,TableBody, TableCell,
           TableContainer, TableHead, TableRow, Tooltip, Typography,item,InputLabel,Select,MenuItem,Modal,Avatar } from "@mui/material";

import MUITable from "../DataTable/MUTable";
import * as constants from "../../constants/uiConstants";
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions/IndexAction";
import SkeletonLoader from "../CustomControls/SkeletonLoader";
import * as uiConstants from "../../constants/uiConstants";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CachedIcon from '@mui/icons-material/Cached';





/* CSS start */

const model = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    minHeight: 400,
  };

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '5px 4px',
      display: 'flex',
      alignItems: 'left',
      minWidth: 700,
    },
    input: {
      marginLeft:  useTheme().spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },   
  }));
  

  const SelectTheme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize : "0.85rem"
          }
        }
      },

      MuiOutlinedInput: {
        styleOverrides: {
        root: {
          fontSize : "0.85rem"
            },
        }
       }
      }
  });
  
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


/* CSS END */



const AuditHistoryGrid = (props) => {
    const dispatch = useDispatch();  

    /* variable declaration start*/
    const [formatedResults, setFormatedResults] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddPending, setshowAddPending] = useState(false);
    const [confirmBoxFlag, setConfirmBoxFlag] = useState(false);
    const [customerRec, setcustomerRec] = useState(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();


    const [rdSelected, setrdSelected] = useState('All');
    const [assignedToUserId, setassignedToUserId] = useState('0');
    const [searchPendingValue, setsearchPendingValue] = useState(null);



    /* variable declaration END*/


    /* Grid variable declaration Start */
    const [selectionIndexes, setSelectionIndexes] = useState([]);
    const [isApprove, setisApprove] = useState(false);
    const [isApproveAll, setisApproveAll] = useState(false);
    const [isAlertMsg, setisAlertMsg] = useState(false);
    const [checkboxMsg,setcheckboxMsg] = useState(null);
    const [deleteCustId, setdeleteCustId] = useState(null);
    const [isPendingDataLoading, setisPendingDataLoading] = useState(true);
    const [pendingSearchResults, setpendingSearchResults] = useState({
      results: [],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 0,
      totalCount: 0
     });
    const [sortDetails, setSortDetails] = useState({
        sortDirection: "DESC",
        sortColumn: "CreatedBy"
    });


   
    /* Grid variable declaretion END */



    useEffect(() => {
      //action.retrievePersonaRoleInfo(dispatch);
     // getDefaultPendingResults();
    }, []);

    
  //const allRoles = useSelector((state) => state.PendingMapReducer.PersonaRolesInfo);



  const getDefaultPendingResults = () => {
    let requestObject = {
        businessUnit: null,
        workfileType:rdSelected,
        searchValue : searchPendingValue,
        createdBy: assignedToUserId == '0' ? null :assignedToUserId ,
        pageNo: 1,
        pageSize: 10,
        sortBy: sortDetails.sortColumn,
        orderBy: sortDetails.sortDirection,
    };
    getPendingSearchResults(requestObject, uiConstants.PendingResultsSuccess, uiConstants.PendingResultsFailure, true);
};



    const getPendingSearchResults = (requestObject, successMessage, warningMessage, searchButton) => {
      setisPendingDataLoading(true);
      const res = action.retrievePersonaRoleInfo(requestObject);
      res.next()
          .value.then((resp) => {
            setisPendingDataLoading(false);
              if (resp.Results) {
                setpendingSearchResults({
                      results: resp.Results,
                      pageNumber: resp.PageNumber,
                      pageSize: resp.PageSize,
                      totalPages: resp.TotalPages,
                      totalCount: resp.TotalCount
                  });
                  if (searchButton) {
                      //props.showNotification(successMessage, uiConstants.Success);
                  }
              } else {
                setpendingSearchResults({
                      results: [],
                      pageNumber: 1,
                      pageSize: 10,
                      totalPages: 0,
                      totalCount: 0
                  });
                 // props.showNotification(warningMessage, uiConstants.Warning);
              }
          })
          .catch(function (error) {
            setisPendingDataLoading(false);
              if (error.response.status === 401) {
                  //props.showNotification(uiConstants.SessionInvalid, uiConstants.Error);
              } else {
                  //props.showNotification(uiConstants.APIError, uiConstants.Error);
              }
          });
    };



    const handleSearch = (e,val)=> {
     alert(searchPendingValue);
    }

   
    const handleAddEdit = (newRec) =>{
      setcustomerRec(newRec);
      setshowAddPending(true);
    }




    /* Modal Dialog Block  END*/

/* Grid Data AXIOS call start */
    const gridData = [
        ['C','101282','MILLER, LAURIE A.', 'harish.putti@mckesson.com','10/10/2021 22:56:02','harish.putti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','120942','MILLER, LAURIE A.',  'harish.putti@mckesson.com','10/11/2021 22:56:02','harish.putti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','3498232','STEVE, JOHN G., MD', 'harish.putti@mckesson.com','10/10/2021 22:56:02','harish.putti@mckesson.com', '01/22/2022 22:56:02'],
        ['A','3498232','STEVE,  DAPHNE,MD',  'harish.putti@mckesson.com','10/10/2021 22:56:02','harish.putti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','3498232','MILLER,  DAPHNE,MD', 'vijaya.chaganti@mckesson.com','10/10/2021 22:56:02' ,'vijaya.chaganti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','3498232','MILLER  COUNTY NURSING HOME,',  'vijaya.chaganti@mckesson.com','10/14/2021 22:56:02','siddhant.gupta@mckesson.com', '01/22/2022 22:56:02'],
        ['A','2014114','MILLER, LAURIE A.',  'siddhant.gupta@mckesson.com','10/10/2021 22:56:02','siddhant.gupta@mckesson.com', '01/22/2022 22:56:02'],
        ['A','200167','MILLER, LAURIE A.',  'vijaya.chaganti@mckesson.com','10/17/2021 22:56:02','vijaya.chaganti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','101282','MILLER COSMETIC SURGERY,','vijaya.chaganti@mckesson.com','10/19/2021 22:56:02','vijaya.chaganti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','101282','MILLERS  HEALTHCARE', 'vijaya.chaganti@mckesson.com','10/10/2021 22:56:02','vijaya.chaganti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','5441251','MILLER JAMES A DMD', 'vijaya.chaganti@mckesson.com','10/10/2021 22:56:02','vijaya.chaganti@mckesson.com', '01/22/2022 22:56:02'],
        ['C','101282','MILLERS  HEALTHCARE',  'sushma.challa@mckesson.com','10/10/2021 22:56:02','sushma.challa@mckesson.com', '01/22/2022 22:56:02'],
        ['A','101282','MILLER JAMES A DMD',  'sushma.challa@mckesson.com','10/10/2021 22:56:02','sushma.challa@mckesson.com', '01/22/2022 22:56:02'],
        ['C','101282','MILLER MD RUSSELL, MD',  'sushma.challa@mckesson.com','10/10/2021 22:56:02','sushma.challa@mckesson.com', '01/22/2022 22:56:02'],

      ];
    

    useEffect(() => {

      setTimeout(() => {
      setisPendingDataLoading(false);
        setFormatedResults(gridData);
      },2000);
        
    }, []);

/* Grid Data AXIOS call start */

/* Custom Grid Options start */
    const options = {
        fixedHeader: true,
        serverSide: false,
        align: "center",
        filter: false,
        search: false,
        selectableRows: false,
        download: true,
        print: false,
        count: props.TotalCount,
        selectToolbarPlacement:'none',
        viewColumns: false,
        setRowProps: row => {
            return {
              style: { fontSize: "5px" }
            };
          },
          setCellProps: () => ({ style: { fontSize: "5px" } }),
       downloadOptions: { filename: constants.CMS_Dashboards_CSV, separator: "," },

   onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      console.log("currentRowsSelected", currentRowsSelected);
      console.log("allRowsSelected", allRowsSelected);
      console.log("rowsSelected", rowsSelected);
      let temp = [];
      let indexes = [];
      // Set indexes to local hook:
      if(allRowsSelected.length >0){
        setisApproveAll(true);   } 
        else{  
        setisApproveAll(false);
      }       
      if(rowsSelected.length > 0){
        setisApprove(true);
      }else{ setisApprove(false);}
        setSelectionIndexes(rowsSelected);
      }
    };

  

    const linkStyle = {
        color: "#E70865",
        cursor: "pointer"
    };

/* Custom Grid Options END */




/*Grid Columns Start */
    const columns = [     
        
        {
            name: "ActionCode",
            label: "Action Code",
            options: {
              filter: true,
              sort: false,
             },
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const rowData = formatedResults[dataIndex];
                    return (
                             <Avatar sx={{ bgcolor: deepPurple[500], color:"white",height: 18,width: 18 ,fontSize: '12px'}} >{rowData[0]}</Avatar>                        
                           );
                }
            }
        },
        {
            name: "CustomerID",
            label: "Customer ID",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const caseData = formatedResults[dataIndex];
                    return (
                        <Typography variant="h7" >                           
                            <Link href="#" underline="none"   onClick={() => {handleAddEdit(formatedResults[dataIndex])}}> {caseData[1]}</Link>
                        </Typography>
                    );
                }
            }
        },
        {
            name: "CustomerName",
            label: "Customer Name"
        },
        {
            name: "CreatedOn",
            label: "Created On"
        },
        {
            name: "CreatedBy",
            label: "Created By",
        },
        {
            name: "UpdatedOn",
            label: "Updated On",
        },
        {
            name: "UpdatedBy",
            label: "Updated By",
        },
       
    ];

/*Grid Columns END */

/* HTML Render Start */

    return (

        <Box sx={{ width: '96%', border: '3px solid #f1f2f3',fontSize: '0.5rem' }} mt={1}>
          <Grid container spacing={0.8} >
                <Grid item xs={12}>
                <Grid container spacing={0.2} >
                    <Grid item xs={2} >
                        <Item sx={{background: "#f1F2F4" ,fontSize: '0.7rem',
                          borderRadius: "0.5px", background: "#f1F2F4", marginTop: "-6px",padding:"14px"
                        }}><h3>Audit History</h3></Item>
                    </Grid>
                    <Grid item xs={10} sx={{ background: "#f1F2F4",float: 'left'}} >
                        <Item  xs={10} md={10} sx={{ float: 'left', fontSize: '0.5rem', borderRadius: "1px", background: "#f1F2F4"}} >
                        <FormControl sx={{height:50 }}>  
                        <Paper component="form" className={classes.root} style={{height:27,marginTop : 5}}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Audit History"
                                inputProps={{ 'aria-label': 'Search Audit History' }}
                                sx={{fontSize : "0.8rem"}}
                                onChange={event=>{                                
                                  setsearchPendingValue(event.target.value)
                                }}
                            />
                            <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />                                               
                        </Paper>
                      </FormControl>
                     </Item>
                    </Grid>
                </Grid>   
                </Grid>
                
                <Grid item xs={12}>

                {isPendingDataLoading ? <SkeletonLoader /> : null}
                        {          
                          formatedResults ? (
                            <MUITable
                            //title="Pending Grouping Results"
                            columns={columns}
                            data={formatedResults}
                            customOptions={options}
                            noDataFoundMsg="No Cases found"
                            />
                        ) : null
                        }
                </Grid>

         </Grid>
       
         </Box>

    );
/* HTML Render END */

}   



export default AuditHistoryGrid