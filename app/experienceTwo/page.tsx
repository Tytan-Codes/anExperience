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
            y: 0,
        })
        tl.to(".animation-1", {
            opacity: 1,
            y: -100,
            duration: 1,
            ease: "power2.out"
        }, "+=1")
    })

    return (
        <div className="flex flex-col  bg-gradient-to-b from-zinc-950 to-zinc-800">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="border-b border-white/20 p-20">
                <h1 className="text-9xl font-bold text-white font-manuscribe">Tytan Codes</h1>
                {/* Fucking do this shit
                Put shit so its like a grid and so text underline then more shit
                 */}
                </div>
            </div>
        </div>
    )
}
