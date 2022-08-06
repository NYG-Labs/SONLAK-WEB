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
import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
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
// import Paper from "@material-ui/core/Paper";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import MDAvatar from "components/MDAvatar";
// import burceMars from "assets/images/bruce-mars.jpg";
import breakpoints from "assets/theme/base/breakpoints";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDBadge from "components/MDBadge";

function SupervisorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supervisor, setSupervisor] = useState([]);
  const baseURL = `/api/supervisors/${id}`;
  const ToolBoxURL = `/api/ToolBox/GetToolBoxBySupervisor/${id}`;
  const ComplaintsURL = `/api/Complaints/GetComplaintbySupervisor/${id}`;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [searchToolBox, setSearchToolBox] = useState("");
  const [searchComplaints, setSearchComplaints] = useState("");
  const [allToolBox, setAllToolBox] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  let tempSupervisorProfilePhoto = supervisor.profilePhoto;
  // console.log(supervisor);

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

  const filteredDataToolBox = allToolBox.filter((toolBox) =>
    toolBox.createDate.toLowerCase().includes(searchToolBox.toLowerCase())
  );

  const filteredComplaints = allComplaints.filter((complaints) =>
    complaints.createDate.toLowerCase().includes(searchComplaints.toLowerCase())
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
                {supervisor.workStatus} Supervisor
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
                {/* <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                /> */}
              </Tabs>
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
                  gender: supervisor.gender,
                  address: supervisor.address,
                  email: supervisor.email,
                  DOB: supervisor.dob,
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
                  VisaExpiry: supervisor.visaExpiry,
                  VisaNo: supervisor.visaNo,
                }}
                shadow={false}
              />
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

export default SupervisorProfile;
