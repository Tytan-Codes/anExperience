"use client"

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-900 w-screen h-screen">
      <div className="flex flex-row w-full h-1/6">s</div>
      <div className="flex flex-row w-full h-2/6 items-center pl-16 font-width-extended tracking-widest ">
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white text-[18rem] font-weight-black font-emberly italic"
        >
          t
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          y
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          t
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          a
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          n
        </motion.span>
      </div>
      <div className="flex flex-row w-full h-2/6 justify-end pr-16 items-center font-width-extended tracking-widest font-emberly">
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="text-white text-[18rem] font-weight-black italic"
        >
          w
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          i
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          l
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          s
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          o
        </motion.span>
        <motion.span 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
          className="text-white text-[18rem] font-emberly italic"
        >
          n
        </motion.span>
      </div>
      <div className="flex flex-row w-full h-2/6 items-center justify-center ">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
      >
        <button className="mt-4 inline-block border border-white px-8 py-2 text-sm tracking-wider transition-colors hover:bg-zinc-400 hover:text-white text-white">
          Start experience
        </button>
      </motion.div>
      </div>
    </div>
  );
}
