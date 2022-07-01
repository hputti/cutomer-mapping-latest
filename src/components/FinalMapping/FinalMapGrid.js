import React ,{ memo, useState, useEffect}from "react";
import {   Box, Button, Card,Checkbox, FormControlLabel,FormGroup, 
           Grid, IconButton, Link, Paper,Stack, Table,TableBody, TableCell,
           TableContainer, TableHead, TableRow, Tooltip, Typography,item,InputLabel,Select,MenuItem,Modal } from "@mui/material";

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
import FinalMapManage  from "./FinalMapManage";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions/IndexAction";
import SkeletonLoader from "../CustomControls/SkeletonLoader";
import * as uiConstants from "../../constants/uiConstants";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FactCheckIcon from '@mui/icons-material/FactCheck';




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
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 500,
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



const FinalGroupGrid = (props) => {
    const dispatch = useDispatch();  

    /* variable declaration start*/
    const [formatedResults, setFormatedResults] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddFinal, setshowAddFinal] = useState(false);
    const [confirmBoxFlag, setConfirmBoxFlag] = useState(false);
    const [customerRec, setcustomerRec] = useState(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();


    const [rdSelected, setrdSelected] = useState('All');
    const [assignedToUserId, setassignedToUserId] = useState('0');
    const [searchFinalValue, setsearchFinalValue] = useState(null);



    /* variable declaration END*/


    /* Grid variable declaration Start */
    const [selectionIndexes, setSelectionIndexes] = useState([]);
    const [isApprove, setisApprove] = useState(false);
    const [isApproveAll, setisApproveAll] = useState(false);
    const [isAlertMsg, setisAlertMsg] = useState(false);
    const [checkboxMsg,setcheckboxMsg] = useState(null);
    const [deleteCustId, setdeleteCustId] = useState(null);
    const [isFinalDataLoading, setisFinalDataLoading] = useState(true);
    const [finalSearchResults, setfinalSearchResults] = useState({
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
     // getDefaultFinalResults();
    }, []);

    
  //const allRoles = useSelector((state) => state.FinalMapReducer.PersonaRolesInfo);



  const getDefaultFinalResults = () => {
    let requestObject = {
        businessUnit: null,
        workfileType:rdSelected,
        searchValue : searchFinalValue,
        createdBy: assignedToUserId == '0' ? null :assignedToUserId ,
        pageNo: 1,
        pageSize: 10,
        sortBy: sortDetails.sortColumn,
        orderBy: sortDetails.sortDirection,
    };
    getFinalSearchResults(requestObject, uiConstants.FinalResultsSuccess, uiConstants.FinalResultsFailure, true);
};



    const getFinalSearchResults = (requestObject, successMessage, warningMessage, searchButton) => {
      setisFinalDataLoading(true);
      const res = action.retrievePersonaRoleInfo(requestObject);
      res.next()
          .value.then((resp) => {
            setisFinalDataLoading(false);
              if (resp.Results) {
                setfinalSearchResults({
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
                setfinalSearchResults({
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
            setisFinalDataLoading(false);
              if (error.response.status === 401) {
                  //props.showNotification(uiConstants.SessionInvalid, uiConstants.Error);
              } else {
                  //props.showNotification(uiConstants.APIError, uiConstants.Error);
              }
          });
    };



    const rdhandleChange = (e,val)=> {
      if(e.target.value){
        setrdSelected(e.target.value); }
      else {
        setrdSelected('All'); }
    }


    const handleSearch = (e,val)=> {
     alert(searchFinalValue);
    }

    const selectUserChange = (event: SelectChangeEvent) => {
      setassignedToUserId(event.target.value);
    };


    /* Modal Dialog Block Start */
    const ConfirmModal = ({ open, onClose }) => {
        const heading = "Confirm";
        let message = "Are you sure want to delete record?";
    
        return (
          <Modal open={open} onClose={onClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 330,
                bgcolor: "#FFFFFF",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px #00000065",
                textAlign: "center",
                px: 4,
                pt: 4,
                pb: 3,
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                {heading}
              </Typography>
            
              <Typography sx={{ my: 4 }}  sx={{ fontSize:14,padding:2 }}>{message}</Typography>

              <Grid
                item
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Button
                  style={{
                    backgroundColor: "#005A8C",
                    padding: "0.5em 2.5em",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    height:28,
                    fontSize:12
                  }}
                  onClick={() => {
                    confirmDeleteHandler();
                  }}
                >
                  Ok
                </Button>
                <Button
                  style={{
                    backgroundColor: "#005A8C",
                    padding: "0.5em 2.5em",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    height:28,
                    fontSize:12
                  }}
                  onClick={() => {
                    confirmClose();
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Box>
          </Modal>
        );
      };

      const confirmModalCloseHandler = () => {
        setConfirmBoxFlag(false);
      };

      const deleteHandler = (CustId) => {        
        setdeleteCustId(CustId);
        setConfirmBoxFlag(true);
      };

      const confirmDeleteHandler = () => {      
        let requestBody = {
          customerId: deleteCustId,
        };
        console.log(deleteCustId);
          setOpen(true);
          setConfirmBoxFlag(false);
          setdeleteCustId(null);
      }; 

    const handleModelOpen = () => {
      setShowModal(true);
      setcustomerRec(null);
    }
    const handleAddEdit = (newRec) =>{
      setcustomerRec(newRec);
      setshowAddFinal(true);
    }

    const handleModelClose = () => {
       setShowModal(false);
       setshowAddFinal(false);

    };

    const handleSucessModelClose = () => {
      setShowModal(false);
      setshowAddFinal(false);
      setisAlertMsg(true);
      setcheckboxMsg('Record saved Successfully...');
      setTimeout(() => {
        setisAlertMsg(false);
        setcheckboxMsg(null);
      }, 2000);  
      
   };


    const confirmClose =()=>{
      setdeleteCustId(null);
      setConfirmBoxFlag(false);
      console.log(deleteCustId);

    }

    const handleClose =()=>{
      setOpen(false);
    }


    /* Modal Dialog Block  END*/

/* Grid Data AXIOS call start */
    const gridData = [
        ['101282','MILLER, LAURIE A.', 'ALL SAINTS EYE CENTER', 'There is only one parent named: AR_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, PRCA_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['120942','MILLER, LAURIE A.', 'WINN FAMILY MEDICINE', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user4','10/11/2021','user2', '01/22/2022'],
        ['3498232','STEVE, JOHN G., MD', 'OLIVER CHIROPRACTIC', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['3498232','STEVE,  DAPHNE,MD', 'FUENTES, MELECIA MD PA', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/10/2021','user5', '01/22/2022'],
        ['3498232','MILLER,  DAPHNE,MD', 'ALL SAINTS EYE CENTER', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user6','10/10/2021','user3', '01/22/2022'],
        ['3498232','MILLER  COUNTY NURSING HOME,', 'PORTASCIENCE INC', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/14/2021','user2', '01/22/2022'],
        ['2014114','MILLER, LAURIE A.', 'HOMELINEPREMIER GPO', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['200167','MILLER, LAURIE A.', 'BRINKMAN, TIMOTHY J., MD', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/17/2021','user6', '01/22/2022'],
        ['101282','MILLER COSMETIC SURGERY,', 'MIDWEST SPINE BRAIN INSTITUTE, LLC', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user9','10/19/2021','user2', '01/22/2022'],
        ['101282','MILLERS  HEALTHCARE', 'JUNCTION CLINIC', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user10','10/10/2021','user5', '01/22/2022'],
        ['5441251','MILLER JAMES A DMD', 'GOMEZ-SEOANE M.D. PC', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['101282','MILLERS  HEALTHCARE', 'UNITED PHYSICIANS', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['101282','MILLER JAMES A DMD', 'HURLEY MEDICAL CENTER', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.', 'Added','PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],
        ['101282','MILLER MD RUSSELL, MD', 'MCMANAMAN, CRAIG J DO', 'There is only one parent named: PRCA_PARNT_NAME, DELIVERED_PROFIT_HIGHEST_CUST_PARNT_NAME, MARKETING_HIGHEST_CUST_PARNT_NAME.','Added', 'PRatea test CoGroup', 'Final', 'user1','10/10/2021','user2', '01/22/2022'],

    ];
    

    useEffect(() => {

      setTimeout(() => {
      setisFinalDataLoading(false);
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
        fixedHeader: true,
        selectableRows: true,
        download: true,
        print: false,
        count: props.TotalCount,
        selectToolbarPlacement:'none',
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



/* Page Events Start */
 const approveSelectedItems =()=>{

   if(isApprove && selectionIndexes.length > 0)
   {

    const myArrayFiltered =  formatedResults.filter((item,index) => (selectionIndexes.includes(parseInt(index)))).map(item => item[1]);

   
    alert(JSON.stringify(myArrayFiltered));



   }else{
    setisAlertMsg(true);
    setcheckboxMsg('Please check at least one checkbox to proceed...');
    setTimeout(() => {
      setisAlertMsg(false);
      setcheckboxMsg(null);
    }, 2000);  

   }
  
 }


 const approveSelectedAllItems =()=>{
   if(isApproveAll && selectionIndexes.length > 0)
   {

    const myArrayFiltered1 =  formatedResults.filter((item,index) => (selectionIndexes.includes(parseInt(index)))).map(item => item[1]);

    alert(JSON.stringify(myArrayFiltered1));


   }else{
    setisAlertMsg(true);
    setcheckboxMsg('Please select all checkboxes to proceed...');
    setTimeout(() => {
      setisAlertMsg(false);
      setcheckboxMsg(null);
    }, 2000);    
   }  
 }
 


/* Page Events End */


/*Grid Columns Start */
    const columns = [
        // {
        //   name: "",
        //   label: "",
        //   options: {
        //       customBodyRenderLite: (dataIndex) => {
        //         const rowData = formatedResults[dataIndex];

        //         // if(rowData[0] == "WorkFile"){
        //         //   return (                  
        //         //     <Tooltip title={rowData[0]} placement='top' arrow>
        //         //         <FinalActionsIcon color="primary" fontSize="small"  sx={{ fontSize: "16px" }} />
        //         //      </Tooltip>
        //         //     );
        //         //   }
        //          if(rowData[0] == "Final"){
        //               return (                  
        //                 <Tooltip title={rowData[0]} placement='top' arrow>
        //                    <FactCheckIcon color="secondary" fontSize="small"  sx={{ fontSize: "16px" }}  />
        //                 </Tooltip>
        //                 );                 
        //          }
        //       }
        //   }
        // },
        {
            name: "CustomerID",
            label: "Customer ID",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const caseData = formatedResults[dataIndex];
                    return (
                        <Typography variant="h7" >                           
                            <Link href="#" underline="none"   onClick={() => {handleAddEdit(formatedResults[dataIndex])}}> {caseData[0]}</Link>
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
            name: "StructureL1",
            label: "Structure L1"
        },
        {
            name: "AssignmentReason",
            label: "Assignment Reason L1"
        },
       
        {
            name: "PramateaCOGroup",
            label: "Pramata CO Group"
        },
      
        {
            name: "AssignmentReason",
            label: "Assignment Reason"
        },
        {
            name: "Status",
            label: "Status"
        },
        {
            name: "CreatedOn",
            label: "Created On"
        },
        {
            name: "CreatedBy",
            label: "Created By",
            options: {
              sort: false,
              sortDirection: 'none'

          }
        },
        {
            name: "UpdatedOn",
            label: "Updated On",
            options: {
              filter: false,
              sort: false,
             }
        },
        {
            name: "UpdatedBy",
            label: "Updated By",
            options: {
              filter: false,
              sort: false,
             }
        },
        {
            name: "Action",
            label: "Action",
            options: {
              filter: true,
              sort: false,
             },
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const rowData = formatedResults[dataIndex];
                    return (
                        <DeleteIcon color="primary" fontSize="small"
                            value={rowData[1]}
                            onClick={() => {deleteHandler(rowData[1])}}
                            name="deleteRow"
                        />
                    );
                }
            }
        }
    ];

/*Grid Columns END */

/* HTML Render Start */

    return (

        <Box sx={{ width: '96%', border: '3px solid #f1f2f3',fontSize: '0.5rem' }} mt={1}>
          {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
          &nbsp;&nbsp;&nbsp;          
          <Grid container spacing={0.8} >
                <Grid item xs={12}>
                <Grid container spacing={0.2} >
                    <Grid item xs={2} >
                        <Item sx={{background: "#f1F2F4" ,fontSize: '0.7rem',
                          borderRadius: "0.5px", background: "#f1F2F4", marginTop: "-10px",padding:"14px"
                        }}><h3>Final Customer Mapping</h3></Item>
                    </Grid>
                    <Grid item xs={10} sx={{background: "#f1F2F4",paddingTop:"4px"}} >
                        {/* xs=6xs=6xs=6xs=6 */}
                        <Item style={{ float: 'left', fontSize: '0.5rem',
                          borderRadius: "0.5px", background: "#f1F2F4", marginTop: "-3px"}} sx={{background: "#f1F2F4"}}>
                        {/* <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">Final</FormLabel> 
                        </FormControl> */}
                        <FormControl  style={{ marginTop : 5}}>
                        <Tooltip title="Add">
                        <Fab size="small" color="secondary" aria-label="add"> <AddIcon onClick={() => {handleModelOpen()}}/> </Fab>
                        </Tooltip>
                       </FormControl>

                            {/* <Button startIcon={<AddIcon />}variant="contained" > Add  </Button> */}
                            {/* <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Final</FormLabel>

                            </FormControl> */}
                        {/* <FormControl style={{ marginTop : 3}}>       */}
                        {/* <RadioGroup
                            row
                            aria-labelledby="d"
                            name="ruttons-group" 
                            defaultValue={rdSelected}
                            onChange={rdhandleChange}
                            >
                            <FormControlLabel value="All"  control={<Radio size="small"  style={{fontSize: '0.6rem'}}/>}  label={<span style={{ fontSize: '.83rem' }}>All</span>} />
                            <FormControlLabel  value="WorkFile"  control={<Radio size="small" />} label={<span style={{ fontSize: '.83rem' }}>Work File</span>}  />
                            <FormControlLabel  value="Final"  control={<Radio size="small" />} label={<span style={{ fontSize: '.83rem' }}>Final</span>} />                            
                        </RadioGroup> */}

                        {/* <item><div style={{ height: 18}}></div></item> */}
                        {/* </FormControl> */}

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <FormControl >  
                        <Paper component="form" className={classes.root} style={{width:560,height:33,marginTop : 5}}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Final Mapping"
                                inputProps={{ 'aria-label': 'Search Final Mapping' }}
                                sx={{fontSize : "0.8rem"}}
                                onChange={event=>{                                
                                  setsearchFinalValue(event.target.value)
                                }}
                            />

                            <IconButton type="button" className={classes.iconButton} aria-label="search" onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                                               
                        </Paper>
                      </FormControl>
                       &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <FormControl style={{width:200,height:15,marginTop : 5}}>    
                        <InputLabel id="demo-simple-select-label" style={{ height:35,marginTop : -7}}>user</InputLabel>
                        <ThemeProvider theme={SelectTheme}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="user"
                            style={{ height:38}}
                            value={assignedToUserId}
                            onChange={selectUserChange}
                            size="small"
                        >
                            <MenuItem value={0} >-------- Select ---------</MenuItem>
                            <MenuItem value={10}>harish.putti@mckesson.com</MenuItem>
                            <MenuItem value={20}>test.hari@mckesson.com</MenuItem>
                            <MenuItem value={30}>user.test@mckesson.com</MenuItem>
                        </Select>
                        </ThemeProvider>
                        </FormControl>
                        &nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;     
                     </Item>
                    </Grid>
                   
                    </Grid>   
                </Grid>
                
                <Grid item xs={12}>

                {isFinalDataLoading ? <SkeletonLoader /> : null}
                        {          
                          formatedResults ? (
                            <MUITable
                            //title="Final Grouping Results"
                            columns={columns}
                            data={formatedResults}
                            customOptions={options}
                            noDataFoundMsg="No Cases found"
                            />
                        ) : null
                        }
                </Grid>

                {/* <Grid item>
                    <Item style={{ float: 'left'}}>
                    <Button variant="contained" startIcon={<DoneIcon />} style={{fontSize: "0.8rem", textTransform : "none" }} onClick={approveSelectedItems}> Approve Selected </Button>
                      &nbsp;&nbsp;&nbsp;
                    <Button variant="contained" startIcon={<DoneAllIcon />} style={{fontSize: "0.8rem", textTransform : "none" }} onClick={approveSelectedAllItems} > Approve All </Button>
                    </Item>
                </Grid> */}
         </Grid>
            {/* </Paper> */}


            <Modal
          open={showModal || showAddFinal}
          onClose={handleModelClose}
          aria-labelledby="add Mapping"
        >
          <Box sx={model}>
            <Typography id="add Final Group" variant="h6" component="h4" sx={{fontSize : 14,fontWeight:'bold'}}>
              {showAddFinal ? "Edit Final Customer Mapping" : "Add Final Customer Mapping"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
               <FinalMapManage rowItem={customerRec} dialogClose={handleModelClose} showAddFinal={showAddFinal} handleSucessModelClose={handleSucessModelClose}/>
            </Typography>
          </Box>
        </Modal>

        <ConfirmModal
            open={confirmBoxFlag}
            onClose={confirmModalCloseHandler}>
         </ConfirmModal>

         <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
            vertical: "top",
            horizontal: "right"
        }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Record deleted sucessfully....!!!
        </Alert>
      </Snackbar>

      
      <Snackbar open={isAlertMsg} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
            vertical: "top",
            horizontal: "right"
        }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {checkboxMsg}
        </Alert>
      </Snackbar>

      </Box>

    );
/* HTML Render END */

}   



export default FinalGroupGrid