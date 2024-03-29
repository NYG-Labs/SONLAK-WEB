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
// import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

const helperTextStyles = makeStyles({
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});

function SupervisorRegistration() {
  const classes = helperTextStyles();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("0001-01-01");
  const [visaNo, setVisaNo] = useState("");
  // const [visaScan, setVisaScan] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("0001-01-01");
  const [supervisorType, setSupervisorType] = useState("");
  const [phoneNo, setPhoneNumber] = useState("");
  // const [profilePhoto, setProfilePhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/Supervisors`;

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const tempFileNameVisaScan = `${email}_visascan.pdf`;
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/supervisorvisascan/${tempFileNameVisaScan}`;
  const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${email}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/supervisorprofilephoto/${tempFileProfilePhoto}`;
  const profilePhoto = tempProfilePhotoURL;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const bodyParameters = {
    email,
    fname,
    mname,
    lname,
    address,
    dob,
    visaNo,
    visaScan,
    visaExpiry,
    supervisorType,
    password,
    phoneNo,
    profilePhoto,
  };

  const [visaScanFile, setVisaSanFile] = useState([]);

  const VisaScanHnadler = (event) => {
    setVisaSanFile(event.target.files[0]);
  };

  async function uploadVisaScan() {
    const containerClient = blobService.getContainerClient("supervisorvisascan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameVisaScan);
    const option = { blobHTTPHeader: { blobContentType: visaScanFile.type } };
    await blobClient.uploadBrowserData(visaScanFile, option);
  }

  const [profilePhotoFile, setProfilePhotoFile] = useState([]);

  const ProfilePhotoHnadler = (event) => {
    setProfilePhotoFile(event.target.files[0]);
  };

  async function uploadProfilePhoto() {
    const containerClient = blobService.getContainerClient("supervisorprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }

  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    } else {
      setIsPasswordMatching("");
    }
  };

  async function registerSupervisor() {
    setLoading(true);
    await uploadVisaScan();
    await uploadProfilePhoto();

    if (bodyParameters.email.length === 0) {
      window.alert("Please enter a email to register");
      setLoading(false);
    } else if (bodyParameters.fname.length === 0) {
      window.alert("Please enter a firstname to register");
      setLoading(false);
    } else if (bodyParameters.password.length === 0) {
      window.alert("Please enter a password");
      setLoading(false);
    } else if (isPasswordMatching === "") {
      window.alert("Confirm password is incorrect");
      setLoading(false);
    } else if (bodyParameters.phoneNo.length !== 10) {
      window.alert("Please enter a valid phone number");
      setLoading(false);
    } else {
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 201) {
            alert("Supervisor registered successfully");
            navigate("/supervisors");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setLoading(false);
            alert("A supervisor with this email is already available");
          } else {
            setLoading(false);
            alert("An unexpected error occured! please check the values and try again");
          }
        });
    }
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
            Supervisor registration
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
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
                      type="text"
                      label="First Name"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={fname.length === 0 ? "Firstname cannot be empty" : ""}
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
                      type="text"
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
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      label="Email"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={email.length === 0 ? "Email cannot be empty" : ""}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      label="DOB"
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
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="text"
                      label="Phone number"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={
                        phoneNo.length !== 10 ? "A contact number should contain 10 digits" : ""
                      }
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHnadler}
                      type="file"
                      label="Profile Photo (JPG/JPEG/PNG)"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

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
                      label="Residential status"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Citizen">Citizen </MenuItem>
                      <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
                      <MenuItem value="Temporary Visa">Temporary Visa</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {supervisorType !== "Citizen" ? (
              <MDBox p={2}>
                <MDBox pb={2}>Visa Details</MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setVisaNo(e.target.value)}
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
                        // onChange={(e) => setVisaScan(e.target.value)}
                        onChange={VisaScanHnadler}
                        type="file"
                        label="Scanned copy (PDF)"
                        // variant="standard"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setVisaExpiry(e.target.value)}
                        type="date"
                        label="Expiery date"
                        // variant="standard"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            ) : (
              ""
            )}

            {/* <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHnadler}
                      type="file"
                      label="Profile Photo"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            <MDBox
              variant="gradient"
              bgColor="grey"
              borderRadius="lg"
              coloredShadow="dark"
              // mx={2}
              p={2}
              // textAlign="center"
            >
              <MDBox pb={2}>Set password</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="Password"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={password.length === 0 ? "Password cannot be empty" : ""}
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      label="Confirm Password"
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      FormHelperTextProps={{ className: classes.success }}
                      helperText={isPasswordMatching}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
              {/* <MDBox display="flex" alignItems="center" ml={-1}>
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
              </MDBox> */}
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => registerSupervisor()}
                variant="gradient"
                color="info"
                fullWidth
              >
                sign in &nbsp;&nbsp;
                {loading ? <CircularProgress size={20} color="white" /> : ""}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default SupervisorRegistration;
