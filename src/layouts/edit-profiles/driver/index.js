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
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { useEffect } from "react";
// import {  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
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
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { BlobServiceClient } from "@azure/storage-blob";

// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";

function EditDriver() {
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [driver, setDriver] = useState([]);
  const baseURL = `/api/Drivers/${id}`;
  const baseURLSupervisors = "/api/Supervisors";
  const baseURLDriver = `/api/Drivers/${id}`;
  const [fname, setFname] = useState(driver.fname);
  const [mname, setMname] = useState(driver.mname);
  const [lname, setLname] = useState(driver.lname);
  const [address, setAddress] = useState(driver.address);
  const [dob, setDob] = useState(driver.dob);
  const [gender, setGender] = useState(driver.gender);
  const [ausPostId, setAusPostId] = useState(driver.ausPostId);
  const [ausPostScan, setAusPostScan] = useState(driver.ausPostScan);
  const [ausPostExpiry, setAusPostExpiry] = useState(driver.ausPostExpiry);
  const [vehicleNo, setVehicleNo] = useState(driver.vehicleNo);
  const [vehicalType, setVehicalType] = useState(driver.vehicalType);
  const [visaNo, setVisaNo] = useState(driver.visaNo);
  const [visaScan, setVisaScan] = useState(driver.visaScan);
  const [visaExpiry, setVisaExpiry] = useState(driver.visaExpiry);
  const [licenceId, setLicenceId] = useState(driver.licenceId);
  const [licenceScan, setLicenceScan] = useState(driver.licenceScan);
  const [licenceExpiry, setLicenceExpiry] = useState(driver.licenceExpiry);
  const [driverType, setDriverType] = useState(driver.driverType);
  const [username, setUsername] = useState(driver.username);
  // const [phoneNo, setPhoneNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(driver.profilePhoto);
  const [supervisorEmail, setSupervisroEmail] = useState(driver.supervisorEmail);
  const [workStatus, setWorkstatus] = useState(driver.workStatus);
  const [password, setPassword] = useState(driver.password);
  const [oldPassword, setOldPassword] = useState("");

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const getAllSupervisors = () => {
    axios.get(baseURLSupervisors, config).then((response) => {
      const tempSupervisors = response.data;
      setAllSupervisors(tempSupervisors);
    });
  };

  const getDriverDetails = async () => {
    await axios.get(baseURLDriver, config).then((response) => {
      const tempDriver = response.data;
      setDriver(tempDriver);
      setFname(response.data.fname);
      setMname(response.data.mname);
      setLname(response.data.lname);
      setAddress(response.data.address);
      setDob(response.data.dob);
      setGender(response.data.gender);
      setAusPostId(response.data.ausPostId);
      setAusPostScan(response.data.ausPostScan);
      setAusPostExpiry(response.data.ausPostExpiry);
      setVehicleNo(response.data.vehicleNo);
      setVehicalType(response.data.vehicalType);
      setVisaNo(response.data.visaNo);
      setVisaScan(response.data.visaScan);
      setVisaExpiry(response.data.visaExpiry);
      setLicenceId(response.data.licenceId);
      setLicenceScan(response.data.ausPostScan);
      setLicenceExpiry(response.data.licenceExpiry);
      setDriverType(response.data.driverType);
      setUsername(response.data.username);
      setProfilePhoto(response.data.profilePhoto);
      setSupervisroEmail(response.data.supervisorEmail);
      setWorkstatus(response.data.workStatus);
      setPassword(response.data.setPassword);
    });
  };

  useEffect(() => {
    getDriverDetails();
    getAllSupervisors();
  }, []);

  //   console.log("driver = ", driver);
  //   console.log("allsupervisors = ", allSupervisors);

  const driverEmail = driver.email;

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // const currentDate = new Date();
  // const timestamp = currentDate.getTime();
  const tempFileNameAusPostScan = `${driverEmail}_auspostscan.jpg`;
  const tempAusPostScanURL = `https://${storageAccountName}.blob.core.windows.net/driverauspostscan/${tempFileNameAusPostScan}`;
  // const ausPostScan = tempAusPostScanURL;

  const tempFileNameLicenceScan = `${driverEmail}_licencescan.jpg`;
  const tempLicenceScanURL = `https://${storageAccountName}.blob.core.windows.net/driverlicencescan/${tempFileNameLicenceScan}`;
  // const licenceScan = tempLicenceScanURL;

  const tempFileNameVisaScan = `${driverEmail}_licencescan.jpg`;
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/driverlicencescan/${tempFileNameVisaScan}`;
  // const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${driverEmail}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/driverprofilephoto/${tempFileProfilePhoto}`;
  // const profilePhoto = tempProfilePhotoURL;

  console.log("pw = ", oldPassword, password);

  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    }
  };

  const bodyParameters = {
    email: driverEmail,
    fname,
    mname,
    lname,
    address,
    dob,
    gender,
    ausPostId,
    ausPostScan,
    ausPostExpiry,
    vehicleNo,
    vehicalType,
    visaNo,
    visaScan,
    visaExpiry,
    licenceId,
    licenceScan,
    licenceExpiry,
    driverType,
    workStatus,
    // password,
    supervisorEmail,
    username,
    // phoneNo,
    // createDate,
    profilePhoto,
  };

  const [ausPostScanFile, setAusPostSanFile] = useState([]);

  const ausPostScanHnadler = (event) => {
    setAusPostSanFile(event.target.files[0]);
    setAusPostScan(tempAusPostScanURL);
    bodyParameters.ausPostScan = tempAusPostScanURL;
    console.log("APS = ", ausPostScan);
    console.log("bodyParameters = ", bodyParameters);
  };

  async function uploadAusPostScan() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("driverauspostscan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameAusPostScan);
    const option = { blobHTTPHeader: { blobContentType: ausPostScanFile.type } };
    await blobClient.uploadBrowserData(ausPostScanFile, option);
  }

  const [licenceScanFile, setLicenceSanFile] = useState([]);

  const LicenceScanHnadler = (event) => {
    setLicenceSanFile(event.target.files[0]);
    setLicenceScan(tempLicenceScanURL);
  };

  async function uploadLicenceScan() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("driverlicencescan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameLicenceScan);
    const option = { blobHTTPHeader: { blobContentType: licenceScanFile.type } };
    await blobClient.uploadBrowserData(licenceScanFile, option);
  }

  const [visaScanFile, setVisaSanFile] = useState([]);

  const VisaScanHnadler = (event) => {
    setVisaSanFile(event.target.files[0]);
    setVisaScan(tempVisaScanURL);
  };

  async function uploadVisaScan() {
    //   const blobService = new BlobServiceClient(
    //     `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    //   );

    const containerClient = blobService.getContainerClient("drivervisascan");
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

    const containerClient = blobService.getContainerClient("driverprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }

  async function editDriver() {
    await uploadAusPostScan();
    await uploadLicenceScan();
    await uploadVisaScan();
    await uploadProfilePhoto();
    axios
      .put(baseURL, bodyParameters, config)
      .then((response) => {
        // console.log("response = ", response.status);
        console.log(bodyParameters);
        if (response.status === 204) {
          alert("Driver Updated successfully");
          navigate(`/drivers/${id}`);
        }
      })
      .catch((error) => {
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
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Edit Driver
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <MDBox pb={2}>
                Personal Details
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                  Open alert dialog
                </Button>
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
                      From this you will delete this driver. And this driver will become an inactive
                      driver.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog> */}
              </MDBox>
              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder={driver.fname}
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
                      placeholder={driver.mname}
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
                      placeholder={driver.lname}
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
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                      helperText={gender}
                      label="Gender"
                      defaultValue={gender}
                      // default={gender}
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={driver.address}
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
                      placeholder={driver.email}
                      type="email"
                      label="Email"
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
                      placeholder={driver.dob}
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
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={driver.username}
                      type="text"
                      label="Username"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setWorkstatus(e.target.value)}
                      placeholder={driver.workStatus}
                      type="text"
                      label="Work Status"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>AUSPOST ID Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostId(e.target.value)}
                      placeholder={driver.ausPostId}
                      type="text"
                      label="ID no"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setAusPostScan(e.target.value)}
                      onChange={ausPostScanHnadler}
                      placeholder={driver.ausPostScan}
                      type="file"
                      label="Scanned copy"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostExpiry(e.target.value)}
                      placeholder={driver.ausPostExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Vehicle Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      placeholder={driver.vehicleNo}
                      type="text"
                      label="Vehicle No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicalType(e.target.value)}
                      placeholder={driver.vehicalType}
                      type="texy"
                      label="Vehicle type"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
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
                      placeholder={driver.visaNo}
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
                      placeholder={driver.visaScan}
                      type="file"
                      label="Scanned copy"
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
                      placeholder={driver.visaExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Driver licence details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceId(e.target.value)}
                      placeholder={driver.licenceId}
                      type="text"
                      label="ID no"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setLicenceScan(e.target.value)}
                      onChange={LicenceScanHnadler}
                      placeholder={driver.licenceScan}
                      type="file"
                      label="Scanned copy"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceExpiry(e.target.value)}
                      placeholder={driver.licenceExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
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
                      onChange={(e) => setDriverType(e.target.value)}
                      value={driverType}
                      helperText={driverType}
                      label="Drivet Type"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Male">Active</MenuItem>
                      <MenuItem value="Female">Inactive</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    {/* <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setSupervisroEmail(e.target.value)}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    /> */}
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
                      onChange={(e) => setSupervisroEmail(e.target.value)}
                      default={supervisorEmail}
                      helperText={supervisorEmail}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    >
                      {allSupervisors.map((supervisor) => (
                        <MenuItem value={supervisor.email}>{supervisor.email}</MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHandler}
                      placeholder={driver.profilePhoto}
                      type="file"
                      label="Profile Photo"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
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
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      label="Confirm New Password"
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      helperText={isPasswordMatching}
                      // variant="standard"
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
            </MDBox>

            {/* <MDBox mt={4} mb={1}>
              <MDButton onClick={() => editDriver()} variant="gradient" color="info" fullWidth>
                Update
              </MDButton> */}
            {/* </MDBox> */}
            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      component={Link}
                      to={`/drivers/${id}`}
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
                      onClick={() => editDriver()}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Update
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditDriver;
