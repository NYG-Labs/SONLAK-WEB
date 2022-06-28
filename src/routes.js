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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
import AllAdmins from "layouts/all-users/admin";
import AllDrivers from "layouts/all-users/driver";
import AllSupervisors from "layouts/all-users/supervisor";
// import DriverProfile from "layouts/user-profiles/driver";
// import AdminProfile from "layouts/user-profiles/admin";
// import SupervisorProfile from "layouts/user-profiles/supervisor";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import SignUpAdmin from "layouts/authentication/registration-forms/admin";
import SignUpDriver from "layouts/authentication/registration-forms/driver";
import SignUpSupervisor from "layouts/authentication/registration-forms/supervisor";
import AdminProfile from "layouts/user-profiles/admin";
import DriverProfile from "layouts/user-profiles/driver";
import SupervisorProfile from "layouts/user-profiles/supervisor";
import AllUsers from "layouts/all-users";
import AllUserRegistrations from "layouts/authentication/registration-forms";
import AllETAPerformances from "layouts/eta-performance";
import AddETAPerformance from "layouts/eta-performance/add-eta-performance";
import DriverETAPerformance from "layouts/eta-performance/driver-eta-performance";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <AllUsers />,
  },
  {
    type: "collapse",
    name: "ETA Performance",
    key: "all-eta-performance",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ETA-performance",
    component: <AllETAPerformances />,
  },
  {
    name: "Add ETA Performance",
    key: "add-eta-performance",
    route: "/ETA-performance/Add-ETA-performance",
    component: <AddETAPerformance />,
  },
  {
    name: "ETA Performance",
    key: "driver-eta-performance",
    route: "/ETA-performance/ETA-performance",
    component: <DriverETAPerformance />,
  },
  {
    name: "Drivers",
    key: "drivers",
    route: "/drivers",
    component: <AllDrivers />,
  },
  {
    name: "Admins",
    key: "admins",
    route: "/admins",
    component: <AllAdmins />,
  },
  {
    name: "Supervisors",
    key: "supervisors",
    route: "/supervisors",
    component: <AllSupervisors />,
  },
  {
    name: "Supervisor Profile",
    key: "supervisor-profile",
    route: "/supervisors/:id",
    component: <SupervisorProfile />,
  },
  {
    name: "Admin Profile",
    key: "admin-profile",
    route: "/admins/:id",
    component: <AdminProfile />,
  },
  {
    name: "Driver Profile",
    key: "driver-profile",
    route: "/drivers/:id",
    component: <DriverProfile />,
  },
  {
    type: "collapse",
    name: "Add users",
    key: "addUsers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/add-user",
    component: <AllUserRegistrations />,
  },
  {
    name: "Billing",
    key: "billing",
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  // {
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/",
    component: <SignIn />,
  },
  {
    name: "Supervisor registration",
    key: "signUpSupervisor",
    route: "/add-user/supervisor",
    component: <SignUpSupervisor />,
  },
  {
    name: "Driver registration",
    key: "SignUpDriver",
    route: "/add-user/driver",
    component: <SignUpDriver />,
  },
  {
    name: "Admin registration",
    key: "SignUpAdmin",
    route: "/add-user/admin",
    component: <SignUpAdmin />,
  },
];

export default routes;
// {
//   type: "collapse",
//   name: "Registrations",
//   key: "authentication",
//   icon: <Icon fontSize="small">assignment</Icon>,
//   // route: "/authentication/sign-up",
//   collapse: [
//     {
//       // type: "title",
//       name: "Supervisor registration",
//       key: "SignUpSupervisor",
//       // icon: <Icon fontSize="small">assignment</Icon>,
//       route: "/authentication/registration/supervisor",
//       component: <SignUpSupervisor />,
//     },
//     {
//       // type: "title",
//       name: "Driver registration",
//       key: "SignUpDriver",
//       // icon: <Icon fontSize="small">assignment</Icon>,
//       route: "/authentication/registration/driver",
//       component: <SignUpDriver />,
//     },
//     {
//       // type: "title",
//       name: "Admin registration",
//       key: "SignUpAdmin",
//       // icon: <Icon fontSize="small">assignment</Icon>,
//       route: "/authentication/registration/admin",
//       component: <SignUpAdmin />,
//     },
//   ],
// },
