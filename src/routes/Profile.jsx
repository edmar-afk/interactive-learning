import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  UserRound,
  Mail,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Sparkles,
  Sprout,
  Leaf,
  Sun,
  Trophy,
  Star,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Fingerprint,
  BadgeCheck,
  TreePine,
  Flower2,
  Crown,
  Activity,
  Shield,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

// ============================================================
// LOCAL STORAGE
// ============================================================

const getUserInfo = () => {
  try {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Unable to retrieve user information:", error);
    return null;
  }
};

// ============================================================
// HELPERS
// ============================================================

const getInitials = (firstName, lastName, username) => {
  const first = firstName?.trim()?.[0] || "";
  const last = lastName?.trim()?.[0] || "";

  if (first || last) {
    return `${first}${last}`.toUpperCase();
  }

  return username?.trim()?.slice(0, 2)?.toUpperCase() || "SG";
};

const getFullName = (user) => {
  const name = [
    user?.first_name,
    user?.last_name,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || user?.username || "Scan-Grow User";
};

const formatDate = (dateString) => {
  if (!dateString) return "Not provided";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// ============================================================
// COMPONENT
// ============================================================

export default function Profile() {
  const shouldReduceMotion = useReducedMotion();

  const [user] = useState(() => getUserInfo());
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // ============================================================
  // USER INFORMATION
  // ============================================================

  const fullName = getFullName(user);

  const username = user?.username || "No username";

  const email = user?.email || "No email provided";

  // Superuser = Teacher, otherwise Student
  const role = user?.is_superuser === true ? "Teacher" : "Student";

  const isTeacher = role === "Teacher";

  const initials = getInitials(
    user?.first_name,
    user?.last_name,
    user?.username
  );

  // Optional fields if your serializer provides them
  const yearLevel = user?.year_level || user?.yearLevel;
  const section = user?.section || user?.section_name;
  const gender = user?.gender;
  const birthDate = user?.birth_date || user?.birthDate;

  // ============================================================
  // ANIMATION CONFIGURATION
  // ============================================================

  const spring = {
    type: "spring",
    stiffness: 220,
    damping: 18,
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: spring,
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const floating = (delay = 0, distance = 12) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -distance, 0],
          rotate: [0, 8, -8, 0],
        },
    transition: {
      duration: 4 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  // ============================================================
  // INTERACTIVE CARDS
  // ============================================================

  const profileCards = useMemo(
    () => [
      {
        id: "username",
        title: "Username",
        value: username,
        description: "Your account identifier",
        icon: UserRound,
        color: "bg-blue-50 text-blue-600",
      },
      {
        id: "email",
        title: "Email Address",
        value: email,
        description: "Your registered email",
        icon: Mail,
        color: "bg-purple-50 text-purple-600",
      },
      {
        id: "role",
        title: "Account Role",
        value: role,
        description: isTeacher
          ? "You have a teacher account"
          : "You have a student account",
        icon: isTeacher ? GraduationCap : BookOpen,
        color: "bg-green-50 text-green-600",
      },
      {
        id: "status",
        title: "Account Status",
        value: user?.is_active === false ? "Inactive" : "Active",
        description:
          user?.is_active === false
            ? "Your account is currently inactive"
            : "Your account is enabled",
        icon: ShieldCheck,
        color:
          user?.is_active === false
            ? "bg-red-50 text-red-600"
            : "bg-emerald-50 text-emerald-600",
      },
    ],
    [username, email, role, isTeacher, user]
  );

  // ============================================================
  // NOT LOGGED IN
  // ============================================================

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-[#F2F8F3] flex items-center justify-center px-5 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white rounded-[30px] p-8 text-center shadow-xl max-w-sm w-full"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-3xl bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-5"
            >
              <UserRound size={38} />
            </motion.div>

            <h2 className="text-2xl font-extrabold text-[#17352B]">
              Welcome to Scan-Grow!
            </h2>

            <p className="text-sm text-gray-500 mt-3 leading-6">
              You need to sign in to view your profile and account information.
            </p>

            <motion.a
              href="/login"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="mt-7 flex items-center justify-center gap-2 bg-[#2E9B59] text-white font-bold py-4 rounded-2xl"
            >
              Sign In
              <Sparkles size={18} />
            </motion.a>
          </motion.div>
        </div>

        <BottomNav />
      </>
    );
  }

  // ============================================================
  // MAIN PROFILE
  // ============================================================

  return (
    <>
      <div className="min-h-screen bg-[#F2F8F3] pb-32 overflow-hidden">

        {/* ================================================== */}
        {/* HERO SECTION */}
        {/* ================================================== */}

        <section className="relative bg-gradient-to-br from-[#145C3A] via-[#238B50] to-[#55C879] pt-10 pb-28 px-5 overflow-hidden rounded-b-[42px]">

          {/* Background Decorations */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <motion.div
              {...floating(0, 20)}
              className="absolute top-12 right-[-20px] text-white/10"
            >
              <Leaf size={150} />
            </motion.div>

            <motion.div
              {...floating(1, 15)}
              className="absolute bottom-8 left-[-30px] text-white/10"
            >
              <TreePine size={120} />
            </motion.div>

            <motion.div
              {...floating(2, 12)}
              className="absolute top-28 left-[48%] text-white/10"
            >
              <Flower2 size={65} />
            </motion.div>

            {[
              { top: "15%", left: "15%" },
              { top: "35%", left: "85%" },
              { top: "65%", left: "25%" },
              { top: "75%", left: "75%" },
              { top: "10%", left: "65%" },
            ].map((particle, index) => (
              <motion.div
                key={index}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: [0.2, 1, 0.2],
                        scale: [0.7, 1.4, 0.7],
                        y: [0, -15, 0],
                      }
                }
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: index * 0.4,
                }}
                style={particle}
                className="absolute w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>

          {/* Header */}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/80 text-xs font-semibold tracking-widest uppercase">
                  <Sprout size={15} />
                  Scan-Grow
                </div>

                <h1 className="text-3xl font-black text-white mt-2">
                  My Profile
                </h1>

                <p className="text-green-100 text-sm mt-1">
                  Your personal learning space.
                </p>
              </div>

              <motion.div
                {...floating(0.5, 8)}
                className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-yellow-200 border border-white/20"
              >
                <Sun size={25} />
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Avatar */}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="relative z-10 max-w-3xl mx-auto mt-10 flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              className="relative"
            >
              <div className="w-28 h-28 rounded-[35px] bg-white p-1.5 shadow-2xl shadow-black/20">
                <div className="w-full h-full rounded-[29px] bg-gradient-to-br from-[#D8F8E1] to-[#A5E7B8] flex items-center justify-center text-[#17633B] text-4xl font-black">
                  {initials}
                </div>
              </div>

              {/* Verified indicator */}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white shadow-lg flex items-center justify-center text-green-600"
              >
                <BadgeCheck size={25} />
              </motion.div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl font-extrabold text-white mt-6 break-words"
            >
              {fullName}
            </motion.h2>

            <p className="text-green-100 text-sm mt-1">
              @{username}
            </p>

            {/* Role Badge */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white shadow-lg"
            >
              {isTeacher ? (
                <Crown size={17} className="text-yellow-200" />
              ) : (
                <GraduationCap size={18} className="text-green-100" />
              )}

              <span className="font-bold text-sm">
                {role}
              </span>

              <Sparkles size={14} className="text-yellow-200" />
            </motion.div>
          </motion.div>
        </section>

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <main className="relative z-20 max-w-3xl mx-auto px-5 -mt-16">

          {/* Welcome Card */}

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            className="bg-white rounded-[28px] p-5 sm:p-6 shadow-xl shadow-green-900/5 border border-green-50"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-12 h-12 shrink-0 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center"
              >
                <Sparkles size={24} />
              </motion.div>

              <div className="flex-1">
                <h3 className="font-extrabold text-[#17352B]">
                  {isTeacher ? "Hello, Teacher!" : "Keep Growing!"}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-6">
                  {isTeacher
                    ? "Your teaching journey makes a difference. Continue inspiring learners and helping them grow."
                    : "Every lesson brings you closer to becoming a better grower. Keep learning and exploring!"}
                </p>
              </div>
            </div>
          </motion.section>

          {/* ================================================== */}
          {/* ACCOUNT OVERVIEW */}
          {/* ================================================== */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#17352B]">
                  Account Overview
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Your registered account information
                </p>
              </div>

              <motion.div
                {...floating(1, 6)}
                className="text-green-600"
              >
                <Leaf size={25} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileCards.map((card, index) => {
                const Icon = card.icon;
                const isSelected = selectedCard === card.id;

                return (
                  <motion.button
                    key={card.id}
                    variants={fadeUp}
                    type="button"
                    onClick={() =>
                      setSelectedCard(isSelected ? null : card.id)
                    }
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { y: -6, scale: 1.025 }
                    }
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                    className={`text-left bg-white rounded-[24px] p-5 border shadow-sm transition-all ${
                      isSelected
                        ? "border-green-400 shadow-lg shadow-green-100"
                        : "border-gray-100 hover:border-green-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${card.color}`}>
                        <Icon size={21} />
                      </div>

                      <motion.div
                        animate={isSelected ? { rotate: 180 } : { rotate: 0 }}
                      >
                        <ChevronDown size={19} className="text-gray-400" />
                      </motion.div>
                    </div>

                    <p className="text-xs text-gray-400 font-semibold mt-4">
                      {card.title}
                    </p>

                    <h4 className="text-lg font-extrabold text-[#17352B] mt-1 break-words">
                      {card.value}
                    </h4>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-green-700 mt-3 pt-3 border-t border-green-100"
                        >
                          {card.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p className="text-[10px] text-gray-400 mt-3">
                      Tap to {isSelected ? "collapse" : "view details"}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* PERSONAL DETAILS */}
          {/* ================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8"
          >
            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-[#17352B]">
                Personal Details
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Additional information from your account
              </p>
            </div>

            <div className="bg-white rounded-[26px] border border-gray-100 shadow-sm overflow-hidden">

              {[
                {
                  label: "First Name",
                  value: user?.first_name || "Not provided",
                  icon: UserRound,
                },
                {
                  label: "Last Name",
                  value: user?.last_name || "Not provided",
                  icon: UserRound,
                },
                {
                  label: "Gender",
                  value: gender || "Not provided",
                  icon: Fingerprint,
                },
                {
                  label: "Birth Date",
                  value: formatDate(birthDate),
                  icon: CalendarDays,
                },
                ...(yearLevel
                  ? [{
                      label: "Year Level",
                      value: yearLevel,
                      icon: GraduationCap,
                    }]
                  : []),
                ...(section
                  ? [{
                      label: "Section",
                      value: section,
                      icon: BookOpen,
                    }]
                  : []),
              ].map((item, index, array) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    whileHover={{ backgroundColor: "#F5FBF6" }}
                    className={`flex items-center gap-4 px-5 py-4 ${
                      index !== array.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                      <Icon size={19} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">
                        {item.label}
                      </p>

                      <p className="text-sm font-bold text-[#254A35] mt-1 break-words">
                        {item.value}
                      </p>
                    </div>

                    <BadgeCheck size={17} className="text-green-400 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ================================================== */}
          {/* ROLE HIGHLIGHT */}
          {/* ================================================== */}

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85 }}
            whileHover={{ y: -4 }}
            className="mt-8 relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#164E35] to-[#247E4C] p-6 text-white shadow-lg"
          >
            <div className="absolute -right-6 -top-8 opacity-10">
              {isTeacher ? (
                <GraduationCap size={150} />
              ) : (
                <Sprout size={150} />
              )}
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-green-200 text-xs font-bold uppercase tracking-widest">
                <Activity size={16} />
                Your Scan-Grow Journey
              </div>

              <h3 className="text-2xl font-black mt-4">
                {isTeacher ? "Inspire. Teach. Grow." : "Learn. Plant. Grow."}
              </h3>

              <p className="text-sm text-green-100 mt-2 leading-6 max-w-sm">
                {isTeacher
                  ? "As a teacher, you help build knowledge and guide students through their agricultural learning journey."
                  : "Explore lessons, challenge yourself with quizzes, and discover the amazing world of growing fruit-bearing trees."}
              </p>

              <div className="mt-6 flex items-center gap-2 text-yellow-200">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <span className="text-xs font-semibold text-white ml-1">
                  Growing together with Scan-Grow
                </span>
              </div>
            </div>
          </motion.section>

          {/* ================================================== */}
          {/* ACCOUNT DETAILS EXPANDABLE */}
          {/* ================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <motion.button
              type="button"
              onClick={() => setShowAccountDetails(!showAccountDetails)}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Shield size={21} />
                </div>

                <div className="text-left">
                  <h3 className="font-extrabold text-[#17352B] text-sm">
                    Account Information
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    View additional account properties
                  </p>
                </div>
              </div>

              {showAccountDetails ? (
                <ChevronUp className="text-gray-400" />
              ) : (
                <ChevronDown className="text-gray-400" />
              )}
            </motion.button>

            <AnimatePresence>
              {showAccountDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                    {[
                      {
                        label: "User ID",
                        value: user?.id ?? "Not provided",
                      },
                      {
                        label: "Superuser",
                        value: user?.is_superuser ? "Yes" : "No",
                      },
                      {
                        label: "Staff Account",
                        value: user?.is_staff ? "Yes" : "No",
                      },
                      {
                        label: "Active Account",
                        value: user?.is_active ? "Yes" : "No",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center gap-3"
                      >
                        <span className="text-xs text-gray-400">
                          {item.label}
                        </span>

                        <span className="text-sm font-bold text-[#254A35]">
                          {String(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ================================================== */}
          {/* FOOTER */}
          {/* ================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 text-center"
          >
            <motion.div
              {...floating(0.5, 7)}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 text-green-700"
            >
              <Flower2 size={25} />
            </motion.div>

            <p className="text-sm font-bold text-[#285238] mt-3">
              Keep growing with Scan-Grow!
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Learn today. Plant tomorrow. Grow together. 🌱
            </p>

            <p className="text-[10px] text-gray-300 mt-4">
              SCAN-GROW • MY PROFILE
            </p>
          </motion.div>

        </main>
      </div>

      <BottomNav />
    </>
  );
}
