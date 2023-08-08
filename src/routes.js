import Dashboard from "layouts/dashboard";
import AllAdmins from "layouts/all-users/admin";
import AllDrivers from "layouts/all-users/driver";
import AllSupervisors from "layouts/all-users/supervisor";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
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
// import AddComplaints from "layouts/complaints/new-complaint";
import AllToolBox from "layouts/toolbox";
import ToolBoxSupervisorDate from "layouts/toolbox/toolbox-day-supervisor";
import DriverDailySignIn from "layouts/daily-signin";
import SingleComplaints from "layouts/complaints/one-complaint";
import AllCompliance from "layouts/compliance";
import AddCompliance from "layouts/compliance/add-compliance";
import EditCompliance from "layouts/compliance/edit-compliance";
import ChangePasswordAdmin from "layouts/authentication/change-password/admin";
import ChangePasswordDriver from "layouts/authentication/change-password/driver";
import ChangePasswordSupervisor from "layouts/authentication/change-password/supervisor";
import AddParcelDeliveries from "layouts/parcel-deliveries/add-parcel-deliveries";
import SignPDF from "layouts/incident-report/sign-pdf";
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
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users",
    component: <AllUsers />,
  },
  {
    type: "collapse",
    name: "ETA Performance",
    key: "all-eta-performance",
    icon: <Icon fontSize="small">leaderboard</Icon>,
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
    name: "Sign Incident Report",
    key: "sign-incident-report",
    route: "/Incident-reports/Sign-incident-reports/:id",
    component: <SignPDF />,
  },
  {
    name: "Add Parcel Deliveries",
    key: "add-parcel-deliveries",
    route: "/Parcel-deliveries/Add-Parcel-deliveries",
    component: <AddParcelDeliveries />,
  },
  {
    name: "Change Password Admin",
    key: "change-password-admin",
    route: "/change-password-admin/:id/:roleKey",
    component: <ChangePasswordAdmin />,
  },
  {
    name: "Change Password Driver",
    key: "change-password-driver",
    route: "/change-password-driver/:id/:roleKey",
    component: <ChangePasswordDriver />,
  },
  {
    name: "Change Password Supervisor",
    key: "change-password-supervisor",
    route: "/change-password-supervisor/:id/:roleKey",
    component: <ChangePasswordSupervisor />,
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
    icon: <Icon fontSize="small">minor_crash</Icon>,
    route: "/Incident-reports",
    component: <AllIncidentReports />,
  },
  {
    type: "collapse",
    name: "ToolBox Discussion",
    key: "toolbox-discussion",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/toolbox-discussion",
    component: <AllToolBox />,
  },
  {
    type: "collapse",
    name: "Drivers Daily SignIn",
    key: "drivers-daily-signin",
    icon: <Icon fontSize="small">location_on</Icon>,
    route: "/drivers-daily-signin",
    component: <DriverDailySignIn />,
  },
  {
    type: "collapse",
    name: "Parcel Deliveries",
    key: "parcel-deliveries",
    icon: <Icon fontSize="small">local_shipping</Icon>,
    route: "/Parcel-deliveries",
    component: <AllParcelDeliveries />,
  },
  {
    type: "collapse",
    name: "Vehicle Check",
    key: "vehicle-check",
    icon: <Icon fontSize="small">taxi_alert</Icon>,
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
    icon: <Icon fontSize="small">report_problem</Icon>,
    route: "/All-Complaints",
    component: <AllComplaints />,
  },
  {
    type: "collapse",
    name: "Compliance",
    key: "compliance",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/compliance",
    component: <AllCompliance />,
  },
  {
    name: "Edit compliance",
    key: "edit-complaice",
    route: "/compliance/edit-compliance/:id",
    component: <EditCompliance />,
  },
  {
    name: "add-compliance",
    key: "add-compliance",
    route: "/compliance/add-compliance",
    component: <AddCompliance />,
  },
  // {
  //   name: "add-complaints",
  //   key: "add-complaints",
  //   route: "/complaints/add-complaints",
  //   component: <AddComplaints />,
  // },
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
    icon: <Icon fontSize="small">group_add</Icon>,
    route: "/add-user",
    component: <AllUserRegistrations />,
  },
  {
    type: "collapse",
    name: "Guidelines",
    key: "guidelines",
    icon: <Icon fontSize="small">bookmark_added</Icon>,
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
