import React from "react";
import MUIDataTable from "mui-datatables";
import * as constants from "../../constants/uiConstants";
import { makeStyles } from "@mui/styles";
import { Typography, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";


const useStyles = makeStyles(() => ({
    customTooltip: {
        backgroundColor: "rgba(0,1,1)",
        color: "rgba(255,255,255)"
    }
}));




 const muiDTTheme = createTheme({
    palette: {
      mode: 'light',
     // primary: { main: '#7986cb', contrastText: '#212121' }
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            //color: 'red'
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
            head:{
                fontSize: ".82rem !important;"

            },
         body1: {
            //fontFamily: "CoverMySans !important;",
            fontSize: ".84rem !important;"
        }
      },    
    },
    MuiSvgIcon: {
        styleOverrides: {
        root: {
            fontSize: "1.1rem"
        }
    }
    },
    MuiButton: {
        styleOverrides: {
        label: {
            fontSize: ".55rem !important",
            fontWeight: "600 !important"
        }
        }
     },
      MuiTableCell: {
        styleOverrides: {
        head: {
            backgroundColor: "#f1f3f5 !important",
            fontSize:".25rem !important;"
        }
        ,defaultProps: {
            size: 'small',
        },
     } 
    },    
    MuiCheckbox: {
        styleOverrides: {

        colorSecondary: {
            color: "#008ad8 !important"
        }
      }
    },

    MUIDataTableSelectCell: {
        root: {
            zIndex: " 0 !important;"
        }
    },
    MUIDataTableHeadCell: {
        styleOverrides : {

        fixedHeader: {
            fontSize: ".50rem !important;",
            zIndex: " 0 !important;",
            padding: "0px",
            backgroundColor: "#e9e9e9",
            fontWeight: "bold !important",
            fontFamily: "CoverMySans !important;"
        },
        contentWrapper: {
            justifyContent: "center",
            fontSize: ".50rem !important;",
        },
       
        sortActive: {
            color: "white"
        },       
       
      }
    },
    MuiButtonBase:{
        styleOverrides :{
         root:{
            fontSize: "0.72rem !important",
            fontWeight: "550 !important"
         }            
        }
    },
    MuiToolbar:{
        styleOverrides :{
         root:{
            height:"20px !important;"
         }            
        }
    },
    MUIDataTableBodyCell: {
        styleOverrides:{
          root: {
          fontFamily: "Oxygen",
          textOverflow: "ellipsis",
          position: "relative",
          height: "10px !important"
          }
        }
      },
      
      MuiCheckbox :{
           styleOverrides:{
            root:{
                height: "10px !important"
            }
           }
      },

      MUIDataTableToolbar: {
        styleOverrides: {
            root: {
                minHeight: 0,
                      '@media (min-height: 0px)': {
                        minHeight: 35
                  },
              },              
          actions: {
            display: 'flex',
            flex: 'initial',
            '& > span, & > button': {
              order: 99,
            },
            '& > span:last-child, & > button:last-child': {
              order: 1
            },
            '& > span:nth-child(4), & > button:nth-child(4)': {
              order: 2
            }
          }
        }
      }
    }
  });




const MUITable = (props) => {
    const classes = useStyles();
    if (!props.columns?.length) {
        return null;
    }


    const defaultOptions = {
        fixedHeader: true,
        selectableRows: constants.None,
        // downloadOptions: { filename: constants.tableDownload_CSV, separator: "," }        
    };

    const columnCellExpand = (value, trimLength) => {
        if (value) {
            return value?.length <= trimLength ? (
                <div className={classes.flexbox}>
                    <div>
                        <Typography>{value}</Typography>
                    </div>
                </div>
            ) : (
                <div className={classes.flexbox}>
                    <div>
                        <Tooltip 
                            classes={{
                                tooltip: classes.customTooltip
                            }}
                            title={<Typography color="inherit">{value}</Typography>}
                            placement={constants.Top}
                            arrow
                            
                        >
                            <Typography>{`${value?.substring(0, trimLength)}...`}</Typography>
                        </Tooltip>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.flexbox}>
                    <div>{`--`}</div>
                </div>
            );
        }
    };

    const extendColumnCells = (columns) => {
        if (columns?.length > constants.ColumnBreakPoint) {
            return columns.map((column) => {
                var isNoCustomBody = true;
                if (column.options) {
                    Object.keys(column?.options).forEach((key) => {
                        if (key === "customBodyRender" || key === "customBodyRenderLite") {
                            isNoCustomBody = false;
                        }
                    });
                }
                if (isNoCustomBody) {
                    const trimLength = constants.ValueBreakPoint;
                    column["options"] = {};
                    column.options["customBodyRender"] = (value) => {
                        return columnCellExpand(value, trimLength);
                    };
                }
                return column;
            });
        } else {
            return columns;
        }
    };

    if (!props.data?.length) {
        return (
            <MUIDataTable
                title={props.title}
                columns={props.columns}
                components={{
                    TableBody: (p) => <EmptyRow count={props.columns.length} noDataFoundMsg={props.noDataFoundMsg} />
                }}
                options={{ ...defaultOptions, ...props.customOptions }}
            />
        );
    }

    return (
     <ThemeProvider theme={muiDTTheme}>
        <MUIDataTable
            title={props.title}
            data={props.data}
            columns={extendColumnCells(props.columns)}
            options={{ ...defaultOptions, ...props.customOptions }}
        />
   </ThemeProvider>
    );
};

const EmptyRow = ({ count, noDataFoundMsg }) => {
    return (
        <tr>
            <td style={{ textAlign: "center", paddingTop: "25px" }} colSpan={count}>
                {" "}
                {noDataFoundMsg}
            </td>
        </tr>
    );
};

export default MUITable;
