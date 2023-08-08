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
// import {  } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import { useNavigate, Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
// import MDBadge from "components/MDBadge";

import axios from "axios";

function AllToolBox() {
  const [search, setSearch] = useState("");
  const [allToolBox, setAllToolBox] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/ToolBox/GetToolBoxToAdminLast7days`;
  const baseURLFilter = `${process.env.REACT_APP_BACKEND_URL}/api/ToolBox/GetToolBoxlatestfilterbyDate/${fromDate}/${toDate}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllToolBox = () => {
    axios.get(baseURL, config).then((response) => {
      const tempToolBox = response.data;
      setAllToolBox(tempToolBox);
    });
  };

  useEffect(() => {
    getAllToolBox();
  }, []);

  async function filteToolBox() {
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
        setAllToolBox(response.data);
        setLoading(false);
      })
      .catch(() => {
        setAllToolBox([]);

        setLoading(false);
      });
  }

  //

  const filteredData = allToolBox.filter((allTB) =>
    allTB.supervisorEmail.toLowerCase().includes(search.toLowerCase())
  );

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
                  Toolbox discussions
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
                          onClick={() => filteToolBox()}
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
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Supervisor Email</TableCell>
                          <TableCell align="center">Supervisor FirstName</TableCell>
                          <TableCell align="center">Supervisor LastName</TableCell>
                          <TableCell align="center">Toolbox title</TableCell>
                          <TableCell align="center">Present count</TableCell>
                          <TableCell align="center">All count</TableCell>
                          {/* <TableCell align="center">No of Parcels</TableCell> */}
                          {/* <TableCell align="left">Vehicle No</TableCell>
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
                            <TableCell align="center">{row.createDate.split("T")[0]}</TableCell>
                            <TableCell align="center">{row.supervisorEmail}</TableCell>
                            <TableCell align="center">{row.supervisorEmail}</TableCell>
                            <TableCell align="center">{row.supervisorEmail}</TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.presentCount}</TableCell>
                            <TableCell align="center">{row.allCount}</TableCell>
                            <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="view"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to={`/toolbox-discussion/date-supervisor/${row.supervisorEmail}/${
                                    row.createDate.split("T")[0]
                                  }`}
                                />
                              </MDBox>
                            </TableCell>
                            {/* <TableCell align="left">{row.vehicleNo}</TableCell>
                            <TableCell align="left">{row.IncidentReportType}</TableCell> */}
                            {/* <TableCell align="center">
                              <MDBox ml={-1}>
                                <Link to={{ pathname: `/ToolBox/${row.email}` }}>
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

export default AllToolBox;
