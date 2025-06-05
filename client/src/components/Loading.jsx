import circle1 from "../assets/NavbarLogo/circle1.png";
import circle2 from "../assets/NavbarLogo/circle2.png";
import logoBase from "../assets/NavbarLogo/logoBase.png";
import { motion } from "framer-motion";


const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-accent to-background">
      <motion.div
        className="relative flex items-center justify-center mr-3"
        initial={{ scale: 0, y: 100 }}
        animate={{
          scale: [0, 1, 1],
          y: [100, -1, -50],
        }}
        onAnimationComplete={{
          scale: 0.5,
          y: 100,
        }}
        transition={{
          duration: 4,
          times: [0, 0.4, 1],
          ease: "easeInOut",
        }}
      >
        {/* Outer Circle */}
        <motion.img
          src={circle1}
          alt="circle1"
          className="size-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: 4, // now matches entry transition
          }}
        />

        {/* Inner Circle with "L" */}
        <div className="absolute right-0 left-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <motion.img
              src={circle2}
              alt="circle2"
              className="size-16"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
                delay: 4,
              }}
            />
            <div className="absolute right-0 left-0 flex items-center justify-center">
              <p className="font-serif text-primary text-4xl">L</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Logo Base Appearing */}
      <motion.div
        className="absolute mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
      >
        <img src={logoBase} alt="logoBase" className="h-40" />
      </motion.div>
    </div>
  );
};

export default Loading;
