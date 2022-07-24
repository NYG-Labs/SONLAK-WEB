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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useState,  } from "react";
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
import axios from "axios";
// import allETAPerformanceData from "./allETAPerformanceData";

function AllComplaints() {
  const navigate = useNavigate();
  // const { rows } = allComplaintsData();
  const [search, setSearch] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  const baseURL = `/api/Etaperformances/GetEtaperformancebyDateGroup`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllComplaints = () => {
    axios.get(baseURL, config).then((response) => {
      const tempComplaints = response.data;
      setAllComplaints(tempComplaints);
    });
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  const filteredData = allComplaints.filter((Complaints) =>
    Complaints.createDate.toLowerCase().includes(search.toLowerCase())
  );

  console.log(allComplaints);

  if (
    window.localStorage.getItem("token") === null ||
    (window.localStorage.getItem("roleKey") !== "SUPERADMIN" &&
      window.localStorage.getItem("roleKey") !== "OTHERADMIN")
  ) {
    navigate("/");
  }
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
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      Complaints
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
                        to="/complaints/add-complaints"
                      >
                        Add a new complaint
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
                      InputLabelProps={{ shrink: true }}
                      label="Search here"
                      type="date"
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
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Articles</TableCell>
                          <TableCell align="center">Early</TableCell>
                          <TableCell align="center">On Time</TableCell>
                          <TableCell align="center">Late</TableCell>
                          <TableCell align="center">Not Delivered</TableCell>
                          <TableCell align="center">On Time %</TableCell>
                          <TableCell align="left"> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell align="center">{row.createDate.split("T")[0]}</TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {row.articles}
                            </TableCell>
                            <TableCell align="center">{row.early}</TableCell>
                            <TableCell align="center">{row.onTime}</TableCell>
                            <TableCell align="center">{row.late}</TableCell>
                            <TableCell align="center">{row.notDelivered}</TableCell>
                            <TableCell align="center">{row.onTimePresentage}%</TableCell>
                            <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="view"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to={`/ETA-performance/${row.createDate.split("T")[0]}`}
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

export default AllComplaints;