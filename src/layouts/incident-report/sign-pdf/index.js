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

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";
// import {  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import * as React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { BlobServiceClient } from "@azure/storage-blob";
import { useState, useEffect } from "react";
import axios from "axios";
// import "./styles.css";
import CircularProgress from "@mui/material/CircularProgress";

function SignPDF() {
  const { id } = useParams();
  const baseURL = `/api/IncidentReports/${id}`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [driverEmail, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [createDate, setDate] = useState("");

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const [incidentReportsFile, setIncidentReportsFile] = useState([]);

  const currentDate = new Date();
  const timestamp = `${currentDate.getFullYear()}-0${currentDate.getMonth()}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  const tempFileNameIncidentReports = `${timestamp}_incidentreport.pdf`;
  const tempIncidentReportsURL = `https://${storageAccountName}.blob.core.windows.net/incidentreport/${tempFileNameIncidentReports}`;
  const pdfUrl = tempIncidentReportsURL;

  async function uploadIncidentReports() {
    const containerClient = blobService.getContainerClient("incidentreport");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameIncidentReports);
    const option = { blobHTTPHeader: { blobContentType: incidentReportsFile.type } };
    await blobClient.uploadBrowserData(incidentReportsFile, option);
  }

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getIncidentReports = () => {
    axios.get(baseURL, config).then((response) => {
      const tempIncidentReport = response.data;
      console.log(tempIncidentReport);
      setEmail(tempIncidentReport.driverEmail);
      setAddress(tempIncidentReport.address);
      setDate(tempIncidentReport.createDate);
    });
  };

  useEffect(() => {
    getIncidentReports();
  }, []);

  const bodyParameters = {
    id,
    driverEmail,
    address,
    pdfUrl,
    createDate,
  };

  async function signIncidentReports() {
    setLoading(true);
    if (incidentReportsFile.length === 0) {
      setLoading(false);
      window.alert("No file to upload");
    } else {
      await uploadIncidentReports();
      axios
        .put(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 204) {
            alert("IncidentReport added successfully");
            navigate("/Incident-reports");
          }
        })
        .catch((error) => {
          setLoading(false);
          alert("An unexpected error occured! please check the values and try again");
          console.log(error);
        });
    }
  }

  const IncidentReportsHandler = (event) => {
    setIncidentReportsFile(event.target.files[0]);
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
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={3}
          p={3}
          mb={2}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add Signed IncidentReport
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={IncidentReportsHandler}
                      type="file"
                      label="Signed incident report"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={2}>
                  <MDButton
                    onClick={() => signIncidentReports()}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Sign Incident Report
                    {loading ? <CircularProgress size={20} color="white" /> : ""}
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default SignPDF;
