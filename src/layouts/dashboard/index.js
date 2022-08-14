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
import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
// import Basic from "layouts/authentication/sign-in";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const navigate = useNavigate();
  const [weekDaysData, setWeekDaysData] = useState([]);
  const [dayWeekMonth, setDayWeekMonth] = useState([]);
  const [mostFiveDeliveries, setMostFiveDeliveries] = useState([]);
  const weekdaysDataURL = "/api/ParcelDeliveries/GetParcelDeliveryCountforAdmin";
  const dayWeekMonthURL = "/api/ParcelDeliveries/GetParcelDeliveryStatforAdmin";
  const mostFiveDeliveriesURL = "/api/ToolBox/GetToolBoxToAdminLast7days";

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getWeekDaysData = () => {
    axios.get(weekdaysDataURL, config).then((response) => {
      const tempweekDaysData = response.data;
      setWeekDaysData(tempweekDaysData);
      console.log("week = ", weekDaysData);
    });
  };

  const getDayWeekMonthData = () => {
    axios.get(dayWeekMonthURL, config).then((response) => {
      const tempDayWeekMonth = response.data;
      setDayWeekMonth(tempDayWeekMonth);
      console.log("dayweekmonth = ", dayWeekMonth);
    });
  };

  const getMostFiveDeliveries = () => {
    axios.get(mostFiveDeliveriesURL, config).then((response) => {
      const tempMostFiveDeliveries = response.data;
      setMostFiveDeliveries(tempMostFiveDeliveries);
      console.log("most 5 deliveries = ", tempMostFiveDeliveries, mostFiveDeliveries);
    });
  };

  useEffect(() => {
    getWeekDaysData();
    getDayWeekMonthData();
    getMostFiveDeliveries();
  }, []);

  // console.log(window.localStorage.getItem("roleKey"));
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
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* sample template changes */}

        <MDTypography variant="h4" color="inherit">
          Parcel Deliveries Summary
        </MDTypography>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} mt={0.5} md={6} lg={2}>
              <MDBox mb={2.0}>
                <Card>
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        fast_rewind
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Yesterday
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.yesterday}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        date_range
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last week
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.weekly}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        today
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last month
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.monthly}</MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>

            <Grid item xs={12} mt={0.5} md={6} lg={2}>
              <MDBox mb={2.0}>
                <Card>
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        fast_rewind
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Yesterday
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.yesterday}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        date_range
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last week
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.weekly}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        today
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last month
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.monthly}</MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>

            <Grid item xs={12} mt={0.5} md={6} lg={4}>
              <MDBox mb={2.0}>
                <Card>
                  <MDTypography mt={2} ml={2} variant="h5" color="inherit">
                    Top 5 parcel deliveries for the month
                  </MDTypography>
                  <MDBox ml={2} display="flex" justifyContent="left" pt={1} px={2}>
                    <MDBox textAlign="left" lineHeight={1.0}>
                      {/* {mostFiveDeliveries.length !== 0
                        ? mostFiveDeliveries.map((row) => ( */}
                      <MDTypography variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      <MDTypography variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      <MDTypography variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      <MDTypography variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      <MDTypography mb={1} variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      {/* ))
                         : null} */}
                    </MDBox>
                  </MDBox>
                  {/* <Divider /> */}
                </Card>
              </MDBox>

              <MDBox mt={1} mb={2.0}>
                <Card>
                  <MDTypography mt={2} ml={2} variant="h5" color="inherit">
                    Top 5 parcel deliveries for the month
                  </MDTypography>
                  <MDBox ml={2} display="flex" justifyContent="left" pt={1} px={2}>
                    <MDBox textAlign="left" lineHeight={1.0}>
                      <MDTypography variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                      <MDTypography mb={1} variant="h6" color="inherit">
                        Yasas Ekanayaka
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  {/* <Divider /> */}
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDTypography variant="h4" color="inherit">
          Parcel Deliveries Summary
        </MDTypography>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <MDBox mb={2.0}>
                <Card>
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.25}>
                      <Icon fontSize="small" color="inherit">
                        fast_rewind
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Yesterday
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.yesterday}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.25}>
                      <Icon fontSize="small" color="inherit">
                        date_range
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last week
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.weekly}</MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider />
                  <MDBox display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.25}>
                      <Icon fontSize="small" color="inherit">
                        today
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last month
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.monthly}</MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updat 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
