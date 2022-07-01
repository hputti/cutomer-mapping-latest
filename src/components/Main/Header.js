import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link,useLocation,useHistory  } from 'react-router-dom';
import mckLogo from "../../assests/images/McKessonIcon.png";
import UserProfile from '../Main/UserProfile';
import HomeIcon from '@mui/icons-material/Home';
import * as uiConstants from "../../constants/uiConstants";
import DrawerComp from "./NavBar";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";



const finalTheme = createTheme({
  components: {
  MuiToolbar:{
      styleOverrides: {
          root: {
              minHeight: '2.8rem',
              // Due to a bug in mui we need to explicitly override media with the default of 48px
              '@media (min-width: 600px)': {
                  minHeight: '35px !important',
              },
          },
      },
  },
}
});



const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  let history = useHistory();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));


const logoClick= () =>{
  history.push('/Dashboard');
}

  var roundedDiv = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#fff",
    fontSize: "10px",
    color: "#fff",
    //textAlign: "center",
    //margin: "10px 0",
    //fontWeight: "bold",
    lineHeight: "32px",
  };

  var profileDiv = {
    width: "30px",
    height: "30px",
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#FFFFF" }}>
      <ThemeProvider theme={finalTheme}>
        <Toolbar  >

        {/* {mckLogo} */}
          {/* <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} /> */}
          <Typography sx={{ fontSize: "1rem", paddingLeft: "0%" }}>
              <img src={mckLogo} style={{width: "145px",marginTop: "5px",float: "left" }} onClick={logoClick}>            
                </img>
                
           </Typography>
          {isMatch ? (
            <>
              {/* <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Mckesson
              </Typography> */}
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ float:"left" ,paddingLeft: "20px", fontSize : "0.60rem" , flex: 1 }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label={uiConstants.Dashboard_Home} component={Link} to={uiConstants.RT_Dashboard}  sx={{ fontSize : "0.83rem" ,textTransform : "none",cursor: 'pointer' }}></Tab>
                <Tab label={uiConstants.Dashboard_PM}  component={Link} to= {uiConstants.RT_PendingMapping}    sx={{ fontSize : "0.83rem",textTransform : "none",cursor: 'pointer' }}/>
                <Tab label={uiConstants.Dashboard_FM}  component={Link} to= {uiConstants.RT_FinalMapping}  sx={{ fontSize : "0.83rem",textTransform : "none",cursor: 'pointer' }}/>
                <Tab label={uiConstants.Dashboard_AH}  component={Link} to= {uiConstants.RT_AuditHistory}   sx={{ fontSize : "0.83rem" ,textTransform : "none",cursor: 'pointer'}}/>
                <Tab label={uiConstants.DH_ExpandableGrid}  component={Link} to= {uiConstants.RT_ExpandableGrid}   sx={{ fontSize : "0.83rem" ,textTransform : "none",cursor: 'pointer'}}/>

              </Tabs>
             
              <Divider variant="middle" />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
                sx={{ paddingLeft: "50px", textTransform: "upperCase",float:"right" }}
              >
                <div style={roundedDiv}>
                    <Avatar sx={{ width: "32px", height: "30px" ,fontSize : "0.80rem"}}>
                        <UserProfile
                        userName={'Harish Putti'}
                        userEmail={'harish.putti@mckesson.com'}
                        />
                    </Avatar>                 
                </div>
              </IconButton>
            </>
          )}
        </Toolbar>
        </ThemeProvider>
      </AppBar>      
    </React.Fragment>
  );
};

export default Header;
