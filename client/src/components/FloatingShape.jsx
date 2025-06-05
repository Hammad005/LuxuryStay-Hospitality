import {motion} from 'framer-motion'
import { Sparkles } from 'lucide-react'

const FloatingShape = ({color, size, top, left, delay}) => {
  return (
    <motion.div
    className={`absolute`}

    style={{top, left}}
    
    animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
    }}

    transition={{
        duration:20,
        ease: "linear",
        repeat: Infinity,
        delay
    }}
    >
      <Sparkles className={`${color} ${size} opacity-30 blur-lg`} strokeWidth={1}/>
    </motion.div>
  )
}

export default FloatingShape