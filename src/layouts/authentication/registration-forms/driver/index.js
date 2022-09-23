import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";
import { BlobServiceClient } from "@azure/storage-blob";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const helperTextStyles = makeStyles({
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});

function DriverRegistration() {
  const SelectFieldStyle = {
    padding: 12,
  };

  const classes = helperTextStyles();

  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  // const [gender, setGender] = useState("");
  const [ausPostId, setAusPostId] = useState("");
  const [insurancePolicyNo, setPolicyNo] = useState("");
  const [insuranceExpiry, setInsuaranceExpDate] = useState("");
  const [ausPostExpiry, setAusPostExpiry] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicalType, setVehicalType] = useState("");
  const [visaNo, setVisaNo] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [licenceId, setLicenceId] = useState("");
  const [licenceExpiry, setLicenceExpiry] = useState("");
  const [driverType, setDriverType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [supervisorEmail, setSupervisroEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [username, setUserLogInId] = useState("");
  const [pinNo, setUserPinNo] = useState("");
  const [route, setRoute] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhoneNo, setEmergencyNumber] = useState("");
  const [emergencyRelation, setEmergencyRelationship] = useState("");
  // console.log();
  const [loading, setLoading] = useState(false);

  const baseURL = "https://sonlakserver.azurewebsites.net/api/Drivers";
  const baseURLSupervisors =
    "https://sonlakserver.azurewebsites.net/api/Supervisors/GetSupervisorsActive";

  // const currentDate = new Date();
  // const timestamp = currentDate.getTime();
  const tempFileNameAusPostScan = `${email}_auspostscan.pdf`;
  const tempAusPostScanURL = `https://${storageAccountName}.blob.core.windows.net/driverauspostscan/${tempFileNameAusPostScan}`;
  const ausPostScan = tempAusPostScanURL;

  const tempFileNameLicenceScan = `${email}_licencescan.pdf`;
  const tempLicenceScanURL = `https://${storageAccountName}.blob.core.windows.net/driverlicencescan/${tempFileNameLicenceScan}`;
  const licenceScan = tempLicenceScanURL;

  const tempFileNameVisaScan = `${email}_visascan.pdf`;
  const tempVisaScanURL = `https://${storageAccountName}.blob.core.windows.net/drivervisascan/${tempFileNameVisaScan}`;
  const visaScan = tempVisaScanURL;

  const tempFileProfilePhoto = `${email}_profilephoto.jpg`;
  const tempProfilePhotoURL = `https://${storageAccountName}.blob.core.windows.net/driverprofilephoto/${tempFileProfilePhoto}`;
  const profilePhoto = tempProfilePhotoURL;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const getAllSupervisors = () => {
    axios.get(baseURLSupervisors, config).then((response) => {
      const tempSupervisors = response.data;
      setAllSupervisors(tempSupervisors);
    });
  };

  useEffect(() => {
    getAllSupervisors();
  }, []);

  const bodyParameters = {
    email,
    fname,
    mname,
    lname,
    address,
    dob,
    // gender: "male",
    ausPostId,
    ausPostScan,
    ausPostExpiry,
    vehicleNo,
    vehicalType,
    insurancePolicyNo,
    insuranceExpiry,
    visaNo,
    visaScan,
    visaExpiry,
    licenceId,
    licenceScan,
    licenceExpiry,
    driverType,
    password,
    supervisorEmail,
    username,
    phoneNo,
    profilePhoto,
    pinNo,
    route,
    emergencyName,
    emergencyPhoneNo,
    emergencyRelation,
  };

  const [ausPostScanFile, setAusPostSanFile] = useState([]);

  const ausPostScanHnadler = (event) => {
    setAusPostSanFile(event.target.files[0]);
  };

  async function uploadAusPostScan() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("driverauspostscan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameAusPostScan);
    const option = { blobHTTPHeader: { blobContentType: ausPostScanFile.type } };
    await blobClient.uploadBrowserData(ausPostScanFile, option);
  }

  const [licenceScanFile, setLicenceSanFile] = useState([]);

  const LicenceScanHnadler = (event) => {
    setLicenceSanFile(event.target.files[0]);
  };

  async function uploadLicenceScan() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("driverlicencescan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameLicenceScan);
    const option = { blobHTTPHeader: { blobContentType: licenceScanFile.type } };
    await blobClient.uploadBrowserData(licenceScanFile, option);
  }

  const [visaScanFile, setVisaSanFile] = useState([]);

  const VisaScanHnadler = (event) => {
    setVisaSanFile(event.target.files[0]);
  };

  async function uploadVisaScan() {
    //   const blobService = new BlobServiceClient(
    //     `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    //   );

    const containerClient = blobService.getContainerClient("drivervisascan");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileNameVisaScan);
    const option = { blobHTTPHeader: { blobContentType: visaScanFile.type } };
    await blobClient.uploadBrowserData(visaScanFile, option);
  }

  const [profilePhotoFile, setProfilePhotoFile] = useState([]);

  const ProfilePhotoHnadler = (event) => {
    setProfilePhotoFile(event.target.files[0]);
  };

  async function uploadProfilePhoto() {
    // const blobService = new BlobServiceClient(
    //   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // );

    const containerClient = blobService.getContainerClient("driverprofilephoto");
    await containerClient.createIfNotExists({
      access: "container",
    });

    const blobClient = containerClient.getBlockBlobClient(tempFileProfilePhoto);
    const option = { blobHTTPHeader: { blobContentType: profilePhotoFile.type } };
    await blobClient.uploadBrowserData(profilePhotoFile, option);
  }

  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    } else {
      setIsPasswordMatching("");
    }
  };

  // const [isErrorFname, setIsErrorFname] = useState("");
  function calculateAge(dob1) {
    const today = new Date();
    const birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow -= 1;
    }
    return ageNow;
  }

  async function registerDriver() {
    setLoading(true);
    // console.log(bodyParameters.visaScan);
    await uploadAusPostScan();
    await uploadLicenceScan();
    await uploadVisaScan();
    await uploadProfilePhoto();
    console.log(bodyParameters);

    console.log();

    if (bodyParameters.email.length === 0) {
      window.alert("Please enter a email to register");
      setLoading(false);
    } else if (bodyParameters.password.length === 0) {
      window.alert("Please enter a password");
      setLoading(false);
    } else if (isPasswordMatching === "") {
      window.alert("Confirm password is incorrect");
      setLoading(false);
    } else if (bodyParameters.phoneNo.length !== 10) {
      window.alert("Please enter a valid phone number");
      setLoading(false);
    } else if (
      // bodyParameters.emergencyPhoneNo.length !== 0 &&
      bodyParameters.emergencyPhoneNo.length !== 10
    ) {
      window.alert("Please enter a valid emergency phone number");
      setLoading(false);
    } else if (bodyParameters.dob !== "" && calculateAge(bodyParameters.dob) < 18) {
      window.alert("Driver should be above 18 years from today’s date");
      setLoading(false);
    } else {
      axios
        .post(baseURL, bodyParameters, config)
        .then((response) => {
          // console.log(response.status);
          if (response.status === 201) {
            alert("Driver registered successfully");
            navigate("/drivers");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setLoading(false);
            alert("A driver with this email is already available");
          } else {
            setLoading(false);
            alert("An unexpected error occured! please check the values and try again");
          }
        });
    }
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
            Driver registration
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
                      type="select"
                      label="Last Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                      label="Gender"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAddress(e.target.value)}
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
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      label="Email"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={email.length === 0 ? "Email cannot be empty" : ""}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      label="DOB"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={
                        calculateAge(dob) < 18
                          ? "A driver should be above 18 years old from today’s date"
                          : ""
                      }
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      label="Username"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      type="text"
                      label="Phone No"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={
                        phoneNo.length !== 10 ? "A contact number should contain 10 digits" : ""
                      }
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setDriverType(e.target.value)}
                      value={driverType}
                      label="Residential status"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      <MenuItem value="Citizen">Citizen</MenuItem>
                      <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
                      <MenuItem value="Temporary Visa">Temporary Visa</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            {driverType !== "Citizen" ? (
              <MDBox p={2}>
                <MDBox pb={2}>Visa Details</MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <MDBox mb={2}>
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setVisaNo(e.target.value)}
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
                        type="file"
                        label="Scanned copy (PDF)"
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
                        type="date"
                        label="Expiery date"
                        // variant="standard"
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            ) : (
              ""
            )}

            <MDBox p={2}>
              <MDBox pb={2}>AUSPOST ID Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setAusPostId(e.target.value)}
                      type="text"
                      label="Auspost ID no"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setAusPostScan(e.target.value)}
                      onChange={ausPostScanHnadler}
                      type="file"
                      label="Scanned copy (PDF)"
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
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUserLogInId(e.target.value)}
                      type="text"
                      label="User Login ID"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setUserPinNo(e.target.value)}
                      type="text"
                      label="User Pin No"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setRoute(e.target.value)}
                      type="text"
                      label="Route (Contract No)"
                      helperText="If there are more than one route seperate them using commas (,)"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Vehicle Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      type="text"
                      label="Vehicle No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      size="large"
                      InputLabelProps={{ shrink: true }}
                      select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setVehicalType(e.target.value)}
                      value={vehicalType}
                      label="Vehicle Type"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      fullWidth
                    >
                      {/* <MenuItem value="car">Car</MenuItem> */}
                      <MenuItem value="bike">Bike</MenuItem>
                      <MenuItem value="van">Van</MenuItem>
                    </MDInput>
                  </MDBox>
                </Grid>
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
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Insuarance Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPolicyNo(e.target.value)}
                      type="text"
                      label="Policy No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setInsuaranceExpDate(e.target.value)}
                      type="date"
                      label="Expiery Date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
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
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Driver licence details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setLicenceId(e.target.value)}
                      type="text"
                      label="Driver License No"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={LicenceScanHnadler}
                      // onChange={(e) => setLicenceScan(e.target.value)}
                      type="file"
                      label="Scanned copy (PDF)"
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
                      type="date"
                      label="Expiery date"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}>Other Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      SelectProps={{
                        style: SelectFieldStyle,
                      }}
                      select
                      id="full-width-text-field"
                      InputProps={{
                        classes: { root: "select-input-styles" },
                      }}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setSupervisroEmail(e.target.value)}
                      value={supervisorEmail}
                      type="email"
                      label="Supervisor email"
                      // variant="standard"
                      fullWidth
                    >
                      {allSupervisors.map((supervisor) => (
                        <MenuItem value={supervisor.email}>
                          {supervisor.fname} {supervisor.lname}
                        </MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      // onChange={(e) => setProfilePhoto(e.target.value)}
                      onChange={ProfilePhotoHnadler}
                      type="file"
                      label="Profile Photo (JPG/JPEG/PNG)"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              {/* <Grid container spacing={3}> */}
              {/* <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setRoute(e.target.value)}
                      type="text"
                      label="Route"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
              {/* <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDeviceId(e.target.value)}
                      type="text"
                      label="DeviceId"
                      // value={username}
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid> */}
              {/* </Grid>  */}
            </MDBox>

            <MDBox p={2}>
              <MDBox pb={2}> Emergency Contact Details</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      type="text"
                      label="Name"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyNumber(e.target.value)}
                      type="text"
                      label="Contact number"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={
                        emergencyPhoneNo.length !== 10
                          ? "A contact number should contain 10 digits"
                          : ""
                      }
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEmergencyRelationship(e.target.value)}
                      type="text"
                      label="Relationship"
                      // variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox
              variant="gradient"
              bgColor="grey"
              borderRadius="lg"
              coloredShadow="dark"
              // mx={2}
              p={2}
              // textAlign="center"
            >
              <MDBox pb={2}>Set password</MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <MDBox>
                    <MDInput
                      // variant="filled"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="Password"
                      FormHelperTextProps={{ className: classes.error }}
                      helperText={password.length === 0 ? "password cannot be empty" : ""}
                      fullWidth
                      // success
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      // variant="filled"
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      label="Confirm Password"
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      FormHelperTextProps={{ className: classes.success }}
                      helperText={isPasswordMatching}
                      // variant="standard"
                      fullWidth
                      // success
                    />
                  </MDBox>
                </Grid>
              </Grid>
              {/* <MDBox display="flex" alignItems="center" ml={-1}>
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
              </MDBox> */}
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => registerDriver()} variant="gradient" color="info" fullWidth>
                sign in &nbsp;&nbsp;
                {loading ? <CircularProgress size={20} color="white" /> : ""}
              </MDButton>
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

export default DriverRegistration;
