import React from "react";

function ScanQRCard() {
  return (
    <button className="mx-6 mt-5 w-[calc(100%-3rem)] rounded-[26px] bg-white border border-[#E4EEE7] p-5 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition active:scale-[0.99]">

      <div className="w-14 h-14 rounded-2xl bg-[#EAF7EE] flex items-center justify-center text-2xl shrink-0">
        📷
      </div>

      <div className="flex-1">
        <p className="text-base font-extrabold text-[#183B28]">
          Scan & Learn
        </p>

        <p className="text-xs text-[#718277] mt-1 leading-relaxed">
          Scan a QR code to unlock a planting lesson.
        </p>
      </div>

      <div className="text-[#2E9B59] text-xl">
        →
      </div>
    </button>
  );
}

export default ScanQRCard;

