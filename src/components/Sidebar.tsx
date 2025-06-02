
// // import React from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   LayoutGrid,
// //   FileText,
// //   Clock,
// //   Settings,
// //   LogOut
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // const Sidebar = () => {
// //   const location = useLocation();

// //   const menuItems = [
// //     { icon: LayoutGrid, label: "Overview", path: "/overview" },
// //     { icon: FileText, label: "Claims", path: "/claims" },
// //     { icon: FileText, label: "AI Report", path: "/" },
// //     { icon: Clock, label: "History", path: "/history" }, // ✅ New!
// //     { icon: Settings, label: "Settings", path: "/settings" },
// //     // { icon: LogOut, label: "Logout", path: "/logout" },
// //   ];

// //   return (
// //     <div className="w-60 bg-white border-r border-gray-100 h-full fixed left-0">
// //       <div className="p-5">
// //         {/* Logo/Title */}
// //         <div className="flex items-center mb-8">
// //           <span className="text-lg font-bold">TPL</span>
// //           <span className="text-lg font-bold text-orange-500 ml-1">Claims</span>
// //         </div>

// //         {/* Menu Links */}
// //         <div className="space-y-1">
// //           {menuItems.map((item) => {
// //             const isAIReportSection =
// //               item.path === "/" &&
// //               ["/", "/review-damage", "/generate-report"].includes(location.pathname);

// //             const isActive = location.pathname === item.path || isAIReportSection;

// //             return (
// //               <Link
// //                 key={item.label}
// //                 to={item.path}
// //                 className={cn(
// //                   "flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
// //                   isActive && (item.path === "/" ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-black")
// //                 )}
// //               >
// //                 <item.icon
// //                   className={cn("mr-3", isActive && item.path === "/" && "text-orange-500")}
// //                   size={20}
// //                 />
// //                 <span className={cn(isActive && item.path === "/" && "text-orange-500")}>
// //                   {item.label}
// //                 </span>
// //               </Link>
// //             );
// //           })}
// //         </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default Sidebar;


// //above code is fine , the below code has settings bar in it

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutGrid,
//   FileText,
//   Clock,
//   LogOut
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { SettingsDialog } from "@/components/SettingDialog";

// const Sidebar = () => {
//   const location = useLocation();

//   const menuItems = [
//     { icon: LayoutGrid, label: "Overview", path: "/overview" },
//     { icon: FileText, label: "Claims", path: "/claims" },
//     { icon: FileText, label: "AI Report", path: "/" },
//     { icon: Clock, label: "History", path: "/history" }
//   ];

//   return (
//     <div className="w-60 bg-white border-r border-gray-100 h-full fixed left-0 flex flex-col justify-between">
//       {/* Top Section */}
//       <div className="p-5">
//         <div className="flex items-center mb-8">
//           <span className="text-lg font-bold">TPL</span>
//           <span className="text-lg font-bold text-orange-500 ml-1">Claims</span>
//         </div>

//         {/* Navigation Links */}
//         <div className="space-y-1">
//           {menuItems.map((item) => {
//             const isAIReportSection =
//               item.path === "/" &&
//               ["/", "/review-damage", "/generate-report"].includes(location.pathname);

//             const isActive = location.pathname === item.path || isAIReportSection;

//             return (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className={cn(
//                   "flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
//                   isActive && (item.path === "/" ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-black")
//                 )}
//               >
//                 <item.icon
//                   className={cn("mr-3", isActive && item.path === "/" && "text-orange-500")}
//                   size={20}
//                 />
//                 <span className={cn(isActive && item.path === "/" && "text-orange-500")}>
//                   {item.label}
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="p-5 space-y-1">
//         <SettingsDialog />

//         <Link
//           to="/logout"
//           className="flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//         >
//           <LogOut className="mr-3" size={20} />
//           <span>Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// src/components/Sidebar.tsx

import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Clock,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "@/components/SettingDialog";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1) Detect whether an admin is logged in
  const isAdmin = Boolean(localStorage.getItem("admin_token"));

  // 2) Define separate menu items for employees vs. admins
  const employeeMenu = [
    { icon: LayoutGrid, label: "Overview",  path: "/dashboard" },
    { icon: FileText,   label: "Claims",    path: "/claims" },
    { icon: FileText,   label: "AI Report", path: "/ai-report" },
    { icon: Clock,      label: "History",   path: "/history" },
  ];

  const adminMenu = [
    { icon: LayoutGrid, label: "Dashboard",         path: "/dashboard" },
    { icon: FileText,   label: "High-Value Claims", path: "/admin-dashboard" },
    { icon: FileText,   label: "AI Report",         path: "/ai-report" },
    { icon: Clock,      label: "History",           path: "/history" },
  ];

  // 3) Choose which menu to render
  const menuItems = isAdmin ? adminMenu : employeeMenu;

  // 4) Logout should clear both tokens
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="w-60 bg-white border-r border-gray-100 h-full fixed left-0 flex flex-col justify-between">
      {/* Logo (clickable) */}
      <div className="p-5">
        <img
          src={new URL("../INTELLICLAIM LOGO.png", import.meta.url).href}
          alt="IntelliClaims Logo"
          className="h-210 w-auto cursor-pointer"
          onClick={() => navigate(isAdmin ? "/admin-dashboard" : "/dashboard")}
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
                isActive && "bg-orange-100 text-orange-600 font-medium"
              )}
            >
              <Icon className="mr-3" size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-5 space-y-1">
        <SettingsDialog />
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3" size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
