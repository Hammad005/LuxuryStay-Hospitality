import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

const Auth = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [isLogin, setIsLogin] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="flex  items-center justify-center min-h-screen z-10 w-full p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center border border-primary rounded-2xl shadow-2xl shadow-black  md:min-w-[460px]  min-w-full  min-h-[490px] p-8 relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? (
              <Login toggleMode={toggleMode} />
            ) : (
              <Signup toggleMode={toggleMode} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
