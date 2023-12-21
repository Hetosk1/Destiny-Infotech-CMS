import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";


import Attendance from "views/admin/attendance";
import Employee from "views/admin/employees";
import Leaves from "views/admin/leaves";
import Payroll from "views/admin/payroll";
import Recruitment from "views/admin/recruitment";



// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdExitToApp,
  MdMonetizationOn,
  MdCode,
  MdCheck,
  MdNewLabel,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Attendance",
    layout: "/admin",
    path: "attandace",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Attendance/>
  },
  {
    name: "Employees",
    layout: "/admin",
    path: "employee",
    icon: <MdHome className="h-6 w-6" />,
    component: <Employee/>
  },
  {
    name: "Leaves",
    layout: "/admin",
    path: "leaves",
    icon: <MdExitToApp className="h-6 w-6" />,
    component: <Leaves />
  },
  {
    name: "Payroll",
    layout: "/admin",
    path: "payroll",
    icon: <MdMonetizationOn className="h-6 w-6" />,
    component: <Payroll/>
  },
  {
    name: "Recruitment",
    layout: "/admin",
    path: "recruitment",
    icon: <MdNewLabel className="h-6 w-6" />,
    component: <Recruitment/>
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign Out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

];
export default routes;
