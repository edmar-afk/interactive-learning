import React, { useMemo } from "react";
import logo from "../assets/images/logo.png";
function Login() {
  const colors = [
    "#0a401c",
    "#125c29",
    "#1b7a38",
    "#259946",
    "#36bd5b",
    "#57d679",
    "#7ceb9b",
    "#a6f5bd",
    "#cbfadd",
    "#edfdf1",
  ];

  const blocks = useMemo(
    () =>
      Array.from({ length: 250 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    [],
  );

  return (
    <>
      <style>{`
        .mask-gradient {
          -webkit-mask-image: radial-gradient(
            circle at 0% 30%,
            rgba(0,0,0,1) 15%,
            rgba(0,0,0,0.6) 45%,
            rgba(0,0,0,0) 75%
          );
          mask-image: radial-gradient(
            circle at 0% 30%,
            rgba(0,0,0,1) 15%,
            rgba(0,0,0,0.6) 45%,
            rgba(0,0,0,0) 75%
          );
        }
      `}</style>

      <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden antialiased">
        <div className="absolute top-0 left-0 w-full lg:w-[45%] h-full z-0 pointer-events-none mask-gradient overflow-hidden">
          <div className="absolute top-0 left-0 w-full grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="aspect-square w-full"
                style={{
                  backgroundColor: block.color,
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.05) 100%)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-10 sm:p-14 lg:p-20 min-h-[15vh] lg:min-h-screen"></div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none">
            <div className="w-full max-w-[360px]">
              <div className="flex justify-center mb-2">
                <img src={logo} className='w-20 h-20 rounded-full' alt="" />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-[1.4rem] font-medium text-black mb-1.5">
                  Welcome!
                </h2>

                <p className="text-gray-600 text-[13px] font-medium tracking-wide">
                  Login to Your Account first
                </p>
              </div>

              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="eg. jay123@gmail.com"
                  className="w-full bg-[#f6f7f9] border border-gray-200/80 rounded-full px-6 py-3.5 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-600 transition-all placeholder-gray-400 font-medium shadow-sm"
                />

                <input
                  type="password"
                  placeholder="password"
                  className="w-full bg-[#f6f7f9] border border-gray-200/80 rounded-full px-6 py-3.5 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-600 transition-all placeholder-gray-400 font-medium shadow-sm"
                />

                <button
                  type="submit"
                  className="w-full bg-[#04884f] hover:bg-[#037242] text-white rounded-full px-6 py-3.5 font-medium text-[15px] transition-all shadow-[0_8px_20px_rgba(4,136,79,0.25)]"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-6 text-center text-[13px] text-gray-500 font-medium">
                Don't have an account{" "}
                <a
                  href="#"
                  className="text-black font-semibold underline underline-offset-2 decoration-2 hover:text-[#008751] transition-colors"
                >
                  sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
