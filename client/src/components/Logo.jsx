import { useNavigate } from "react-router-dom";
import circle1 from "../assets/NavbarLogo/circle1.png";
import circle2 from "../assets/NavbarLogo/circle2.png";
import logoBase from "../assets/NavbarLogo/logoBase.png";
import { motion } from "framer-motion";
const Logo = () => {
  const navigateTo = useNavigate();
  return (
    <>
      {/* Logo Base Appearing */}
      <div className="relative pt-6 cursor-pointer" onClick={() => navigateTo("/")}>
        <img src={logoBase} alt="logoBase" className="md:h-[4.5rem] h-[3.5rem] " />

        <div className="absolute md:top-[-2px] top-[6px] right-0 left-0  flex items-center justify-center">
          <div className="relative flex items-center justify-center md:mr-1.5 mr-1">
            <motion.img
              src={circle1}
              alt="circle1"
              className="md:size-10 size-7"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />

            <div className="absolute right-0 left-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <motion.img
                  src={circle2}
                  alt="circle2"
                  className="md:size-7 size-5"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <div className="absolute right-0 left-0 flex items-center justify-center">
                  <p className="font-serif text-primary md:text-xl text-sm">L</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
