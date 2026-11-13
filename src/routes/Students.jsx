
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Plus,
  Eye,
  Trash2,
  X,
  LoaderCircle,
  RefreshCw,
  User,
  CalendarDays,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import api from "../assets/api";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo") || "{}");
  } catch {
    return {};
  }
};

function Students() {
  const navigate = useNavigate();

  const userInfo = useMemo(() => getStoredUser(), []);

  const isTeacher =
    userInfo?.is_superuser === true ||
    userInfo?.is_superuser === "true";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    password: "",
  });

  // FETCH STUDENTS
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/students/");

      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Unable to load students. Please check your Django API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isTeacher) {
      setLoading(false);
      return;
    }

    fetchStudents();
  }, [isTeacher, fetchStudents]);

  // SEARCH STUDENTS
  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return students;

    return students.filter((student) => {
      return (
        (student.first_name || "").toLowerCase().includes(keyword) ||
        (student.username || "").toLowerCase().includes(keyword) ||
        String(student.id).includes(keyword)
      );
    });
  }, [students, search]);

  // FORM INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      first_name: "",
      username: "",
      password: "",
    });
  };

  // REGISTER STUDENT
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isTeacher || submitting) return;

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await api.post("/api/students/", formData);

      setSuccess(
        response.data?.message || "Student registered successfully."
      );

      setShowRegister(false);
      resetForm();

      await fetchStudents();
    } catch (err) {
      console.error("Student registration error:", err);

      const data = err.response?.data;

      if (data && typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, messages]) => {
            const value = Array.isArray(messages)
              ? messages.join(", ")
              : String(messages);

            return `${field}: ${value}`;
          })
          .join("\n");

        setError(messages || "Registration failed.");
      } else {
        setError("Unable to register student. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // VIEW STUDENT DETAILS
  const handleViewStudent = async (student) => {
    try {
      setError("");

      const response = await api.get(`/api/students/${student.id}/`);

      setSelectedStudent(response.data);
    } catch (err) {
      console.error("Failed to load student details:", err);
      setError("Unable to load student details.");
    }
  };

  // DELETE STUDENT
  const handleDeleteStudent = async (student) => {
    if (!isTeacher || deletingId !== null) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        student.first_name || student.username
      }? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(student.id);
      setError("");
      setSuccess("");

      await api.delete(`/api/students/${student.id}/`);

      setStudents((previous) =>
        previous.filter((item) => item.id !== student.id)
      );

      if (selectedStudent?.id === student.id) {
        setSelectedStudent(null);
      }

      setSuccess("Student deleted successfully.");
    } catch (err) {
      console.error("Student deletion error:", err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Unable to delete student."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // CLOSE REGISTRATION MODAL
  const closeRegister = () => {
    if (submitting) return;

    setShowRegister(false);
    resetForm();
  };

  if (!isTeacher) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-5">
        <div className="bg-white rounded-2xl border border-[#E9EFEB] p-8 text-center max-w-md w-full shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-xl font-extrabold text-[#25372C]">
            Access Restricted
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Only teachers and administrators can manage students.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-3 rounded-xl bg-[#2E9B59] text-white font-bold text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] pb-24">

      {/* HEADER */}
      <div className="bg-white border-b border-[#E9EFEB] px-5 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <div className="flex items-center gap-2 text-[#2E9B59] mb-2">
                <Users size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Student Management
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25372C]">
                Students
              </h1>

              <p className="text-sm text-[#829087] mt-1">
                Register, view, and manage student accounts.
              </p>
            </div>

            <button
              onClick={() => setShowRegister(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2E9B59] hover:bg-[#25834A] text-white font-bold text-sm shadow-sm transition"
            >
              <Plus size={19} />
              Register Student
            </button>

          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-7">

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />

            <p className="text-sm whitespace-pre-line">{error}</p>

            <button
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-5 flex items-center gap-3 p-4 rounded-xl border border-green-200 bg-green-50 text-green-700">
            <ShieldCheck size={19} />

            <p className="text-sm">{success}</p>

            <button
              onClick={() => setSuccess("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <div className="bg-white rounded-2xl border border-[#E9EFEB] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#829087] font-medium">
                  Total Students
                </p>

                <p className="text-3xl font-extrabold text-[#25372C] mt-2">
                  {students.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center">
                <Users size={23} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EFEB] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#829087] font-medium">
                  Active Students
                </p>

                <p className="text-3xl font-extrabold text-[#25372C] mt-2">
                  {students.filter((student) => student.is_active).length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={23} />
              </div>
            </div>
          </div>

        </div>

        {/* STUDENT TABLE */}
        <section className="bg-white rounded-2xl border border-[#E9EFEB] overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-[#E9EFEB]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <h2 className="text-lg font-extrabold text-[#25372C]">
                  Student Accounts
                </h2>

                <p className="text-xs text-[#91A097] mt-1">
                  {filteredStudents.length} student
                  {filteredStudents.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex gap-2">

                <div className="relative flex-1 sm:w-72">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91A097]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3EBE5] bg-[#FAFCFA] text-sm outline-none focus:border-[#2E9B59]"
                  />
                </div>

                <button
                  onClick={fetchStudents}
                  disabled={loading}
                  title="Refresh students"
                  className="px-3 rounded-xl border border-[#E3EBE5] text-[#617269] hover:bg-[#F7FAF8] disabled:opacity-50"
                >
                  <RefreshCw
                    size={18}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>

              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-[#F8FAF8]">
                <tr className="text-xs uppercase tracking-wider text-[#829087]">
                  <th className="px-6 py-4 font-bold">Full Name</th>
                  <th className="px-6 py-4 font-bold">Username</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EDF1EE]">

                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <LoaderCircle
                        size={28}
                        className="animate-spin mx-auto text-[#2E9B59]"
                      />

                      <p className="text-sm text-gray-400 mt-3">
                        Loading students...
                      </p>
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <Users
                        size={35}
                        className="mx-auto text-[#C4D0C7]"
                      />

                      <p className="font-bold text-[#526257] mt-3">
                        No students found
                      </p>

                      <p className="text-sm text-[#91A097] mt-1">
                        Register a student or try another search.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-[#FAFCFA] transition"
                    >

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center font-extrabold">
                            {(student.first_name || student.username || "S")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-bold text-sm text-[#304136]">
                              {student.first_name || "Unnamed Student"}
                            </p>

                            <p className="text-xs text-[#91A097]">
                              Student ID: {student.id}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#617269]">
                        {student.username}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            student.is_active
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {student.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">

                          <button
                            onClick={() => handleViewStudent(student)}
                            title="View details"
                            className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => handleDeleteStudent(student)}
                            disabled={deletingId === student.id}
                            title="Delete student"
                            className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50"
                          >
                            {deletingId === student.id ? (
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* REGISTER STUDENT MODAL */}
      {showRegister && (
        <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9EFEB]">
              <div>
                <h2 className="text-lg font-extrabold text-[#25372C]">
                  Register Student
                </h2>

                <p className="text-xs text-[#91A097] mt-1">
                  Create a new student account.
                </p>
              </div>

              <button
                onClick={closeRegister}
                disabled={submitting}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegister} className="p-6 space-y-4">

              {/* FULL NAME */}
              <div>
                <label className="block text-sm font-bold text-[#526257] mb-2">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                  className="w-full border border-[#DCE6DE] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2E9B59]"
                  placeholder="Enter student's full name"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="block text-sm font-bold text-[#526257] mb-2">
                  Username *
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  autoComplete="username"
                  className="w-full border border-[#DCE6DE] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2E9B59]"
                  placeholder="Choose a username"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-bold text-[#526257] mb-2">
                  Password *
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full border border-[#DCE6DE] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2E9B59]"
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={closeRegister}
                  disabled={submitting}
                  className="px-5 py-3 rounded-xl border border-[#DCE6DE] text-[#617269] font-bold text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 rounded-xl bg-[#2E9B59] hover:bg-[#25834A] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Create Student
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT DETAILS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-[#E9EFEB]">
              <h2 className="text-lg font-extrabold text-[#25372C]">
                Student Details
              </h2>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">

              <div className="flex flex-col items-center text-center pb-6 border-b border-[#E9EFEB]">

                <div className="w-20 h-20 rounded-full bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center mb-3">
                  <User size={35} />
                </div>

                <h3 className="text-xl font-extrabold text-[#25372C]">
                  {selectedStudent.first_name || "Unnamed Student"}
                </h3>

                <p className="text-sm text-[#91A097] mt-1">
                  Student #{selectedStudent.id}
                </p>

                <span
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                    selectedStudent.is_active
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {selectedStudent.is_active
                    ? "Active Account"
                    : "Inactive Account"}
                </span>

              </div>

              <div className="space-y-5 pt-6">

                <div className="flex items-start gap-3">
                  <User size={19} className="text-[#2E9B59] mt-0.5" />

                  <div>
                    <p className="text-xs text-[#91A097]">Full Name</p>

                    <p className="text-sm font-bold text-[#304136]">
                      {selectedStudent.first_name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User size={19} className="text-[#2E9B59] mt-0.5" />

                  <div>
                    <p className="text-xs text-[#91A097]">Username</p>

                    <p className="text-sm font-bold text-[#304136]">
                      {selectedStudent.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={19} className="text-[#2E9B59] mt-0.5" />

                  <div>
                    <p className="text-xs text-[#91A097]">Account Status</p>

                    <p className="text-sm font-bold text-[#304136]">
                      {selectedStudent.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>

              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full mt-7 px-5 py-3 rounded-xl bg-[#2E9B59] text-white font-bold text-sm hover:bg-[#25834A]"
              >
                Close Details
              </button>

            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Students;
