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

function SafetyDelivery() {
  const baseURL = "/api/SafeDeliveryProcedures";
  const allSafetyDeliveryURL = "/api/SafeDeliveryProcedures";
  const navigate = useNavigate();
  const [allSafetyDelivery, setAllSafetyDelivery] = useState([]);
  const [search, setSearch] = useState("");

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const [safetyDeliveryFile, setsafetyDeliveryFile] = useState([]);

  const currentDate = new Date();
  const timestamp = `${currentDate.getFullYear()}-0${currentDate.getMonth()}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  console.log(timestamp);

  const tempFileNameSafetyDelivery = `${timestamp}_safetyDelivery.jpg`;
  const tempSafetyDeliveryURL = `https://${storageAccountName}.blob.core.windows.net/safetydelivery/${tempFileNameSafetyDelivery}`;
  const pdfUrl = tempSafetyDeliveryURL;

  async function uploadsafetyDelivery() {
    const containerClient = blobService.getContainerClient("safetydelivery");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameSafetyDelivery);
    const option = { blobHTTPHeader: { blobContentType: safetyDeliveryFile.type } };
    await blobClient.uploadBrowserData(safetyDeliveryFile, option);
  }

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllSafetyDelivery = () => {
    axios.get(allSafetyDeliveryURL, config).then((response) => {
      const tempSafetyDelivery = response.data;
      setAllSafetyDelivery(tempSafetyDelivery);
    });
  };

  const deleteSafetyDelivery = (id) => {
    // console.log(id);
    axios.delete(`/api/SafeDeliveryProcedures/${id}`, config).then((response) => {
      // navigate(`/ETA-performance`);
      window.location.reload();
      console.log(response);
    });
  };

  const filteredData = allSafetyDelivery.filter((etaPerformance) =>
    etaPerformance.createDate.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllSafetyDelivery();
  }, []);

  const bodyParameters = {
    pdfUrl,
    createDate: timestamp,
  };

  async function addSafetyDelivery() {
    if (safetyDeliveryFile.length === 0) {
      window.alert("No file to upload");
    } else {
      await uploadsafetyDelivery();
      console.log(bodyParameters);
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            alert("Safety delivery added successfully");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert("An unexpected error occured! please check the values and try again");
          console.log(error);
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

  const safetyDeliveryHandler = (event) => {
    setsafetyDeliveryFile(event.target.files[0]);
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
            Add Safety Delivery
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
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={safetyDeliveryHandler}
                      type="file"
                      label="Safety delivery file"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={2}>
                  <MDButton
                    onClick={() => addSafetyDelivery()}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Add Safety Delivery
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={3}>
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
                                  From this you will delete this Safety Delivery.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => deleteSafetyDelivery(row.id)} autoFocus>
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

export default SafetyDelivery;