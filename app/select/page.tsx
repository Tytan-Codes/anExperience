"use client"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useRouter } from "next/navigation"

gsap.registerPlugin(useGSAP)

export default function Select() {
    const router = useRouter()

    const handleNavigation = (path: string) => {
        const tl = gsap.timeline({
            onComplete: () => {
                router.push(path)
            }
        })
        
        tl.to([".box-1", ".box-2"], {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.in",
            stagger: 0
        })
    }

    useGSAP(() => {
        gsap.set(".box-1", {
            opacity: 0,
            y: "-50%"
        })
        gsap.set(".box-2", {
            opacity: 0,
            y: "50%"
        })
        
        // Initial animation
        const tl = gsap.timeline()
        tl.to([".box-1", ".box-2"], {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })

        // Hover animations
        const boxes = document.querySelectorAll('.box-1, .box-2')
        boxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                gsap.to(box, {
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                    duration: 0.5,
                    ease: "power2.out"
                })
            })
            
            box.addEventListener('mouseleave', () => {
                gsap.to(box, {
                    scale: 1,
                    boxShadow: 'none',
                    duration: 0.5,
                    ease: "power2.out"
                })
            })
        })
    })
    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-screen h-screen bg-gradient-to-b from-zinc-950 to-zinc-800">
                <div className="flex justify-center items-center h-full gap-24">
                    <div onClick={() => handleNavigation("/experienceOne")} className="box-1 w-[600px] h-[300px] bg-zinc-950/90 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-zinc-900/90">
                        <h1 className="text-white text-4xl font-emberly relative z-10">Portfolio</h1>
                    </div>
                    
                    <div onClick={() => handleNavigation("/experienceTwo")}  className="box-2 w-[600px] h-[300px] bg-zinc-950/90 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-zinc-900/90">
                        <h1 className="text-white text-4xl font-emberly relative z-10">photo essays</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}








