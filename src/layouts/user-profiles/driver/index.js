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
import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import {  } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";
// import profilesListData from "layouts/profile/data/profilesListData";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDAvatar from "components/MDAvatar";
// import burceMars from "assets/images/bruce-mars.jpg";
import breakpoints from "assets/theme/base/breakpoints";
// import { Link } from "react-router-dom";
import MDBadge from "components/MDBadge";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";

// import MDButton from "components/MDButton";
// import MDBadge from "components/MDBadge";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import axios from "axios";
// import data from "layouts/tables/data/authorsTableData";

function DriverProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [driver, setDriver] = useState([]);
  const baseURL = `/api/drivers/${id}`;
  const deleteDriverURL = `/api/Drivers/${id}`;
  const ETAPerformanceURL = "/api/Etaperformances";
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [allETAPerformance, setAllETAPerformance] = useState([]);
  const [search, setSearch] = useState("");
  let tempDriverProfilePhoto = driver.profilePhoto;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllETAPerformance = () => {
    axios.get(ETAPerformanceURL, config).then((response) => {
      const tempETAPerformance = response.data;
      setAllETAPerformance(tempETAPerformance);
    });
  };

  const filteredData = allETAPerformance.filter((etaPerformance) =>
    etaPerformance.driverEmail.toLowerCase().includes(search.toLowerCase())
  );

  // const convertBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload(() => {
  //       resolve(fileReader.result);
  //     });

  //     fileReader.onerror((error) => {
  //       reject(error);
  //     });
  //   });

  const getTheDriver = () => {
    axios.get(baseURL, config).then((response) => {
      const tempDriver = response.data;
      setDriver(tempDriver);
    });
  };

  useEffect(() => {
    getTheDriver();
    getAllETAPerformance();
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
         The event listener that's calling the handleTabsOrientation function when resizing the window.
        */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // const base64 = convertBase64(driver.profilePhoto.files[0]);
    // console.log(base64);
    tempDriverProfilePhoto = driver.profilePhoto;

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  function deleteDriver() {
    axios.get(deleteDriverURL, config).then((response) => {
      console.log(response);
      navigate("/drivers");
      // const tempDriver = response.data;
      // setDriver(tempDriver);
    });
  }

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("id = ", id, "/n driver = ", driver.profilePhoto);

  // const reader = new FileReader();
  // reader.readAsDataURL(driver.profilePhoto);
  // reader.onloadend = function () {
  //   const base64data = reader.result;
  //   console.log(base64data);
  // };
  if (
    window.localStorage.getItem("token") === null ||
    window.localStorage.getItem("roleKey") !== "SUPERADMIN"
  ) {
    navigate("/");
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox />
      <Header>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={`${tempDriverProfilePhoto}?${Date.now()}`}
              alt="profile-image"
              size="xxl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {driver.fname} {driver.mname} {driver.lname}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {driver.workStatus} DRIVER | Supervisor - {driver.supervisorEmail}
              </MDTypography>
              {/* <IconButton size="large">
                <ArrowDropDownIcon />
              </IconButton> */}
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Profile"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  component={Link}
                  to={`/drivers/${id}/edit-driver`}
                  label="Edit"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      edit
                    </Icon>
                  }
                />
                <Tab
                  label="Delete"
                  onClick={handleClickOpen}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      delete
                    </Icon>
                  }
                />
              </Tabs>
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
                  <Button onClick={() => deleteDriver()} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </AppBar>
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="profile information"
                info={{
                  gender: driver.gender,
                  address: driver.address,
                  email: driver.email,
                  DOB: driver.dob,
                  ProfilePicture: (
                    <a href={driver.profilePhoto}>
                      {/* <Link to={{ pathname: driver.ausPostScan }}> */}
                      <MDBadge
                        badgeContent="view"
                        color="success"
                        variant="gradient"
                        size="sm"
                        // component={Link}
                        // to={`/drivers/${row.email}`}
                      />
                      {/* </Link> */}
                    </a>
                  ),
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="AUS Post Details"
                info={{
                  AusPostScan: (
                    <a href={driver.ausPostScan}>
                      {/* <Link to={{ pathname: driver.ausPostScan }}> */}
                      <MDBadge
                        badgeContent="view"
                        color="success"
                        variant="gradient"
                        size="sm"
                        // component={Link}
                        // to={`/drivers/${row.email}`}
                      />
                      {/* </Link> */}
                    </a>
                  ),
                  AusPostID: driver.ausPostId,
                  AusPostExpp: driver.ausPostExpiry,
                  // DOB: driver.dob,
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Licence Details"
                description=""
                info={{
                  LicenceScan: (
                    <a href={driver.licenceScan}>
                      {/* <Link to={{ pathname: driver.ausPostScan }}> */}
                      <MDBadge
                        badgeContent="view"
                        color="success"
                        variant="gradient"
                        size="sm"
                        // component={Link}
                        // to={`/drivers/${row.email}`}
                      />
                      {/* </Link> */}
                    </a>
                  ),
                  LicenceID: driver.licenceId,
                  LicenceEXP: driver.licenceExpiry,
                  // DOB: driver.dob,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="Vehicle Details"
                info={{
                  VehicalType: driver.vehicalType,
                  VehicleNo: driver.vehicleNo,
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="Visa Details"
                info={{
                  VisaScan: (
                    <a href={driver.licenceScan}>
                      {/* <Link to={{ pathname: driver.ausPostScan }}> */}
                      <MDBadge
                        badgeContent="view"
                        color="success"
                        variant="gradient"
                        size="sm"
                        // component={Link}
                        // to={`/drivers/${row.email}`}
                      />
                      {/* </Link> */}
                    </a>
                  ),
                  VisaExpiry: driver.visaExpiry,
                  VisaNo: driver.visaNo,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox pt={2} px={2} lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="medium">
                    ETA Performance
                  </MDTypography>
                  <MDBox mb={1}>
                    <MDTypography variant="button" color="text">
                      Driver ETA Performance
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid container spacing={3}> */}
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
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Users</TableCell>
                            <TableCell align="center">Route</TableCell>
                            <TableCell align="center">DeviceID</TableCell>
                            <TableCell align="center">OnTime Percentage</TableCell>
                            <TableCell align="left"> </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredData.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center" component="th" scope="row">
                                {row.driverEmail}
                              </TableCell>
                              <TableCell align="center">{row.route}</TableCell>
                              <TableCell align="center">{row.deviceId}</TableCell>
                              <TableCell align="center">{row.onTimePresentage}%</TableCell>
                              <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to="/ETA-performance/ETA-performance"
                                  />
                                </MDBox>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {/* </Grid> */}
                  {/* <ul>
                  {filteredData.map((item) => (
                    <li>{item.route.props.description}</li>
                  ))}
                </ul> */}
                  {/* <DataTable
                  table={tableInstance}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default DriverProfile;
