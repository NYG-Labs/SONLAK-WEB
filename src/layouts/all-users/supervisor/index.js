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
import { Link, useNavigate } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
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
// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import allSupervisorData from "./allSupervisorData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function AllSupervisors() {
  // const { columns, rows } = allSupervisorData();
  //   const { columns: pColumns, rows: pRows } = projectsTableData();
  const [search, setSearch] = useState("");
  const [allSupervisors, setAllSupervisors] = useState([]);
  const baseURL = "/api/Supervisors";

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllSupervisors = () => {
    axios.get(baseURL, config).then((response) => {
      const tempSupervisors = response.data;
      setAllSupervisors(tempSupervisors);
    });
  };

  useEffect(() => {
    getAllSupervisors();
  }, []);

  console.log("ALl Supervisors = ", allSupervisors, search);

  const filteredData = allSupervisors.filter((Supervisor) =>
    Supervisor.fname.toLowerCase().includes(search.toLowerCase())
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
                <Grid container spacing={3}>
                  <Grid item xs={12} md={9.5}>
                    <MDTypography variant="h4" color="white" ml={4} mt={0.5}>
                      All Supervisors
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <MDBox>
                      <MDButton
                        // onClick={() => sendSignInData()}
                        component={Link}
                        variant="gradient"
                        color="primary"
                        justifyContent="flex-end"
                        to="/supervisors/inactive-supervisors"
                        fullWidth
                      >
                        Inactive Supervisors
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
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
                          <TableCell>First name</TableCell>
                          <TableCell align="left">Middle name</TableCell>
                          <TableCell align="left">Lase Name</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Supervisor type</TableCell>
                          <TableCell align="left">Vista No</TableCell>
                          <TableCell align="left">Work status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key="s">
                            <TableCell component="th" scope="row">
                              {row.fname}
                            </TableCell>
                            <TableCell align="left">{row.mname}</TableCell>
                            <TableCell align="left">{row.lname}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.supervisorType}</TableCell>
                            <TableCell align="left">{row.visaNo}</TableCell>
                            <TableCell align="left">{row.workStatus}</TableCell>
                            <TableCell align="center">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="view"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to={`/supervisors/${row.email}`}
                                />
                              </MDBox>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/* <DataTable
                  table={{ columns, rows }}
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

export default AllSupervisors;
