import React from "react";
import { House, BookOpen, FolderOpen, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();

  // GET LOGGED-IN USER
  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "{}");
    } catch {
      return {};
    }
  };

  const userInfo = getStoredUser();

  // ONLY SUPERUSER CAN SEE STUDENTS
  const isTeacher =
    userInfo?.is_superuser === true || userInfo?.is_superuser === "true";

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(`${path}/`));

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: House,
    },
    {
      name: "Lessons",
      path: "/lessons",
      icon: BookOpen,
    },
    {
      name: "Files",
      path: "/files",
      icon: FolderOpen,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
      teacherOnly: true,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  // HIDE STUDENTS FOR NON-TEACHERS
  const visibleNavItems = navItems.filter(
    (item) => !item.teacherOnly || isTeacher,
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#E9EFEB] px-3 py-3 flex items-center justify-around z-[9999] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {visibleNavItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              active ? "text-[#2E9B59]" : "text-[#91A097]"
            }`}
          >
            <Icon size={21} strokeWidth={active ? 2.7 : 2.3} />

            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
