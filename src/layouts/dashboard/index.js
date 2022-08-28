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

/* eslint-disable no-plusplus */

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
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
// import Paper from "@material-ui/core/Paper";
import MDBadge from "components/MDBadge";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
// import Basic from "layouts/authentication/sign-in";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  const navigate = useNavigate();
  const [weekDaysData, setWeekDaysData] = useState([]);
  const [dayWeekMonth, setDayWeekMonth] = useState([]);
  const [mostFiveDeliveries, setMostFiveDeliveries] = useState([]);
  const [latestIncidentReports, setLatestIncidentReports] = useState([]);
  const [latestComplaints, setLatestComplaints] = useState([]);
  const [complaintStats, setComplaintStatsURL] = useState([]);
  // const tempDays = [];
  // const tempParcelCount = [];
  // const [days, setDays] = useState([]);
  // const [parcelCount, setParcelCount] = useState([]);
  // const data = {
  //   labels: days,
  //   datasets: { label: "Sales", data: parcelCount },
  // };
  const weekdaysDataURL = "/api/ParcelDeliveries/GetParcelDeliveryCountforAdmin";
  const dayWeekMonthURL = "/api/ParcelDeliveries/GetParcelDeliveryStatforAdmin";
  const mostFiveDeliveriesURL = "/api/ParcelDeliveries/GetMost5ParcelDeliveryforMonth";
  const latestIncidentReportsURL = "/api/IncidentReports/GetIncidentReportsLatest3";
  const latestComplaintsURL = "/api/Complaints/GetComplaintLatest4";
  const complaintStatsURL = "/api/Complaints/GetComplaintStatAdmin";

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
      // weekDaysData.forEach((e) => {
      //   tempDays.push(e.dayName);
      //   tempParcelCount.push(e.noParcels);
      // });
    });
    // setDays(tempDays);
    // setParcelCount(tempParcelCount);
    // console.log("DATA = ", data);
  };

  const getDayWeekMonthData = () => {
    axios.get(dayWeekMonthURL, config).then((response) => {
      const tempDayWeekMonth = response.data;
      setDayWeekMonth(tempDayWeekMonth);
      // console.log("dayweekmonth = ", dayWeekMonth);
    });
  };

  const getMostFiveDeliveries = () => {
    axios.get(mostFiveDeliveriesURL, config).then((response) => {
      const tempMostFiveDeliveries = response.data;
      setMostFiveDeliveries(tempMostFiveDeliveries);
      // console.log("most 5 deliveries = ", tempMostFiveDeliveries);
    });
  };

  const getLatestIncidentReports = () => {
    axios.get(latestIncidentReportsURL, config).then((response) => {
      const tempLatestIncidentReports = response.data;
      setLatestIncidentReports(tempLatestIncidentReports);
      // console.log("Latest Incident Reports = ", tempLatestIncidentReports, latestIncidentReports);
    });
  };

  const getLatestComplaints = () => {
    axios.get(latestComplaintsURL, config).then((response) => {
      const tempLatestComplaints = response.data;
      setLatestComplaints(tempLatestComplaints);
      // console.log("Latest Complaints = ", tempLatestComplaints, latestComplaints);
    });
  };

  const getComplaintsSats = () => {
    axios.get(complaintStatsURL, config).then((response) => {
      const tempComplaintsStats = response.data;
      setComplaintStatsURL(tempComplaintsStats);
      // console.log("Latest Complaints = ", tempComplaintsStats, complaintStats);
    });
  };

  useEffect(() => {
    getWeekDaysData();
    getDayWeekMonthData();
    getMostFiveDeliveries();
    getLatestIncidentReports();
    getLatestComplaints();
    getComplaintsSats();
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
        {/* <Grid container spacing={3}>
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
        </Grid> */}
        {/* sample template changes */}

        <MDTypography variant="h4" color="inherit">
          Complaints Summary
        </MDTypography>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
              <Card md={2}>
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
                    Latest 3 Complaints
                  </MDTypography>
                </MDBox>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Driver Name</TableCell>
                        <TableCell align="center">Driver Email</TableCell>
                        <TableCell align="center">Complaint address</TableCell>
                        <TableCell align="center">Complaint type</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Created date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {latestComplaints.length === 0 ? (
                        <TableRow key="s">
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                        </TableRow>
                      ) : null}
                      {latestComplaints.map((row) => (
                        <TableRow key="s">
                          <TableCell align="center">{row.driverName}</TableCell>
                          <TableCell align="center">{row.driverEmail}</TableCell>
                          <TableCell align="center">{row.complaintAddress}</TableCell>
                          <TableCell align="center">{row.complainType}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center">{row.createDate}</TableCell>
                          {/* <TableCell align="center">
                            <a href={row.pdfUrl}>
                              <MDBadge
                                badgeContent="view"
                                color="success"
                                variant="gradient"
                                size="sm"
                              />
                            </a>
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={2.0} md={6}>
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
                      Overall stats
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={1} mb={2} display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox mr={2} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        functions
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Total
                      </MDTypography>
                      <MDTypography variant="h6">{complaintStats.total}</MDTypography>
                    </MDBox>
                    <MDBox mr={2} ml={2} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        pending
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Pending
                      </MDTypography>
                      <MDTypography variant="h6">{complaintStats.pending}</MDTypography>
                    </MDBox>
                    <MDBox mr={2} ml={2} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        hourglass_bottom
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Waiting
                      </MDTypography>
                      <MDTypography variant="h6">{complaintStats.waiting}</MDTypography>
                    </MDBox>
                    <MDBox ml={2} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        done
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Resolved
                      </MDTypography>
                      <MDTypography variant="h6">{complaintStats.resolved}</MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDTypography mt={1} variant="h4" color="inherit">
          Incident Reports Summary
        </MDTypography>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
              <Card md={2}>
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
                    Latest 3 incident reports
                  </MDTypography>
                </MDBox>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Driver Name</TableCell>
                        <TableCell align="center">Driver Email</TableCell>
                        <TableCell align="center">Driver address</TableCell>
                        <TableCell align="center">Created date</TableCell>
                        <TableCell align="center" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {latestIncidentReports.length === 0 ? (
                        <TableRow key="s">
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                        </TableRow>
                      ) : null}
                      {latestIncidentReports.map((row) => (
                        <TableRow key="s">
                          <TableCell align="center">
                            {row.driverFname} {row.driverLname}
                          </TableCell>
                          <TableCell align="center">{row.driverEmail}</TableCell>
                          <TableCell align="center">{row.address}</TableCell>
                          <TableCell align="center">{row.createDate}</TableCell>
                          <TableCell align="center">
                            <a href={row.pdfUrl}>
                              <MDBadge
                                badgeContent="view"
                                color="success"
                                variant="gradient"
                                size="sm"
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>

        <MDTypography mt={2} variant="h4" color="inherit">
          Parcel Deliveries Summary
        </MDTypography>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Parcel delivery count"
                  description="Last 7 days summary"
                  date="campaign sent 2 days ago"
                  chart={data}
                />
              </MDBox>
            </Grid> */}
            <Grid item xs={12} mt={0.5} md={6} lg={3}>
              <MDBox mb={2.0}>
                <Card md={2}>
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
                      Parcel count for last week
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={-0.2} display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="center" lineHeight={1.0}>
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Day</TableCell>
                              <TableCell align="center">Parcel Count</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {weekDaysData.length === 0 ? (
                              <TableRow key="s">
                                <TableCell align="center">-</TableCell>
                                <TableCell align="center">-</TableCell>
                                <TableCell align="center">-</TableCell>
                              </TableRow>
                            ) : null}
                            {weekDaysData.map((row) => (
                              <TableRow key="s">
                                <TableCell align="center">{row.dayName}</TableCell>
                                <TableCell align="center">{row.noParcels}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>

            <Grid item xs={12} mt={0.5} md={6} lg={4}>
              <MDBox mb={2.0} md={6}>
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
                      Yesterday - Weekly - Monthly
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={1} mb={2} display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox mr={3} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        fast_rewind
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Yesterday
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.yesterday}</MDTypography>
                    </MDBox>
                    <MDBox mr={3} ml={3} textAlign="center" lineHeight={1.0}>
                      <Icon fontSize="small" color="inherit">
                        date_range
                      </Icon>
                      <MDTypography variant="h6" color="inherit">
                        Last week
                      </MDTypography>
                      <MDTypography variant="h6">{dayWeekMonth.weekly}</MDTypography>
                    </MDBox>
                    <MDBox ml={3} textAlign="center" lineHeight={1.0}>
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

            <Grid item xs={12} mt={0.5} md={6} lg={5}>
              <MDBox mb={2.0}>
                <Card md={2}>
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
                      Top 5 drivers for the month with parcel count
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={-0.2} display="flex" justifyContent="center" pt={1} px={2}>
                    <MDBox textAlign="left" lineHeight={1.0}>
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Driver Name</TableCell>
                              <TableCell align="center">Driver Email</TableCell>
                              <TableCell align="center">No of Parcels</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {mostFiveDeliveries.length === 0 ? (
                              <TableRow key="s">
                                <TableCell align="center">-</TableCell>
                                <TableCell align="center">-</TableCell>
                                <TableCell align="center">-</TableCell>
                              </TableRow>
                            ) : null}
                            {mostFiveDeliveries.map((row) => (
                              <TableRow key="s">
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.noParcels}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* <MDTypography variant="h4" color="inherit">
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
        </MDBox> */}

        {/* <MDBox mt={4.5}>
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
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
