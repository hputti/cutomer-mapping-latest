import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Tooltip, Button ,Select,MenuItem} from "@mui/material";
import ClickAwayListener from '@mui/base/ClickAwayListener';
// import { FiUser,FiLogOut } from "react-icons/fi";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
 import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router";
import { useTheme } from '@mui/material/styles';
import { Height } from "@mui/icons-material";



const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "fixed",
    top: 45,
    right: 45,
    zIndex: 1,
    border: "1px outset",
    padding: useTheme().spacing(1),
    backgroundColor: '#f1f2f3',//theme.palette.background.paper,
    minWidth: 270,
    "border-radius" : "10px",
    height : 110
  },

  smroundedDiv:{
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#415099",
    fontSize: "20px",
    color: "#f1F3f4",
    lineHeight: "36px",
  }
}));


export default function ProfileClick(props) {
  const { authState, oktaAuth } = useOktaAuth();
  let history = useHistory();
 
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(true);
  };

  const logout = async () => { 
    localStorage.clear();    
    await oktaAuth.signOut();   
  }

  
  const updateProfileName = (name) =>{
    if(name !== undefined && name !== null) {
     var fullName= name.split(" ");
     var fName=fullName[0].substring(0,1);
     var lName=fullName[1].substring(0,1);     
     var setName=fName.concat(lName).toUpperCase();
      return setName;
    }
  }
  const userName = updateProfileName(props.userName);

  return (

    <div>
      {/* <ClickAwayListener onClickAway={handleClickAway}> */}
        <div className={classes.root}>
          <div onClick={handleClick}>
            <div className="rounded-div">              
              <label>{userName}</label></div>
          </div>
          {open ? (
            <div className={classes.dropdown}>
              <div>
                 <div style={{color : "black",fontSize:18,marginTop:12,fontSize : "0.73rem"}}>              
                  {/* <label className={classes.smroundedDiv} >{userName}</label>  
                  &nbsp;&nbsp;&nbsp;     */}
                  <label>{props.userName}</label>            
                </div>
                &nbsp;
                <div>
                <label style={{color : "black",fontSize:15,fontSize : "0.73rem"}}>{props.userEmail}</label>  
                &nbsp;  
                  </div>

                <hr />
               
                <span >
                  <div>
                  <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={'MMS'}
                            label="Unit"
                            //onChange={handleChange}
                            style={{ height:30,width:100,fontSize : "0.73rem"}}
                        >
                            <MenuItem value={0} >--Select---</MenuItem>
                            <MenuItem value={'MMS'}>MMS</MenuItem>
                            <MenuItem value={'MPS'}>MPS</MenuItem>
                            <MenuItem value={'MPS'}>MLS</MenuItem>
                            <MenuItem value={'PHARMA'}>PHARMA</MenuItem>

                        </Select>
                        <ExitToAppIcon color="info" fontSize="small"  style={{marginLeft : 20}}>

                        </ExitToAppIcon>
                        <span style={{ paddingLeft: "3px",color:"black",fontSize : "0.73rem"}} id="logOut-span" onClick={logout} >Logout</span>

                     
                     </div>

                 
                </span>
              </div>
            </div>
          ) : null}
        </div>
      {/* </ClickAwayListener> */}
    </div>
  );
}
