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

// react-router-dom components
import { useNavigate } from "react-router-dom";
// import {  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import * as React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { BlobServiceClient } from "@azure/storage-blob";
import { useState, useEffect } from "react";
import axios from "axios";
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
import CircularProgress from "@mui/material/CircularProgress";

function WHSPlan() {
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/Whsplans`;
  const allWHSPlanURL = `${process.env.REACT_APP_BACKEND_URL}/api/Whsplans`;
  const navigate = useNavigate();
  const [allWHSPlan, setAllWHSPlan] = useState([]);
  const [search, setSearch] = useState("");
  // const [topic, setTopic] = useState("");
  //
  const [loading, setLoading] = useState(false);

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const [WHSPlanFile, setWHSPlanFile] = useState([]);

  const currentDate = new Date();
  const timestamp = currentDate;
  // `${currentDate.getFullYear()}-0${
  //   currentDate.getMonth() + 1
  // }-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  //

  const tempFileNameWHSPlan = `${timestamp}_WHSPlan.pdf`;
  const tempWHSPlanURL = `https://${storageAccountName}.blob.core.windows.net/whsplan/${tempFileNameWHSPlan}`;
  const pdfUrl = tempWHSPlanURL;

  async function uploadWHSPlan() {
    const containerClient = blobService.getContainerClient("whsplan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameWHSPlan);
    const option = { blobHTTPHeader: { blobContentType: WHSPlanFile.type } };
    await blobClient.uploadBrowserData(WHSPlanFile, option);
  }

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllWHSPlan = () => {
    axios.get(allWHSPlanURL, config).then((response) => {
      const tempWHSPlan = response.data;
      setAllWHSPlan(tempWHSPlan);
    });
  };

  const deleteWHSPlan = (id) => {
    //
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/Whsplans/${id}`, config).then(() => {
      // navigate(`/ETA-performance`);
      window.location.reload();
    });
  };

  const filteredData = allWHSPlan.filter((etaPerformance) =>
    etaPerformance.createDate.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllWHSPlan();
  }, []);

  const bodyParameters = {
    pdfUrl,
    createDate: timestamp,
  };

  async function addWHSPlan() {
    setLoading(true);
    if (WHSPlanFile.length === 0) {
      setLoading(false);
      window.alert("No file to upload");
    } else {
      await uploadWHSPlan();
      //
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 201) {
            alert("Safety delivery added successfully");
            window.location.reload();
          }
        })
        .catch(() => {
          setLoading(false);
          alert("An unexpected error occured! please check the values and try again");
        });
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const WHSPlanHandler = (event) => {
    setWHSPlanFile(event.target.files[0]);
  };

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
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={3}
          p={3}
          mb={2}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add WHS Plan
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <Grid container spacing={3}>
                <br />
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setTopic(e.target.value)}
                      type="text"
                      label="Topic"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={WHSPlanHandler}
                      type="file"
                      label="WHS Plan file (PDF)"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={2}>
                  <MDButton onClick={() => addWHSPlan()} variant="gradient" color="info" fullWidth>
                    Add WHS Plan &nbsp;&nbsp;
                    {loading ? <CircularProgress size={20} color="white" /> : ""}
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={3}>
              <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                <MDBox pr={2} pb={1} pl={2} md={6}>
                  <MDInput
                    fullWidth
                    md={6}
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
                        {/* <TableCell align="center">Route</TableCell>
                        <TableCell align="center">DeviceID</TableCell>
                        <TableCell align="center">Articles</TableCell>
                        <TableCell align="center">Early</TableCell>
                        <TableCell align="center">OnTime</TableCell>
                        <TableCell align="center">Late</TableCell>
                        <TableCell align="center">Not Delivered</TableCell>
                        <TableCell align="center">OnTime Percentage</TableCell> */}
                        <TableCell align="center"> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length === 0 ? (
                        <TableRow key="s">
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          {/* <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell> */}
                        </TableRow>
                      ) : null}
                      {filteredData.map((row) => (
                        <TableRow key="s">
                          <TableCell align="center">{row.createDate}</TableCell>
                          {/* <TableCell align="center">{row.route}</TableCell>
                          <TableCell align="center">{row.deviceId}</TableCell>
                          <TableCell align="center">{row.articles}</TableCell>
                          <TableCell align="center">{row.early}</TableCell>
                          <TableCell align="center">{row.onTime}</TableCell>
                          <TableCell align="center">{row.late}</TableCell>
                          <TableCell align="center">{row.notDelivered}</TableCell>
                          <TableCell align="center">{row.onTimePresentage}%</TableCell> */}
                          <TableCell align="center">
                            <MDBox ml={-1}>
                              <a href={row.pdfUrl}>
                                <MDBadge
                                  badgeContent="View"
                                  color="success"
                                  variant="gradient"
                                  size="m"
                                />
                              </a>
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
                                  From this you will delete this WHS Plan.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => deleteWHSPlan(row.id)} autoFocus>
                                  Agree
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default WHSPlan;
