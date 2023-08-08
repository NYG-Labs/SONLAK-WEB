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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import axios from "axios";

function AllIncidentReports() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [allIncidentReports, setAllIncidentReports] = useState([]);
  // const newDate = new Date();
  // const date = newDate.getDate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchError, setSearchError] = useState("");
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/IncidentReports/GetIncidentReportsLast7days`;
  const baseURLFilter = `${process.env.REACT_APP_BACKEND_URL}/api/IncidentReports/GetIncidentReportsFilterbyDate/${fromDate}/${toDate}`;
  //
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllIncidentReports = () => {
    axios.get(baseURL, config).then((response) => {
      const tempIncidentReports = response.data;
      setAllIncidentReports(tempIncidentReports);
      //
    });
  };

  useEffect(() => {
    getAllIncidentReports();
  }, []);

  //

  const filteredData = allIncidentReports.filter(
    (IncidentReport) =>
      IncidentReport.driverEmail.toLowerCase().includes(search.toLowerCase()) ||
      IncidentReport.driverFname.toLowerCase().includes(search.toLowerCase()) ||
      IncidentReport.driverLname.toLowerCase().includes(search.toLowerCase())
  );

  async function filterIncidentReports() {
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
        setAllIncidentReports(response.data);
        setLoading(false);
      })
      .catch(() => {
        setAllIncidentReports([]);
        setLoading(false);
      });
  }

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
                <MDTypography variant="h6" color="white">
                  Incident Reports
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid item xs={12} md={12} fullwidth justifyContent="flex-end">
                  <MDBox pr={2} pb={1} pl={2}>
                    <Grid container spacing={3}>
                      <br />
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
                          onClick={() => filterIncidentReports()}
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
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {/* <TableCell>First name</TableCell>
                          <TableCell align="left">Middle name</TableCell>
                          <TableCell align="left">Lase Name</TableCell> */}
                          <TableCell align="center">Driver Email</TableCell>
                          <TableCell align="center">Driver Firstname</TableCell>
                          <TableCell align="center">Driver Lastname</TableCell>
                          <TableCell align="center">Date</TableCell>
                          {/* <TableCell align="left">Vehicle type</TableCell>
                          <TableCell align="left">Vehicle No</TableCell>
                          <TableCell align="left">IncidentReport type</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length === 0 ? (
                          <TableRow key="s">
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                            <TableCell align="center">-</TableCell>
                          </TableRow>
                        ) : null}
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            {/* <TableCell component="th" scope="row">
                              {row.fname}
                            </TableCell>
                            <TableCell align="left">{row.mname}</TableCell>
                            <TableCell align="left">{row.lname}</TableCell> */}
                            <TableCell align="center">{row.driverEmail}</TableCell>
                            <TableCell align="center">{row.driverFname}</TableCell>
                            <TableCell align="center">{row.driverLname}</TableCell>
                            <TableCell align="center">{row.createDate.split("T")[0]}</TableCell>
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
                            <TableCell align="center">
                              <MDBadge
                                badgeContent="Sign Incident Report"
                                color="info"
                                variant="gradient"
                                size="sm"
                                component={Link}
                                to={`/Incident-reports/Sign-incident-reports/${row.id}`}
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
  );
}

export default AllIncidentReports;
