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
// import { Link } from "react-router-dom";
import * as React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useEffect } from "react";
// import {  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";

// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CircularProgress from "@mui/material/CircularProgress";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { BlobServiceClient } from "@azure/storage-blob";

function EditSupervisor() {
  // const SelectFieldStyle = {
  //   padding: 12,
  //   // fontSize: "0.75rem",
  // };

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const navigate = useNavigate();
  const { id } = useParams();
  const [supervisor, setSupervisor] = useState([]);
  const baseURL = `/api/Supervisors/${id}`;
  const baseURLSupervisor = `/api/Supervisors/${id}`;
  const [fname, setFname] = useState(supervisor.fname);
  const [mname, setMname] = useState(supervisor.mname);
  const [lname, setLname] = useState(supervisor.lname);
  const [address, setAddress] = useState(supervisor.address);
  const [dob, setDob] = useState(supervisor.dob);
  const [visaNo, setVisaNo] = useState(supervisor.visaNo);
  const [visaScan, setVisaScan] = useState(supervisor.visaScan);
  const [visaExpiry, setVisaExpiry] = useState(supervisor.visaExpiry);
  const [supervisorType, setSupervisorType] = useState(supervisor.supervisorType);
  const [phoneNo, setPhoneNo] = useState(supervisor.phoneNo);
  const [workStatus, setWorkstatus] = useState(supervisor.workStatus);
  const [profilePhoto, setProfilePhoto] = useState(supervisor.profilePhoto);
  const [loading, setLoading] = useState(false);

  const supervisorEmail = supervisor.email;

  const tempFileNameVisaScan = `${supervisorEmail}_visascan.pdf`;
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/supervisorvisascan/${tempFileNameVisaScan}`;
  // const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${supervisorEmail}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/supervisorprofilephoto/${tempFileProfilePhoto}`;

  const getSupervisorDetails = async () => {
    await axios.get(baseURLSupervisor, config).then((response) => {
      const tempSupervisor = response.data;
      setSupervisor(tempSupervisor);
      setFname(response.data.fname);
      setMname(response.data.mname);
      setLname(response.data.lname);
      setAddress(response.data.address);
      setDob(response.data.dob);
      setVisaNo(response.data.visaNo);
      setVisaScan(response.data.visaScan);
      setVisaExpiry(response.data.visaExpiry);
      setSupervisorType(response.data.supervisorType);
      setPhoneNo(response.data.phoneNo);
      setWorkstatus(response.data.workStatus);
      setProfilePhoto(response.data.profilePhoto);
    });
  };

  useEffect(() => {
    getSupervisorDetails();
  }, []);

  const [visaScanFile, setVisaSanFile] = useState([]);

  const VisaScanHnadler = (event) => {
    setVisaSanFile(event.target.files[0]);
    setVisaScan(tempVisaScanURL);
  };

  async function uploadVisaScan() {
    //   const blobService = new BlobServiceClient(
    //     `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    //   );

    const containerClient = blobService.getContainerClient("supervisorvisascan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameVisaScan);
    const option = { blobHTTPHeader: { blobContentType: visaScanFile.type } };
    await blobClient.uploadBrowserData(visaScanFile, option);
  }

  const [profilePhotoFile, setProfilePhotoFile] = useState([]);

  const ProfilePhotoHandler = (event) => {
    setProfilePhotoFile(event.target.files[0]);
    setProfilePhoto(tempProfilePhotoURL);
  };

  async function uploadProfilePhoto() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("supervisorprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }

  const bodyParameters = {
    email: supervisorEmail,
    fname,
    mname,
    lname,
    address,
    dob,
    phoneNo,
    workStatus,
    supervisorType,
    visaNo,
    visaScan,
    visaExpiry,
    profilePhoto,
  };

  //   console.log("==> ", bodyParameters.fname);

  async function editSupervisor() {
    setLoading(true);
    if (visaScanFile.length !== 0) {
      await uploadVisaScan();
    }

    if (profilePhotoFile.length !== 0) {
      await uploadProfilePhoto();
    }

    axios
      .put(baseURL, bodyParameters, config)
      .then((response) => {
        // console.log("response = ", response.status);
        // console.log(bodyParameters);
        if (response.status === 204) {
          alert("Supervisor Updated successfully");
          navigate(`/supervisors/${id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error = ", error.response);
        console.log(bodyParameters);
        alert("An unexpected error occured! please check the values and try again");
      });
  }

  if (
    window.localStorage.getItem("token") === null ||
    (window.localStorage.getItem("roleKey") !== "SUPERADMIN" &&
      window.localStorage.getItem("roleKey") !== "OTHERADMIN")
  ) {
    navigate("/");
  }
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
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
          // textAlign="center"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} mr={5} md={8.5}>
              <MDTypography mt={1} ml={2} variant="h5" color="white">
                Edit Supervisor
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={2}>
              <MDBox>
                <MDButton
                  component={Link}
                  variant="gradient"
                  color="light"
                  justifyContent="flex-end"
                  fullWidth
                  to={`/change-password-supervisor/${supervisor.email}/${"SUPERVIOSR"}`}
                >
                  Change password
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <MDBox pb={2}>Personal Details</MDBox>

              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder={supervisor.fname}
                      type="text"
                      label="First Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setMname(e.target.value)}
                      placeholder={supervisor.mname}
                      type="text"
                      label="Middle Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLname(e.target.value)}
                      placeholder={supervisor.lname}
                      type="select"
                      label="Last Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={supervisor.address}
                      type="text"
                      label="Address"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={supervisor.email}
                      type="email"
                      label="Email"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    {/* <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setWorkstatus(e.target.value)}
                      value={workStatus}
                      helperText={workStatus}
                      label="Work Status"
                      defaultValue={workStatus}
                      // default={gender}
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">InActive</MenuItem>
                    </MDInput> */}
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={supervisor.workStatus}
                      type="text"
                      label="Work status"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder={supervisor.dob}
                      type="date"
                      label="DOB"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder={supervisor.phoneNo}
                      type="text"
                      label="Phone No"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Visa Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVisaNo(e.target.value)}
                      placeholder={supervisor.visaNo}
                      type="text"
                      label="Visa No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={VisaScanHnadler}
                      placeholder={supervisor.visaScan}
                      type="file"
                      label="Scanned copy"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVisaExpiry(e.target.value)}
                      placeholder={supervisor.visaExpiry}
                      type="date"
                      label="Expiery date"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setSupervisorType(e.target.value)}
                      value={supervisorType}
                      helperText={supervisorType}
                      label="Supervisor Type"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="foreign">Foreign</MenuItem>
                      <MenuItem value="local">Local</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>{" "}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHandler}
                      placeholder={supervisor.profilePhoto}
                      type="file"
                      label="Profile Photo"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {/* <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="password"
                      label="Old Password"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="New Password"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      helperText={isPasswordMatching}
                      type="password"
                      label="Confirm New Password"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
            </MDBox> */}

            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      component={Link}
                      to={`/supervisors/${id}`}
                      variant="gradient"
                      color="light"
                      fullWidth
                    >
                      Cancel
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      onClick={() => editSupervisor()}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Update &nbsp;&nbsp;
                      {loading ? <CircularProgress size={20} color="white" /> : ""}
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditSupervisor;
