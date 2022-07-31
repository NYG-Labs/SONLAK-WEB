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
// import MDBadge from "components/MDBadge";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import { useNavigate, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import JSPDF from "jspdf";
import "jspdf-autotable";
// import MDBadge from "components/MDBadge";

import axios from "axios";

function ToolBoxSupervisorDate() {
  // const JSPDF = require("jspdf");
  // require("jspdf-autotable");
  const { supervisor, date } = useParams();
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toolBoxSupervisorDate, setToolBoxSupervisorDate] = useState([]);
  const baseURL = `/api/ToolBox/GetToolBoxBySupervisorDate/${supervisor}/${date}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getToolBoxSupervisorDate = () => {
    axios.get(baseURL, config).then((response) => {
      const tempToolBox = response.data;
      setToolBoxSupervisorDate(tempToolBox);
      setTitle(tempToolBox[0].title);
      setDescription(tempToolBox[0].description);
      // cons
    });
  };

  useEffect(() => {
    getToolBoxSupervisorDate();
  }, []);

  console.log("ALl ToolBox = ", toolBoxSupervisorDate, search);

  const filteredData = toolBoxSupervisorDate.filter((tsd) =>
    tsd.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();

  const columns = [
    { title: "FullName", field: "fullName" },
    { title: "Attendance", field: "attendance" },
    { title: "Timestamp", field: "createDate" },
  ];
  const downloadPDF = () => {
    console.log("toolBoxSupervisorDate = ", toolBoxSupervisorDate);
    const doc = new JSPDF();
    doc.setFontSize(11);
    doc.text(
      `ToolBox Discussion\nDate: ${date}\nSupervisor: ${supervisor}\nTitle: ${title}\nDesctiption: ${description}`,
      10,
      10
    );
    doc.autoTable({
      startY: 35,
      styles: { fontSize: 9 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: toolBoxSupervisorDate,
    });
    doc.save(`toolboxDiscussion_${date}_${supervisor}.pdf`);
  };

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
                  <Grid item xs={12} md={9.5}>
                    <MDTypography variant="h5" color="white" ml={4} mt={0.5}>
                      ToolBox Discussion - {date} - {supervisor}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <MDBox>
                      <MDButton
                        onClick={() => downloadPDF()}
                        // component={Link}
                        variant="gradient"
                        color="primary"
                        justifyContent="flex-end"
                        // to="/drivers/inactive-drivers"
                        fullWidth
                      >
                        Generate PDF
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                  <Grid item xs={12} md={12} ml={3} mb={1} mr={2} fontSize={16}>
                    <b>Title:</b> {title} <br />
                    <b>Description:</b> {description}
                  </Grid>
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
                          {/* <TableCell align="center">Date</TableCell> */}
                          {/* <TableCell align="center">Supervisor Email</TableCell> */}
                          <TableCell align="center">Full Name</TableCell>
                          <TableCell align="center">Title</TableCell>
                          <TableCell align="center">Date</TableCell>
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
                            {/* <TableCell align="center">{row.createDate.split("T")[0]}</TableCell> */}
                            <TableCell align="center">{row.fullName}</TableCell>
                            {/* <TableCell align="center" />
                            <TableCell align="center" /> */}
                            <TableCell align="center">{row.attendance}</TableCell>
                            <TableCell align="center">{row.createDate}</TableCell>
                            {/* <TableCell align="left">
                              <MDBox ml={-1}>
                                <MDBadge
                                  badgeContent="view"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                  component={Link}
                                  to={`/api/ToolBox/GetToolBoxBySupervisorDate/${
                                    row.supervisorEmail
                                  }/${row.createDate.split("T")[0]}`}
                                />
                              </MDBox>
                            </TableCell> */}
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

export default ToolBoxSupervisorDate;
