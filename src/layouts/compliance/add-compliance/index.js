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
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import "./styles.css";
// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function AddCompliance() {
  const navigate = useNavigate();
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const getAllDriversURL = "https://sonlakserver.azurewebsites.net/api/Drivers/GetDriversActive";
  const baseURL = "https://sonlakserver.azurewebsites.net/api/Compliances";
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const [driverEmail, setDriverEmail] = useState("");
  const [articleId, setArticleId] = useState("");
  const [date, setDate] = useState(new Date());
  const [accept, setAccept] = useState("");
  const [deliver, setDeliver] = useState("");
  const [attemptToDeliver, setAttemptToDeliver] = useState("");
  const [transfer, setTransfer] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);
  const [contractId, setContractId] = useState("");
  const [userLogInId, setUserLogInId] = useState("");
  console.log(contractId, userLogInId);
  const [loading, setLoading] = useState(false);

  const getAllDrivers = () => {
    axios.get(getAllDriversURL, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  const bodyParameters = {
    driverEmail,
    articleId,
    date,
    accept,
    deliver,
    attemptToDeliver,
    transfer,
  };

  async function addCompliance() {
    setLoading(true);
    // console.log(bodyParameters);
    axios
      .post(baseURL, bodyParameters, config)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 201) {
          alert("Compliance added successfully");
          navigate("/compliance");
        }
      })
      .catch((error) => {
        setLoading(false);
        // if (error.response.status === 409) {
        //   alert("A supervisor with this email is already available");
        // } else {
        console.log(error);
        alert("An unexpected error occured! please check the values and try again");
        // }
      });
  }

  // console.log(user, route, deviceID, articles, early, onTime, late, notDelivered, onTimePercentage);
  // console.log(allDrivers);

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
            Add Compliance
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <Grid container spacing={3}>
                <br />
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
                        classes: { root: "select-input-styles" },
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDriverEmail(e.target.value)}
                      value={driverEmail}
                      type="email"
                      label="Driver Email"
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
                  <MDBox>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Contract ID"
                      onChange={(e) => setContractId(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="User Login ID"
                      onChange={(e) => setUserLogInId(e.target.value)}
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
                      label="Article Id"
                      onChange={(e) => setArticleId(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mt={4} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        disableClock
                        isClockOpen={false}
                        renderInput={(props) => (
                          <TextField
                            disableClock
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...props}
                          />
                        )}
                        label="Date"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mt={4} mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      label="Date"
                      onChange={(e) => setDate(e.target.value)}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mt={4} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        fullWidth
                        renderInput={(props) => (
                          <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
                        )}
                        label="Accept"
                        value={accept}
                        onChange={(newValue) => {
                          setAccept(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mt={4} mb={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
                        )}
                        label="Deliver"
                        value={deliver}
                        onChange={(newValue) => {
                          setDeliver(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
                        )}
                        label="Attempt to deliver"
                        value={attemptToDeliver}
                        onChange={(newValue) => {
                          setAttemptToDeliver(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
                        )}
                        label="Transfer"
                        value={transfer}
                        onChange={(newValue) => {
                          setTransfer(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => addCompliance()} variant="gradient" color="info" fullWidth>
                Add Compliance &nbsp;&nbsp;
                {loading ? <CircularProgress size={20} color="white" /> : ""}
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

export default AddCompliance;
