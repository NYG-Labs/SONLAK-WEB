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
// import { Link } from "react-router-dom";
import * as React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useEffect } from "react";
// import {  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";

// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CircularProgress from "@mui/material/CircularProgress";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { BlobServiceClient } from "@azure/storage-blob";

function EditSupervisor() {
  const SelectFieldStyle = {
    padding: 12,
    // fontSize: "0.75rem",
  };

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const navigate = useNavigate();
  const { id } = useParams();
  //   const [allSupervisors, setAllSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const baseURL = `/api/Supervisors/${id}`;
  //   const baseURLSupervisors = "/api/SuperFvisors";
  const baseURLSupervisor = `/api/Supervisors/${id}`;
  const [fname, setFname] = useState(supervisor.fname);
  const [mname, setMname] = useState(supervisor.mname);
  const [lname, setLname] = useState(supervisor.lname);
  const [address, setAddress] = useState(supervisor.address);
  const [dob, setDob] = useState(supervisor.dob);
  const [gender, setGender] = useState(supervisor.gender);
  //   const [ausPostId, setAusPostId] = useState(supervisor.ausPostId);
  //   const [ausPostScan, setAusPostScan] = useState(supervisor.ausPostScan);
  //   const [ausPostExpiry, setAusPostExpiry] = useState(supervisor.ausPostExpiry);
  //   const [vehicleNo, setVehicleNo] = useState(supervisor.vehicleNo);
  //   const [vehicalType, setVehicalType] = useState(supervisor.vehicalType);
  const [visaNo, setVisaNo] = useState(supervisor.visaNo);
  const [visaScan, setVisaScan] = useState(supervisor.visaScan);
  const [visaExpiry, setVisaExpiry] = useState(supervisor.visaExpiry);
  //   const [licenceId, setLicenceId] = useState(supervisor.licenceId);
  //   const [licenceScan, setLicenceScan] = useState(supervisor.licenceScan);
  //   const [licenceExpiry, setLicenceExpiry] = useState(supervisor.licenceExpiry);
  const [supervisorType, setSupervisorType] = useState(supervisor.supervisorType);
  const [username, setUsername] = useState(supervisor.username);
  // const [phoneNo, setPhoneNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(supervisor.profilePhoto);
  //   const [supervisorEmail, setSupervisroEmail] = useState(supervisor.supervisorEmail);
  const [workStatus, setWorkstatus] = useState(supervisor.workStatus);
  const [password, setPassword] = useState(supervisor.password);
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const supervisorEmail = supervisor.email;

  const tempFileNameVisaScan = `${supervisorEmail}_visascan.jpg`;
  // console.log(tempFileNameVisaScan);
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/supervisorvisascan/${tempFileNameVisaScan}`;
  // const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${supervisorEmail}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/supervisorprofilephoto/${tempFileProfilePhoto}`;

  //   const getAllSupervisors = () => {
  //     axios.get(baseURLSupervisors, config).then((response) => {
  //       const tempSupervisors = response.data;
  //       setAllSupervisors(tempSupervisors);
  //     });
  //   };

  const getSupervisorDetails = async () => {
    await axios.get(baseURLSupervisor, config).then((response) => {
      const tempSupervisor = response.data;
      setSupervisor(tempSupervisor);
      setFname(response.data.fname);
      setMname(response.data.mname);
      setLname(response.data.lname);
      setAddress(response.data.address);
      setDob(response.data.dob);
      setGender(response.data.gender);
      //   setAusPostId(response.data.ausPostId);
      //   setAusPostScan(response.data.ausPostScan);
      //   setAusPostExpiry(response.data.ausPostExpiry);
      //   setVehicleNo(response.data.vehicleNo);
      //   setVehicalType(response.data.vehicalType);
      setVisaNo(response.data.visaNo);
      setVisaScan(response.data.visaScan);
      setVisaExpiry(response.data.visaExpiry);
      //   setLicenceId(response.data.licenceId);
      //   setLicenceScan(response.data.ausPostScan);
      //   setLicenceExpiry(response.data.licenceExpiry);
      setSupervisorType(response.data.supervisorType);
      setUsername(response.data.username);
      setProfilePhoto(response.data.profilePhoto);
      //   setSupervisroEmail(response.data.supervisorEmail);
      setWorkstatus(response.data.workStatus);
      setPassword(response.data.setPassword);
      // console.log("data = ++", response.data);
    });
  };

  useEffect(() => {
    getSupervisorDetails();
    // getAllSupervisors();
  }, []);

  const [visaScanFile, setVisaSanFile] = useState([]);

  const VisaScanHnadler = (event) => {
    setVisaSanFile(event.target.files[0]);
    setVisaScan(tempVisaScanURL);
  };

  async function uploadVisaScan() {
    //   const blobService = new BlobServiceClient(
    //     `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    //   );

    const containerClient = blobService.getContainerClient("supervisorvisascan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameVisaScan);
    const option = { blobHTTPHeader: { blobContentType: visaScanFile.type } };
    await blobClient.uploadBrowserData(visaScanFile, option);
  }

  const [profilePhotoFile, setProfilePhotoFile] = useState([]);

  const ProfilePhotoHandler = (event) => {
    setProfilePhotoFile(event.target.files[0]);
    setProfilePhoto(tempProfilePhotoURL);
  };

  async function uploadProfilePhoto() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("supervisorprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }
  //   console.log("Supervisor = ", Supervisor);
  //   console.log("allsupervisors = ", allSupervisors);

  console.log("pw = ", oldPassword, password);

  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    }
  };

  const bodyParameters = {
    email: supervisorEmail,
    fname,
    mname,
    lname,
    address,
    dob,
    gender,
    // ausPostId,
    // ausPostScan,
    // ausPostExpiry,
    // vehicleNo,
    // vehicalType,
    visaNo,
    visaScan,
    visaExpiry,
    // licenceId,
    // licenceScan,
    // licenceExpiry,
    supervisorType,
    workStatus,
    // password,
    supervisorEmail,
    username,
    // phoneNo,
    // createDate,
    profilePhoto,
  };

  //   console.log("==> ", bodyParameters.fname);

  async function editSupervisor() {
    setLoading(true);
    if (visaScanFile.length !== 0) {
      await uploadVisaScan();
    }

    if (profilePhotoFile.length !== 0) {
      await uploadProfilePhoto();
    }

    axios
      .put(baseURL, bodyParameters, config)
      .then((response) => {
        // console.log("response = ", response.status);
        // console.log(bodyParameters);
        if (response.status === 204) {
          alert("Supervisor Updated successfully");
          navigate(`/supervisors/${id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error = ", error.response);
        // console.log(bodyParameters);
        alert("An unexpected error occured! please check the values and try again");
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
            Edit Supervisor
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <MDBox pb={2}>Personal Details</MDBox>

              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder={supervisor.fname}
                      type="text"
                      label="First Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setMname(e.target.value)}
                      placeholder={supervisor.mname}
                      type="text"
                      label="Middle Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLname(e.target.value)}
                      placeholder={supervisor.lname}
                      type="select"
                      label="Last Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      IconComponent={<ArrowDropDownIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setGender(e.target.value)}
                      defaultValue={gender}
                      helperText={gender}
                      //   placeholder={supervisor.gender}
                      type="text"
                      label="Gender"
                      // variant="standard"
                      fullWidth
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={supervisor.address}
                      type="text"
                      label="Address"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      //   onChange={(e) => setEmail(e.target.value)}
                      placeholder={supervisor.email}
                      type="email"
                      label="Email"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder={supervisor.dob}
                      type="date"
                      label="DOB"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={supervisor.username}
                      type="text"
                      label="Username"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setWorkstatus(e.target.value)}
                      placeholder={supervisor.workStatus}
                      type="text"
                      label="Work Status"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {/* <MDBox p={2}>
              <MDBox pb={2}>AUSPOST ID Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostId(e.target.value)}
                      placeholder={supervisor.ausPostId}
                      type="text"
                      label="ID no"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostScan(e.target.value)}
                      // onChange={ausPostScanHnadler}
                      placeholder={supervisor.ausPostScan}
                      type="text"
                      label="Scanned copy"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostExpiry(e.target.value)}
                      placeholder={supervisor.ausPostExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            {/* <MDBox p={2}>
              <MDBox pb={2}>Vehicle Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      placeholder={supervisor.vehicleNo}
                      type="text"
                      label="Vehicle No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicalType(e.target.value)}
                      placeholder={supervisor.vehicalType}
                      type="texy"
                      label="Vehicle type"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
            {/* <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
            {/* </Grid>
            </MDBox> */}

            <MDBox p={2}>
              <MDBox pb={2}>Visa Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVisaNo(e.target.value)}
                      placeholder={supervisor.visaNo}
                      type="text"
                      label="Visa No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setVisaScan(e.target.value)}
                      onChange={VisaScanHnadler}
                      placeholder={supervisor.visaScan}
                      type="file"
                      label="Scanned copy"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVisaExpiry(e.target.value)}
                      placeholder={supervisor.visaExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {/* <MDBox p={2}>
              <MDBox pb={2}>Supervisor licence details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceId(e.target.value)}
                      placeholder={supervisor.licenceId}
                      type="text"
                      label="ID no"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceScan(e.target.value)}
                      placeholder={supervisor.licenceScan}
                      type="text"
                      label="Scanned copy"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceExpiry(e.target.value)}
                      placeholder={supervisor.licenceExpiry}
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox> */}

            <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setSupervisorType(e.target.value)}
                      value={supervisorType}
                      helperText={supervisorType}
                      label="Supervisor Type"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Male">Active</MenuItem>
                      <MenuItem value="Female">Inactive</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      IconComponent={<ArrowDropDownIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setSupervisroEmail(e.target.value)}
                      default={supervisorEmail}
                      helperText={supervisorEmail}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    >
                      {allSupervisors.map((supervisor) => (
                        <MenuItem value={supervisor.email}>{supervisor.email}</MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHandler}
                      placeholder={supervisor.profilePhoto}
                      type="file"
                      label="Profile Photo"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="password"
                      label="Old Password"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="New Password"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      helperText={isPasswordMatching}
                      type="password"
                      label="Confirm New Password"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
            </MDBox>

            {/* <MDBox mt={4} mb={1}>
              <MDButton onClick={() => editSupervisor()} variant="gradient" color="info" fullWidth>
                Update
              </MDButton>
            </MDBox> */}
            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      component={Link}
                      to={`/supervisors/${id}`}
                      variant="gradient"
                      color="light"
                      fullWidth
                    >
                      Cancel
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      onClick={() => editSupervisor()}
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Update &nbsp;&nbsp;
                      {loading ? <CircularProgress size={20} color="white" /> : ""}
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditSupervisor;
