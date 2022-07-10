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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import "./styles.css";
// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function AddETAPerformance() {
  const navigate = useNavigate();
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const baseURL = "/api/Drivers";
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const [user, setUser] = useState("");
  const [route, setRoute] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [articles, setArticles] = useState("");
  const [early, setEarly] = useState("");
  const [onTime, setOnTime] = useState("");
  const [late, setLate] = useState("");
  const [notDelivered, setNotDelivered] = useState("");
  const [onTimePercentage, setOnTimePercentage] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);

  const getAllDrivers = () => {
    axios.get(baseURL, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  console.log(user, route, deviceID, articles, early, onTime, late, notDelivered, onTimePercentage);
  console.log(allDrivers);

  if (
    window.localStorage.getItem("token") === null ||
    window.localStorage.getItem("roleKey") !== "SUPERADMIN"
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
            Add ETA Performance
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              {/* <MDBox pb={2}>Personal Details</MDBox> */}
              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    {/* <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="User"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      // variant="standard"
                      fullWidth
                    /> */}
                    <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      IconComponent={<ArrowDropDownIcon />}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton>
                      //         <ArrowDropDownIcon />
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      type="email"
                      label="User"
                      // variant="standard"
                      fullWidth
                    >
                      {allDrivers.map((driver) => (
                        <MenuItem value={driver.email}>{driver.email}</MenuItem>
                      ))}
                      {/* <MenuItem value="z">driveremail</MenuItem> */}
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={8}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Route"
                      onChange={(e) => setRoute(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Device ID"
                      onChange={(e) => setDeviceID(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Articles"
                      onChange={(e) => setArticles(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Early"
                      onChange={(e) => setEarly(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="On Time"
                      swewonChange={(e) => setOnTime(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Late"
                      onChange={(e) => setLate(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Not Delivered"
                      onChange={(e) => setNotDelivered(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="On Time %"
                      onChange={(e) => setOnTimePercentage(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Add ETA Performance
              </MDButton>
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
                  Add ETA Performance
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default AddETAPerformance;
