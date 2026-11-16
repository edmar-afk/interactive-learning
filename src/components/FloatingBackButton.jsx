
import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function FloatingBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(null);
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    const previous = sessionStorage.getItem("previousPath");

    if (previous && previous !== location.pathname) {
      previousPath.current = previous;
    }

    const lastPath = sessionStorage.getItem("currentPath");

    if (lastPath && lastPath !== location.pathname) {
      sessionStorage.setItem("previousPath", lastPath);
      previousPath.current = lastPath;
    }

    sessionStorage.setItem("currentPath", location.pathname);
    currentPath.current = location.pathname;
  }, [location.pathname]);

  const handleBack = () => {
    const previous = previousPath.current;

    if (previous && previous !== location.pathname) {
      navigate(previous);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-5 left-5 z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg border border-gray-200 hover:bg-gray-100 hover:scale-105 transition-all"
      title="Go to previous page"
      aria-label="Go to previous page"
    >
      <ArrowLeft size={22} />
    </button>
  );
}

export default FloatingBackButton;
