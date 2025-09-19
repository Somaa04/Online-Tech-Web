import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import registration from '../assets/registration.svg';
import Login1 from '../assets/Woman using Login page.mp4';

export default function Login() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 } // plays when 50% visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="container mt-14 flex justify-center items-center bg-[#8863a3] ">
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.45}} className="bg-[#F8F7BA] md:w-[400px] w-[60%] p-4 md:p-8 flex flex-col justify-center items-center rounded-2xl shadow-2xl space-y-4 my-5">
        
        {/* Logo / Video */}
        <div className="flex justify-center">
          <video
            ref={videoRef}
            src={Login1}
            muted
            loop
            playsInline
            className="w-[100px] rounded-[250px] md:w-[200px]"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          Now Register Your Name 🙌
        </h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          {/* Email / Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email or Phone number
            </label>
            <input
              type="text"
              placeholder="Email..."
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8863a3] focus:border-transparent shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8863a3] focus:border-transparent shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-[#8863a3] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#75518e] transition-all"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}
