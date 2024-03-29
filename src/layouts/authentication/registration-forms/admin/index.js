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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import axios from "axios";
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

function AdminRegistration() {
  const classes = helperTextStyles();

  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [adminType, setAdminType] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/Admins`;
  const navigate = useNavigate();

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const bodyParameters = {
    email,
    fname,
    lname,
    adminType,
    phoneNo,
    address,
    password,
  };

  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    } else {
      setIsPasswordMatching("");
    }
  };

  function registerAdmin() {
    setLoading(true);
    if (bodyParameters.email.length === 0) {
      window.alert("Please enter a email to register");
      setLoading(false);
    } else if (bodyParameters.fname.length === 0) {
      window.alert("Please enter a firstname to register");
      setLoading(false);
    } else if (bodyParameters.password.length === 0) {
      window.alert("Please enter a password");
      setLoading(false);
    } else if (bodyParameters.adminType.length === 0) {
      window.alert("Please select an admin type");
      setLoading(false);
    } else if (bodyParameters.phoneNo.length !== 10) {
      window.alert("Please enter a valid phone number");
      setLoading(false);
    } else if (isPasswordMatching === "") {
      window.alert("Confirm password is incorrect");
      setLoading(false);
    } else {
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 201) {
            alert("Admin registered successfully");
            navigate("/admins");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setLoading(false);
            alert("A admin with this email is already available");
          } else {
            setLoading(false);
            alert("An unexpected error occured! please check the values and try again");
          }
        });
    }
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
            Admin registration
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
                      onChange={(e) => setLname(e.target.value)}
                      type="text"
                      label="Last Name"
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
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={email.length === 0 ? "Email cannot be empty" : ""}
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
                      type="text"
                      label="Phone No"
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
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      label="Address"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
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
                      type="text"
                      label="Admin Type"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={adminType.length === 0 ? "Admin type cannot be empty" : ""}
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
                      type="text"
                      label="Address"
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
                      type="text"
                      label="Username"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid> */}
            </MDBox>

            {/* <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setProfilePhoto(e.target.value)}
                      type="text"
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
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={password.length === 0 ? "Password cannot be empty" : ""}
                      type="password"
                      label="Password"
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
              <MDButton onClick={() => registerAdmin()} variant="gradient" color="info" fullWidth>
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

export default AdminRegistration;
