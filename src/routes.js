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
import EditDriver from "layouts/edit-profiles/driver";
import EditSupervisor from "layouts/edit-profiles/supervisor";
import EditAdmin from "layouts/edit-profiles/admin";
import AllIncidentReports from "layouts/incident-report";
import AllParcelDeliveries from "layouts/parcel-deliveries";
import AllVehicleCheck from "layouts/vehicle-check";
import EditETAPerformance from "layouts/eta-performance/edit-eta-performance";
import AllGuidelines from "layouts/guidelines";
import SafetyDelivery from "layouts/guidelines/safety-delivery";
import VehicleSafety from "layouts/guidelines/vehicle-safety";
import WHSPlan from "layouts/guidelines/whs";
import AllInactiveDrivers from "layouts/all-users/driver/inactive-index";
import AllInactiveSupervisors from "layouts/all-users/supervisor/inactive-index";
import AllComplaints from "layouts/complaints";
import AddComplaints from "layouts/complaints/new-complaint";
import AllToolBox from "layouts/toolbox";
import ToolBoxSupervisorDate from "layouts/toolbox/toolbox-day-supervisor";
import DriverDailySignIn from "layouts/daily-signin";
import SingleComplaints from "layouts/complaints/one-complaint";
// import SignOut from "layouts/authentication/sign-out";

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
    route: "/ETA-performance/:date",
    component: <DriverETAPerformance />,
  },
  {
    name: "Toolbox discussion",
    key: "toolbox-date-supervisor",
    route: "/toolbox-discussion/date-supervisor/:supervisor/:date",
    component: <ToolBoxSupervisorDate />,
  },
  {
    type: "collapse",
    name: "Incident Reports",
    key: "incident-reports",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Incident-reports",
    component: <AllIncidentReports />,
  },
  {
    type: "collapse",
    name: "ToolBox Discussion",
    key: "toolbox-discussion",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/toolbox-discussion",
    component: <AllToolBox />,
  },
  {
    type: "collapse",
    name: "Drivers Daily SignIn",
    key: "drivers-daily-signin",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/drivers-daily-signin",
    component: <DriverDailySignIn />,
  },
  {
    type: "collapse",
    name: "Parcel Deliveries",
    key: "parcel-deliveries",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Parcel-deliveries",
    component: <AllParcelDeliveries />,
  },
  {
    type: "collapse",
    name: "Vehicle Check",
    key: "vehicle-check",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/vehicle-check",
    component: <AllVehicleCheck />,
  },
  {
    name: "Drivers",
    key: "drivers",
    route: "/drivers",
    component: <AllDrivers />,
  },
  {
    name: "Inactive drivers",
    key: "inactive-drivers",
    route: "/drivers/inactive-drivers",
    component: <AllInactiveDrivers />,
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
    name: "Complaint",
    key: "complaint",
    route: "/All-Complaints/Complaint/:id",
    component: <SingleComplaints />,
  },
  {
    type: "collapse",
    name: "Complaints",
    key: "complaints",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/All-Complaints",
    component: <AllComplaints />,
  },
  {
    name: "add-complaints",
    key: "add-complaints",
    route: "/complaints/add-complaints",
    component: <AddComplaints />,
  },
  {
    name: "Inactive-Supervisors",
    key: "inactive-supervisors",
    route: "/supervisors/inactive-supervisors",
    component: <AllInactiveSupervisors />,
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
    route: "/drivers/:email",
    component: <DriverProfile />,
  },
  {
    name: "Edit Driver Profile",
    key: "edit-driver",
    route: "/drivers/:id/edit-driver",
    component: <EditDriver />,
  },
  {
    name: "Edit Supervisor Profile",
    key: "edit-supervisor",
    route: "/supervisors/:id/edit-supervisor",
    component: <EditSupervisor />,
  },
  {
    name: "Edit Admin Profile",
    key: "edit-admin",
    route: "/admins/:id/edit-admin",
    component: <EditAdmin />,
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
    type: "collapse",
    name: "Guidelines",
    key: "guidelines",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/guidelines",
    component: <AllGuidelines />,
  },
  {
    name: "Safety delivery",
    key: "safety-delivery",
    route: "/guidelines/safety-delivery",
    component: <SafetyDelivery />,
  },
  {
    name: "Vehicle safety",
    key: "vehicle-safety",
    route: "/guidelines/vehicle-safety",
    component: <VehicleSafety />,
  },
  {
    name: "WHS Plan",
    key: "whs-plan",
    route: "/guidelines/whs-plan",
    component: <WHSPlan />,
  },
  {
    name: "Edit ETA Performance",
    key: "edit-eta-performance",
    route: "/ETA-performance/edit-eta-performance/:id",
    component: <EditETAPerformance />,
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
  // {
  //   type: "collapse",
  //   name: "SignOut",
  //   key: "signout",
  //   icon: <Icon fontSize="small">logout</Icon>,
  //   route: "/",
  //   component: <SignOut />,
  // },
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
