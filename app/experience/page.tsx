"use client"

import {gsap} from "gsap"

import {useGSAP} from "@gsap/react"

gsap.registerPlugin(useGSAP)
export default function Experience() {
    useGSAP(() => {
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set(".animation-1", { opacity: 0, y: 50, scale: 1 });
        gsap.set(".animation-2", { opacity: 0, x: 100, scale: 1 });
        gsap.set(".animation-3", { opacity: 0, x: -100, scale: 1 });
        
        // Create animation sequence
        tl.
            to(".animation-1", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power4.out"
            })
            .to(".animation-2", {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power4.out"
            }, "-=0.5")
            .to(".animation-3", {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power4.out"
            }, "-=0.5")
            // Add scale animation for all elements after entrance animations
            .to([".animation-1", ".animation-2", ".animation-3"], {
                scale: 1.1,
                duration: 0.5,
            });
    })
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-zinc-800">
            <h1 className="text-white text-4xl font-bold animation-1">Experience</h1>
            <h1 className="text-white text-2xl font-bold animation-2">Welcome to my portfolio</h1>
            <h1 className="text-white text-1xl font-bold animation-3">I'm a software engineer with a passion for building scalable and efficient systems.</h1>
        </div>
    )
}
