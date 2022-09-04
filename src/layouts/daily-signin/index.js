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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
// import MDButton from "components/MDButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MDBadge from "components/MDBadge";
import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "components/MDButton";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
// import allDriverData from "./allDriverData";

const containerStyle = {
  width: "100%",
  height: "600px",
};

function DriverDailySignIn() {
  // const { rows } = allDriverData();
  const [search, setSearch] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);
  const newDate = new Date();
  const today = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
  console.log(today, newDate);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitute, setLatitue] = useState(-37.8136);
  const [longtitude, setLongtitude] = useState(144.9631);
  // const baseURL = `/api/DriverSignIn`;
  const baseURLFilter = `/api/DriverSignIn/GetDriverSignInsfilterbyDate/${fromDate}/${toDate}`;
  // console.log(fromDate, toDate);

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllDrivers = () => {
    axios.get(baseURLFilter, config).then((response) => {
      const tempDrivers = response.data;
      setAllDrivers(tempDrivers);
    });
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  console.log("ALl Drivers = ", allDrivers, search);

  const filteredData = allDrivers.filter((driver) =>
    driver.driverEmail.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();

  async function filterDriverSignIn() {
    setLoading(true);
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchError("Invalid date parameteres! Please try again");
    } else {
      setSearchError("");
    }

    axios
      .get(baseURLFilter, config)
      .then((response) => {
        setAllDrivers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAllDrivers([]);
        console.log(error);
        setLoading(false);
      });
  }

  function handleSingnIn(lat, long) {
    setLatitue(lat);
    setLongtitude(long);
  }

  function handleSingnOut(lat, long) {
    setLatitue(lat);
    setLongtitude(long);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD7_HdHva3M6JreDCXkp4PYhFFttbGr1Ec",
  });

  if (
    window.localStorage.getItem("token") === null ||
    (window.localStorage.getItem("roleKey") !== "SUPERADMIN" &&
      window.localStorage.getItem("roleKey") !== "OTHERADMIN")
  ) {
    navigate("/");
  }
  return isLoaded ? (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9.5}>
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      Drivers daily sign-in
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>

              <Grid item xs={12} mt={1} md={14} ml={2} mr={2}>
                <GoogleMap
                  zoom={17}
                  center={{ lat: latitute, lng: longtitude }}
                  mapContainerStyle={containerStyle}
                >
                  <Marker position={{ lat: latitute, lng: longtitude }} />
                </GoogleMap>
              </Grid>
              <Grid item xs={12} md={11.9} mt={4} fullwidth justifyContent="flex-end">
                <MDBox pr={2} pb={1} pl={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <MDBox mb={3}>
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) => setFromDate(e.target.value)}
                          // onChange={(e) => setFname(e.target.value)}
                          helperText={searchError}
                          type="date"
                          label="From date"
                          // variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MDBox mb={2}>
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) => setToDate(e.target.value)}
                          type="date"
                          label="To date"
                          // variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} mt={0.3} md={2}>
                      {/* <MDBox mt={4} mb={1}> */}
                      <MDButton
                        onClick={() => filterDriverSignIn()}
                        variant="gradient"
                        color="info"
                        fullWidth
                      >
                        Filter &nbsp;&nbsp;
                        {loading ? <CircularProgress size={20} color="white" /> : ""}
                      </MDButton>
                      {/* </MDBox> */}
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              <MDBox>
                <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                  <MDBox pr={2} pb={1} pl={2}>
                    <MDInput
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      label="Search here"
                      justify="space-between"
                      spacing={24}
                      raised
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Driver Email</TableCell>
                          <TableCell align="center">Driver Name</TableCell>
                          <TableCell align="center">Sign-in time</TableCell>
                          {/* <TableCell align="left">Lase Name</TableCell> */}
                          <TableCell align="center" />
                          <TableCell align="center">Sign-off time</TableCell>
                          <TableCell align="center" />
                          {/* <TableCell align="left">Driver type</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length === 0 ? (
                          <TableRow key="s">
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center" />
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center" />
                            <TableCell align="center" />
                          </TableRow>
                        ) : null}
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell align="center" component="th" scope="row">
                              {row.driverEmail}
                            </TableCell>
                            <TableCell align="center">
                              {row.driverFname} {row.driverLname}
                            </TableCell>
                            <TableCell align="center">{row.signInTime}</TableCell>
                            <TableCell align="center">
                              <MDBadge
                                badgeContent="view sign-in"
                                color="success"
                                onClick={() =>
                                  handleSingnIn(row.signInLatitude, row.signInLongtitude)
                                }
                                variant="gradient"
                                size="sm"
                              />
                            </TableCell>
                            <TableCell align="center">{row.signOffTime}</TableCell>
                            <TableCell align="center">
                              <MDBadge
                                badgeContent="view sign-out"
                                color="success"
                                onClick={() =>
                                  handleSingnOut(row.signOffLatitude, row.signOffLongtitude)
                                }
                                variant="gradient"
                                size="sm"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9.5}>
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      Drivers daily sign-in
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9.5}>
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      Error while loading the google map!
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>

              <MDBox pt={3}>
                <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                  <MDBox pr={2} pb={1} pl={2}>
                    <MDInput
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      label="Search here"
                      justify="space-between"
                      spacing={24}
                      raised
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Driver Email</TableCell>
                          <TableCell align="left">Sign-in time</TableCell>
                          {/* <TableCell align="left">Lase Name</TableCell> */}
                          <TableCell align="left" />
                          <TableCell align="left">Sign-off time</TableCell>
                          <TableCell align="left" />
                          {/* <TableCell align="left">Driver type</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length === 0 ? (
                          <TableRow key="s">
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                          </TableRow>
                        ) : null}
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell component="th" scope="row">
                              {row.driverEmail}
                            </TableCell>
                            <TableCell align="left">{row.signInTime}</TableCell>
                            <TableCell align="center">
                              <MDBadge
                                badgeContent="view sign-in"
                                color="success"
                                onClick={() =>
                                  handleSingnIn(row.signInLatitude, row.signInLongtitude)
                                }
                                variant="gradient"
                                size="sm"
                              />
                            </TableCell>
                            <TableCell align="left">{row.signOffTime}</TableCell>
                            <TableCell align="center">
                              <MDBadge
                                badgeContent="view sign-out"
                                color="success"
                                onClick={() =>
                                  handleSingnOut(row.signOffLatitude, row.signOffLongtitude)
                                }
                                variant="gradient"
                                size="sm"
                              />
                            </TableCell>
                            {/* <TableCell align="left">{row.vehicleNo}</TableCell>
                            <TableCell align="left">{row.driverType}</TableCell>
                            <TableCell align="center">
                              <MDBox ml={-1}>
                                <Link to={{ pathname: `/drivers/${row.email}` }}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    // component={Link}
                                    // to={`/drivers/${row.email}`}
                                  />
                                </Link>
                              </MDBox>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DriverDailySignIn;
