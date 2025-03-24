"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useState, useRef, useCallback } from "react"
import Image from 'next/image'

gsap.registerPlugin(useGSAP)

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        const modalContent = modalRef.current;
        const overlay = overlayRef.current;

        if (modalContent && overlay) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsClosing(false);
                    onClose();
                }
            });

            tl.to(modalContent, {
                opacity: 0,
                scale: 0.8,
                y: -20,
                duration: 0.3,
                ease: "power3.in"
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
            }, "-=0.2");
        }
    }, [onClose]);

    useGSAP(() => {
        if (isOpen && !isClosing) {
            const modalContent = modalRef.current;
            const overlay = overlayRef.current;

            if (modalContent && overlay) {
                gsap.set(modalContent, { opacity: 0, scale: 0.8, y: 20 });
                gsap.set(overlay, { opacity: 0 });

                const tl = gsap.timeline();
                tl.to(overlay, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
                .to(modalContent, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out"
                }, "-=0.1");
            }
        }
    }, [isOpen, isClosing]);

    if (!isOpen && !isClosing) return null;

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className="bg-zinc-900 rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/70 hover:text-white transition-colors"
                >
                    <div className="w-5 h-5 sm:w-6 sm:h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </button>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-emberly mb-4 sm:mb-6">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default function ExperienceTwo() {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

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

    const floridaPhotos = [
        {
            src: "/photos/DSC_0651.jpg",
            title: "A Cool breeze",
            description: "A beautiful picture of a city at night",
            info: "Nikon D5600 | f/5.6 | 1/15 | ISO 3200"
        },
        {
            src: "/photos/DSC_0456.jpg",
            title: "A Beautiful Sunset",
            description: "A beautiful picture of a sunset in Cape Canaveral",
            info: "Nikon D5600 | f/5.6 | 1/100 | ISO 1000"
        },
        {
            src: "/photos/DSC_0205.jpg",
            title: "Solitude on a Trail",
            description: "A man stands on a rugged dirt path, gazing at the water, surrounded by lush greenery and an open sky, evoking solitude and reflection.",
            info: "Nikon D5600 | f/5.6 | 1/125 | ISO 100"
        },
        {
            src: "/photos/DSC_414.jpg",
            title: "Launch Day",
            description: "A picture of the launch of the Space X rocket",
            info: "Nikon D5600 | f/5.6 | 1/4000 | ISO 100"
        },
        {
            src: "/photos/DSC_0213.jpg",
            title: "Very scary alligators",
            description: "A picture of a very scary alligator",
            info: "Nikon D5600 | f/5.6 | 1/2500 | ISO 100"
        }
    ];

    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen">
            <div className="flex flex-col items-center justify-center h-[20vh]">
                <div className="animation-1 p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold text-white font-manuscribe pb-2 text-center">Photo Essays</h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-8">
                <div className="flex flex-row justify-center items-center gap-4 sm:gap-8 px-4 sm:px-8">
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('florida')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider">Florida</h2>
                    </div>
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('vegas')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider">Vegas</h2>
                    </div>
                </div>
                <div className="mt-4 sm:mt-8">
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('newzealand')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider">New Zealand</h2>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={selectedCard === 'florida'} 
                onClose={() => setSelectedCard(null)}
                title="Space X Launch"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {floridaPhotos.map((photo, index) => (
                        <div key={index} className="relative aspect-[3/2] rounded-lg overflow-hidden">
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                <h3 className="text-white text-lg sm:text-xl font-emberly">{photo.title}</h3>
                                <p className="text-white/80 text-xs sm:text-sm">{photo.description}</p>
                                <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2">{photo.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'vegas'} 
                onClose={() => setSelectedCard(null)}
                title="Around the world in 1 state"
            >
                <div className="text-white/80 space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        Las Vegas, a city that&apos;s always awake, where dreams come true or money disappears. The bright neon lights turn the night sky into a crazy mix of colors, and the Strip&apos;s got this wild energy that&apos;s totally its own.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                    From the famous Bellagio fountains to the big, fancy Venetian, every spot in Vegas has a story about going all out and having fun. The buildings show off how much people want to dream big, with every casino trying to be flashier and huger than the one next door.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        But past all the shiny, fancy stuff, Vegas has a chill side too—like the regular neighborhoods, the desert views, and the people who live there. It&apos;s a spot where real life and dream stuff mix together, making it something you can&apos;t ever forget.
                    </p>
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'newzealand'} 
                onClose={() => setSelectedCard(null)}
                title="New Zealand"
            >
                <div className="text-white/80 space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        New Zealand&apos;s where epic nature hangs out with awesome culture. They call it the land of the long white cloud, and it&apos;s got views that look like the gods drew them—like the snowy tops of the Southern Alps and the super clean beaches up on the North Island.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        The Maori culture makes this already awesome country even cooler, with old traditions they&apos;ve kept alive and loved for ages. You can totally feel how tight the people are with the land, and it&apos;s got this chill vibe you don&apos;t see much these days.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        Whether you&apos;re checking out the cool hot springs in Rotorua, walking through the green woods in Fiordland, or just chilling at a café, New Zealand&apos;s got stuff that hits you right in the feels and sticks with you for good.
                    </p>
                </div>
            </Modal>
        </div>
    )
}

