import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import {
  FolderOpen,
  Upload,
  FileText,
  File,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Search,
  Download,
  Eye,
  Trash2,
  X,
  LoaderCircle,
  RefreshCw,
  Plus,
  CalendarDays,
  FileUp,
  BookOpen,
  Grid3X3,
  List,
  ArrowDownWideNarrow,
  Filter,
  Sparkles,
  FileCheck,
  HardDrive,
  Clock,
  ChevronDown,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  FileSearch,
  SlidersHorizontal,
} from "lucide-react";

import BottomNav from "../components/BottomNav";
import api from "../assets/api";

const categories = [
  { id: "all", label: "All Files", icon: FolderOpen },
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "images", label: "Images", icon: FileImage },
  { id: "spreadsheets", label: "Spreadsheets", icon: FileSpreadsheet },
  { id: "others", label: "Others", icon: File },
];

const getExtension = (file) => {
  if (file.file_extension) {
    return file.file_extension.toLowerCase();
  }

  const filename = file.file?.split("/").pop() || "";
  const parts = filename.split(".");

  return parts.length > 1 ? `.${parts.pop().toLowerCase()}` : "";
};

const getCategory = (extension) => {
  if (extension === ".pdf") return "pdf";

  if ([".doc", ".docx", ".txt", ".rtf", ".odt"].includes(extension)) {
    return "documents";
  }

  if (
    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"].includes(
      extension,
    )
  ) {
    return "images";
  }

  if ([".xls", ".xlsx", ".csv", ".ods"].includes(extension)) {
    return "spreadsheets";
  }

  return "others";
};

const getFileIcon = (extension) => {
  const category = getCategory(extension);

  const icons = {
    pdf: FileText,
    documents: FileText,
    images: FileImage,
    spreadsheets: FileSpreadsheet,
    others: File,
  };

  return icons[category] || File;
};

const getFileColor = (extension) => {
  const category = getCategory(extension);

  const colors = {
    pdf: "bg-red-50 text-red-500 border-red-100",
    documents: "bg-blue-50 text-blue-500 border-blue-100",
    images: "bg-purple-50 text-purple-500 border-purple-100",
    spreadsheets: "bg-emerald-50 text-emerald-600 border-emerald-100",
    others: "bg-[#EAF6ED] text-[#2E9B59] border-[#D8EBDD]",
  };

  return colors[category] || colors.others;
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatSize = (bytes) => {
  if (!bytes) return "File";

  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 10,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
  },
};

function Files() {
  // USER ROLE
  const userInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isTeacher =
    userInfo?.is_superuser === true || userInfo?.is_superuser === "true";

  // DATA
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // SEARCH AND FILTER
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // UPLOAD
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // PREVIEW
  const [previewFile, setPreviewFile] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // DOWNLOAD / DELETE
  const [downloading, setDownloading] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // NOTIFICATION
  const [notification, setNotification] = useState(null);

  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const [dragging, setDragging] = useState(false);

  // NOTIFICATION HELPER
  const notify = useCallback((message, type = "success") => {
    setNotification({
      message,
      type,
      id: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification]);

  // FETCH FILES
  const fetchFiles = useCallback(
    async (silent = false) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await api.get("/api/files/");

        const data = response.data;

        setFiles(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Failed to fetch files:", error);
        notify("Unable to load lesson files.", "error");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [notify],
  );

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // FILTERED FILES
  const filteredFiles = useMemo(() => {
    let result = [...files];

    if (activeCategory !== "all") {
      result = result.filter(
        (file) => getCategory(getExtension(file)) === activeCategory,
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((file) => {
        const filename = file.file?.split("/").pop() || "";

        return (
          file.title?.toLowerCase().includes(query) ||
          filename.toLowerCase().includes(query) ||
          getExtension(file).includes(query)
        );
      });
    }

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date_posted) - new Date(a.date_posted);
      }

      if (sortBy === "oldest") {
        return new Date(a.date_posted) - new Date(b.date_posted);
      }

      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

    return result;
  }, [files, search, activeCategory, sortBy]);

  // CATEGORY COUNTS
  const categoryCounts = useMemo(() => {
    const counts = { all: files.length };

    categories.forEach((category) => {
      if (category.id === "all") return;

      counts[category.id] = files.filter(
        (file) => getCategory(getExtension(file)) === category.id,
      ).length;
    });

    return counts;
  }, [files]);

  // RESET UPLOAD FORM
  const resetUpload = () => {
    setTitle("");
    setSelectedFile(null);
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // SELECT FILE
  const selectFile = (file) => {
    if (!file) return;

    setSelectedFile(file);

    if (!title.trim()) {
      const filename = file.name;
      const extension = filename.lastIndexOf(".");

      setTitle(extension > 0 ? filename.substring(0, extension) : filename);
    }
  };

  // DRAG AND DROP
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current += 1;
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current -= 1;

    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current = 0;
    setDragging(false);

    if (!uploading && isTeacher) {
      selectFile(e.dataTransfer.files?.[0]);
    }
  };

  // UPLOAD FILE
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!isTeacher) return;

    if (!title.trim() || !selectedFile) {
      notify("Enter a title and select a file.", "error");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("file", selectedFile);

      await api.post("/api/files/upload/", formData, {
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      resetUpload();
      setShowUpload(false);

      notify("Lesson file uploaded successfully!");

      await fetchFiles(true);
    } catch (error) {
      console.error("Upload error:", error);

      const errorData = error.response?.data;
      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.detail ||
            errorData?.file?.[0] ||
            errorData?.title?.[0] ||
            "Failed to upload file.";

      notify(message, "error");
    } finally {
      setUploading(false);
    }
  };

  // VIEW / PREVIEW FILE
  const handleView = async (file) => {
    try {
      setPreviewLoading(true);

      const response = await api.get(`/api/files/${file.id}/view/`);

      const fileUrl = response.data.file_url;

      if (!fileUrl) {
        notify("File preview is unavailable.", "error");
        return;
      }

      setPreviewFile({
        ...file,
        previewUrl: fileUrl,
      });
    } catch (error) {
      console.error("Preview error:", error);
      notify("Unable to open this file.", "error");
    } finally {
      setPreviewLoading(false);
    }
  };

  // DOWNLOAD FILE
  const handleDownload = async (file) => {
    try {
      setDownloading(file.id);

      const response = await api.get(`/api/files/${file.id}/download/`, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download =
        file.file?.split("/").pop() || `${file.title}${getExtension(file)}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);

      notify("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      notify("Unable to download this file.", "error");
    } finally {
      setDownloading(null);
    }
  };

  // DELETE FILE
  const handleDelete = async () => {
    if (!deleteTarget || !isTeacher) return;

    const file = deleteTarget;

    try {
      setDeleting(file.id);

      await api.delete(`/api/files/${file.id}/delete/`);

      setFiles((prev) => prev.filter((item) => item.id !== file.id));

      setDeleteTarget(null);

      if (previewFile?.id === file.id) {
        setPreviewFile(null);
      }

      notify("Lesson file deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      notify("Unable to delete this file.", "error");
    } finally {
      setDeleting(null);
    }
  };

  // KEYBOARD ESCAPE
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowUpload(false);
        setPreviewFile(null);
        setDeleteTarget(null);
        setShowFilters(false);
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("lesson-file-search")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // PREVIEW TYPE
  const previewExtension = previewFile ? getExtension(previewFile) : "";

  const canPreviewImage = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
  ].includes(previewExtension);

  const canPreviewPDF = previewExtension === ".pdf";

  // ANIMATION
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.055,
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-[#F5F9F6] flex flex-col overflow-x-hidden"
      onDragEnter={isTeacher ? handleDragEnter : undefined}
      onDragOver={isTeacher ? (e) => e.preventDefault() : undefined}
      onDragLeave={isTeacher ? handleDragLeave : undefined}
      onDrop={isTeacher ? handleDrop : undefined}
    >
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9 pb-24">
        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#1E7843] via-[#2E9B59] to-[#48B873] rounded-[28px] p-6 sm:p-9 mb-7 shadow-xl shadow-[#2E9B59]/15"
        >
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-10 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"
          />

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-10 bottom-0 opacity-15 pointer-events-none"
          >
            <FolderOpen size={160} />
          </motion.div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-[0.18em] mb-4">
                <Sparkles size={15} />
                Scan-Grow Learning Resources
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Lesson Files
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="inline-block ml-2"
                >
                  <BookOpen className="inline-block" size={30} />
                </motion.span>
              </h1>

              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                Your learning materials, references, and resources are all
                organized in one place. Explore, learn, and grow!
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                  <FolderOpen size={13} />
                  {files.length} Resources
                </span>

                <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                  <GraduationCap size={13} />
                  {isTeacher ? "Teacher Library" : "Student Library"}
                </span>
              </div>
            </div>

            {isTeacher && (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUpload(true)}
                className="shrink-0 flex items-center justify-center gap-2 bg-white text-[#25864C] px-6 py-4 rounded-2xl font-extrabold text-sm shadow-lg hover:shadow-xl transition"
              >
                <Plus size={20} />
                Add Lesson File
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* STATISTICS */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-7"
        >
          {[
            {
              label: "Total Resources",
              value: files.length,
              icon: FolderOpen,
              color: "text-[#2E9B59]",
              bg: "bg-[#EAF6ED]",
            },
            {
              label: "PDF Materials",
              value: categoryCounts.pdf || 0,
              icon: FileText,
              color: "text-red-500",
              bg: "bg-red-50",
            },
            {
              label: "Documents",
              value: categoryCounts.documents || 0,
              icon: FileCheck,
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
            {
              label: "Other Files",
              value:
                (categoryCounts.images || 0) +
                (categoryCounts.spreadsheets || 0) +
                (categoryCounts.others || 0),
              icon: HardDrive,
              color: "text-purple-500",
              bg: "bg-purple-50",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-[#E5EDE7] rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}
                >
                  <Icon size={21} />
                </div>

                <p className="text-2xl font-black text-[#253B2D]">
                  {stat.value}
                </p>

                <p className="text-[11px] sm:text-xs font-semibold text-[#91A097] mt-1">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* SEARCH AND FILTER */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-[#E5EDE7] rounded-2xl p-4 sm:p-5 mb-6 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A097]"
              />

              <input
                id="lesson-file-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lesson materials..."
                className="w-full bg-[#F7FAF7] border border-[#E7EEE8] rounded-xl pl-11 pr-16 py-3.5 text-sm outline-none focus:border-[#2E9B59] focus:ring-4 focus:ring-[#2E9B59]/10 transition"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91A097] hover:text-[#2E9B59]"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border transition ${
                  showFilters
                    ? "bg-[#EAF6ED] border-[#B7DDBF] text-[#2E9B59]"
                    : "bg-white border-[#E5EDE7] text-[#64746A] hover:bg-[#F7FAF7]"
                }`}
              >
                <SlidersHorizontal size={17} />
                Filters
                <ChevronDown
                  size={15}
                  className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              <button
                onClick={() => fetchFiles(true)}
                disabled={refreshing}
                className="p-3 rounded-xl border border-[#E5EDE7] text-[#64746A] hover:bg-[#F7FAF7] transition disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw
                  size={19}
                  className={refreshing ? "animate-spin" : ""}
                />
              </button>

              <div className="flex bg-[#F3F7F4] p-1 rounded-xl border border-[#E5EDE7]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-white text-[#2E9B59] shadow-sm"
                      : "text-[#91A097]"
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-white text-[#2E9B59] shadow-sm"
                      : "text-[#91A097]"
                  }`}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ADVANCED FILTERS */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#EDF1ED] mt-4 pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#84948A]">
                    <ArrowDownWideNarrow size={16} />
                    SORT BY
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F7FAF7] border border-[#E5EDE7] rounded-xl px-4 py-2.5 text-sm text-[#52645A] outline-none focus:border-[#2E9B59]"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="az">Title A - Z</option>
                    <option value="za">Title Z - A</option>
                  </select>

                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                      setSortBy("newest");
                    }}
                    className="text-xs font-bold text-[#2E9B59] hover:underline sm:ml-auto"
                  >
                    Reset filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CATEGORY CHIPS */}
          <div className="flex gap-2 overflow-x-auto pt-4 pb-1 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border transition ${
                    active
                      ? "bg-[#2E9B59] border-[#2E9B59] text-white shadow-md shadow-[#2E9B59]/15"
                      : "bg-white border-[#E5EDE7] text-[#75847A] hover:border-[#A7D5B2] hover:text-[#2E9B59]"
                  }`}
                >
                  <Icon size={15} />
                  {category.label}
                  <span
                    className={`text-[10px] ${
                      active ? "text-white/80" : "text-[#A0ADA4]"
                    }`}
                  >
                    {categoryCounts[category.id] || 0}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* FILE SECTION HEADER */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#344B3A]">
              Learning Resources
            </h2>
            <p className="text-xs text-[#91A097] mt-1">
              {loading
                ? "Getting your materials ready..."
                : `Showing ${filteredFiles.length} of ${files.length} files`}
            </p>
          </div>

          {isTeacher && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#2E9B59]">
              <CloudUpload size={15} />
              Teacher upload enabled
            </span>
          )}
        </div>

        {/* FILES */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <LoaderCircle size={38} className="text-[#2E9B59]" />
            </motion.div>

            <p className="text-sm font-semibold text-[#84948A] mt-4">
              Loading lesson resources...
            </p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-[#E5EDE7] py-20 px-5 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-20 h-20 mx-auto rounded-3xl bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center mb-5"
            >
              {search ? <FileSearch size={38} /> : <FolderOpen size={38} />}
            </motion.div>

            <h3 className="text-xl font-extrabold text-[#344B3A]">
              {search || activeCategory !== "all"
                ? "No matching resources"
                : "No lesson files yet"}
            </h3>

            <p className="text-sm text-[#91A097] max-w-sm mx-auto mt-2">
              {search || activeCategory !== "all"
                ? "Try changing your search or category filters."
                : "Your learning materials will appear here once they are uploaded."}
            </p>

            {(search || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-5 text-sm font-bold text-[#2E9B59] hover:underline"
              >
                Clear filters
              </button>
            )}

            {isTeacher && !search && activeCategory === "all" && (
              <button
                onClick={() => setShowUpload(true)}
                className="mt-5 mx-auto flex items-center gap-2 px-5 py-3 bg-[#2E9B59] text-white rounded-xl text-sm font-bold"
              >
                <Plus size={18} />
                Upload first file
              </button>
            )}
          </motion.div>
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredFiles.map((file) => {
                  const extension = getExtension(file);
                  const Icon = getFileIcon(extension);
                  const color = getFileColor(extension);
                  const filename = file.file?.split("/").pop() || file.title;

                  return (
                    <motion.article
                      layout
                      key={file.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        layout: { duration: 0.3 },
                        opacity: { duration: 0.2 },
                      }}
                      whileHover={{ y: -5 }}
                      className={`group bg-white border border-[#E5EDE7] rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#2E9B59]/5 hover:border-[#B9DCC2] transition-all overflow-hidden ${
                        viewMode === "list" ? "p-4" : "p-5"
                      }`}
                    >
                      <div
                        className={`flex ${
                          viewMode === "list"
                            ? "flex-row items-center gap-4"
                            : "flex-col"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <motion.div
                            whileHover={{ rotate: [-5, 5, 0], scale: 1.08 }}
                            className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center ${color}`}
                          >
                            <Icon size={27} />
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-extrabold text-[#344B3A] text-sm sm:text-base truncate group-hover:text-[#2E9B59] transition-colors">
                              {file.title}
                            </h3>

                            <p className="text-xs text-[#A0ADA4] truncate mt-1">
                              {filename}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span
                                className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-md ${color}`}
                              >
                                {extension || "FILE"}
                              </span>

                              <span className="text-[10px] text-[#91A097] flex items-center gap-1">
                                <CalendarDays size={11} />
                                {new Date(file.date_posted).toLocaleDateString(
                                  "en-PH",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {viewMode === "list" && (
                          <div className="hidden lg:flex items-center gap-1 text-xs text-[#91A097] mr-4">
                            <Clock size={13} />
                            {formatDate(file.date_posted)}
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-2 ${
                            viewMode === "list"
                              ? "shrink-0"
                              : "mt-5 pt-4 border-t border-[#EEF2EF]"
                          }`}
                        >
                          <motion.button
                            whileTap={{ scale: 0.93 }}
                            onClick={() => handleView(file)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#EAF6ED] text-[#2E9B59] text-xs font-bold hover:bg-[#D9EFDF] transition"
                          >
                            <Eye size={15} />
                            View
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.93 }}
                            onClick={() => handleDownload(file)}
                            disabled={downloading === file.id}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#F1F5F2] text-[#52645A] text-xs font-bold hover:bg-[#E5EDE7] transition disabled:opacity-50"
                          >
                            {downloading === file.id ? (
                              <LoaderCircle
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Download size={15} />
                            )}
                            Download
                          </motion.button>

                          {isTeacher && (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setDeleteTarget(file)}
                              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                              title="Delete file"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}

        {/* TEACHER DRAG OVERLAY */}
        <AnimatePresence>
          {dragging && isTeacher && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-[#2E9B59]/20 backdrop-blur-sm flex items-center justify-center p-5 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-3xl p-12 text-center shadow-2xl border-2 border-dashed border-[#2E9B59]"
              >
                <CloudUpload
                  size={55}
                  className="mx-auto text-[#2E9B59] mb-4"
                />
                <h3 className="text-xl font-extrabold text-[#344B3A]">
                  Drop your file here!
                </h3>
                <p className="text-sm text-[#91A097] mt-2">
                  Release to select your learning material.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* NOTIFICATION */}
      <div className="fixed top-5 right-4 sm:right-6 z-[250] pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border bg-white ${
                notification.type === "error"
                  ? "border-red-200"
                  : "border-[#CBE8D2]"
              }`}
            >
              {notification.type === "error" ? (
                <AlertCircle size={20} className="text-red-500" />
              ) : (
                <CheckCircle2 size={20} className="text-[#2E9B59]" />
              )}

              <p className="text-sm font-bold text-[#344B3A]">
                {notification.message}
              </p>

              <button
                onClick={() => setNotification(null)}
                className="text-[#91A097] hover:text-[#344B3A]"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {showUpload && isTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !uploading) {
                setShowUpload(false);
                resetUpload();
              }
            }}
            className="fixed inset-0 z-[200] bg-[#172D1E]/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden"
            >
              <div className="relative bg-gradient-to-r from-[#237B45] to-[#43AC69] p-6 text-white">
                <button
                  onClick={() => {
                    if (uploading) return;
                    setShowUpload(false);
                    resetUpload();
                  }}
                  disabled={uploading}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
                >
                  <X size={19} />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <CloudUpload size={26} />
                </div>

                <h2 className="text-xl font-black">Upload Lesson File</h2>

                <p className="text-white/75 text-sm mt-1">
                  Add a learning resource to the student library.
                </p>
              </div>

              <form onSubmit={handleUpload} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#344B3A] mb-2">
                    Resource Title
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Parts of a Plant - Reviewer"
                    maxLength={255}
                    required
                    disabled={uploading}
                    className="w-full border border-[#DCE7DE] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#2E9B59] focus:ring-4 focus:ring-[#2E9B59]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#344B3A] mb-2">
                    Choose Learning Material
                  </label>

                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    className={`block border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition ${
                      selectedFile
                        ? "border-[#2E9B59] bg-[#F0F8F2]"
                        : "border-[#DCE7DE] bg-[#F9FBF9] hover:border-[#2E9B59]"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      disabled={uploading}
                      className="hidden"
                      onChange={(e) => selectFile(e.target.files?.[0])}
                    />

                    {selectedFile ? (
                      <>
                        <FileCheck
                          size={37}
                          className="mx-auto text-[#2E9B59] mb-3"
                        />

                        <p className="text-sm font-extrabold text-[#344B3A] break-all">
                          {selectedFile.name}
                        </p>

                        <p className="text-xs text-[#91A097] mt-2">
                          {formatSize(selectedFile.size)}
                        </p>

                        <span className="inline-block mt-3 text-xs font-bold text-[#2E9B59]">
                          Click to change file
                        </span>
                      </>
                    ) : (
                      <>
                        <FileUp
                          size={38}
                          className="mx-auto text-[#2E9B59] mb-3"
                        />

                        <p className="text-sm font-extrabold text-[#344B3A]">
                          Click to browse files
                        </p>

                        <p className="text-xs text-[#91A097] mt-2">
                          Or drag and drop your file
                        </p>
                      </>
                    )}
                  </motion.label>
                </div>

                {uploading && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#64746A] mb-2">
                      <span>Uploading material...</span>
                      <span>{uploadProgress}%</span>
                    </div>

                    <div className="h-2 bg-[#EAF1EB] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-[#2E9B59] rounded-full"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => {
                      setShowUpload(false);
                      resetUpload();
                    }}
                    className="flex-1 py-3.5 rounded-xl border border-[#DCE7DE] text-[#718078] text-sm font-bold hover:bg-[#F5F8F5] transition disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={uploading || !title.trim() || !selectedFile}
                    className="flex-1 py-3.5 rounded-xl bg-[#2E9B59] text-white text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-[#25864C] disabled:opacity-50 transition"
                  >
                    {uploading ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        Uploading
                      </>
                    ) : (
                      <>
                        <Upload size={17} />
                        Upload Material
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILE PREVIEW MODAL */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#14251A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setPreviewFile(null);
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E9EFEB] gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${getFileColor(previewExtension)}`}
                  >
                    {React.createElement(getFileIcon(previewExtension), {
                      size: 21,
                    })}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-extrabold text-[#344B3A] text-sm truncate">
                      {previewFile.title}
                    </h3>

                    <p className="text-[11px] text-[#91A097]">
                      {previewExtension} • {formatDate(previewFile.date_posted)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(previewFile)}
                    className="p-2.5 rounded-xl bg-[#EAF6ED] text-[#2E9B59] hover:bg-[#D9EFDF] transition"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>

                  <button
                    onClick={() => setPreviewFile(null)}
                    className="p-2.5 rounded-xl bg-[#F1F4F1] text-[#64746A] hover:bg-[#E7ECE8] transition"
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-[#F0F3F0] min-h-0 overflow-auto flex items-center justify-center">
                {canPreviewImage ? (
                  <img
                    src={previewFile.previewUrl}
                    alt={previewFile.title}
                    className="max-w-full max-h-full object-contain p-3"
                  />
                ) : canPreviewPDF ? (
                  <iframe
                    src={previewFile.previewUrl}
                    title={previewFile.title}
                    className="w-full h-full border-0 bg-white"
                  />
                ) : (
                  <div className="text-center px-6 py-12">
                    <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5 text-[#2E9B59]">
                      {React.createElement(getFileIcon(previewExtension), {
                        size: 40,
                      })}
                    </div>

                    <h3 className="font-extrabold text-[#344B3A] text-lg">
                      Preview not supported
                    </h3>

                    <p className="text-sm text-[#91A097] max-w-sm mx-auto mt-2">
                      This file type cannot be displayed directly here. Download
                      it to view the material on your device.
                    </p>

                    <button
                      onClick={() => handleDownload(previewFile)}
                      className="mt-6 px-6 py-3 rounded-xl bg-[#2E9B59] text-white font-bold text-sm flex items-center gap-2 mx-auto hover:bg-[#25864C] transition"
                    >
                      <Download size={17} />
                      Download File
                    </button>
                  </div>
                )}
              </div>

              <div className="px-5 py-3 bg-white border-t border-[#E9EFEB] flex justify-between items-center gap-3">
                <p className="text-xs text-[#91A097] truncate">
                  {previewFile.file?.split("/").pop()}
                </p>

                <button
                  onClick={() =>
                    window.open(
                      previewFile.previewUrl,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#2E9B59] hover:underline"
                >
                  Open in new tab
                  <ExternalLink size={13} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION */}
      <AnimatePresence>
        {deleteTarget && isTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !deleting) {
                setDeleteTarget(null);
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={29} />
              </div>

              <h3 className="text-lg font-extrabold text-[#344B3A]">
                Delete Lesson File?
              </h3>

              <p className="text-sm text-[#91A097] mt-2">
                Are you sure you want to delete{" "}
                <strong className="text-[#344B3A]">{deleteTarget.title}</strong>
                ? This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  disabled={!!deleting}
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 rounded-xl border border-[#E5EDE7] text-[#64746A] font-bold text-sm"
                >
                  Cancel
                </button>

                <button
                  disabled={!!deleting}
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleting ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

export default Files;
