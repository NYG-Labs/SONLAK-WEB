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
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MDBadge from "components/MDBadge";

import axios from "axios";
// import allDriverData from "./allDriverData";

function AllDrivers() {
  // const { rows } = allDriverData();
  const [search, setSearch] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);
  const baseURL = "/api/Drivers";

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllDrivers = () => {
    axios.get(baseURL, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  console.log("ALl Drivers = ", allDrivers, search);

  const filteredData = allDrivers.filter((driver) =>
    driver.fname.toLowerCase().includes(search.toLowerCase())
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
                <MDTypography variant="h6" color="white">
                  All drivers
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
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
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>First name</TableCell>
                          <TableCell align="left">Middle name</TableCell>
                          <TableCell align="left">Lase Name</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Vehicle type</TableCell>
                          <TableCell align="left">Vehicle No</TableCell>
                          <TableCell align="left">Driver type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell component="th" scope="row">
                              {row.fname}
                            </TableCell>
                            <TableCell align="left">{row.mname}</TableCell>
                            <TableCell align="left">{row.lname}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.vehicalType}</TableCell>
                            <TableCell align="left">{row.vehicleNo}</TableCell>
                            <TableCell align="left">{row.driverType}</TableCell>
                            <TableCell align="center">
                              <MDBox ml={-1}>
                                <Link to={{ pathname: `/drivers/${row.email}` }}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    // component={Link}
                                    // to={`/drivers/${row.email}`}
                                  />
                                </Link>
                              </MDBox>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllDrivers;
