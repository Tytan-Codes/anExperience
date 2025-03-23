"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function ExperienceTwo() {
    useGSAP(() => {
        // Initial setup
        gsap.set(".animation-1", {
            opacity: 0,
            y: 50,
        })
        gsap.set(".card", {
            opacity: 0,
            y: 100,
        })

        const tl = gsap.timeline()
        
        // Title animation
        tl.to(".animation-1", {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            y: 0,
        })
        // Card animations in sequence
        .to(".card", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
        })
    })

    return (
        <div className="flex flex-col bg-zinc-950">
            <div className="flex flex-col items-center justify-center h-[20vh]">
                <div className="animation-1 p-10 flex flex-col items-center justify-center">
                    <h1 className="text-9xl font-bold text-white font-manuscribe pb-2">Photo Essays</h1>
                </div>
            </div>
            <div className="flex flex-col h-[80vh] w-screen">
                <div className="flex justify-center items-center gap-8 px-8">
                    <div className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300">
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">Florida</h2>
                    </div>
                    <div className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300">
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">Vegas</h2>
                    </div>
                    <div className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300">
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">New Zealand</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

