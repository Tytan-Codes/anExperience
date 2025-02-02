'use client'
import { motion } from "motion/react";

export default function Experience() {
  return (
    <div className="flex flex-col bg-zinc-900">
        <div className="flex flex-col w-screen h-screen p-3">
            <div className="">
                <div className="flex flex-start">
                    <motion.h1 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
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
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                    className="text-white text-[7rem] font-extrabold font-width-extended tracking-widest font-emberly italic ">
                        tytan
                    </motion.h1>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-screen h-screen">
            
        </div>
    </div>
  )
}