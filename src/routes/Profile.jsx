import React, { useEffect, useState } from "react";
import {
  UserRound,
  CalendarDays,
  Save,
  CheckCircle2,
  User,
  Cake,
  UsersRound,
  Pencil,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const PROFILE_KEY = "userProfile";

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const calculateAge = (birthDate) => {
  if (!birthDate) return "";

  const birth = new Date(`${birthDate}T00:00:00`);
  const today = new Date();

  if (Number.isNaN(birth.getTime()) || birth > today) {
    return "";
  }

  let age = today.getFullYear() - birth.getFullYear();

  const hasHadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasHadBirthday) {
    age--;
  }

  return age;
};

const getSavedProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedProfile = getSavedProfile();

    if (savedProfile) {
      setProfile({
        fullName: savedProfile.fullName || "",
        gender: savedProfile.gender || "",
        birthDate: savedProfile.birthDate || "",
      });
    }
  }, []);

  const age = calculateAge(profile.birthDate);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!profile.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!profile.gender) {
      setError("Please select your gender.");
      return;
    }

    if (!profile.birthDate) {
      setError("Please select your birth date.");
      return;
    }

    const calculatedAge = calculateAge(profile.birthDate);

    if (calculatedAge === "" || calculatedAge < 0) {
      setError("Please enter a valid birth date.");
      return;
    }

    const profileToSave = {
      fullName: profile.fullName.trim(),
      age: calculatedAge,
      gender: profile.gender,
      birthDate: profile.birthDate,
    };

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profileToSave));
      setSaved(true);
      setError("");
    } catch {
      setError("Unable to save your profile. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <>
      <div className="min-h-screen bg-[#F5F9F7] pb-28">
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {/* Page Heading */}
          <div className="mb-7">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <UserRound size={25} />
            </div>

            <h1 className="text-2xl font-bold text-[#17352B] sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Manage your personal information and keep your profile up to date.
            </p>
          </div>

          {/* Profile Summary */}
          <section className="mb-6 overflow-hidden rounded-2xl bg-[#17352B] p-6 text-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/10">
                <UserRound size={32} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-green-100">Welcome</p>

                <h2 className="mt-1 break-words text-xl font-bold">
                  {profile.fullName.trim() || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-green-100">
                  {profile.gender || "Personal Profile"}
                  {age !== "" ? ` • ${age} years old` : ""}
                </p>
              </div>
            </div>
          </section>

          {/* Profile Form */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Pencil size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#17352B]">
                  Personal Information
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Fill in your details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>

                <div className="relative">
                  <UsersRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    id="gender"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pl-11`}
                    required
                  >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className={labelClass}>
                  Birth Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={profile.birthDate}
                    onChange={handleChange}
                    max={getToday()}
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className={labelClass}>
                  Age
                </label>

                <div className="relative">
                  <Cake
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="age"
                    type="number"
                    value={age}
                    placeholder="Calculated from birth date"
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-gray-50 pl-11 text-gray-500`}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Your age is calculated automatically from your birth date.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Save Status */}
              {saved && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                >
                  <CheckCircle2 size={18} />
                  Profile saved successfully!
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F6B4F] px-5 py-3.5 font-semibold text-white transition hover:bg-[#0B563F] focus:outline-none focus:ring-4 focus:ring-green-100 active:scale-[0.99]"
              >
                <Save size={19} />
                Save Profile
              </button>
            </form>
          </section>

          {/* Storage Information */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50/70 p-4">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-green-700"
            />

            <p className="text-xs leading-5 text-gray-600">
              Your profile is saved in this browser's local storage. It will
              remain available after refreshing the page, but it will not
              automatically sync to another device or browser.
            </p>
          </div>
        </main>
      </div>{" "}
      <BottomNav />
    </>
  );
}
