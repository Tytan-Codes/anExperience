'use client'
import { motion, useScroll, useTransform, useSpring, easeOut, easeInOut, useInView } from "motion/react";
import { useRef } from "react";

export default function Experience() {
  const secondSectionRef = useRef(null);
  const isInView = useInView(secondSectionRef, { once: false, amount: 0.3 });
  

  // Add scroll progress tracking with smooth spring physics
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Create transform values for each text element with both X and Y
  const helloY = useTransform(smoothProgress, [0, 1], [0, -600], { ease: easeOut });
  const helloX = useTransform(smoothProgress, [0, 1], [0, 600], { ease: easeOut });
  
  const imY = useTransform(smoothProgress, [0, 1], [0, -500], { ease: easeInOut });
  const imX = useTransform(smoothProgress, [0, 1], [0, 0], { ease: easeInOut });
  
  const tytanY = useTransform(smoothProgress, [0, 1], [0, 0], { ease: easeInOut });
  const tytanX = useTransform(smoothProgress, [0, 1], [0, -800], { ease: easeInOut });
  const tytanScale = useTransform(smoothProgress, [0, 1], [1, 2.5], { ease: easeInOut });
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


        <div className="w-full flex justify-center">
          <div className="h-32 w-0.5 bg-white/20 rounded-full" />
        </div>


        <div className="flex flex-col w-full h-screen p-3">
            <motion.div
            ref={secondSectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col h-1/2 w-1/2 border-2 border-white
            ">
                <div className="flex flex-row h-1/2 w-full">
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col h-full w-1/2 m-5 text-3xl border-2 border-white font-glusp text-white justify-center items-center">
                        This Website
                    </motion.div>

                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{delay: 1.2, duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col h-full w-1/2 m-5 text-[1.5rem] font-emberly text-white ">
                        A modern portfolio crafted with Next.js and Motion, featuring fluid animations and elegant typography. The site combines custom fonts, scroll-based interactions, and seamless transitions to create an engaging user experience. Built with precision using TypeScript and TailwindCSS, it demonstrates the perfect blend of technical excellence and aesthetic design.
                    </motion.div>
                </div>
                
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{delay: 1.8, duration: 0.6, ease: "easeOut" }}
                className="flex flex-col text-white w-full h-full m-5 mt-8 font-emberly font-bold ">
                        <span className="text-4xl">Processess: </span>
                        <span className="text-2xl">
                            NextJS 15 with App Router with Turbopack,
                            Bun,
                            TailwindCSS,
                            TypeScript,

                            Motion Framer,
                            Shadcn UI
                            
                        </span>
                </motion.div>
                







            </motion.div>
        </div>
    </div>


  )
}