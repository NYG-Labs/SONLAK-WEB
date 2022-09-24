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
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
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
import { makeStyles } from "@material-ui/core/styles";

// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";

const helperTextStyles = makeStyles({
  error: {
    color: "grey",
  },
  success: {
    color: "green",
  },
});

function EditDriver() {
  const classes = helperTextStyles();
  // console.log(classes);

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
  const baseURL = `https://sonlakserver.azurewebsites.net/api/Drivers/${id}`;
  const baseURLSupervisors =
    "https://sonlakserver.azurewebsites.net/api/Supervisors/GetSupervisorsActive";
  const baseURLDriver = `https://sonlakserver.azurewebsites.net/api/Drivers/${id}`;
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  // const [gender, setGender] = useState("");
  const [ausPostId, setAusPostId] = useState("");
  const [ausPostScan, setAusPostScan] = useState("");
  const [ausPostExpiry, setAusPostExpiry] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicalType, setVehicalType] = useState("");
  const [visaNo, setVisaNo] = useState("");
  const [visaScan, setVisaScan] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [licenceId, setLicenceId] = useState("");
  const [licenceScan, setLicenceScan] = useState("");
  const [licenceExpiry, setLicenceExpiry] = useState("");
  const [driverType, setDriverType] = useState("");
  // const [username, setUsername] = useState(driver.username);
  const [insurancePolicyNo, setPolicyNo] = useState("");
  const [insuranceExpiry, setInsuaranceExpDate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [supervisorEmail, setSupervisroEmail] = useState("");
  const [workStatus, setWorkstatus] = useState("");
  const [username, setUserLogInId] = useState("");
  const [pinNo, setUserPinNo] = useState("");
  const [route, setRoute] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhoneNo, setEmergencyNumber] = useState("");
  const [emergencyRelation, setEmergencyRelationship] = useState("");
  // console.log(userPinNo, route, emergencyName, emergencyNumber, emergencyRelationship);
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");

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
      // setGender(response.data.gender);
      setAusPostId(response.data.ausPostId);
      setAusPostScan(response.data.ausPostScan);
      setAusPostExpiry(response.data.ausPostExpiry);
      setVehicleNo(response.data.vehicleNo);
      setVehicalType(response.data.vehicalType);
      setVisaNo(response.data.visaNo);
      setVisaScan(response.data.visaScan);
      setVisaExpiry(response.data.visaExpiry);
      setLicenceId(response.data.licenceId);
      setLicenceScan(response.data.licenceScan);
      setLicenceExpiry(response.data.licenceExpiry);
      setDriverType(response.data.driverType);
      setUserLogInId(response.data.username);
      setPolicyNo(response.data.insurancePolicyNo);
      setInsuaranceExpDate(response.data.insuranceExpiry);
      setProfilePhoto(response.data.profilePhoto);
      setSupervisroEmail(response.data.supervisorEmail);
      setWorkstatus(response.data.workStatus);
      setPhoneNo(response.data.phoneNo);
      setUserPinNo(response.data.pinNo);
      setRoute(response.data.route);
      setEmergencyName(response.data.emergencyName);
      setEmergencyNumber(response.data.emergencyPhoneNo);
      setEmergencyRelationship(response.data.emergencyRelation);
    });
  };

  useEffect(() => {
    getDriverDetails();
    getAllSupervisors();
  }, []);

  const driverEmail = driver.email;

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // const currentDate = new Date();
  // const timestamp = currentDate.getTime();
  const tempFileNameAusPostScan = `${driverEmail}_auspostscan.pdf`;
  const tempAusPostScanURL = `https://${storageAccountName}.blob.core.windows.net/driverauspostscan/${tempFileNameAusPostScan}`;
  // const ausPostScan = tempAusPostScanURL;

  const tempFileNameLicenceScan = `${driverEmail}_licencescan.pdf`;
  const tempLicenceScanURL = `https://${storageAccountName}.blob.core.windows.net/driverlicencescan/${tempFileNameLicenceScan}`;
  // const licenceScan = tempLicenceScanURL;

  const tempFileNameVisaScan = `${driverEmail}_visascan.pdf`;
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/drivervisascan/${tempFileNameVisaScan}`;
  // const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${driverEmail}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/driverprofilephoto/${tempFileProfilePhoto}`;
  // const profilePhoto = tempProfilePhotoURL;

  const bodyParameters = {
    email: driverEmail,
    fname,
    mname,
    lname,
    address,
    dob,
    // gender,
    ausPostId,
    ausPostScan,
    ausPostExpiry,
    vehicleNo,
    vehicalType,
    insurancePolicyNo,
    insuranceExpiry,
    visaNo,
    visaScan,
    visaExpiry,
    licenceId,
    licenceScan,
    licenceExpiry,
    driverType,
    workStatus,
    phoneNo,
    username,
    supervisorEmail,
    profilePhoto,
    pinNo,
    route,
    emergencyName,
    emergencyPhoneNo,
    emergencyRelation,
  };

  function calculateAge(dob1) {
    const today = new Date();
    const birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow -= 1;
    }
    return ageNow;
  }

  function dateValidator(dateParameter) {
    if (dateParameter === "0001-01-01T00:00:00") {
      return "";
    }
    return dateParameter;
  }

  const [ausPostScanFile, setAusPostSanFile] = useState([]);

  const ausPostScanHnadler = (event) => {
    setAusPostSanFile(event.target.files[0]);
    setAusPostScan(tempAusPostScanURL);
    bodyParameters.ausPostScan = tempAusPostScanURL;
    // console.log("APS = ", ausPostScan);
    // console.log("bodyParameters = ", bodyParameters);
  };

  async function uploadAusPostScan() {
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
    const containerClient = blobService.getContainerClient("driverprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }

  async function editDriver() {
    setLoading(true);

    if (ausPostScanFile.length !== 0) {
      await uploadAusPostScan();
    }

    if (licenceScanFile.length !== 0) {
      await uploadLicenceScan();
    }

    if (visaScanFile.length !== 0) {
      await uploadVisaScan();
    }

    if (profilePhotoFile.length !== 0) {
      await uploadProfilePhoto();
    }

    // console.log(bodyParameters);
    if (
      phoneNo !== "" &&
      phoneNo !== null &&
      phoneNo.length !== undefined &&
      // bodyParameters.phoneNo.length !== 0 &&
      bodyParameters.phoneNo.length !== 10
    ) {
      window.alert("Please enter a valid phone number");
      setLoading(false);
    } else if (fname !== null && bodyParameters.fname.length === 0) {
      window.alert("Please enter a firstname");
      setLoading(false);
    } else if (
      emergencyPhoneNo !== null &&
      emergencyPhoneNo.length !== undefined &&
      // bodyParameters.emergencyPhoneNo.length !== 0 &&
      bodyParameters.emergencyPhoneNo.length !== 10
    ) {
      window.alert("Please enter a valid phone number for emergency contact number");
      setLoading(false);
    } else if (bodyParameters.dob !== "" && calculateAge(bodyParameters.dob) < 18) {
      window.alert("Driver should be above 18 years from today’s date");
      setLoading(false);
    } else {
      axios
        .put(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 204) {
            alert("Driver Updated successfully");
            navigate(`/drivers/${id}`);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error = ", error.response);
          // console.log(bodyParameters);
          alert("An unexpected error occured! please check the values and try again");
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
                Edit Driver
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
                  to={`/change-password-driver/${driver.email}/${"DRIVER"}`}
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
                      value={fname}
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
                      value={mname}
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
                      value={lname}
                      type="select"
                      label="Last Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
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
                    </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={driver.address}
                      value={address}
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

                <Grid item xs={12} md={4}>
                  <MDBox mb={1}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      label="DOB"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={
                        calculateAge(dob) < 18
                          ? `A driver should be above 18 years old from today’s date`
                          : dateValidator(dob)
                      }
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={1}>
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
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={1}>
                    {/* <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setWorkstatus(e.target.value)}
                      placeholder={driver.workStatus}
                      type="text"
                      label="Work Status"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    /> */}
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
                    > */}
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={driver.workStatus}
                      type="text"
                      label="Work status"
                      // variant="standard"
                      fullWidth
                    />
                    {/* <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">InActive</MenuItem> */}
                    {/* </MDInput> */}
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder={driver.phoneNo}
                      type="text"
                      label="Phone No"
                      value={phoneNo}
                      FormHelperTextProps={{ className: classes.error }}
                      // helperText={
                      //   phoneNo.length !== undefined &&
                      //   phoneNo.length !== 0 &&
                      //   phoneNo.length !== 10
                      //     ? "A contact number should contain 10 digits"
                      //     : ""
                      // }
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
                      onChange={(e) => setDriverType(e.target.value)}
                      value={driverType}
                      // helperText={driverType}
                      label="Residential status"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Citizen">Citizen</MenuItem>
                      <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
                      <MenuItem value="Temporary Visa">Temporary Visa</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {driverType !== "Citizen" ? (
              <MDBox p={2}>
                <MDBox pb={2}>Visa Details</MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setVisaNo(e.target.value)}
                        placeholder={driver.visaNo}
                        value={visaNo}
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
                        helperText={dateValidator(visaExpiry)}
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
            <MDBox p={2}>
              <MDBox pb={2}>AUSPOST ID Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostId(e.target.value)}
                      placeholder={driver.ausPostId}
                      value={ausPostId}
                      type="text"
                      label="Auspost ID no"
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
                      label="Scanned copy (PDF)"
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
                      helperText={dateValidator(ausPostExpiry)}
                      type="date"
                      label="Expiery date"
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
                      onChange={(e) => setUserLogInId(e.target.value)}
                      value={username}
                      type="text"
                      label="User Login ID"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUserPinNo(e.target.value)}
                      value={pinNo}
                      type="text"
                      label="User Pin No"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setRoute(e.target.value)}
                      value={route}
                      type="text"
                      label="Route (Contract No)"
                      helperText="If there are more than one route seperate them using commas (,)"
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
                      value={vehicleNo}
                      type="text"
                      label="Vehicle No"
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
                      onChange={(e) => setVehicalType(e.target.value)}
                      value={vehicalType}
                      // helperText={vehicalType}
                      label="Vehicle Type"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      {/* <MenuItem value="car">Car</MenuItem> */}
                      <MenuItem value="bike">Bike</MenuItem>
                      <MenuItem value="van">Van</MenuItem>
                    </MDInput>
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
              <MDBox pb={2}>Insuarance Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPolicyNo(e.target.value)}
                      type="text"
                      placeholder={driver.insurancePolicyNo}
                      value={insurancePolicyNo}
                      label="Policy No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setInsuaranceExpDate(e.target.value)}
                      type="date"
                      // value={insuranceExpiry}
                      helperText={dateValidator(insuranceExpiry)}
                      label="Expiery Date"
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
                      value={licenceId}
                      type="text"
                      label="Driver License No"
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
                      onChange={(e) => setLicenceExpiry(e.target.value)}
                      helperText={dateValidator(licenceExpiry)}
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
                      // value={supervisorEmail}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    >
                      {allSupervisors.map((supervisor) => (
                        <MenuItem value={supervisor.email}>
                          {supervisor.fname} {supervisor.lname}
                        </MenuItem>
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
                      label="Profile Photo (JPG/JPEG/PNG)"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}> Emergency Contact Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      type="text"
                      label="Name"
                      value={emergencyName}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyNumber(e.target.value)}
                      value={emergencyPhoneNo}
                      type="text"
                      label="Contact number"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyRelationship(e.target.value)}
                      value={emergencyRelation}
                      type="text"
                      label="Relationship"
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
            </MDBox> */}
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
                      Update &nbsp;&nbsp;
                      {loading ? <CircularProgress size={20} color="white" /> : ""}
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
