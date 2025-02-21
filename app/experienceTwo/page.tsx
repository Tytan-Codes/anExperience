"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function ExperienceTwo() {
    useGSAP(() => {
        gsap.set(".animation-1", {
            opacity: 0,
            y: 100,
        })

        const tl = gsap.timeline()
        tl.to(".animation-1", {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            y: 0,
        })
    })

    return (
        <div className="flex flex-col  bg-zinc-950">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animation-1 border-b border-white/20 p-20 flex flex-col items-center justify-center">
                    <h1 className="text-9xl font-bold text-white font-manuscribe pb-2">Tytan Codes</h1>
                    <span className="text-white/50 text-lg font-emberly">Scroll down</span>
                </div>
            </div>
            <div className="flex flex-col h-screen w-screen">
                <div className="flex">
                    
                </div>
            </div>
        </div>
    )
}
