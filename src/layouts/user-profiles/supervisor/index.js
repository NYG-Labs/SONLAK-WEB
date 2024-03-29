import * as React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";

import Header from "layouts/profile/components/Header";

import MDBadge from "components/MDBadge";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function SupervisorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supervisor, setSupervisor] = useState([]);
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/supervisors/${id}`;
  const ToolBoxURL = `${process.env.REACT_APP_BACKEND_URL}/api/ToolBox/GetToolBoxBySupervisor/${id}`;
  const ComplaintsURL = `${process.env.REACT_APP_BACKEND_URL}/api/Complaints/GetComplaintbySupervisor/${id}`;
  const deleteSupervisorURL = `${process.env.REACT_APP_BACKEND_URL}/api/Supervisors/${id}`;
  const driversURL = `${process.env.REACT_APP_BACKEND_URL}/api/Drivers/GetSupervisorsDriversList/${id}`;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [searchToolBox, setSearchToolBox] = useState("");
  const [searchComplaints, setSearchComplaints] = useState("");
  const [searchDrivers, setSearchDrivers] = useState("");
  const [allToolBox, setAllToolBox] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [alldrivers, setDrivers] = useState([]);
  let tempSupervisorProfilePhoto = supervisor.profilePhoto;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllToolBox = () => {
    axios.get(ToolBoxURL, config).then((response) => {
      const tempToolBox = response.data;
      setAllToolBox(tempToolBox);
    });
  };

  const getAllComplaints = () => {
    axios.get(ComplaintsURL, config).then((response) => {
      const tempComplaints = response.data;
      setAllComplaints(tempComplaints);
    });
  };

  const getDrivers = () => {
    axios.get(driversURL, config).then((response) => {
      const tempDrivers = response.data;
      setDrivers(tempDrivers);
    });
  };

  const filteredDataToolBox = allToolBox.filter((toolBox) =>
    toolBox.createDate.toLowerCase().includes(searchToolBox.toLowerCase())
  );

  const filteredComplaints = allComplaints.filter((complaints) =>
    complaints.createDate.toLowerCase().includes(searchComplaints.toLowerCase())
  );

  const filteredDrivers = alldrivers.filter((driver) =>
    driver.fname.toLowerCase().includes(searchDrivers.toLowerCase())
  );
  const getTheSupervisor = () => {
    axios.get(baseURL, config).then((response) => {
      const tempSupervisor = response.data;
      setSupervisor(tempSupervisor);
    });
  };

  useEffect(() => {
    getAllToolBox();
    getAllComplaints();
    getDrivers();

    getTheSupervisor();
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

    tempSupervisorProfilePhoto = supervisor.profilePhoto;

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteSupervisor() {
    axios.delete(deleteSupervisorURL, config).then(() => {
      navigate("/supervisors");
      // const tempDriver = response.data;
      // setDriver(tempDriver);
    });
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
      <DashboardNavbar />
      <MDBox />
      <Header>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={`${tempSupervisorProfilePhoto}?${Date.now()}`}
              alt="profile-image"
              size="xxl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {supervisor.fname} {supervisor.mname} {supervisor.lname}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {supervisor.workStatus} supervisor
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  component={Link}
                  to={`/supervisors/${id}/edit-supervisor`}
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
                  <Button onClick={() => deleteSupervisor()} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </AppBar>
          </Grid>
        </Grid>

        <MDBox mt={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="profile information"
                info={{
                  ResidentialStatus: supervisor.supervisorType,
                  address: supervisor.address,
                  email: supervisor.email,
                  DOB: supervisor.dob === "0001-01-01T00:00:00" ? "" : supervisor.dob,
                  PhoneNumber: supervisor.phoneNo,
                  ProfilePicture: (
                    <a href={supervisor.profilePhoto}>
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
            {supervisor.supervisorType !== "Citizen" ? (
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ mx: 0 }} />
                <ProfileInfoCard
                  title="Visa Details"
                  info={{
                    VisaScan: (
                      <a href={supervisor.visaScan}>
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
                    VisaExpiry:
                      supervisor.visaExpiry === "0001-01-01T00:00:00" ? "" : supervisor.visaExpiry,
                    VisaNo: supervisor.visaNo,
                  }}
                  shadow={false}
                />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1} mt={3} id="ETA">
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
                  <MDTypography variant="h6" color="white">
                    ToolBox discussion
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid container spacing={3}> */}
                  <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <MDInput
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setSearchToolBox(e.target.value)}
                        label="Search here"
                        type="date"
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
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">All count</TableCell>
                            <TableCell align="center">Present count</TableCell>
                            {/* <TableCell align="center">OnTime</TableCell>
                            <TableCell align="center">Not Delivered</TableCell>
                            <TableCell align="center">On Time %</TableCell> */}
                            <TableCell align="left"> </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredDataToolBox.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredDataToolBox.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.createDate.split("T")[0]}</TableCell>
                              <TableCell align="center">{row.allCount}</TableCell>
                              <TableCell align="center">{row.presentCount}</TableCell>
                              {/* <TableCell align="center">{row.onTime}</TableCell>
                              <TableCell align="center">{row.notDelivered}</TableCell> */}
                              {/* <TableCell align="center">{row.onTimePresentage}%</TableCell> */}
                              <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to={`/toolbox-discussion/date-supervisor/${id}/${
                                      row.createDate.split("T")[0]
                                    }`}
                                  />
                                </MDBox>
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

        <MDBox pt={1} pb={1} mt={3} id="ETA">
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
                  <MDTypography variant="h6" color="white">
                    Complaints
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid container spacing={3}> */}
                  <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <MDInput
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setSearchComplaints(e.target.value)}
                        label="Search here"
                        type="date"
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
                            <TableCell align="left">Created date</TableCell>
                            <TableCell align="left">Driver Email</TableCell>
                            <TableCell align="left">status</TableCell>
                            <TableCell align="left">Complaint type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredComplaints.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredComplaints.map((row) => (
                            <TableRow key="s">
                              <TableCell align="left">{row.createDate}</TableCell>
                              <TableCell align="left">{row.driverEmail}</TableCell>
                              <TableCell align="left">{row.status}</TableCell>
                              <TableCell align="left">{row.complainType}</TableCell>
                              <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to={`/All-Complaints/Complaint/${row.id}`}
                                  />
                                </MDBox>
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

        <MDBox pt={1} pb={1} mt={3} id="ETA">
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
                  <MDTypography variant="h6" color="white">
                    Drivers
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid container spacing={3}> */}
                  <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <MDInput
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setSearchDrivers(e.target.value)}
                        label="Search here"
                        type="Search"
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
                            <TableCell align="center">Driver FirstName</TableCell>
                            <TableCell align="center">Driver LastName</TableCell>
                            <TableCell align="center">Driver Email</TableCell>
                            {/* <TableCell align="center">OnTime</TableCell>
                            <TableCell align="center">Not Delivered</TableCell>
                            <TableCell align="center">On Time %</TableCell> */}
                            <TableCell align="left"> </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredDrivers.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              {/* <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell> */}
                            </TableRow>
                          ) : null}
                          {filteredDrivers.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.fname}</TableCell>
                              <TableCell align="center">{row.lname}</TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              {/* <TableCell align="center">{row.onTime}</TableCell>
                              <TableCell align="center">{row.notDelivered}</TableCell> */}
                              {/* <TableCell align="center">{row.onTimePresentage}%</TableCell> */}
                              <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to={`/drivers/${row.email}`}
                                  />
                                </MDBox>
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

        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
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
        </MDBox> */}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default SupervisorProfile;
