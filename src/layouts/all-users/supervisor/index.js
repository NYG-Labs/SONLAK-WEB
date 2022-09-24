import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
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

function AllSupervisors() {
  const [search, setSearch] = useState("");
  const [allSupervisors, setAllSupervisors] = useState([]);
  const baseURL = "https://sonlakserver.azurewebsites.net/api/Supervisors/GetSupervisorsActive";

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

  const filteredData = allSupervisors.filter(
    (Supervisor) =>
      (Supervisor.fname !== null &&
        Supervisor.fname.toLowerCase().includes(search.toLowerCase())) ||
      (Supervisor.mname !== null &&
        Supervisor.mname.toLowerCase().includes(search.toLowerCase())) ||
      (Supervisor.lname !== null &&
        Supervisor.lname.toLowerCase().includes(search.toLowerCase())) ||
      (Supervisor.email !== null &&
        Supervisor.email.toLowerCase().includes(search.toLowerCase())) ||
      (Supervisor.supervisorType !== null &&
        Supervisor.supervisorType.toLowerCase().includes(search.toLowerCase())) ||
      (Supervisor.visaNo !== null && Supervisor.visaNo.toLowerCase().includes(search.toLowerCase()))
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
