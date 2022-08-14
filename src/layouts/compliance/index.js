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
import MDInput from "components/MDInput";

import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useState,  } from "react";
// import { useTable } from "react-table";
import MDBadge from "components/MDBadge";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import MDBadge from "components/MDBadge";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
// import allETAPerformanceData from "./allETAPerformanceData";

function AllCompliance() {
  const navigate = useNavigate();
  // const { rows } = allComplianceData();
  const [search, setSearch] = useState("");
  const [allCompliance, setAllCompliance] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseURL = `/api/Compliances/GetComplianceLast7days`;
  const baseURLFilter = `/api/Compliances/GetCompliancesfilterbyDate/${fromDate}/${toDate}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllCompliance = () => {
    axios.get(baseURL, config).then((response) => {
      const tempCompliance = response.data;
      setAllCompliance(tempCompliance);
      console.log(tempCompliance);
    });
  };

  useEffect(() => {
    getAllCompliance();
  }, []);

  const filteredData = allCompliance.filter((Compliance) =>
    Compliance.driverEmail.toLowerCase().includes(search.toLowerCase())
  );

  async function filterCompliance() {
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
        setAllCompliance(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAllCompliance([]);
        console.log(error);
        setLoading(false);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`/api/Compliances/${id}`, config)
      .then((response) => {
        console.log(response);
        window.alert("Compliance deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert("An unexpected error occuered! please try again");
        window.location.reload();
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
                  <Grid item xs={12} md={8.5}>
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      All Compliance
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDBox>
                      <MDButton
                        // onClick={() => sendSignInData()}
                        component={Link}
                        variant="gradient"
                        color="light"
                        justifyContent="flex-end"
                        fullWidth
                        to="/compliance/add-compliance"
                      >
                        Add a new compliance
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
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
                          onClick={() => filterCompliance()}
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
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Driver Email</TableCell>
                          <TableCell align="center">Article ID</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Accept</TableCell>
                          <TableCell align="center">Deliver</TableCell>
                          <TableCell align="center">Attempt to Deliver</TableCell>
                          <TableCell align="center">Transfer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell align="center">{row.driverEmail}</TableCell>
                            <TableCell align="center">{row.articleId}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.accept}</TableCell>
                            <TableCell align="center">{row.deliver}</TableCell>
                            <TableCell align="center">{row.attemptToDeliver}</TableCell>
                            <TableCell align="center">{row.transfer}</TableCell>
                            <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="Edit"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to={`/compliance/edit-compliance/${row.id}`}
                                />
                              </MDBox>
                            </TableCell>
                            <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="Delete"
                                  color="error"
                                  variant="gradient"
                                  size="sm"
                                  onClick={() => handleDelete(row.id)}
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
      <Footer />
    </DashboardLayout>
  );
}

export default AllCompliance;
