import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CardMedia from "@mui/material/CardMedia";
import Admin from "assets/images/admin.jpg";
import Driver from "assets/images/driver.jpg";
import Supervisor from "assets/images/supervisor.png";

function AllUsers() {
  const navigate = useNavigate();

  if (
    window.localStorage.getItem("token") === null ||
    (window.localStorage.getItem("roleKey") !== "SUPERADMIN" &&
      window.localStorage.getItem("roleKey") !== "OTHERADMIN")
  ) {
    navigate("/");
  }
  if (window.localStorage.getItem("roleKey") === "SUPERADMIN") {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MDBox mb={2}>
                <Card sx={{ height: "100%" }} component={Link} fullWidth to="/drivers">
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={3}
                    p={3}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Drivers
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      All the drivers in the system
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <CardMedia
                      src={Driver}
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={2}>
                <Card sx={{ height: "100%" }} component={Link} fullWidth to="/supervisors">
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={3}
                    p={3}
                    // mb={1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Supervisors
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      All the supervisors in the system
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <CardMedia
                      src={Supervisor}
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={2}>
                <Card sx={{ height: "100%" }} component={Link} fullWidth to="/admins">
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={3}
                    p={3}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Admins
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      All the admins in the system
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <CardMedia
                      src={Admin}
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    );
  }
  if (window.localStorage.getItem("roleKey") === "OTHERADMIN") {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MDBox mb={2}>
                <Card sx={{ height: "100%" }} component={Link} fullWidth to="/drivers">
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={3}
                    p={3}
                    // mb={1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Drivers
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      All the drivers in the system
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <CardMedia
                      src={Driver}
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={2}>
                <Card sx={{ height: "100%" }} component={Link} fullWidth to="/supervisors">
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={3}
                    p={3}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Supervisors
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      All the supervisors in the system
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <CardMedia
                      src={Supervisor}
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        margin: 0,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    );
  }
}

export default AllUsers;
