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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link, useNavigate } from "react-router-dom";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WHS from "assets/images/whs.jpg";
import SafetyDelivery from "assets/images/safety-delivery.jpg";
import VehicleSfety from "assets/images/vehicle-safety.jpg";
import CardMedia from "@mui/material/CardMedia";
// import Invoices from "layouts/billing/components/Invoices";

function AllGuidelines() {
  const navigate = useNavigate();

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
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <MDBox mb={2}>
              <Card
                sx={{ height: "100%" }}
                component={Link}
                fullWidth
                to="/guidelines/safety-delivery"
              >
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
                    Safe delivery procedure
                  </MDTypography>
                  {/* <MDTypography display="block" variant="button" color="white" my={1}>
                    Registration form to add a new driver
                  </MDTypography> */}
                </MDBox>
                <MDBox
                  pt={2}
                  px={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <MDTypography variant="h4" fontWeight="medium">
                    Drivers
                  </MDTypography> */}
                  {/* <MDButton variant="outlined" color="info" size="small">
                    view all
                  </MDButton> */}
                </MDBox>
                <MDBox p={2}>
                  {/* <Icon fontSize="medium" color="inherit">
                    weekend
                  </Icon> */}
                  {/* <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl"> */}
                  <CardMedia
                    src={SafetyDelivery}
                    component="img"
                    // title="test"
                    sx={{
                      maxWidth: "100%",
                      margin: 0,
                      // boxShadow: ({ boxShadows: { md } }) => md,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {/* </MDBox> */}
                  {/* <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    view all the admins
                  </MDBox> */}
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MDBox mb={2}>
              <Card
                sx={{ height: "100%" }}
                component={Link}
                fullWidth
                to="/guidelines/vehicle-safety"
              >
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
                    Vehicle safety
                  </MDTypography>
                  {/* <MDTypography display="block" variant="button" color="white" my={1}>
                    Registration form to add a new supervisor
                  </MDTypography> */}
                </MDBox>
                <MDBox
                  pt={2}
                  px={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <MDTypography variant="h4" fontWeight="medium">
                    Supervisors
                  </MDTypography> */}
                  {/* <MDButton variant="outlined" color="info" size="small">
                    view all
                  </MDButton> */}
                </MDBox>
                <MDBox p={2}>
                  {/* <Icon fontSize="medium" color="inherit">
                    weekend
                  </Icon> */}
                  {/* <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl"> */}
                  <CardMedia
                    src={VehicleSfety}
                    component="img"
                    // title="test"
                    sx={{
                      maxWidth: "100%",
                      margin: 0,
                      // boxShadow: ({ boxShadows: { md } }) => md,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {/* </MDBox> */}
                  {/* <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    view all the admins
                  </MDBox> */}
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MDBox mb={2}>
              <Card sx={{ height: "100%" }} component={Link} fullWidth to="/guidelines/whs-plan">
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
                    WHS Plan - SONLAK
                  </MDTypography>
                  {/* <MDTypography display="block" variant="button" color="white" my={1}>
                    Registration form to add a new admin
                  </MDTypography> */}
                </MDBox>
                <MDBox
                  pt={2}
                  px={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <MDTypography variant="h4" fontWeight="medium">
                    Admins
                  </MDTypography> */}
                  {/* <MDButton variant="outlined" color="info" size="small">
                    view all
                  </MDButton> */}
                </MDBox>
                <MDBox p={2}>
                  {/* <Icon fontSize="medium" color="inherit">
                    weekend
                  </Icon> */}
                  {/* <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl"> */}
                  <CardMedia
                    src={WHS}
                    component="img"
                    // title="test"
                    sx={{
                      maxWidth: "100%",
                      margin: 0,
                      // boxShadow: ({ boxShadows: { md } }) => md,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {/* </MDBox> */}
                  {/* <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    view all the admins
                  </MDBox> */}
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AllGuidelines;
