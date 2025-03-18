"use client"

import { useRouter } from 'next/navigation';
import {  useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const router = useRouter();
  const letterRefs = {
    tytan: useRef([]),
    codes: useRef([])
  };

  // Initialize refs for each letter
  letterRefs.tytan.current = [];
  letterRefs.codes.current = [];

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    // Animate "tytan" letters
    tl.from(letterRefs.tytan.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    });

    // Animate "codes" letters
    tl.from(letterRefs.codes.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.3");

    // Animate button
    tl.from(".select-button", {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.1");
  }, [letterRefs.tytan.current, letterRefs.codes.current]);

  const handleClick = () => {
    // Exit animation
    const tl = gsap.timeline({
      onComplete: () => router.push('/experienceOne')
    });

    // Animate out "tytan" letters
    tl.to(letterRefs.tytan.current, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    });

    // Animate out "codes" letters
    tl.to(letterRefs.codes.current, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    }, "-=0.3");

    // Animate out button
    tl.to(".select-button", {
      y: -100,
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
      <div className="flex flex-row w-full h-1/6">s</div>
      <div className="flex flex-row w-full h-2/6 items-center pl-16 font-width-extended tracking-widest">
        {['t', 'y', 't', 'a', 'n'].map((letter, index) => (
          <span
            key={`tytan-${index}`}
            ref={(el) => addToRefs(el, letterRefs.tytan)}
            className="text-white text-[18rem] font-weight-black font-emberly italic"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex flex-row w-full h-2/6 justify-end pr-16 items-center font-width-extended tracking-widest font-emberly">
        {['c', 'o', 'd', 'e', 's'].map((letter, index) => (
          <span
            key={`codes-${index}`}
            ref={(el) => addToRefs(el, letterRefs.codes)}
            className="text-white text-[18rem] font-weight-black font-emberly italic"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex flex-row w-full h-2/6 items-center justify-center">
        <button 
          onClick={handleClick}
          className="select-button mt-4 inline-block border font-emberly italic text-[1.5rem] border-white px-8 py-2 text-sm tracking-wider transition-colors hover:bg-zinc-400 hover:text-white text-white"
        >
          Start experience
        </button>
      </div>
    </div>
  );
}
