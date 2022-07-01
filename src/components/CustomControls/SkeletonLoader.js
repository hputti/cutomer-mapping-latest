import React from "react";
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    root: {
        margin: "10px 10px 10px 10px"
    }
});

const SkeletonLoader = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton height={50} />
            <Skeleton animation={false} height={40} />
            <Skeleton animation="wave" height={40} />
            <Skeleton animation="wave" height={40} />
        </div>
    );
};

export default SkeletonLoader;
