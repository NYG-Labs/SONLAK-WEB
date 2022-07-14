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
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";

// import MDButton from "components/MDButton";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import { sizeof } from "stylis";
// import { sizeof } from "stylis";

function DriverETAPerformance() {
  const navigate = useNavigate();
  const { date } = useParams();
  const [search, setSearch] = useState("");
  const [driverETAPerformance, setDriverETAPerformance] = useState([]);
  const baseURL = `/api/Etaperformances/GetEtaperformancebyDate/${date}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getDriverETAPerformance = () => {
    axios.get(baseURL, config).then((response) => {
      const tempETAPerformance = response.data;
      setDriverETAPerformance(tempETAPerformance);
    });
  };

  const deleteDriverETAPerformance = (id) => {
    // console.log(id);
    axios.delete(`/api/Etaperformances/${id}`, config).then((response) => {
      navigate(`/ETA-performance`);
      // window.location.reload(false);
      console.log(response);
      // const tempETAPerformance = response.data;
      // setDriverETAPerformance(tempETAPerformance);
    });
  };

  useEffect(() => {
    getDriverETAPerformance();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredData = driverETAPerformance.filter((etaPerformance) =>
    etaPerformance.driverEmail.toLowerCase().includes(search.toLowerCase())
  );

  const totalArticle = driverETAPerformance.reduce((prev, current) => prev + +current.articles, 0);

  const totalEarly = driverETAPerformance.reduce((prev, current) => prev + +current.early, 0);

  const totalLate = driverETAPerformance.reduce((prev, current) => prev + +current.late, 0);

  const totalOnTime = driverETAPerformance.reduce((prev, current) => prev + +current.onTime, 0);

  const totalNotDelivered = driverETAPerformance.reduce(
    (prev, current) => prev + +current.notDelivered,
    0
  );

  const tempTotalOnTimePercentage = driverETAPerformance.reduce(
    (prev, current) => prev + +current.onTimePresentage,
    0
  );

  const totalOnTimePercentage = tempTotalOnTimePercentage / sizeof(driverETAPerformance);

  //   const { columns: pColumns, rows: pRows } = projectsTableData();

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
                    <MDTypography variant="h5" color="white">
                      ETA Performance - {date.split("T")[0]}
                    </MDTypography>
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
                      type="text"
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
                          <TableCell align="center">Users</TableCell>
                          <TableCell align="center">Route</TableCell>
                          <TableCell align="center">DeviceID</TableCell>
                          <TableCell align="center">Articles</TableCell>
                          <TableCell align="center">Early</TableCell>
                          <TableCell align="center">OnTime</TableCell>
                          <TableCell align="center">Late</TableCell>
                          <TableCell align="center">Not Delivered</TableCell>
                          <TableCell align="center">OnTime Percentage</TableCell>
                          <TableCell align="center"> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell align="center">{row.driverEmail}</TableCell>
                            <TableCell align="center">{row.route}</TableCell>
                            <TableCell align="center">{row.deviceId}</TableCell>
                            <TableCell align="center">{row.articles}</TableCell>
                            <TableCell align="center">{row.early}</TableCell>
                            <TableCell align="center">{row.onTime}</TableCell>
                            <TableCell align="center">{row.late}</TableCell>
                            <TableCell align="center">{row.notDelivered}</TableCell>
                            <TableCell align="center">{row.onTimePresentage}%</TableCell>
                            <TableCell align="center">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="Edit"
                                  color="success"
                                  variant="gradient"
                                  size="m"
                                  component={Link}
                                  to={`/ETA-performance/edit-eta-performance/${row.id}`}
                                />
                              </MDBox>
                            </TableCell>
                            <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="Delete"
                                  color="primary"
                                  variant="gradient"
                                  size="m"
                                  onClick={handleClickOpen}
                                  // component={Link}
                                  // to={`/ETA-performance/${row.createDate}`}
                                />
                              </MDBox>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  Are you sure you want to continue?
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    From this you will delete this ETA-performance.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>Disagree</Button>
                                  <Button
                                    onClick={() => deleteDriverETAPerformance(row.id)}
                                    autoFocus
                                  >
                                    Agree
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow bgColor="">
                          <TableCell align="center" />
                          <TableCell colSpan={2} align="center">
                            <b>Sectioned 2hr ETA - Total</b>
                          </TableCell>
                          <TableCell align="center">{totalArticle}</TableCell>
                          <TableCell align="center">{totalEarly}</TableCell>
                          <TableCell align="center">{totalOnTime}</TableCell>
                          <TableCell align="center">{totalLate}</TableCell>
                          <TableCell align="center">{totalNotDelivered}</TableCell>
                          <TableCell align="center">{totalOnTimePercentage}%</TableCell>
                          <TableCell align="center" />
                          <TableCell align="center" />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center" />
                          <TableCell align="center">{totalArticle}</TableCell>
                          <TableCell align="center">{totalEarly}</TableCell>
                          <TableCell align="center">{totalOnTime}</TableCell>
                          <TableCell align="center">{totalLate}</TableCell>
                          <TableCell align="center">{totalNotDelivered}</TableCell>
                          <TableCell align="center">{totalOnTimePercentage}%</TableCell>
                          <TableCell align="center" />
                          <TableCell align="center" />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer> */}
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

export default DriverETAPerformance;
