import React from "react";
import { Grid ,Button, CardActionArea, CardActions,Link} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Header  from '../Main/Header';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PendingIcon from '@mui/icons-material/Pending';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { Link as RouterLink } from 'react-router-dom';
import * as uiConstants from "../../constants/uiConstants";


const Layout = () =>
{



    return (
    <div style={{ background : '#fafbfd'}}>
    <Grid container spacing={3} sx={{ marginTop : 12 ,marginLeft : 40 , maxWidth:1050}}>
     <Grid item xs={1} md={3}>    
        <Card sx={{ maxWidth: 345 , height : 120,background : '#f1f2f7' }}>
        <CardActionArea component={RouterLink} to={uiConstants.RT_PendingMapping} >       
            <CardContent>
            <PendingActionsIcon fontSize="large" color="primary"/>        
            <Typography gutterBottom variant="h7" component="div" sx={{marginTop : 5}}>               
                <Link href="#" sx={{color:'black'}}>{uiConstants.Dashboard_PM}</Link>
            </Typography>         
            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
    <Grid item xs={1} md={3}>
    <Card sx={{ maxWidth: 345 , height : 120,background : '#f1f2f7'}}>
      <CardActionArea component={RouterLink} to={uiConstants.RT_FinalMapping} >       
        <CardContent>
            <AutoAwesomeMotionIcon fontSize="large" color="primary"></AutoAwesomeMotionIcon>
          <Typography gutterBottom variant="h7" component="div" sx={{marginTop : 5}}>           
            <Link href="#" sx={{color:'black'}}>{uiConstants.Dashboard_FM}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    <Grid item xs={3} md={3}>    
    <Card sx={{ maxWidth: 345 , height : 120 ,background : '#f1f2f7'}}>
      <CardActionArea component={RouterLink} to={uiConstants.RT_AuditHistory} >
        <CardContent>
        <SummarizeIcon fontSize="large" color="primary"></SummarizeIcon>
          <Typography gutterBottom variant="h7" component="div" sx={{marginTop : 5}}>
            <Link href="#" sx={{color:'black'}}>{uiConstants.Dashboard_AH}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>    
    </Grid>
  </Grid>
 </div>
 
 );
}


export default Layout