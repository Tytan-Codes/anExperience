'use client'
import { motion } from "motion/react";

export default function Experience() {
  return (
    <div className="flex flex-col bg-zinc-900">
        <div className="flex flex-col w-screen h-screen p-3">
            <div className="">
                <div className="flex flex-start">
                    <motion.h1 className="text-white text-[25rem] font-extrabold font-width-extended tracking-widest font-humane ">
                        Hello
                    </motion.h1>
                </div>
                <div className="flex justify-center">
                    <motion.h1 className="text-white text-[5rem] font-extrabold font-width-extended tracking-widest font-humane ">
                        I'm
                    </motion.h1>
                </div>
                <div className="flex justify-end">
                    <motion.h1 className="text-white text-[8rem] font-extrabold font-width-extended tracking-widest font-emberly italic ">
                        tytan
                    </motion.h1>
                </div>
            </div>
        </div>
    </div>
  )
}