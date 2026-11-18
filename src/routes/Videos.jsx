import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import {
  Video,
  Film,
  Play,
  Upload,
  Search,
  Download,
  Trash2,
  X,
  LoaderCircle,
  RefreshCw,
  Plus,
  CalendarDays,
  FileUp,
  Grid3X3,
  List,
  ArrowDownWideNarrow,
  Sparkles,
  FileCheck,
  Clock,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  FileSearch,
  SlidersHorizontal,
  Clapperboard,
} from "lucide-react";

import BottomNav from "../components/BottomNav";
import api from "../assets/api";
import InteractiveGuide from "../components/InteractiveGuide";

// ======================================================
// VIDEO HELPERS
// ======================================================

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".m4v",
  ".avi",
  ".mkv",
  ".wmv",
  ".flv",
  ".mpeg",
  ".mpg",
  ".3gp",
];

const getExtension = (video) => {
  if (video?.file) {
    const filename =
      typeof video.file === "string" ? video.file : video.file.name || "";

    const cleanFilename = filename.split("?")[0].split("#")[0];
    const parts = cleanFilename.split(".");

    if (parts.length > 1) {
      return `.${parts.pop().toLowerCase()}`;
    }
  }

  if (video?.filename) {
    const parts = video.filename.split(".");
    if (parts.length > 1) {
      return `.${parts.pop().toLowerCase()}`;
    }
  }

  return "";
};

const getVideoName = (video) => {
  return video?.title || video?.filename || "Untitled Video";
};

const getFilename = (video) => {
  if (video?.filename) return video.filename;

  if (video?.file) {
    const filename = video.file.split("/").pop();
    return decodeURIComponent(filename.split("?")[0]);
  }

  return "video";
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatSize = (bytes) => {
  if (!bytes) return "File size unavailable";

  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

// ======================================================
// ANIMATIONS
// ======================================================

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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

// ======================================================
// MAIN COMPONENT
// ======================================================

function Videos() {
  // ====================================================
  // USER ROLE
  // ====================================================

  const userInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isTeacher =
    userInfo?.is_superuser === true || userInfo?.is_superuser === "true";

  // ====================================================
  // INTERACTIVE GUIDE
  // ====================================================

  const guideMessages = [
    "Hello! 🌱 Welcome to the Scan-Grow Video Library! This is where you can watch educational videos and explore different learning materials.",

    "Each video has its own card! 🎬 You can browse the video titles and check when they were uploaded.",

    "Want to watch something? ▶️ Click the Play button or WATCH VIDEO to open the video player.",

    "Looking for a particular video? 🔍 Use the search bar to find videos by title or filename. You can also sort videos by newest, oldest, or title.",

    isTeacher
      ? "Hello, Teacher! 👩‍🏫 You can upload new learning videos using the ADD VIDEO button. You can also download or delete existing videos."
      : "As a Student, you can watch and download the available educational videos. Explore the library and learn at your own pace! 🎓",
  ];

  // ====================================================
  // VIDEO DATA
  // ====================================================

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ====================================================
  // SEARCH AND FILTER
  // ====================================================

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // ====================================================
  // UPLOAD
  // ====================================================

  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const [dragging, setDragging] = useState(false);

  // ====================================================
  // VIDEO PREVIEW
  // ====================================================

  const [previewFile, setPreviewFile] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(null);

  const videoRef = useRef(null);

  // ====================================================
  // DOWNLOAD / DELETE
  // ====================================================

  const [downloading, setDownloading] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ====================================================
  // NOTIFICATIONS
  // ====================================================

  const [notification, setNotification] = useState(null);

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

  // ====================================================
  // FETCH VIDEOS
  // API: GET /api/videos/
  // ====================================================

  const fetchVideos = useCallback(
    async (silent = false) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await api.get("/api/videos/");

        const data = response.data;

        const videoList = Array.isArray(data) ? data : data.results || [];

        setVideos(videoList);
      } catch (error) {
        console.error("Failed to fetch videos:", error);

        notify(
          error.response?.data?.detail || "Unable to load videos.",
          "error",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [notify],
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // ====================================================
  // FILTERED VIDEOS
  // ====================================================

  const filteredVideos = useMemo(() => {
    let result = [...videos];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((video) => {
        const filename = getFilename(video);

        return (
          video.title?.toLowerCase().includes(query) ||
          filename.toLowerCase().includes(query) ||
          getExtension(video).includes(query)
        );
      });
    }

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date_added || 0) - new Date(a.date_added || 0);
      }

      if (sortBy === "oldest") {
        return new Date(a.date_added || 0) - new Date(b.date_added || 0);
      }

      if (sortBy === "az") {
        return (a.title || "").localeCompare(b.title || "");
      }

      if (sortBy === "za") {
        return (b.title || "").localeCompare(a.title || "");
      }

      return 0;
    });

    return result;
  }, [videos, search, sortBy]);

  // ====================================================
  // VIDEO STATISTICS
  // ====================================================

  const latestVideo = useMemo(() => {
    if (!videos.length) return null;

    return [...videos].sort(
      (a, b) => new Date(b.date_added || 0) - new Date(a.date_added || 0),
    )[0];
  }, [videos]);

  // ====================================================
  // RESET UPLOAD FORM
  // ====================================================

  const resetUpload = () => {
    setTitle("");
    setSelectedFile(null);
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ====================================================
  // SELECT VIDEO
  // ====================================================

  const selectFile = (file) => {
    if (!file) return;

    const extension = `.${file.name.split(".").pop().toLowerCase()}`;

    if (!VIDEO_EXTENSIONS.includes(extension)) {
      notify(
        "Please select a supported video file (MP4, MKV, AVI, MOV, etc.).",
        "error",
      );

      return;
    }

    setSelectedFile(file);

    if (!title.trim()) {
      const filename = file.name;
      const lastDot = filename.lastIndexOf(".");

      setTitle(lastDot > 0 ? filename.substring(0, lastDot) : filename);
    }
  };

  // ====================================================
  // DRAG AND DROP
  // ====================================================

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

  // ====================================================
  // UPLOAD VIDEO
  // API: POST /api/videos/upload/
  // ====================================================

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!isTeacher) return;

    if (!title.trim() || !selectedFile) {
      notify("Enter a video title and select a video.", "error");
      return;
    }

    const extension = `.${selectedFile.name.split(".").pop().toLowerCase()}`;

    if (!VIDEO_EXTENSIONS.includes(extension)) {
      notify("Unsupported video format.", "error");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("file", selectedFile);

      await api.post("/api/videos/upload/", formData, {
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      resetUpload();
      setShowUpload(false);

      notify("Video uploaded successfully!");

      await fetchVideos(true);
    } catch (error) {
      console.error("Video upload error:", error);

      const errorData = error.response?.data;

      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.detail ||
            errorData?.file?.[0] ||
            errorData?.title?.[0] ||
            "Failed to upload video.";

      notify(message, "error");
    } finally {
      setUploading(false);
    }
  };

  // ====================================================
  // VIEW VIDEO
  // API: GET /api/videos/:id/view/
  // ====================================================

  // ======================================================
  // VIEW VIDEO
  // Uses the file URL returned by GET /api/videos/
  // ======================================================

  const handleView = async (video) => {
    console.log("========== VIDEO VIEW DEBUG ==========");
    console.log("Selected video:", video);
    console.log("Video ID:", video?.id);
    console.log("File:", video?.file);
    console.log("File URL:", video?.file_url);

    try {
      setPreviewLoading(video.id);

      const response = await api.get(`/api/videos/${video.id}/view/`);

      console.log("VIDEO VIEW API RESPONSE:", response.data);
      console.log("RETURNED FILE URL:", response.data?.file_url);

      if (!response.data?.file_url) {
        console.error("ERROR: API returned no file_url!");
        notify("Video file URL is unavailable.", "error");
        return;
      }

      setPreviewFile({
        ...video,
        previewUrl: response.data.file_url,
      });
    } catch (error) {
      console.error("VIDEO VIEW ERROR:", error);
      console.error("ERROR RESPONSE:", error.response?.data);
      console.error("ERROR STATUS:", error.response?.status);
      console.error("REQUEST URL:", error.config?.url);

      notify("Unable to open this video.", "error");
    } finally {
      setPreviewLoading(null);
    }
  };

  // ====================================================
  // CLOSE VIDEO PREVIEW
  // ====================================================

  const closePreview = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }

    setPreviewFile(null);
  };

  // ====================================================
  // DOWNLOAD VIDEO
  // Uses the file_url returned by the serializer.
  // ====================================================

  const handleDownload = async (video) => {
    try {
      setDownloading(video.id);

      let fileUrl = video.file_url;

      // If the video does not already have a file_url,
      // retrieve it through the view endpoint.
      if (!fileUrl) {
        const response = await api.get(`/api/videos/${video.id}/view/`);

        fileUrl = response.data.file_url;
      }

      if (!fileUrl) {
        throw new Error("Video URL is unavailable.");
      }

      const response = await api.get(fileUrl, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = getFilename(video);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1500);

      notify("Download started!");
    } catch (error) {
      console.error("Download error:", error);

      notify(
        "Unable to download this video. Check the media URL and server permissions.",
        "error",
      );
    } finally {
      setDownloading(null);
    }
  };

  // ====================================================
  // DELETE VIDEO
  // API: DELETE /api/videos/:id/delete/
  // ====================================================

  const handleDelete = async () => {
    if (!deleteTarget || !isTeacher) return;

    const video = deleteTarget;

    try {
      setDeleting(video.id);

      await api.delete(`/api/videos/${video.id}/delete/`);

      setVideos((prev) => prev.filter((item) => item.id !== video.id));

      setDeleteTarget(null);

      if (previewFile?.id === video.id) {
        closePreview();
      }

      notify("Video deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);

      notify(
        error.response?.data?.detail || "Unable to delete this video.",
        "error",
      );
    } finally {
      setDeleting(null);
    }
  };

  // ====================================================
  // KEYBOARD SHORTCUTS
  // ====================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (!uploading) {
          setShowUpload(false);
        }

        closePreview();
        setDeleteTarget(null);
        setShowFilters(false);
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        document.getElementById("video-search")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [uploading]);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div
      className="min-h-screen bg-[#F5F9F6] flex flex-col overflow-x-hidden"
      onDragEnter={isTeacher ? handleDragEnter : undefined}
      onDragOver={isTeacher ? (e) => e.preventDefault() : undefined}
      onDragLeave={isTeacher ? handleDragLeave : undefined}
      onDrop={isTeacher ? handleDrop : undefined}
    >
      <InteractiveGuide messages={guideMessages} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9 pb-24">
        {/* ==================================================
            HERO HEADER
        ================================================== */}

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
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-10 bottom-0 opacity-15 pointer-events-none"
          >
            <Clapperboard size={160} />
          </motion.div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-[0.18em] mb-4">
                <Sparkles size={15} />
                Scan-Grow Learning Resources
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Video Library
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="inline-block ml-2"
                >
                  <Clapperboard className="inline-block" size={30} />
                </motion.span>
              </h1>

              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                Watch educational videos, explore learning materials, and
                discover new things. Learn, grow, and enjoy every lesson!
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                  <Film size={13} />
                  {videos.length} Videos
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
                Add Video
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ==================================================
            STATISTICS
        ================================================== */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-7"
        >
          {[
            {
              label: "Total Videos",
              value: videos.length,
              icon: Video,
              color: "text-[#2E9B59]",
              bg: "bg-[#EAF6ED]",
            },
            {
              label: "Video Formats",
              value: new Set(
                videos.map((video) => getExtension(video)).filter(Boolean),
              ).size,
              icon: Film,
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
            {
              label: "Latest Upload",
              value: latestVideo
                ? new Date(latestVideo.date_added).toLocaleDateString(
                    "en-PH",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  )
                : "None",
              icon: Clock,
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

        {/* ==================================================
            SEARCH AND FILTER
        ================================================== */}

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
                id="video-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search videos by title or filename..."
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
              </button>

              <button
                onClick={() => fetchVideos(true)}
                disabled={refreshing}
                className="p-3 rounded-xl border border-[#E5EDE7] text-[#64746A] hover:bg-[#F7FAF7] transition disabled:opacity-50"
                title="Refresh videos"
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
        </motion.section>

        {/* ==================================================
            VIDEO SECTION HEADER
        ================================================== */}

        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#344B3A] flex items-center gap-2">
              <Film size={20} className="text-[#2E9B59]" />
              Educational Videos
            </h2>

            <p className="text-xs text-[#91A097] mt-1">
              {loading
                ? "Getting your videos ready..."
                : `Showing ${filteredVideos.length} of ${videos.length} videos`}
            </p>
          </div>

          {isTeacher && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#2E9B59]">
              <CloudUpload size={15} />
              Upload enabled
            </span>
          )}
        </div>

        {/* ==================================================
            VIDEO CARDS
        ================================================== */}

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
              Loading educational videos...
            </p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-[#E5EDE7] py-20 px-5 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="w-20 h-20 mx-auto rounded-3xl bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center mb-5"
            >
              {search ? <FileSearch size={38} /> : <Clapperboard size={38} />}
            </motion.div>

            <h3 className="text-xl font-extrabold text-[#344B3A]">
              {search ? "No matching videos" : "No Videos Available"}
            </h3>

            <p className="text-sm text-[#91A097] max-w-sm mx-auto mt-2">
              {search
                ? "Try changing your search keyword."
                : "Educational videos will appear here once they are uploaded."}
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-bold text-[#2E9B59] hover:underline"
              >
                Clear search
              </button>
            )}

            {isTeacher && !search && (
              <button
                onClick={() => setShowUpload(true)}
                className="mt-5 mx-auto flex items-center gap-2 px-5 py-3 bg-[#2E9B59] text-white rounded-xl text-sm font-bold"
              >
                <Plus size={18} />
                Upload First Video
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
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video) => {
                  const extension = getExtension(video);
                  const filename = getFilename(video);
                  const isList = viewMode === "list";

                  return (
                    <motion.article
                      layout
                      key={video.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        layout: { duration: 0.3 },
                        opacity: { duration: 0.2 },
                      }}
                      whileHover={{ y: -5 }}
                      className={`group bg-white border border-[#E5EDE7] rounded-3xl shadow-sm hover:shadow-xl hover:shadow-[#2E9B59]/10 hover:border-[#B9DCC2] transition-all overflow-hidden ${
                        isList ? "flex flex-col sm:flex-row" : ""
                      }`}
                    >
                      {/* VIDEO THUMBNAIL */}

                      <div
                        className={`relative bg-gradient-to-br from-[#164B2D] via-[#236B3E] to-[#319657] overflow-hidden ${
                          isList
                            ? "w-full sm:w-64 shrink-0 aspect-video sm:aspect-auto sm:min-h-[175px]"
                            : "aspect-video"
                        }`}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.08, 1],
                            rotate: [0, 4, -4, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 flex items-center justify-center text-white/15"
                        >
                          <Clapperboard size={110} strokeWidth={1} />
                        </motion.div>

                        <div className="absolute inset-0 bg-black/10" />

                        {/* FORMAT BADGE */}

                        <span className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider">
                          {extension ? extension.replace(".", "") : "VIDEO"}
                        </span>

                        {/* PLAY BUTTON */}

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleView(video)}
                          disabled={previewLoading === video.id}
                          className="absolute inset-0 z-10 flex items-center justify-center"
                          title="Watch video"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/95 text-[#2E9B59] shadow-xl flex items-center justify-center group-hover:bg-[#2E9B59] group-hover:text-white transition-all">
                            {previewLoading === video.id ? (
                              <LoaderCircle
                                size={26}
                                className="animate-spin"
                              />
                            ) : (
                              <Play
                                size={27}
                                fill="currentColor"
                                className="ml-1"
                              />
                            )}
                          </div>
                        </motion.button>

                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white z-10 pointer-events-none">
                          <span className="text-[10px] font-semibold flex items-center gap-1.5">
                            <Film size={13} />
                            Learning Video
                          </span>

                          <span className="text-[10px] font-semibold">
                            Scan-Grow
                          </span>
                        </div>
                      </div>

                      {/* VIDEO INFORMATION */}

                      <div className="flex-1 min-w-0 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center">
                            <Video size={22} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-[#344B3A] text-sm sm:text-base line-clamp-2 group-hover:text-[#2E9B59] transition-colors">
                              {getVideoName(video)}
                            </h3>

                            <p className="text-[11px] text-[#A0ADA4] mt-1 truncate">
                              {filename}
                            </p>
                          </div>
                        </div>

                        {/* METADATA */}

                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-[#EEF2EF]">
                          <span className="text-[10px] text-[#91A097] flex items-center gap-1.5">
                            <CalendarDays
                              size={12}
                              className="text-[#2E9B59]"
                            />
                            {video.date_added
                              ? new Date(
                                  video.date_added,
                                ).toLocaleDateString("en-PH", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Date unavailable"}
                          </span>

                          <span className="text-[10px] text-[#91A097] flex items-center gap-1.5">
                            <Film size={12} className="text-[#2E9B59]" />
                            {extension
                              ? extension.replace(".", "").toUpperCase()
                              : "VIDEO"}
                          </span>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex items-center gap-2 mt-4">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleView(video)}
                            disabled={previewLoading === video.id}
                            className="flex-[1.5] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2E9B59] text-white text-xs font-extrabold hover:bg-[#25864C] transition disabled:opacity-50"
                          >
                            {previewLoading === video.id ? (
                              <LoaderCircle
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Play size={15} fill="currentColor" />
                            )}
                            Watch Video
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(video)}
                            disabled={downloading === video.id}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F1F5F2] text-[#52645A] text-xs font-bold hover:bg-[#E5EDE7] transition disabled:opacity-50"
                          >
                            {downloading === video.id ? (
                              <LoaderCircle
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Download size={15} />
                            )}

                            <span className="hidden sm:inline">Download</span>
                          </motion.button>

                          {isTeacher && (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setDeleteTarget(video)}
                              className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                              title="Delete video"
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

        {/* ==================================================
            TEACHER DRAG OVERLAY
        ================================================== */}

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
                  Drop your video here!
                </h3>

                <p className="text-sm text-[#91A097] mt-2">
                  Release to select your learning video.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ====================================================
          NOTIFICATIONS
      ==================================================== */}

      <div className="fixed top-5 right-4 sm:right-6 z-[250] pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 40,
                scale: 0.95,
              }}
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

      {/* ====================================================
          UPLOAD VIDEO MODAL
      ==================================================== */}

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
              {/* MODAL HEADER */}

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
                  <Clapperboard size={26} />
                </div>

                <h2 className="text-xl font-black">Upload Learning Video</h2>

                <p className="text-white/75 text-sm mt-1">
                  Add an educational video to the student library.
                </p>
              </div>

              {/* UPLOAD FORM */}

              <form onSubmit={handleUpload} className="p-6 space-y-5">
                {/* VIDEO TITLE */}

                <div>
                  <label className="block text-sm font-bold text-[#344B3A] mb-2">
                    Video Title
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Introduction to Planting"
                    maxLength={255}
                    required
                    disabled={uploading}
                    className="w-full border border-[#DCE7DE] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#2E9B59] focus:ring-4 focus:ring-[#2E9B59]/10 transition"
                  />
                </div>

                {/* VIDEO FILE */}

                <div>
                  <label className="block text-sm font-bold text-[#344B3A] mb-2">
                    Choose Video File
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
                      accept=".mp4,.webm,.ogg,.mov,.m4v,.avi,.mkv,.wmv,.flv,.mpeg,.mpg,.3gp,video/*"
                      disabled={uploading}
                      className="hidden"
                      onChange={(e) => {
                        selectFile(e.target.files?.[0]);
                      }}
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
                          Click to change video
                        </span>
                      </>
                    ) : (
                      <>
                        <FileUp
                          size={38}
                          className="mx-auto text-[#2E9B59] mb-3"
                        />

                        <p className="text-sm font-extrabold text-[#344B3A]">
                          Click to browse videos
                        </p>

                        <p className="text-xs text-[#91A097] mt-2">
                          Or drag and drop your video here
                        </p>

                        <p className="text-[10px] text-[#A0ADA4] mt-3">
                          MP4, WEBM, OGG, MOV, M4V, AVI, MKV, WMV, FLV
                        </p>
                      </>
                    )}
                  </motion.label>
                </div>

                {/* UPLOAD PROGRESS */}

                {uploading && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#64746A] mb-2">
                      <span>Uploading video...</span>
                      <span>{uploadProgress}%</span>
                    </div>

                    <div className="h-2 bg-[#EAF1EB] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${uploadProgress}%`,
                        }}
                        className="h-full bg-[#2E9B59] rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* MODAL BUTTONS */}

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
                        Upload Video
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          VIDEO PLAYER MODAL
      ==================================================== */}

      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#14251A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closePreview();
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* PLAYER HEADER */}

              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E9EFEB] gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#EAF6ED] text-[#2E9B59] flex items-center justify-center">
                    <Video size={22} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-extrabold text-[#344B3A] text-sm truncate">
                      {getVideoName(previewFile)}
                    </h3>

                    <p className="text-[11px] text-[#91A097]">
                      {getExtension(previewFile).replace(".", "").toUpperCase()}
                      {" • "}
                      {formatDate(previewFile.date_added)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(previewFile)}
                    disabled={downloading === previewFile.id}
                    className="p-2.5 rounded-xl bg-[#EAF6ED] text-[#2E9B59] hover:bg-[#D9EFDF] transition"
                    title="Download video"
                  >
                    {downloading === previewFile.id ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                  </button>

                  <button
                    onClick={closePreview}
                    className="p-2.5 rounded-xl bg-[#F1F4F1] text-[#64746A] hover:bg-[#E7ECE8] transition"
                    title="Close video"
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>

              {/* VIDEO PLAYER */}

              <div className="flex-1 bg-black min-h-0 flex items-center justify-center relative">
                <video
                  ref={videoRef}
                  key={previewFile.id}
                  src={previewFile.previewUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onError={() => {
                    notify(
                      "Unable to play this video. The browser may not support its format or codec. Try downloading it instead.",
                      "error",
                    );
                  }}
                  className="w-full max-h-[70vh] object-contain bg-black"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              {/* PLAYER FOOTER */}

              <div className="px-5 py-4 bg-white border-t border-[#E9EFEB] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#344B3A] truncate">
                    {getVideoName(previewFile)}
                  </p>

                  <p className="text-[11px] text-[#91A097] mt-1 truncate">
                    {getFilename(previewFile)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      previewFile.previewUrl,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="shrink-0 flex items-center justify-center gap-1.5 text-xs font-bold text-[#2E9B59] hover:underline"
                >
                  Open in new tab
                  <ExternalLink size={13} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          DELETE CONFIRMATION
      ==================================================== */}

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
                Delete Video?
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

      {/* ====================================================
          BOTTOM NAVIGATION
      ==================================================== */}

      <BottomNav />
    </div>
  );
}

export default Videos;
