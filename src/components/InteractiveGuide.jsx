import React, { useEffect, useState } from "react";
import chibiTree from "../assets/images/chibi.webp";

function InteractiveGuide({
  messages = [
    "Hello! Welcome to our interactive website!",
    "I'll help you understand the different features.",
    "Let's start exploring!",
  ],
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [visible, setVisible] = useState(false);

  const currentMessage = messages[currentIndex] || "";

  // TEXT TO SPEECH
  const speakMessage = (text) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    // Cute chibi voice settings
    speech.rate = 1.5;
    speech.pitch = 6.0;
    speech.volume = 10;

    // Select a feminine-sounding English voice
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((voice) =>
        /samantha|aria|jenny|zira|karen|moira|tessa/i.test(voice.name),
      ) ||
      voices.find(
        (voice) =>
          /female/i.test(voice.name) &&
          voice.lang.toLowerCase().startsWith("en"),
      ) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  // TYPING ANIMATION
  useEffect(() => {
    if (!visible) return;

    setDisplayedText("");
    setTypingFinished(false);

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayedText(currentMessage.slice(0, index));

      if (index >= currentMessage.length) {
        clearInterval(interval);
        setTypingFinished(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [visible, currentIndex, currentMessage]);

  // SPEAK CURRENT MESSAGE
  useEffect(() => {
    if (!visible || !currentMessage) return;

    let cancelled = false;

    const speak = () => {
      if (!cancelled) {
        speakMessage(currentMessage);
      }
    };

    // Wait for browser voices to load
    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
      speak();
    }

    return () => {
      cancelled = true;
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [visible, currentIndex, currentMessage]);

  // OPEN GUIDE
  const openGuide = () => {
    setCurrentIndex(0);
    setDisplayedText("");
    setTypingFinished(false);
    setVisible(true);
  };

  // CLOSE GUIDE
  const closeGuide = () => {
    window.speechSynthesis?.cancel();
    setVisible(false);
    onClose?.();
  };

  // NEXT MESSAGE
  const nextMessage = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      closeGuide();
    }
  };

  return (
    <>
      {/* FLOATING GUIDE BUTTON */}
      {!visible && (
        <button
          onClick={openGuide}
          aria-label="Open interactive guide"
          title="Need help? Click me!"
          className="
            fixed bottom-18 left-5 z-[9999999998]
            flex h-10 w-10 items-center justify-center
            rounded-full transition-all duration-300
            hover:scale-110 active:scale-95
            animate-[chibiFloat_2.5s_ease-in-out_infinite]
            cursor-pointer
          "
        >
          <img
            src={chibiTree}
            alt="Open guide"
            className="h-full w-full object-contain drop-shadow-xl"
          />
        </button>
      )}

      {/* GUIDE POPUP */}
      {visible && messages.length > 0 && (
        <div
          onClick={closeGuide}
          className="
            fixed inset-0 z-[9999999999]
            flex items-end justify-center
            bg-black/60 backdrop-blur-xs
            cursor-pointer
            p-3 sm:p-6
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative mb-4 flex w-full max-w-2xl
              items-end gap-2 sm:gap-3
              animate-[guideAppear_0.4s_ease-out]
              cursor-default
            "
          >
            {/* CHIBI AVATAR */}
            <div
              className="
                w-20 shrink-0 self-end
                animate-[chibiFloat_2.5s_ease-in-out_infinite]
                sm:w-32 md:w-40
              "
            >
              <img
                src={chibiTree}
                alt="Friendly tree guide"
                className="
                  block h-auto w-full object-contain
                  drop-shadow-lg
                "
              />
            </div>

            {/* SPEECH BUBBLE */}
            <div
              className="
                relative mb-4 min-w-0 flex-1
                max-h-[75vh] overflow-y-auto
                rounded-2xl p-4 sm:p-5

              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={closeGuide}
                aria-label="Close guide"
                className="
                  sticky top-0 float-right -mr-1 -mt-1
                  rounded-full bg-red-600
                  px-3 py-2 text-[11px] font-extrabold
                  text-white shadow-md
                  transition hover:bg-red-700
                  cursor-pointer
                "
              >
                ✕
              </button>

              {/* HEADING */}
              <div className="mb-3 flex items-center justify-between gap-2 pr-2">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-green-100">
                  🌱 Your Friendly Guide
                </h3>

                <span className="shrink-0 text-[10px] font-bold text-gray-300">
                  {currentIndex + 1} / {messages.length}
                </span>
              </div>

              {/* TYPING MESSAGE */}
              <p
                className="
                whitespace-pre-wrap break-words
                text-sm font-medium leading-7
                text-gray-100
              "
              >
                {displayedText}

                {!typingFinished && (
                  <span className="ml-0.5 animate-pulse font-bold text-green-400">
                    |
                  </span>
                )}
              </p>

              {/* BOTTOM ACTIONS */}
              {typingFinished && (
                <div
                  className="
                    mt-4 flex items-center justify-between
                    gap-2 border-t border-gray-300/30 pt-3
                  "
                >
                  <p className="text-[10px] font-semibold text-green-50">
                    {currentIndex === messages.length - 1
                      ? "Click anywhere to close"
                      : "Continue to the next tip"}
                  </p>

                  <button
                    onClick={nextMessage}
                    className="
                      shrink-0 rounded-full
                      bg-green-600 px-4 py-2
                      text-xs font-bold text-white
                      shadow-md transition
                      hover:bg-green-700 active:scale-95
                      cursor-pointer
                    "
                  >
                    {currentIndex === messages.length - 1
                      ? "FINISH ✓"
                      : "NEXT →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes chibiFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes guideAppear {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}

export default InteractiveGuide;
