/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";

import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useTable } from "react-table";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import allETAPerformanceData from "./allETAPerformanceData";

function AllETAPerformance() {
  const { rows } = allETAPerformanceData();
  const [search, setSearch] = useState("");

  const filteredData = rows.filter((row) =>
    row.route.props.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8.5}>
                    <MDTypography variant="h5" color="white">
                      ETA Performance
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDBox>
                      <MDButton
                        // onClick={() => sendSignInData()}
                        component={Link}
                        variant="gradient"
                        color="light"
                        justifyContent="flex-end"
                        fullWidth
                        to="/ETA-performance/Add-ETA-performance"
                      >
                        Add ETA Performance
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                {/* <Grid container spacing={3}> */}
                <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                  <MDBox pr={2} pb={1} pl={2}>
                    <MDInput
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      label="Search here"
                      justify="space-between"
                      spacing={24}
                      raised
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Users</TableCell>
                          <TableCell align="right">Route</TableCell>
                          <TableCell align="right">DeviceID</TableCell>
                          <TableCell align="right"> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell component="th" scope="row">
                              {row.users.props.description}
                            </TableCell>
                            <TableCell align="right">{row.route.props.description}</TableCell>
                            <TableCell align="right">{row.deviceID.props.description}</TableCell>
                            <TableCell align="right">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="view"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to="/ETA-performance/ETA-performance"
                                />
                              </MDBox>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/* </Grid> */}
                {/* <ul>
                  {filteredData.map((item) => (
                    <li>{item.route.props.description}</li>
                  ))}
                </ul> */}
                {/* <DataTable
                  table={tableInstance}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllETAPerformance;
