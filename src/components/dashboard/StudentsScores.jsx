/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Award,
  CalendarDays,
  MessageSquare,
  Filter,
  GraduationCap,
} from "lucide-react";
import api from "../../assets/api";

const ITEMS_PER_PAGE = 10;
const PASSING_PERCENTAGE = 50;

function StudentsScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Convert different score formats into a percentage.
  // Supported examples: "80%", "8/10", "80"
  const getPercentage = (score) => {
    if (score === null || score === undefined || score === "") {
      return 0;
    }

    const scoreText = String(score).trim();

    if (scoreText.includes("/")) {
      const [obtained, total] = scoreText.split("/").map(Number);

      if (Number.isFinite(obtained) && Number.isFinite(total) && total > 0) {
        return Math.max(0, Math.min(100, (obtained / total) * 100));
      }

      return 0;
    }

    const numericScore = parseFloat(scoreText.replace("%", ""));

    if (!Number.isFinite(numericScore)) {
      return 0;
    }

    return Math.max(0, Math.min(100, numericScore));
  };

  // 50% and above = Passed. Below 50% = Failed.
  const getStatus = (percentage) => {
    return percentage >= PASSING_PERCENTAGE ? "Passed" : "Failed";
  };

  const formatPercentage = (percentage) => {
    return `${Number(percentage).toFixed(1)}%`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch all student quiz scores.
  const fetchScores = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/quiz-scores/all/");

      const responseData = response.data;

      const data = Array.isArray(responseData)
        ? responseData
        : responseData?.results || responseData?.data || [];

      setScores(data);
    } catch (err) {
      console.error("Error fetching student scores:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Unable to load student quiz scores.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  // Normalize scores and derive status from percentage.
  const normalizedScores = useMemo(() => {
    return scores.map((item) => {
      const percentage = getPercentage(item.score);

      return {
        ...item,
        percentage,
        normalizedStatus: getStatus(percentage),
        studentName: item.first_name?.trim() || `Student #${item.user_id}`,
      };
    });
  }, [scores]);

  // Count unique students.
  const uniqueStudents = useMemo(() => {
    return new Set(normalizedScores.map((item) => item.user_id)).size;
  }, [normalizedScores]);

  // Dashboard statistics.
  const statistics = useMemo(() => {
    const total = normalizedScores.length;

    const passed = normalizedScores.filter(
      (item) => item.percentage >= PASSING_PERCENTAGE,
    ).length;

    const failed = normalizedScores.filter(
      (item) => item.percentage < PASSING_PERCENTAGE,
    ).length;

    const average = total
      ? normalizedScores.reduce((sum, item) => sum + item.percentage, 0) / total
      : 0;

    return {
      total,
      students: uniqueStudents,
      passed,
      failed,
      average,
    };
  }, [normalizedScores, uniqueStudents]);

  // Search and filter.
  const filteredScores = useMemo(() => {
    let result = [...normalizedScores];

    const search = searchTerm.toLowerCase().trim();

    if (search) {
      result = result.filter((item) => {
        return (
          String(item.studentName || "")
            .toLowerCase()
            .includes(search) ||
          String(item.user_id || "")
            .toLowerCase()
            .includes(search) ||
          String(item.title || "")
            .toLowerCase()
            .includes(search) ||
          String(item.score || "")
            .toLowerCase()
            .includes(search) ||
          String(item.normalizedStatus || "")
            .toLowerCase()
            .includes(search) ||
          String(item.comment || "")
            .toLowerCase()
            .includes(search)
        );
      });
    }

    // Status filter uses the calculated 50% threshold.
    if (statusFilter !== "all") {
      result = result.filter(
        (item) => item.normalizedStatus.toLowerCase() === statusFilter,
      );
    }

    // Percentage filter.
    switch (scoreFilter) {
      case "90":
        result = result.filter((item) => item.percentage >= 90);
        break;

      case "80":
        result = result.filter(
          (item) => item.percentage >= 80 && item.percentage < 90,
        );
        break;

      case "70":
        result = result.filter(
          (item) => item.percentage >= 70 && item.percentage < 80,
        );
        break;

      case "50":
        result = result.filter(
          (item) => item.percentage >= 50 && item.percentage < 70,
        );
        break;

      case "below50":
        result = result.filter((item) => item.percentage < 50);
        break;

      default:
        break;
    }

    return result;
  }, [normalizedScores, searchTerm, statusFilter, scoreFilter]);

  // Sorting.
  const sortedScores = useMemo(() => {
    const result = [...filteredScores];

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "student":
          comparison = String(a.studentName || "").localeCompare(
            String(b.studentName || ""),
          );
          break;

        case "title":
          comparison = String(a.title || "").localeCompare(
            String(b.title || ""),
          );
          break;

        case "score":
          comparison = a.percentage - b.percentage;
          break;

        case "status":
          comparison = a.normalizedStatus.localeCompare(b.normalizedStatus);
          break;

        case "date":
        default:
          comparison =
            new Date(a.time_submitted || 0).getTime() -
            new Date(b.time_submitted || 0).getTime();
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [filteredScores, sortBy, sortOrder]);

  // Pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(sortedScores.length / ITEMS_PER_PAGE),
  );

  const paginatedScores = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return sortedScores.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedScores, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, scoreFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((previous) => (previous === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return "text-green-700";
    if (percentage >= 80) return "text-blue-700";
    if (percentage >= 70) return "text-yellow-700";
    if (percentage >= PASSING_PERCENTAGE) return "text-orange-700";
    return "text-red-700";
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 70) return "bg-yellow-500";
    if (percentage >= PASSING_PERCENTAGE) return "bg-orange-500";
    return "bg-red-500";
  };

  const getStatusStyle = (status) => {
    return status === "Passed"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-red-100 text-red-700 border-red-200";
  };

  const statCards = [
    {
      title: "Total Submissions",
      value: statistics.total,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
      description: "All quiz submissions",
    },
    {
      title: "Total Students",
      value: statistics.students,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      description: "Unique students",
    },
    {
      title: "Average Score",
      value: formatPercentage(statistics.average),
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
      description: "Overall average",
    },
    {
      title: "Passed",
      value: statistics.passed,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      description: "Scores of 50% and above",
    },
    {
      title: "Failed",
      value: statistics.failed,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
      description: "Scores below 50%",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-x-auto">
      <div className="w-full max-w-none mx-auto space-y-7">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-100 text-green-700">
                <GraduationCap size={27} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                  Students' Quiz Scores
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Monitor student performance and quiz submissions.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchScores}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Refresh Scores
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
                      {card.value}
                    </h2>

                    <p className="text-xs text-gray-400 mt-2">
                      {card.description}
                    </p>
                  </div>

                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Passing threshold information */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-gray-600">Passing criteria:</span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold">
            <CheckCircle2 size={15} />
            50% and above = Passed
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold">
            <XCircle size={15} />
            Below 50% = Failed
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Table card */}
        <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Search and filters */}
          <div className="p-5 border-b border-gray-100 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Quiz Submissions
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {sortedScores.length} matching submissions.
                </p>
              </div>

              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, quiz, score, status..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-500">
                <Filter size={17} />
                <span className="text-sm font-semibold">Filters:</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Scores</option>
                <option value="90">90–100% (Excellent)</option>
                <option value="80">80–89% (Good)</option>
                <option value="70">70–79% (Average)</option>
                <option value="50">50–69% (Passed)</option>
                <option value="below50">Below 50% (Failed)</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setScoreFilter("all");
                  setSortBy("date");
                  setSortOrder("desc");
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <RefreshCw size={30} className="text-green-600 animate-spin" />
              <p className="text-sm text-gray-500">Loading student scores...</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1500px] text-left table-auto">
                  <thead>
                    <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-4 font-bold w-[70px]">#</th>

                      <th className="px-5 py-4 font-bold min-w-[220px]">
                        Student
                      </th>

                      <th className="px-5 py-4 font-bold min-w-[250px]">
                        Quiz Title
                      </th>

                      <th className="px-5 py-4 font-bold min-w-[130px]">
                        Score
                      </th>

                      <th className="px-5 py-4 font-bold min-w-[140px]">
                        Status
                      </th>

                      <th className="px-5 py-4 font-bold min-w-[230px]">
                        Date Submitted
                      </th>

                      <th className="px-5 py-4 font-bold min-w-[250px]">
                        Comment
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {paginatedScores.length > 0 ? (
                      paginatedScores.map((item, index) => {
                        const globalIndex =
                          (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                        return (
                          <motion.tr
                            key={item.id || `${item.user_id}-${index}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.025,
                            }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-5 py-5 text-sm text-gray-500 font-semibold">
                              {globalIndex}
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                                  <Users size={18} />
                                </div>

                                <div>
                                  <p className="font-bold text-gray-800">
                                    {item.studentName}
                                  </p>

                                  <p className="text-xs text-gray-400 mt-1">
                                    Student ID: {item.user_id || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <p className="font-semibold text-gray-700 whitespace-normal break-words min-w-[180px]">
                                {item.title || "Untitled Quiz"}
                              </p>
                            </td>

                            <td className="px-5 py-5">
                              <span
                                className={`font-extrabold text-lg ${getScoreColor(
                                  item.percentage,
                                )}`}
                              >
                                {item.score || "0"}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyle(
                                  item.normalizedStatus,
                                )}`}
                              >
                                {item.normalizedStatus === "Passed" ? (
                                  <CheckCircle2 size={14} />
                                ) : (
                                  <XCircle size={14} />
                                )}

                                {item.normalizedStatus}
                              </span>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                                <CalendarDays
                                  size={16}
                                  className="text-gray-400 shrink-0"
                                />
                                {formatDate(item.time_submitted)}
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-start gap-2 min-w-[220px] max-w-[350px]">
                                <MessageSquare
                                  size={16}
                                  className="text-gray-400 mt-0.5 shrink-0"
                                />

                                <p className="text-sm text-gray-600 whitespace-normal break-words">
                                  {item.comment || "No comment"}
                                </p>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-5 py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-4 rounded-full bg-gray-100 text-gray-400">
                              <ClipboardList size={30} />
                            </div>

                            <p className="font-semibold text-gray-700">
                              No quiz submissions found
                            </p>

                            <p className="text-sm text-gray-400">
                              Try changing your search or filters.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-5 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-gray-800">
                    {sortedScores.length === 0
                      ? 0
                      : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-gray-800">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      sortedScores.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-800">
                    {sortedScores.length}
                  </span>{" "}
                  submissions
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((previous) => Math.max(1, previous - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="px-3 text-sm font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((previous) =>
                        Math.min(totalPages, previous + 1),
                      )
                    }
                    disabled={currentPage >= totalPages}
                    className="p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsScores;
