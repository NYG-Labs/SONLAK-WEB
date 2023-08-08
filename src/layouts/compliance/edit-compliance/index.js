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
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "./styles.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function EditCompliance() {
  const navigate = useNavigate();
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const { id } = useParams();
  const successCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
  const [complaince, setComplaince] = useState([]);
  const [driverEmail, setDriverEmail] = useState("");
  const [articleId, setArticleId] = useState("");
  const [date, setDate] = useState("");
  const [accept, setAccept] = useState("");
  const [deliver, setDeliver] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);
  const [attemptToDeliver, setAttemptToDeliver] = useState("");
  const [transfer, setTransfer] = useState("");
  const [route, setContractId] = useState("");
  const [username, setUserLogInId] = useState("");
  //
  const [loading, setLoading] = useState(false);

  const getComplainceURL = `${process.env.REACT_APP_BACKEND_URL}/api/Compliances/${id}`;
  const putURL = `${process.env.REACT_APP_BACKEND_URL}/api/Compliances/${id}`;
  const getAllDriversURL = `${process.env.REACT_APP_BACKEND_URL}/api/Drivers`;
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllDrivers = () => {
    axios.get(getAllDriversURL, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  const getCompliance = () => {
    axios.get(getComplainceURL, config).then((response) => {
      const tempComplaince = response.data;
      setComplaince(tempComplaince);

      setDriverEmail(tempComplaince.driverEmail);
      setArticleId(tempComplaince.articleId);
      setDate(tempComplaince.date);
      setAccept(tempComplaince.accept);
      setDeliver(tempComplaince.deliver);
      setAttemptToDeliver(tempComplaince.attemptToDeliver);
      setTransfer(tempComplaince.transfer);
      setContractId(tempComplaince.route);
      setUserLogInId(tempComplaince.username);
    });
  };

  useEffect(() => {
    getAllDrivers();
    getCompliance();
  }, []);

  const bodyParameters = {
    id,
    driverEmail,
    articleId,
    date,
    accept,
    deliver,
    attemptToDeliver,
    transfer,
    route,
    username,
  };

  async function postCompliance() {
    setLoading(true);

    axios
      .put(putURL, bodyParameters, config)
      .then((response) => {
        if (successCodes.includes(response.status)) {
          alert("Compliance updated successfully");
          navigate("/compliance");
        }
      })
      .catch(() => {
        setLoading(false);
        // if (error.response.status === 409) {
        //   alert("A supervisor with this email is already available");
        // } else {

        alert("An unexpected error occured! please check the values and try again");
        // }
      });
  }

  async function setDriverDetails(identifier) {
    setDriverEmail(identifier);
    const getDriverDetailsURL = `${process.env.REACT_APP_BACKEND_URL}/api/Drivers/${identifier}`;
    await axios
      .get(getDriverDetailsURL, config)
      .then((response) => {
        if (response.status === 200) {
          setContractId(response.data.route);
          setUserLogInId(response.data.username);
        }
      })
      .catch(() => {});
  }

  //
  //

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
            Update Compliance
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
                  <MDBox mb={2}>
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
                      onChange={(e) => setDriverDetails(e.target.value)}
                      value={driverEmail}
                      type="email"
                      label="Driver Email"
                      helperText={complaince.driverEmail}
                      // variant="standard"
                      fullWidth
                    >
                      {allDrivers.map((driver) => (
                        <MenuItem value={driver.email}>
                          {driver.fname} {driver.lname}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="z">driveremail</MenuItem> */}
                    </MDInput>
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="Article Id"
                      value={articleId}
                      onChange={(e) => setArticleId(e.target.value)}
                      placeholder={complaince.articleId}
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
                      label="Route (Contract No)"
                      onChange={(e) => setContractId(e.target.value)}
                      value={route}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={4}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      label="User Login ID"
                      onChange={(e) => setUserLogInId(e.target.value)}
                      value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
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
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      label="Date"
                      onChange={(e) => setDate(e.target.value)}
                      helperText={date}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
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
                  <MDBox mb={3}>
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
              <MDButton onClick={() => postCompliance()} variant="gradient" color="info" fullWidth>
                Update Compliance &nbsp;&nbsp;
                {loading ? <CircularProgress size={20} color="white" /> : ""}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditCompliance;
