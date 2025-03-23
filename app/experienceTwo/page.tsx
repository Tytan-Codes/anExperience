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
                className="bg-zinc-900 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h2 className="text-white text-4xl font-emberly mb-6">{title}</h2>
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
        }
    ];

    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen">
            <div className="flex flex-col items-center justify-center h-[20vh]">
                <div className="animation-1 p-10 flex flex-col items-center justify-center">
                    <h1 className="text-9xl font-bold text-white font-manuscribe pb-2">Photo Essays</h1>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="flex justify-center items-center gap-8 px-8">
                    <div 
                        className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('florida')}
                    >
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">Florida</h2>
                    </div>
                    <div 
                        className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('vegas')}
                    >
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">Vegas</h2>
                    </div>
                    <div 
                        className="card w-80 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('newzealand')}
                    >
                        <h2 className="text-4xl font-light text-white font-emberly tracking-wider">New Zealand</h2>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={selectedCard === 'florida'} 
                onClose={() => setSelectedCard(null)}
                title="Florida"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {floridaPhotos.map((photo, index) => (
                        <div key={index} className="relative aspect-[3/2] rounded-lg overflow-hidden">
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white text-xl font-emberly">{photo.title}</h3>
                                <p className="text-white/80 text-sm">{photo.description}</p>
                                <p className="text-white/60 text-xs mt-2">{photo.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'vegas'} 
                onClose={() => setSelectedCard(null)}
                title="Vegas"
            >
                <div className="text-white/80 space-y-6">
                    <p className="text-xl leading-relaxed">
                        Las Vegas, a city that never sleeps, where dreams are made and fortunes are lost. 
                        The neon lights paint the night sky in a kaleidoscope of colors, while the Strip 
                        pulses with an energy that's uniquely its own.
                    </p>
                    <p className="text-xl leading-relaxed">
                        From the iconic Bellagio fountains to the grandeur of the Venetian, every corner 
                        tells a story of excess and entertainment. The city's architecture is a testament 
                        to human ambition, with each casino trying to outdo the next in spectacle and scale.
                    </p>
                    <p className="text-xl leading-relaxed">
                        But beyond the glitz and glamour, there's a quieter side to Vegas - the local 
                        neighborhoods, the desert landscapes, and the people who call this city home. 
                        It's a place where reality and fantasy blur, creating an experience that's 
                        impossible to forget.
                    </p>
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'newzealand'} 
                onClose={() => setSelectedCard(null)}
                title="New Zealand"
            >
                <div className="text-white/80 space-y-6">
                    <p className="text-xl leading-relaxed">
                        New Zealand, where nature's grandeur meets cultural richness. The land of the 
                        long white cloud offers landscapes that seem to have been painted by the gods 
                        themselves - from the snow-capped peaks of the Southern Alps to the pristine 
                        beaches of the North Island.
                    </p>
                    <p className="text-xl leading-relaxed">
                        The Maori culture adds a layer of depth to this already fascinating country, 
                        with traditions that have been preserved and celebrated for centuries. The 
                        connection between the land and its people is palpable, creating a sense of 
                        harmony that's rare in our modern world.
                    </p>
                    <p className="text-xl leading-relaxed">
                        Whether you're exploring the geothermal wonders of Rotorua, hiking through 
                        the lush forests of Fiordland, or simply enjoying the laid-back atmosphere 
                        of a local café, New Zealand offers an experience that touches the soul and 
                        stays with you forever.
                    </p>
                </div>
            </Modal>
        </div>
    )
}

