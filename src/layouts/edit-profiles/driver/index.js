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

  console.log("pw = ", oldPassword, password);

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

  //   console.log("==> ", bodyParameters.fname);

  function editDriver() {
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
    window.localStorage.getItem("roleKey") !== "admin     "
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
                      onChange={(e) => setAusPostScan(e.target.value)}
                      // onChange={ausPostScanHnadler}
                      placeholder={driver.ausPostScan}
                      type="text"
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
                      onChange={(e) => setVisaScan(e.target.value)}
                      placeholder={driver.visaScan}
                      type="text"
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
                      onChange={(e) => setLicenceScan(e.target.value)}
                      placeholder={driver.licenceScan}
                      type="text"
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
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDriverType(e.target.value)}
                      placeholder={driver.driverType}
                      type="text"
                      label="Driver type"
                      // variant="standard"
                      fullWidth
                    />
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
                      onChange={(e) => setProfilePhoto(e.target.value)}
                      placeholder={driver.profilePhoto}
                      type="text"
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
