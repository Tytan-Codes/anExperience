'use client'
import { motion, useScroll, useTransform, easeOut, easeInOut } from "motion/react";

export default function Experience() {
  // Add scroll progress tracking
  const { scrollYProgress } = useScroll();
  
  // Create transform values for each text element with both X and Y
  const helloY = useTransform(scrollYProgress, [0, 0.3], [0, -600], { ease: easeOut });
  const helloX = useTransform(scrollYProgress, [0, 0.3], [0, 600], { ease: easeOut });
  
  const imY = useTransform(scrollYProgress, [0, 0.3], [0, -500], { ease: easeInOut });
  const imX = useTransform(scrollYProgress, [0, 0.3], [0, 0], { ease: easeInOut });
  
  const tytanY = useTransform(scrollYProgress, [0, 0.3], [0, 0], { ease: easeInOut });
  const tytanX = useTransform(scrollYProgress, [0, 0.3], [0, -800], { ease: easeInOut });
  const tytanScale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5], { ease: easeInOut });
  return (
    <div className="flex flex-col bg-zinc-900 overflow-x-hidden">
        <div className="flex flex-col w-full h-screen p-3">
            <div className="">
                <div className="flex flex-start">
                    <motion.h1 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ y: helloY, x: helloX }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-white text-[25rem] font-extrabold font-width-extended tracking-widest font-humane ">
                        Hello
                    </motion.h1>
                </div>
                <div className="flex justify-center">
                    <motion.h1 
                    initial={{ x: 100, y: 100, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    style={{ y: imY, x: imX }}
                    exit={{ x: -100, y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                    className="text-white text-[5rem] font-extrabold font-width-extended tracking-widest font-humane ">
                        I'm
                    </motion.h1>
                </div>
                <div className="flex justify-end">
                    <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ y: tytanY, x: tytanX, scale: tytanScale }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                    className="text-white text-[7rem] font-extrabold font-width-extended tracking-widest font-emberly italic ">
                        tytan
                    </motion.h1>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full h-screen">
            
        </div>
    </div>
  )
}