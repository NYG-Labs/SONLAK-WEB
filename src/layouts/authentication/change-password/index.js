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
import { useState } from "react";
import axios from "axios";
// import MenuItem from "@mui/material/MenuItem";
// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  const { roleKey } = useParams();
  //   const [allSupervisors, setAllSupervisors] = useState([]);
  const baseURL = `/api/Admins/${id}`;
  //   const baseURLSupervisors = "/api/Supervisors";
  const baseURLAdmin = `/api/Admins/${id}`;
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState(admin.password);
  const [oldPassword, setOldPassword] = useState("");

  //   const getAllSupervisors = () => {
  //     axios.get(baseURLSupervisors, config).then((response) => {
  //       const tempSupervisors = response.data;
  //       setAllSupervisors(tempSupervisors);
  //     });
  //   };

//   const getAdminDetails = async () => {
//     await axios.get(baseURLAdmin, config).then((response) => {
//       const tempAdmin = response.data;
//       setPassword(response.data.setPassword);
//     });
//   };

//   useEffect(() => {
//     getAdminDetails();
//     // getAllSupervisors();
//   }, []);

  //   console.log("Admin = ", Admin);
  //   console.log("allsupervisors = ", allSupervisors);

//   const adminEmail = admin.email;

  console.log("pw = ", oldPassword, newPassword);

  const bodyParameters = {
    email: userEmail,
    roleKey,
    oldPassword,
    newPassword,
  };

  //   console.log("==> ", bodyParameters.fname);

  function changePassword() {
    setLoading(true);
    axios
      .post(baseURL, bodyParameters, config)
      .then((response) => {
        if (response.status === 204 && roleKey.includes("ADMIN")) {
          alert("Password updated successfully");
          navigate(`/admins/${id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error = ", error.response);
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
          textAlign="center"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} mr={8} md={8.5}>
              <MDTypography mt={1} ml={2} variant="h5" color="white">
                Change Password
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <MDBox>
                <MDButton
                  component={Link}
                  variant="gradient"
                  color="light"
                  justifyContent="flex-end"
                  fullWidth
                  to="/ETA-performance/Add-ETA-performance"
                >
                  Change password
                </MDButton>
              </MDBox>
            </Grid> */}
          </Grid>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
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
                      onChange={(e) => setNewPassword(e.target.value)}
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
                    <MDButton onClick={() => changePassword()} variant="gradient" color="info" fullWidth>
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
