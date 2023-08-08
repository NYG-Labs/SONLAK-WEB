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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import CircularProgress from "@mui/material/CircularProgress";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import adminSignIn from "api/apiCalls";
import axios from "axios";

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api/LoginUsers/Login`;

  async function sendSignInData() {
    setLoading(true);
    axios
      .post(baseURL, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.roleKey === "SUPERADMIN" || response.data.roleKey === "OTHERADMIN") {
          window.localStorage.setItem("roleKey", response.data.roleKey);
          window.localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          setErrorMessage("An unauthorized login");
          setIsError(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.errors[0]);
        setIsError(true);
      });
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => sendSignInData()}
                // component={Link}
                variant="gradient"
                color="info"
                fullWidth
                // to="/dashboard"
              >
                sign in &nbsp;&nbsp;
                {loading ? <CircularProgress size={20} color="white" /> : ""}
              </MDButton>
              {isError ? (
                <MDBox textAlign="center">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    size="sm"
                    // sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    {errorMessage}
                  </MDTypography>
                </MDBox>
              ) : (
                ""
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
