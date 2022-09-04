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
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { BlobServiceClient } from "@azure/storage-blob";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import CircularProgress from "@mui/material/CircularProgress";

function AddComplaints() {
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const baseURL = "https://sonlakserver.azurewebsites.net/api/complaint";
  const allDriverURL = "https://sonlakserver.azurewebsites.net/api/Drivers";
  //   const allWHSPlanURL = "/api/Whsplans";
  const navigate = useNavigate();
  //   const [allWHSPlan, setAllWHSPlan] = useState([]);
  //   const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);
  //   console.log(driver);

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const [ComplaintsFile, setComplaintsFile] = useState([]);

  const currentDate = new Date();
  const timestamp = `${currentDate.getFullYear()}-0${currentDate.getMonth()}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  console.log(timestamp);

  const tempFileNameComplaints = `${timestamp}_Complaints.jpg`;
  const tempComplaintsURL = `https://${storageAccountName}.blob.core.windows.net/complaints/${tempFileNameComplaints}`;
  const pdfUrl = tempComplaintsURL;

  async function uploadComplaints() {
    const containerClient = blobService.getContainerClient("complaints");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameComplaints);
    const option = { blobHTTPHeader: { blobContentType: ComplaintsFile.type } };
    await blobClient.uploadBrowserData(ComplaintsFile, option);
  }

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllDrivers = () => {
    axios.get(allDriverURL, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  //   const deleteWHSPlan = (id) => {
  //     // console.log(id);
  //     axios.delete(`/api/Whsplans/${id}`, config).then((response) => {
  //       // navigate(`/ETA-performance`);
  //       window.location.reload();
  //       console.log(response);
  //     });
  //   };

  //   const filteredData = allWHSPlan.filter((etaPerformance) =>
  //     etaPerformance.createDate.toLowerCase().includes(search.toLowerCase())
  //   );

  useEffect(() => {
    getAllDrivers();
  }, []);

  const bodyParameters = {
    pdfUrl,
    createDate: timestamp,
  };

  async function addComplaints() {
    setLoading(true);
    if (ComplaintsFile.length === 0) {
      setLoading(false);
      window.alert("No file to upload");
    } else {
      await uploadComplaints();
      console.log(bodyParameters);
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            alert("Complaint added successfully");
            navigate("/complaints");
          }
        })
        .catch((error) => {
          setLoading(false);
          alert("An unexpected error occured! please check the values and try again");
          console.log(error);
        });
    }
  }

  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const ComplaintsHandler = (event) => {
    setComplaintsFile(event.target.files[0]);
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
            Add a new complaint
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
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDriver(e.target.value)}
                      value={driver}
                      type="email"
                      label="Driver"
                      // variant="standard"
                      fullWidth
                    >
                      {allDrivers.map((dri) => (
                        <MenuItem value={dri.email}>{dri.email}</MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={ComplaintsHandler}
                      type="file"
                      label="WHS Plan file"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={2}>
                  <MDButton
                    onClick={() => addComplaints()}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Add complaint &nbsp;&nbsp;
                    {loading ? <CircularProgress size={20} color="white" /> : ""}
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default AddComplaints;
