import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";


const Muitheme = createTheme({
    //   "palette":{"common":{"black":"rgba(255, 255, 255, 1)","white":"rgba(255, 255, 255, 1)"},"background":{"paper":"rgba(0, 0, 0, 1)","default":"rgba(128, 78, 78, 1)"},"primary":{"light":"rgba(79, 92, 154, 1)","main":"rgba(255, 240, 0, 1)","dark":"rgba(138, 146, 202, 1)","contrastText":"rgba(187, 61, 61, 1)"},"secondary":{"light":"rgba(255, 255, 255, 1)","main":"rgba(101, 94, 255, 1)","dark":"#c51162","contrastText":"#fff"},"error":{"light":"#e57373","main":"rgba(20, 255, 0, 1)","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(221, 221, 221, 0.87)","secondary":"rgba(240, 232, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}}
    breakpoints: {
        values: {
            //default breakpoints
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,

            //custom breakpoints
            oneHundred: 100,
            elevenEighty: 1180,
            thirteenHundred: 1300
        }
    },
    palette: {
        primary: {
            main: "#01426A"
        },
        secondary: {
            light: "#0066ff",
            main: "#5A8E22"
        }
    },
    overrides: {
        MuiTypography: {
            body1: {
                fontFamily: "CoverMySans !important;",
                fontSize: ".7rem !important;"
            }
        },
        MuiDrawer: {
            paper: {
                zIndex: "1 !important;"
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: "34px !important; "
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: "1.25rem"
            }
        },
        MuiTextField: {
            root: {
                fontSize: "1em"
            }
        },

        MuiButton: {
            label: {
                fontSize: ".7rem !important",
                fontWeight: "400"
            }
        },
        MuiTableHead: {
            root: {
                fontSize: ".25rem !important; "
            }
        },

        MUIDataTableSelectCell: {
            root: {
                zIndex: " 0 !important;"
            }
        },

        MuiInputLabel: {
            shrink: {
                fontSize: "1em"
            },
            root: {
                fontSize: "1em"
            }
        },
        MuiTable: {
            root: {
                tableLayout: "fixed",
                borderLeft: "1px solid #bfbfbf",
                fontFamily: "CoverMySans !important;",
                fontSize: ".7rem !important;"
            }
        },
        MUIDataTableToolbar: {
            root: {
                color: "#008ad8"
            }
        },
        MuiTableRow: {
            root: {
                "&:nth-of-type(even)": {
                    backgroundColor: "#f3f3f3",
                    fontSize: ".7rem !important;"
                }
                // '&:hover': {
                //   backgroundColor: '#dbdbdb !important',
                //   fontSize: ".7rem !important;"
                // }
            }
        },
        MuiTableCell: {
            root: {
                textAlign: "center",
                padding: "5px",
                borderRight: "1px solid #bfbfbf",
                fontSize: "0.70rem",
                fontFamily: "CoverMySans !important;"
            }
        },
        MUIDataTableHeadCell: {
            fixedHeader: {
                fontSize: ".75rem !important;",
                zIndex: " 0 !important;",
                padding: "0px",
                backgroundColor: "#e9e9e9",
                fontWeight: "bold",
                fontFamily: "CoverMySans !important;"
            },
            contentWrapper: {
                justifyContent: "center"
            },
            root: {
                backgroundColor: "#757575 !important",
                width: "5%",
                color: "white"
            },
            sortActive: {
                color: "white"
            },
            data: {
                color: "white"
            },
            toolButton: {
                margin: "0 !important",
                padding: 0,
                marginLeft: 0,
                marginRight: 0
            }
        },
        MUIDataTableBodyCell: {
            root: {
                wordBreak: "break-word"
            }
        },
        MuiTableSortLabel: {
            icon: {
                color: "white !important"
            }
        },
        MuiAccordion: {
            root: {
                marginBottom: "3px"
            }
        },
        MuiAccordionSummary: {
            root: {
                minHeight: "45px !important",
                height: "45px !important",
                backgroundColor: "#087abd !important",
                color: "#fff !important",
                borderRadius: "5px 5px 5px 5px"
            }
        },
        MuiRadio: {
            colorSecondary: {
                color: "#008ad8 !important"
            }
        }
    }
});
export default Muitheme;
