"use client"

import { useRouter } from 'next/navigation';
import {  useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Home() {
  const router = useRouter();
  const [windowHeight, setWindowHeight] = useState(0);
  const letterRefs = {
    tytan: useRef([]),
    codes: useRef([])
  };

  // Initialize refs for each letter
  letterRefs.tytan.current = [];
  letterRefs.codes.current = [];

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    // Handle window resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    // Calculate animation values based on viewport height
    const yOffset = windowHeight * 0.15; // 15% of viewport height
    
    // Animate "tytan" letters
    tl.from(letterRefs.tytan.current, {
      y: yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    });

    // Animate "codes" letters
    tl.from(letterRefs.codes.current, {
      y: yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.3");

    // Animate button
    tl.from(".select-button", {
      y: yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.1");
  }, [letterRefs.tytan.current, letterRefs.codes.current, windowHeight]);

  const handleClick = () => {
    // Exit animation
    const tl = gsap.timeline({
      onComplete: () => router.push('/select')
    });

    // Calculate animation values based on viewport height
    const yOffset = windowHeight * 0.15; // 15% of viewport height

    // Animate out "tytan" letters
    tl.to(letterRefs.tytan.current, {
      y: -yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    });

    // Animate out "codes" letters
    tl.to(letterRefs.codes.current, {
      y: -yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    }, "-=0.3");

    // Animate out button
    tl.to(".select-button", {
      y: -yOffset,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in"
    }, "-=0.1");
  };

  const addToRefs = (el: HTMLSpanElement | null, collection: { current: HTMLSpanElement[] }) => {
    if (el && !collection.current.includes(el)) {
      collection.current.push(el);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-zinc-950 to-zinc-800 w-full h-screen">
      <div className="flex flex-row w-full h-1/6"></div>
      <div className="flex flex-row w-full h-2/6 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 font-width-extended tracking-widest">
        {['t', 'y', 't', 'a', 'n'].map((letter, index) => (
          <span
            key={`tytan-${index}`}
            ref={(el) => addToRefs(el, letterRefs.tytan)}
            className="text-white text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-weight-black font-emberly italic"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex flex-row w-full h-2/6 justify-center px-4 sm:px-8 md:px-12 lg:px-16 items-center font-width-extended tracking-widest font-emberly">
        {['c', 'o', 'd', 'e', 's'].map((letter, index) => (
          <span
            key={`codes-${index}`}
            ref={(el) => addToRefs(el, letterRefs.codes)}
            className="text-white text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-weight-black font-emberly italic"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex flex-row w-full h-2/6 items-center justify-center">
        <button 
          onClick={handleClick}
          className="select-button mt-4 inline-block border font-emberly italic text-base sm:text-lg md:text-xl lg:text-[1.5rem] border-white px-4 sm:px-6 md:px-8 py-2 text-sm tracking-wider transition-colors hover:bg-zinc-400 hover:text-white text-white"
        >
          Start experience
        </button>
      </div>
    </div>
  );
}
