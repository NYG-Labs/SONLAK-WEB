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
// import MDInput from "components/MDInput";

// import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useState,  } from "react";
// import { useTable } from "react-table";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
// import allETAPerformanceData from "./allETAPerformanceData";

function SingleComplaints() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const { rows } = SingleComplaintsData();
  //   const [search, setSearch] = useState("");
  const [singleComplaints, setSingleComplaints] = useState([]);
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/Complaints/${id}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getSingleComplaints = () => {
    axios.get(baseURL, config).then((response) => {
      const tempComplaints = response.data;
      setSingleComplaints(tempComplaints);
    });
  };

  useEffect(() => {
    getSingleComplaints();
  }, []);

  if (
    window.localStorage.getItem("token") === null ||
    (window.localStorage.getItem("roleKey") !== "SUPERADMIN" &&
      window.localStorage.getItem("roleKey") !== "OTHERADMIN")
  ) {
    navigate("/");
  }
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
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
                      Complaint - {singleComplaints.complainType}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Created Date</TableCell>
                          <TableCell align="left">{singleComplaints.createDate}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Updated Date</TableCell>
                          <TableCell align="left">{singleComplaints.updatedDate}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Driver Email</TableCell>
                          <TableCell align="left">{singleComplaints.driverEmail}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Complaint address</TableCell>
                          <TableCell align="left">{singleComplaints.complaintAddress}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Complaint type</TableCell>
                          <TableCell align="left">{singleComplaints.complainType}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">{singleComplaints.status}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Safe drop image URL</TableCell>
                          <TableCell align="left">{singleComplaints.safeDropImageUrl}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Supervisor Email</TableCell>
                          <TableCell align="left">{singleComplaints.supervisorEmail}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Supervisor comment</TableCell>
                          <TableCell align="left">{singleComplaints.supervisorComment}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Driver Remarks</TableCell>
                          <TableCell align="left">{singleComplaints.driverRemark}</TableCell>
                        </TableRow>
                      </TableHead>
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

export default SingleComplaints;
