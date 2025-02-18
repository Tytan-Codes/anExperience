"use client"

import {gsap} from "gsap"

import {useGSAP} from "@gsap/react"

gsap.registerPlugin(useGSAP)
export default function Experience() {
    useGSAP(() => {
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set([".animation-1", ".animation-2", ".animation-3"], { opacity: 0, y: 50, scale: 1 });
        gsap.set(".animation-4", { opacity: 0, y: 50 });
        gsap.set([".animation-6-1", ".animation-6-2", ".animation-6-3"], { scaleX: 0 });
        gsap.set([".animation-7-1", ".animation-7-2", ".animation-7-3"], { opacity: 0, y: 20 });
        
        // Create animation sequence
        tl.to([".animation-1", ".animation-2", ".animation-3"], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        })
        .to([".animation-1", ".animation-2"], {
            opacity: 0,
            duration: 0.5,
        }, "+=1")
        .to(".animation-3", {
            x: '40vw',
            y: '30vh',
            scale: 0.5,
            duration: 1,
            ease: "power2.inOut"
        }, "<")
        .to(".animation-4", {
            opacity: 1,
            duration: 1,
            y: 0,
            ease: "power2.inOut"
        }, "+=1")
        .to([".animation-6-1", ".animation-6-2", ".animation-6-3"], {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
        })
        .to(".animation-7-1", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "+=0.2")
        .to(".animation-7-2", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "+=0.2")
        .to(".animation-7-3", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scale: 1
        }, "+=0.2")
        .to(".animation-7-3", {
            scale: 1.1,
            y: 10,
            duration: 0.3,
            ease: "power2.inOut"
        }, ">");
    })
    return (
        <div className="relative h-screen w-screen">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-800 h-full w-full" /> 
                <div className="relative flex flex-col items-center justify-center h-full w-full z-10">
                    
                    <h1 className="text-white text-9xl font-bold animation-1 font-emberly">Hi</h1>
                    <h1 className="text-white text-9xl font-bold animation-2 font-emberly">I'm</h1>
                    <h1 className="text-white text-9xl font-bold animation-3 font-emberly">Tytan</h1>
                    <div className="animation-4 absolute z-20 bg-zinc-500 inset-[15vh] m-auto">
                        <div className="animation-6-1 absolute z-10 border-b-2 border-white top-[30%] left-[10%] right-[10%]" />
                        <div className="animation-6-2 absolute z-10 border-b-2 border-white top-[50%] left-[10%] right-[10%]" />
                        <div className="animation-6-3 absolute z-10 border-b-2 border-white top-[73%] left-[10%] right-[10%]" />
                        
                        <h1 className="animation-7-1 absolute z-20 top-[20%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl">Welcome</h1>
                        <h1 className="animation-7-2 absolute z-20 top-[40%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl flex justify-center">to my</h1>
                        <h1 className="animation-7-3 absolute z-20 top-[60%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl flex justify-end">portfolio</h1>
                    </div>
                </div>
        </div>
    )
}
