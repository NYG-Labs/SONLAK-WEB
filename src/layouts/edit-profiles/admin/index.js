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
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function EditAdmin() {
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
  //   const [allSupervisors, setAllSupervisors] = useState([]);
  const [admin, setAdmin] = useState([]);
  const baseURL = `https://sonlakserver.azurewebsites.net/api/Admins/${id}`;
  //   const baseURLSupervisors = "/api/Supervisors";
  const baseURLAdmin = `https://sonlakserver.azurewebsites.net/api/Admins/${id}`;
  const [fname, setFname] = useState(admin.fname);
  // const [mname, setMname] = useState(admin.mname);
  const [lname, setLname] = useState(admin.lname);
  const [adminType, setAdminType] = useState(admin.adminType);
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  console.log(phoneNo, address);
  // const [address, setAddress] = useState(admin.address);
  // const [dob, setDob] = useState(admin.dob);
  // const [gender, setGender] = useState(admin.gender);
  const [loading, setLoading] = useState(false);
  //   const [ausPostId, setAusPostId] = useState(admin.ausPostId);
  //   const [ausPostScan, setAusPostScan] = useState(admin.ausPostScan);
  //   const [ausPostExpiry, setAusPostExpiry] = useState(admin.ausPostExpiry);
  //   const [vehicleNo, setVehicleNo] = useState(admin.vehicleNo);
  //   const [vehicalType, setVehicalType] = useState(admin.vehicalType);
  //   const [visaNo, setVisaNo] = useState(admin.visaNo);
  //   const [visaScan, setVisaScan] = useState(admin.visaScan);
  //   const [visaExpiry, setVisaExpiry] = useState(admin.visaExpiry);
  //   const [licenceId, setLicenceId] = useState(admin.licenceId);
  //   const [licenceScan, setLicenceScan] = useState(admin.licenceScan);
  //   const [licenceExpiry, setLicenceExpiry] = useState(admin.licenceExpiry);
  //   const [username, setUsername] = useState(admin.username);
  // const [phoneNo, setPhoneNo] = useState("");
  //   const [profilePhoto, setProfilePhoto] = useState(admin.profilePhoto);
  //   const [supervisorEmail, setSupervisroEmail] = useState(admin.supervisorEmail);
  //   const [workStatus, setWorkstatus] = useState(admin.workStatus);
  // const [password, setPassword] = useState(admin.password);
  // const [oldPassword, setOldPassword] = useState("");
  // const [isPasswordMatching, setIsPasswordMatching] = useState("");

  // const confirmPasswordValidation = (event) => {
  //   if (password === event) {
  //     setIsPasswordMatching("Password and Confirm Password is matching");
  //   } else {
  //     setIsPasswordMatching("");
  //   }
  // };

  //   const getAllSupervisors = () => {
  //     axios.get(baseURLSupervisors, config).then((response) => {
  //       const tempSupervisors = response.data;
  //       setAllSupervisors(tempSupervisors);
  //     });
  //   };

  const getAdminDetails = async () => {
    await axios.get(baseURLAdmin, config).then((response) => {
      const tempAdmin = response.data;
      setAdmin(tempAdmin);
      setFname(response.data.fname);
      // setMname(response.data.mname);
      setLname(response.data.lname);
      setAdminType(response.data.adminType);
      // setAddress(response.data.address);
      // setDob(response.data.dob);
      // setGender(response.data.gender);
      //   setAusPostId(response.data.ausPostId);
      //   setAusPostScan(response.data.ausPostScan);
      //   setAusPostExpiry(response.data.ausPostExpiry);
      //   setVehicleNo(response.data.vehicleNo);
      //   setVehicalType(response.data.vehicalType);
      //   setVisaNo(response.data.visaNo);
      //   setVisaScan(response.data.visaScan);
      //   setVisaExpiry(response.data.visaExpiry);
      //   setLicenceId(response.data.licenceId);
      //   setLicenceScan(response.data.ausPostScan);
      //   setLicenceExpiry(response.data.licenceExpiry);
      //   setUsername(response.data.username);
      //   setProfilePhoto(response.data.profilePhoto);
      //   setSupervisroEmail(response.data.supervisorEmail);
      //   setWorkstatus(response.data.workStatus);
    });
  };

  useEffect(() => {
    getAdminDetails();
    // getAllSupervisors();
  }, []);

  //   console.log("Admin = ", Admin);
  //   console.log("allsupervisors = ", allSupervisors);

  const adminEmail = admin.email;

  // console.log("pw = ", oldPassword, password);

  const bodyParameters = {
    email: adminEmail,
    fname,
    // mname,
    lname,
    adminType,
    // address,
    // dob,
    // gender,
    // ausPostId,
    // ausPostScan,
    // ausPostExpiry,
    // vehicleNo,
    // vehicalType,
    // visaNo,
    // visaScan,
    // visaExpiry,
    // licenceId,
    // licenceScan,
    // licenceExpiry,
    // adminType,
    // workStatus,
    // password,
    // supervisorEmail,
    // username,
    // phoneNo,
    // createDate,
    // profilePhoto,
  };

  //   console.log("==> ", bodyParameters.fname);

  function editAdmin() {
    setLoading(true);
    axios
      .put(baseURL, bodyParameters, config)
      .then((response) => {
        // console.log("response = ", response.status);
        // console.log(bodyParameters);
        if (response.status === 204) {
          alert("Admin Updated successfully");
          navigate(`/admins/${id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error = ", error.response);
        // console.log(bodyParameters);
        alert("An unexpected error occured! please check the values and try again");
      });
  }

  if (
    window.localStorage.getItem("token") === null ||
    window.localStorage.getItem("roleKey") !== "SUPERADMIN"
    // window.localStorage.getItem("roleKey") !== "OTHERADMIN")
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
                Edit Admin
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
                  to={`/change-password-admin/${admin.email}/${admin.adminType}`}
                >
                  Change password
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
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
                      placeholder={admin.fname}
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
                      onChange={(e) => setLname(e.target.value)}
                      placeholder={admin.lname}
                      value={lname}
                      type="select"
                      label="Last Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setMname(e.target.value)}
                      placeholder={admin.mname}
                      type="text"
                      label="Middle Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={admin.email}
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
                      onChange={(e) => setPhoneNo(e.target.value)}
                      value={phoneNo}
                      type="text"
                      label="Phone No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      type="text"
                      label="Address"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox>
                    <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      IconComponent={<ArrowDropDownIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAdminType(e.target.value)}
                      value={adminType}
                      helperText={adminType}
                      type="text"
                      label="Admin Type"
                      // variant="standard"
                      fullWidth
                    >
                      <MenuItem value="OTHERADMIN">OTHERADMIN</MenuItem>
                      <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={admin.address}
                      type="text"
                      label="Address"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={admin.email}
                      type="email"
                      label="Email"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
              </Grid>

              {/* <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder={admin.dob}
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
                      placeholder={admin.username}
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
                      placeholder={admin.workStatus}
                      type="text"
                      label="Work Status"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid> */}
            </MDBox>

            {/* <MDBox p={2}>
              <MDBox pb={2}>AUSPOST ID Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostId(e.target.value)}
                      placeholder={admin.ausPostId}
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
                      placeholder={admin.ausPostScan}
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
                      placeholder={admin.ausPostExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            {/* <MDBox p={2}>
              <MDBox pb={2}>Vehicle Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      placeholder={admin.vehicleNo}
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
                      placeholder={admin.vehicalType}
                      type="texy"
                      label="Vehicle type"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
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
            {/* </Grid>
            </MDBox> */}

            {/* <MDBox p={2}>
              <MDBox pb={2}>Visa Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVisaNo(e.target.value)}
                      placeholder={admin.visaNo}
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
                      placeholder={admin.visaScan}
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
                      placeholder={admin.visaExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            {/* <MDBox p={2}>
              <MDBox pb={2}>admin licence details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceId(e.target.value)}
                      placeholder={admin.licenceId}
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
                      placeholder={admin.licenceScan}
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
                      placeholder={admin.licenceExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            {/* <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAdminType(e.target.value)}
                      placeholder={admin.adminType}
                      type="text"
                      label="Admin type"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}> */}
            {/* <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setSupervisroEmail(e.target.value)}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    /> */}
            {/* <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      IconComponent={<ArrowDropDownIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
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
                      placeholder={admin.profilePhoto}
                      type="text"
                      label="Profile Photo"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

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
              </Grid> */}
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
            {/* </MDBox> */}

            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      component={Link}
                      to={`/admins/${id}`}
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
                    <MDButton onClick={() => editAdmin()} variant="gradient" color="info" fullWidth>
                      Update &nbsp;&nbsp;
                      {loading ? <CircularProgress size={20} color="white" /> : ""}
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {/* <MDBox mt={4} mb={1}>
              <MDButton onClick={() => editAdmin()} variant="gradient" color="info" fullWidth>
                Update
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton onClick={() => editAdmin()} variant="gradient" color="info" fullWidth>
                Cancle
              </MDButton>
            </MDBox> */}
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

export default EditAdmin;
