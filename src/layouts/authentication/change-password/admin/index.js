import * as React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";

function ChangePasswordAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { roleKey } = useParams();
  const [loading, setLoading] = useState(false);
  const [password, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isPasswordMatching, setIsPasswordMatching] = useState("");

  const baseURL = `https://sonlakserver.azurewebsites.net/api/Admins/ChangePasswordAdminbyAdmin/${id}`;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const confirmPasswordValidation = (event) => {
    if (password === event) {
      setIsPasswordMatching("Password and Confirm Password is matching");
    } else {
      setIsPasswordMatching("");
    }
  };

  const bodyParameters = {
    email: id,
    password,
    oldPassword,
  };

  function changePassword() {
    if (isPasswordMatching === "") {
      window.alert("Confirm password and the password is not matching");
    } else {
      setLoading(true);
      axios
        .put(baseURL, bodyParameters, config)
        .then((response) => {
          if (response.status === 200 && roleKey.includes("ADMIN")) {
            alert("Password updated successfully! Please login again!");
            navigate(`/`);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error = ", error.response);
          alert("An unexpected error occured! please check the values and try again");
        });
    }
  }

  if (
    window.localStorage.getItem("token") === null ||
    window.localStorage.getItem("roleKey") !== "SUPERADMIN"
  ) {
    navigate("/");
  }
  return (
    <DashboardLayout>
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
        >
          <Grid container spacing={3}>
            <Grid item xs={12} mr={8} md={8.5}>
              <MDTypography mt={1} ml={2} variant="h5" color="white">
                Change Password
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={-2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox p={2}>
              <Grid container spacing={3}>
                <br />
                <Grid item xs={12} md={4}>
                  <MDBox mb={3}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      placeholder={roleKey}
                      type="text"
                      label="User Type"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      inputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      placeholder={id}
                      type="text"
                      label="Email"
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
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="password"
                      label="Old Password"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      label="New Password"
                      fullWidth
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={4}>
                  <MDBox mb={2}>
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => confirmPasswordValidation(e.target.value)}
                      type="password"
                      label="Confirm New Password"
                      helperText={isPasswordMatching}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2}>
                    <MDButton
                      component={Link}
                      to={`/admins/${id}`}
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
                      onClick={() => changePassword()}
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
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default ChangePasswordAdmin;
