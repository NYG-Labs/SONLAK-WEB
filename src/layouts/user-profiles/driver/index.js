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
import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
// import {  } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";
// import profilesListData from "layouts/profile/data/profilesListData";
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import homeDecor4 from "assets/images/home-decor-4.jpeg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import MDAvatar from "components/MDAvatar";
// import burceMars from "assets/images/bruce-mars.jpg";
import breakpoints from "assets/theme/base/breakpoints";
// import { Link } from "react-router-dom";
import MDBadge from "components/MDBadge";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import JSPDF from "jspdf";
import "jspdf-autotable";

// import MDButton from "components/MDButton";
// import MDBadge from "components/MDBadge";
// import { IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import axios from "axios";
// import data from "layouts/tables/data/authorsTableData";

function DriverProfile() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [driver, setDriver] = useState([]);
  const [ausPostExpDate, setAusPostExpDate] = useState("");
  const [dob, setDOB] = useState("");
  const [licenseExp, setLicenseExp] = useState("");
  const [visaExp, setVisaExp] = useState("");
  const [etaStartdate, setETAStartDate] = useState("");
  const [etaEnddate, setETAEndDate] = useState("");
  const [parcelStartdate, setParcelStartdate] = useState("");
  const [parcelEnddate, setParcelEnddate] = useState("");
  const [incidentStartdate, setIncidentStartdate] = useState("");
  const [incidentEnddate, setIncidentEnddate] = useState("");
  const [toolStartDate, setToolStartDate] = useState("");
  const [toolEndDate, setToolEndDate] = useState("");
  const [vehicleStartDate, setVehicleStartDate] = useState("");
  const [vehicleEndDate, setVehicleEndDate] = useState("");
  const [signInStartDate, setSignInStartDate] = useState("");
  const [signInEndDate, setSignInEndDate] = useState("");
  const [complaintsStartDate, setComplaintsStartDate] = useState("");
  const [complaintsEndDate, setComplaintsEndDate] = useState("");
  const [complianceStartDate, setComplianceStartDate] = useState("");
  const [complianceEndDate, setComplianceEndDate] = useState("");
  const baseURL = `/api/drivers/${email}`;
  const deleteDriverURL = `/api/Drivers/${email}`;
  const ETAPerformanceURL = `/api/Etaperformances/GetEtaperformancelatest7/${email}`;
  const IncidentReportURL = `/api/IncidentReports/GetIncidentReportlatest7/${email}`;
  const ParcelDeliveryURL = `/api/ParcelDeliveries/GetParcelDeliverylatest7/${email}`;
  const vehicleCheckURL = `/api/VehicleChecks/GetVehicleChecklatest7/${email}`;
  const toolBoxURL = `/api/ToolBox/GetToolBoxbyDriverlatest7/${email}`;
  const signInURL = `/api/DriverSignIn/GetDriverSignInbyDriverLast7days/${email}`;
  const complaintsURL = `/api/Complaints/GetComplaintbyDriverLast7days/${email}`;
  const complianceURL = `/api/Compliances/GetCompliancebyDriverLast7days/${email}`;
  const filterETAURL = `/api/Etaperformances/GetEtaperformancebyDriverFilterbyDate/${email}/${etaStartdate}/${etaEnddate}`;
  const filterParcelDeliveryURL = `/api/ParcelDeliveries/GetParcelDeliverybyDriverDate/${email}/${parcelStartdate}/${parcelEnddate}`;
  const filterIncidentReportURL = `/api/IncidentReports/GetIncidentReportbyDriverFilterbyDate/${email}/${incidentStartdate}/${incidentEnddate}`;
  const filterToolBoxURL = `/api/ToolBox/GetToolBoxbyDriverFilterbyDate/${email}/${toolStartDate}/${toolEndDate}`;
  const filterVehicleCheckURL = `/api/VehicleChecks/GetVehicleCheckbyDriver/${email}/${vehicleStartDate}/${vehicleEndDate}`;
  const filterSignInURL = `/api/DriverSignIn/GetDriverSignInbyDriverfilterByDate/${email}/${signInStartDate}/${signInEndDate}`;
  const filterComplaintsURL = `/api/Complaints/GetComplaintbyDriverfilterbyDate/${email}/${complaintsStartDate}/${complaintsEndDate}`;
  const filterComplianceURL = `/api/Compliances/GetCompliancebyDriverfilterbyDate/${email}/${complianceStartDate}/${complianceEndDate}`;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [allETAPerformance, setAllETAPerformance] = useState([]);
  const [allIncidentReports, setAllIncidentReports] = useState([]);
  const [allParcelDeliveries, setAllParcelDeliveries] = useState([]);
  const [allVehicleCheck, setAllVehicleCheck] = useState([]);
  const [allToolBox, setAllToolBox] = useState([]);
  const [allSignIn, setAllSignIn] = useState([]);
  const [allCompalints, setAllComplaints] = useState([]);
  const [allCompliance, setAllCompliance] = useState([]);
  const [searchETAError, setSearchETAError] = useState("");
  const [searchParcelError, setSearchParcelError] = useState("");
  const [searchIncidentError, setSearchIncidentError] = useState("");
  const [searchToolBoxError, setSearchToolBoxError] = useState("");
  const [searchVehicleError, setSearchVehicleError] = useState("");
  const [searchSignInError, setSearchSignInError] = useState("");
  const [searchComplaintsError, setSearchComplaintsError] = useState("");
  const [searchComplianceError, setSearchComplianceError] = useState("");
  const [etaLoading, setEtaLoading] = useState(false);
  const [parcelLoading, setParcelLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [toolboxLoading, setToolBoxLoading] = useState(false);
  const [incidentLoading, setIncidentLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [complaintsLoading, setComplaintsLoading] = useState(false);
  const [complianceLoading, setComplianceLoading] = useState(false);

  let tempDriverProfilePhoto = driver.profilePhoto;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getTheDriver = () => {
    axios.get(baseURL, config).then((response) => {
      const tempDriver = response.data;
      setDriver(tempDriver);
      setAusPostExpDate(tempDriver.ausPostExpiry);
      setDOB(tempDriver.dob);
      setLicenseExp(tempDriver.licenceExpiry);
      setVisaExp(tempDriver.visaExpiry);
      // console.log("dob = ", dob);
    });
  };

  const getAllETAPerformance = () => {
    axios.get(ETAPerformanceURL, config).then((response) => {
      const tempETAPerformance = response.data;
      setAllETAPerformance(tempETAPerformance);
    });
  };

  const getAllIncidentReports = () => {
    axios.get(IncidentReportURL, config).then((response) => {
      const tempIncidentReport = response.data;
      setAllIncidentReports(tempIncidentReport);
      // console.log(allIncidentReports);
    });
  };

  const getAllParcelDeliveries = () => {
    axios.get(ParcelDeliveryURL, config).then((response) => {
      const tempParcelDelivey = response.data;
      setAllParcelDeliveries(tempParcelDelivey);
      // console.log(allParcelDeliveries);
    });
  };

  const getAllVehicleCheck = () => {
    axios.get(vehicleCheckURL, config).then((response) => {
      const tempVehicleCheck = response.data;
      setAllVehicleCheck(tempVehicleCheck);
    });
  };

  const getAllToolBox = () => {
    axios.get(toolBoxURL, config).then((response) => {
      const tempToolBox = response.data;
      setAllToolBox(tempToolBox);
    });
  };

  const getAllSignIn = () => {
    axios.get(signInURL, config).then((response) => {
      const tempSignIn = response.data;
      setAllSignIn(tempSignIn);
    });
  };

  const getAllComplaints = () => {
    axios.get(complaintsURL, config).then((response) => {
      const tempComplaints = response.data;
      setAllComplaints(tempComplaints);
    });
  };

  const getAllCompliance = () => {
    axios.get(complianceURL, config).then((response) => {
      const tempCompliance = response.data;
      setAllCompliance(tempCompliance);
    });
  };

  async function filterETAPerformance() {
    setEtaLoading(true);
    const date1 = new Date(etaStartdate);
    const date2 = new Date(etaEnddate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchETAError("Invalid date parameteres! Please try again");
    } else {
      setSearchETAError("");
    }

    axios
      .get(filterETAURL, config)
      .then((response) => {
        // console.log(response.data);
        setAllETAPerformance(response.data);
        setEtaLoading(false);
      })
      .catch((error) => {
        setAllETAPerformance([]);
        console.log(error);
        setEtaLoading(false);
      });
  }

  async function filterParcelDeilveries() {
    setParcelLoading(true);
    const date1 = new Date(parcelStartdate);
    const date2 = new Date(parcelEnddate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchParcelError("Invalid date parameteres! Please try again");
    } else {
      setSearchParcelError("");
    }

    axios
      .get(filterParcelDeliveryURL, config)
      .then((response) => {
        setAllParcelDeliveries(response.data);
        setParcelLoading(false);
      })
      .catch((error) => {
        setAllParcelDeliveries([]);
        console.log(error);
        setParcelLoading(false);
      });
  }

  async function filterToolBox() {
    setToolBoxLoading(true);
    const date1 = new Date(toolStartDate);
    const date2 = new Date(toolEndDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchToolBoxError("Invalid date parameteres! Please try again");
    } else {
      setSearchToolBoxError("");
    }

    axios
      .get(filterToolBoxURL, config)
      .then((response) => {
        setAllToolBox(response.data);
        setToolBoxLoading(false);
      })
      .catch((error) => {
        setAllToolBox([]);
        console.log(error);
        setToolBoxLoading(false);
      });
  }

  async function filterIncidentReports() {
    setIncidentLoading(true);
    const date1 = new Date(incidentStartdate);
    const date2 = new Date(incidentEnddate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchIncidentError("Invalid date parameteres! Please try again");
    } else {
      setSearchIncidentError("");
    }

    axios
      .get(filterIncidentReportURL, config)
      .then((response) => {
        setAllIncidentReports(response.data);
        setIncidentLoading(false);
      })
      .catch((error) => {
        setAllIncidentReports([]);
        console.log(error);
        setIncidentLoading(false);
      });
  }

  async function filterVehicleCheck() {
    setVehicleLoading(true);
    const date1 = new Date(vehicleStartDate);
    const date2 = new Date(vehicleEndDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchVehicleError("Invalid date parameteres! Please try again");
    } else {
      setSearchVehicleError("");
    }

    axios
      .get(filterVehicleCheckURL, config)
      .then((response) => {
        setAllVehicleCheck(response.data);
        setVehicleLoading(false);
      })
      .catch((error) => {
        setAllVehicleCheck([]);
        console.log(error);
        setVehicleLoading(false);
      });
  }

  async function filterSignIn() {
    setSignInLoading(true);
    const date1 = new Date(signInStartDate);
    const date2 = new Date(signInEndDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchSignInError("Invalid date parameteres! Please try again");
      console.log(searchSignInError);
    } else {
      setSearchSignInError("");
    }

    axios
      .get(filterSignInURL, config)
      .then((response) => {
        setAllSignIn(response.data);
        setSignInLoading(false);
      })
      .catch((error) => {
        setAllSignIn([]);
        console.log(error);
        setSignInLoading(false);
      });
  }

  async function filterComplaints() {
    setComplaintsLoading(true);
    const date1 = new Date(complaintsStartDate);
    const date2 = new Date(complaintsEndDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchComplaintsError("Invalid date parameteres! Please try again");
      console.log(searchSignInError);
    } else {
      setSearchComplaintsError("");
    }

    axios
      .get(filterComplaintsURL, config)
      .then((response) => {
        setAllComplaints(response.data);
        setComplaintsLoading(false);
      })
      .catch((error) => {
        setAllComplaints([]);
        console.log(error);
        setComplaintsLoading(false);
      });
  }

  async function filterCompliance() {
    setComplianceLoading(true);
    const date1 = new Date(complianceStartDate);
    const date2 = new Date(complianceEndDate);

    const timeDifference = date2.getTime() - date1.getTime();

    if (timeDifference < 0) {
      setSearchComplianceError("Invalid date parameteres! Please try again");
      console.log(searchSignInError);
    } else {
      setSearchComplianceError("");
    }

    axios
      .get(filterComplianceURL, config)
      .then((response) => {
        setAllCompliance(response.data);
        setComplianceLoading(false);
      })
      .catch((error) => {
        setAllCompliance([]);
        console.log(error);
        setComplianceLoading(false);
      });
  }

  const filteredDataETAPerformance = allETAPerformance;
  // .filter((etaPerformance) =>
  //   etaPerformance.createDate.toLowerCase().includes(searchETA.toLowerCase())
  // );

  const filteredIncidentReports = allIncidentReports;
  // .filter((incidentReport) =>
  //   incidentReport.createDate.toLowerCase().includes(searchIncident.toLowerCase())
  // );

  const filteredParcelDeliveries = allParcelDeliveries;
  // .filter((parcelDeliveries) =>
  //   parcelDeliveries.createDate.toLowerCase().includes(searchParcel.toLowerCase())
  // );

  const filteredVehicleCheck = allVehicleCheck;
  // .filter((VehicleCheck) =>
  //   VehicleCheck.createDate.toLowerCase().includes(searchVehicleCheck.toLowerCase())
  // );

  const filteredToolBox = allToolBox;
  // .filter((toolBox) =>
  //   toolBox.createDate.toLowerCase().includes(searchToolBox.toLowerCase())
  // );

  const filteredSignIn = allSignIn;

  const filteredComplaints = allCompalints;

  const filteredCompliance = allCompliance;

  useEffect(() => {
    getTheDriver();
    getAllETAPerformance();
    getAllIncidentReports();
    getAllParcelDeliveries();
    getAllVehicleCheck();
    getAllToolBox();
    getAllSignIn();
    getAllComplaints();
    getAllCompliance();
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
         The event listener that's calling the handleTabsOrientation function when resizing the window.
        */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // const base64 = convertBase64(driver.profilePhoto.files[0]);
    // console.log(base64);
    tempDriverProfilePhoto = driver.profilePhoto;

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  function deleteDriver() {
    axios.delete(deleteDriverURL, config).then((response) => {
      console.log(response);

      navigate("/drivers");
      // const tempDriver = response.data;
      // setDriver(tempDriver);
    });
  }

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const etaPerformanceCols = [
    { title: "Date", field: "createDate" },
    { title: "Articles", field: "articles" },
    { title: "Early", field: "early" },
    { title: "OnTime	", field: "onTime" },
    { title: "Not Delivered", field: "notDelivered" },
    { title: "On Time %", field: "onTimePresentage" },
  ];

  const parcelDeliveriesCols = [
    { title: "Date", field: "createDate" },
    { title: "No of parcels", field: "noParcels" },
  ];

  const toolBoxDiscussionCols = [
    { title: "Date", field: "createDate" },
    { title: "Title", field: "title" },
    { title: "Supervisor Email", field: "supervisorEmail" },
    { title: "Attendance", field: "attendance" },
  ];

  const complaintsCols = [
    { title: "Complaint Address", field: "complaintAddress" },
    { title: "Complain Type", field: "complainType" },
    { title: "Status", field: "status" },
    { title: "Supervisor Email", field: "supervisorEmail" },
    { title: "Supervisor Comment", field: "supervisorComment" },
  ];

  const downloadPDF = () => {
    const doc = new JSPDF();
    doc.setFontSize(14);
    doc.text(`Driver Report - ${driver.fname} ${driver.lname} - ${driver.email}`, 10, 11);
    doc.setFontSize(11);
    doc.text(`ETA performance`, 15, 19);
    doc.autoTable({
      startY: 20,
      styles: { fontSize: 9 },
      columns: etaPerformanceCols.map((col) => ({ ...col, dataKey: col.field })),
      body: filteredDataETAPerformance,
    });
    doc.text(`Parcel Deliveries`, 15, doc.lastAutoTable.finalY + 6);
    doc.autoTable({
      styles: { fontSize: 9 },
      columns: parcelDeliveriesCols.map((col) => ({ ...col, dataKey: col.field })),
      body: filteredParcelDeliveries,
    });
    doc.text(`ToolBox Discussion`, 15, doc.lastAutoTable.finalY + 6);
    doc.autoTable({
      styles: { fontSize: 9 },
      columns: toolBoxDiscussionCols.map((col) => ({ ...col, dataKey: col.field })),
      body: filteredToolBox,
    });
    doc.text(`Complaints`, 15, doc.lastAutoTable.finalY + 6);
    doc.autoTable({
      styles: { fontSize: 9 },
      columns: complaintsCols.map((col) => ({ ...col, dataKey: col.field })),
      body: filteredComplaints,
    });
    doc.save(`driverreport${driver.fname}_${driver.lname}.pdf`);
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
      <DashboardNavbar />
      <MDBox />
      <Header>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={`${tempDriverProfilePhoto}?${Date.now()}`}
              alt="profile-image"
              size="xxl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {driver.fname} {driver.mname} {driver.lname}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {driver.workStatus} driver | supervisor - {driver.supervisorEmail}
              </MDTypography>
              {/* <IconButton size="large">
                <ArrowDropDownIcon />
              </IconButton> */}
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Profile"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  component={Link}
                  to={`/drivers/${email}/edit-driver`}
                  label="Edit"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      edit
                    </Icon>
                  }
                />
                <Tab
                  // component={Link}
                  // to={`/drivers/${email}/edit-driver`}
                  onClick={downloadPDF}
                  label="Generate Report"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      report
                    </Icon>
                  }
                />
                <Tab
                  label="Delete"
                  onClick={handleClickOpen}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      delete
                    </Icon>
                  }
                />
              </Tabs>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to continue?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    From this you will delete this driver. And this driver will become an inactive
                    driver.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={() => deleteDriver()} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </AppBar>

            {/* <HashLink to="#ETA">ETA</HashLink> */}
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="profile information"
                info={{
                  gender: driver.gender,
                  driverType: driver.driverType,
                  address: driver.address,
                  email: driver.email,
                  phoneNo: driver.phoneNo,
                  DOB: dob,
                  ProfilePicture: (
                    <a href={driver.profilePhoto}>
                      <MDBadge badgeContent="view" color="success" variant="gradient" size="sm" />
                    </a>
                  ),
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="AUS Post Details"
                info={{
                  AusPostScan: (
                    <a href={driver.ausPostScan}>
                      <MDBadge badgeContent="view" color="success" variant="gradient" size="sm" />
                    </a>
                  ),
                  AusPostID: driver.ausPostId,
                  AusPostExpp: ausPostExpDate,
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Licence Details"
                description=""
                info={{
                  LicenceScan: (
                    <a href={driver.licenceScan}>
                      <MDBadge badgeContent="view" color="success" variant="gradient" size="sm" />
                    </a>
                  ),
                  LicenceID: driver.licenceId,
                  LicenceEXP: licenseExp,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="Vehicle Details"
                info={{
                  VehicalType: driver.vehicalType,
                  VehicleNo: driver.vehicleNo,
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ mx: 0 }} />
              <ProfileInfoCard
                title="Visa Details"
                info={{
                  VisaScan: (
                    <a href={driver.visaScan}>
                      <MDBadge badgeContent="view" color="success" variant="gradient" size="sm" />
                    </a>
                  ),
                  VisaExpiry: visaExp,
                  VisaNo: driver.visaNo,
                }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="insurance Details"
                info={{
                  InsurancePolicyNo: driver.insurancePolicyNo,
                  InsuranceExpiry: driver.insuranceExpiry,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1} mt={3} id="ETA">
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
                    ETA Performance
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
                              onChange={(e) => setETAStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchETAError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setETAEndDate(e.target.value)}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterETAPerformance()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {etaLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Articles</TableCell>
                            <TableCell align="center">Early</TableCell>
                            <TableCell align="center">OnTime</TableCell>
                            <TableCell align="center">Not Delivered</TableCell>
                            <TableCell align="center">On Time %</TableCell>
                            <TableCell align="left"> </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredDataETAPerformance.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredDataETAPerformance.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.createDate}</TableCell>
                              <TableCell align="center">{row.articles}</TableCell>
                              <TableCell align="center">{row.early}</TableCell>
                              <TableCell align="center">{row.onTime}</TableCell>
                              <TableCell align="center">{row.notDelivered}</TableCell>
                              <TableCell align="center">{row.onTimePresentage}%</TableCell>
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

        <MDBox pt={1} pb={1} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                {/* <MDBox pt={2} px={2} lineHeight={1.25}> */}
                {/* <MDTypography variant="h6" fontWeight="medium">
                    Incident Reports
                  </MDTypography> */}
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Incident Reports
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid item xs={12} md={6} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <MDInput
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setSearchIncident(e.target.value)}
                        label="Search here"
                        type="date"
                        justify="space-between"
                        spacing={24}
                        raised
                      />
                    </MDBox>
                  </Grid> */}
                  <Grid item xs={12} md={12} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <Grid container spacing={3}>
                        <br />
                        <Grid item xs={12} md={3}>
                          <MDBox mb={3}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setIncidentStartdate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchIncidentError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setIncidentEnddate(e.target.value)}
                              type="date"
                              label="End date"
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
                            {incidentLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center" />
                            <TableCell align="center" />
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredIncidentReports.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center" />
                              <TableCell align="center" />
                              <TableCell align="center" />
                            </TableRow>
                          ) : null}
                          {filteredIncidentReports.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.createDate}</TableCell>
                              <TableCell align="center" />
                              <TableCell align="center" />
                              <TableCell align="center" />
                              <TableCell align="left">
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
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="success"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Parcel Deliveries
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {/* <Grid container spacing={3}> */}
                  <Grid item xs={12} md={12} fullwidth justifyContent="flex-end">
                    <MDBox pr={2} pb={1} pl={2}>
                      <Grid container spacing={3}>
                        <br />
                        <Grid item xs={12} md={3}>
                          <MDBox mb={3}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setParcelStartdate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchParcelError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setParcelEnddate(e.target.value)}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterParcelDeilveries()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {parcelLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">No of parcels</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredParcelDeliveries.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredParcelDeliveries.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.createDate}</TableCell>
                              <TableCell align="center">{row.noParcels}</TableCell>
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

        <MDBox pt={1} pb={1} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="warning"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Vehicle Check
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
                              onChange={(e) => setVehicleStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchVehicleError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setVehicleEndDate(e.target.value)}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterVehicleCheck()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {vehicleLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredVehicleCheck.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredVehicleCheck.map((row) => (
                            <TableRow key="s">
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
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="error"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    ToolBox Discussion
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
                              onChange={(e) => setToolStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchToolBoxError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setToolEndDate(e.target.value)}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterToolBox()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {toolboxLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Supervisor Email</TableCell>
                            <TableCell align="center">Attendance</TableCell>
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredToolBox.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredToolBox.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.createDate}</TableCell>
                              <TableCell align="center">{row.title}</TableCell>
                              <TableCell align="center">{row.supervisorEmail}</TableCell>
                              <TableCell align="center">{row.attendance}</TableCell>
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
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={1} pb={1} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="secondary"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Daily Sign-in
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
                              onChange={(e) => setSignInStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchSignInError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setSignInEndDate(e.target.value)}
                              // helperText={searchSignInError}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterSignIn()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {signInLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Sign-in time</TableCell>
                            <TableCell align="left">Sign-off time</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredSignIn.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredSignIn.map((row) => (
                            <TableRow key="s">
                              <TableCell align="left">{row.signInTime}</TableCell>
                              <TableCell align="left">{row.signOffTime}</TableCell>
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

        <MDBox pt={1} pb={1} mt={3}>
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
                    Complaints
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
                              onChange={(e) => setComplaintsStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchComplaintsError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setComplaintsEndDate(e.target.value)}
                              // helperText={searchComplaintsError}
                              type="date"
                              label="End date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} mt={0.3} md={2}>
                          {/* <MDBox mt={4} mb={1}> */}
                          <MDButton
                            onClick={() => filterComplaints()}
                            variant="gradient"
                            color="info"
                            fullWidth
                          >
                            Filter &nbsp;&nbsp;
                            {complaintsLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Created date</TableCell>
                            <TableCell align="left">Supervisor Email</TableCell>
                            <TableCell align="left">status</TableCell>
                            <TableCell align="left">Complaint type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredComplaints.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredComplaints.map((row) => (
                            <TableRow key="s">
                              <TableCell align="left">{row.createDate}</TableCell>
                              <TableCell align="left">{row.supervisorEmail}</TableCell>
                              <TableCell align="left">{row.status}</TableCell>
                              <TableCell align="left">{row.complainType}</TableCell>
                              <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to={`/All-Complaints/Complaint/${row.id}`}
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

        <MDBox pt={1} pb={1} mt={3}>
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
                    Compliance
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
                              onChange={(e) => setComplianceStartDate(e.target.value)}
                              // onChange={(e) => setFname(e.target.value)}
                              helperText={searchComplianceError}
                              type="date"
                              label="Start date"
                              // variant="standard"
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox mb={2}>
                            <MDInput
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setComplianceEndDate(e.target.value)}
                              // helperText={searchComplaintsError}
                              type="date"
                              label="End date"
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
                            {complianceLoading ? <CircularProgress size={20} color="white" /> : ""}
                          </MDButton>
                          {/* </MDBox> */}
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} ml={2} mb={1} mr={2}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Article ID</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Accept</TableCell>
                            <TableCell align="center">Deliver</TableCell>
                            <TableCell align="center">Attempt to Deliver</TableCell>
                            <TableCell align="center">Transfer</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredCompliance.length === 0 ? (
                            <TableRow key="s">
                              <TableCell align="center">-</TableCell>
                            </TableRow>
                          ) : null}
                          {filteredCompliance.map((row) => (
                            <TableRow key="s">
                              <TableCell align="center">{row.articleId}</TableCell>
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">{row.accept}</TableCell>
                              <TableCell align="center">{row.deliver}</TableCell>
                              <TableCell align="center">{row.attemptToDeliver}</TableCell>
                              <TableCell align="center">{row.transfer}</TableCell>
                              {/* <TableCell align="left">
                                <MDBox ml={-1}>
                                  <MDBadge
                                    badgeContent="view"
                                    color="success"
                                    variant="gradient"
                                    size="sm"
                                    component={Link}
                                    to={`/All-Complaints/Complaint/${row.id}`}
                                  />
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

        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox> */}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default DriverProfile;
