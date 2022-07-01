
import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Typography,
  Grid,
  TableCell,
  TableRow,
  Button,
  Switch,Table,TableContainer,TableHead,Paper,TableBody,rows
} from "@mui/material";
import MUIDataTable, { ExpandButton, TableViewCol } from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";

class ExpandableGrid extends React.Component {
  render() {
    const columns = [
        {
            name: "Customer ID"
        },
        {
          name: "Customer Name"
        },
        {
          name: "Structure L1"
        },
        {
          name: "Assignment Reason L1"
        },
        {
          name: "Pramata Co Group"
        },
        {
          name: "Assignment"
        }
      ];

    const data = [
      ['101282',"Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
      ['101282',"Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
      ['101282',"Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
      ['101282',"Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
      ['101282',"Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
      [
        '101282',
        "Blake Duncan",
        "Business Management Analyst",
        "San Diego",
        65,
        "$94,000"
      ],
      ['101282',"Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
      ['101282',"Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
      ['101282',"Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
      ['101282',"Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
      ['101282',"Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
      ['101282',"Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
      ['101282',"Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
      ['101282',"Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
      ['101282',"Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
      [
        '101282',
        "Addison Navarro",
        "Business Management Analyst",
        "New York",
        50,
        "$295,000"
      ],
      ['101282',"Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
      ['101282',"Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
      ['101282',"Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
      ['101282',"Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
      ['101282',"Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
      ['101282',"Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
      ['101282',"Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
      ['101282',"Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
      ['101282',"Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
      ['101282',"Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
      ['101282',"Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
      ['101282',"Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
      [
        '101282',
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        "$45,000"
      ],
      ['101282',"Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
    ];

    var col = [];
    var act = [];
    var i = 0;

    const rows = [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9)
      ];

      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      onViewColumnsChange: (rowData, rowMeta) => {
        // col[i]=rowData;
        act[rowData] = rowMeta;
        i++;
      },
      isRowExpandable: (dataIndex, expandedRows) => {
        if (dataIndex === 3 || dataIndex === 4) return false;

        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (
          expandedRows.data.length > 4 &&
          expandedRows.data.filter((d) => d.dataIndex === dataIndex).length ===
            0
        )
          return false;
        return true;
      },
      renderExpandableRow: (rowData, rowMeta) => {
        return (
            <React.Fragment>           
            <tr>
              <td colSpan={6}>
                <TableContainer component={Paper} style={{ marginLeft:"40px" }}>
                  <Table style={{ minWidth: "550" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">   {row.name} </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>


                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </td>
            </tr>
          </React.Fragment>
        );
      }
    };

   

    const theme = createTheme({
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden"
          }
        }
      }
    });

    const components = {
      ExpandButton: function (props) {
        if (props.dataIndex === 3 || props.dataIndex === 4)
          return <div style={{ width: "24px" }} />;
        return <ExpandButton {...props} />;
      },
      TableViewCol: function (props) {
        console.log(props);
        return <TableViewCol {...props} />;
      }
    };

    return (
      <ThemeProvider  theme={theme}>
        <MUIDataTable
          title={"Row Data Expand - Presenation"}
          data={data}
          columns={columns}
          options={options}
          components={components}
        />
      </ThemeProvider>
    );
  }
}

export default ExpandableGrid;
