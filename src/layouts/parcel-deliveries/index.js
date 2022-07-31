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
import { useNavigate } from "react-router-dom";

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

function AllParcelDeliveries() {
  const [search, setSearch] = useState("");
  const [allParcelDeliveries, setAllParcelDeliveries] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const baseURL = "/api/ParcelDeliveries/GetParcelDeliveriesLast7days";
  const baseURLFilter = `/api/ParcelDeliveries/GetParcelDeliveriesFilterbyDate/${fromDate}/${toDate}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllParcelDeliveries = () => {
    axios.get(baseURL, config).then((response) => {
      const tempParcelDeliveries = response.data;
      setAllParcelDeliveries(tempParcelDeliveries);
    });
  };

  useEffect(() => {
    getAllParcelDeliveries();
  }, []);

  // console.log("ALl ParcelDeliveries = ", allParcelDeliveries, search);

  const filteredData = allParcelDeliveries.filter(
    (ParcelDeliveries) =>
      ParcelDeliveries.driverEmail.toLowerCase().includes(search.toLowerCase()) ||
      ParcelDeliveries.driverFname.toLowerCase().includes(search.toLowerCase()) ||
      ParcelDeliveries.driverLname.toLowerCase().includes(search.toLowerCase())
  );

  async function filterParcelDeliveries() {
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
        setAllParcelDeliveries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAllParcelDeliveries([]);
        console.log(error);
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
                  Parcel Deliveries
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
                          onClick={() => filterParcelDeliveries()}
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
                          <TableCell align="center">Driver FirstName</TableCell>
                          <TableCell align="center">Driver LastName</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">No of Parcels</TableCell>
                          {/* <TableCell align="left">Vehicle No</TableCell>
                          <TableCell align="left">IncidentReport type</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
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
                            <TableCell align="center">{row.noParcels}</TableCell>
                            {/* <TableCell align="left">{row.vehicleNo}</TableCell>
                            <TableCell align="left">{row.IncidentReportType}</TableCell> */}
                            {/* <TableCell align="center">
                              <MDBox ml={-1}>
                                <Link to={{ pathname: `/ParcelDeliveries/${row.email}` }}>
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

export default AllParcelDeliveries;
