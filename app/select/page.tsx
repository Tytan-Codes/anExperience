"use client"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)


export default function Select() {
    useGSAP(() => {

        gsap.set(".box-1", {
            opacity: 0,
            y: "-50%"
        })
        gsap.set(".box-2", {
            opacity: 0,
            y: "50%"
        })
        const tl = gsap.timeline()
        tl.to([".box-1", ".box-2"], {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
    })
    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-screen h-screen bg-gradient-to-b from-zinc-950 to-zinc-800">
                <div className="flex justify-center items-center h-full gap-24">
                    <div className="box-1 w-[600px] h-[300px] bg-zinc-950/90 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer">
                        <h1 className="text-white text-4xl font-emberly relative z-10">Box One</h1>
                    </div>
                    
                    <div className="box-2 w-[600px] h-[300px] bg-zinc-950/90 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer">
                        <h1 className="text-white text-4xl font-emberly relative z-10">Box Two</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}








